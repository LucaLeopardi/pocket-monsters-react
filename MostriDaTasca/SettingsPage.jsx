import { View, Text, Button, Image, TextInput, TouchableOpacity } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import * as Context from './Contexts'
import CommunicationController from './CommunicationController'
import { launchImageLibrary } from 'react-native-image-picker'

export default function SettingsPage({ navigation }) {

	const { sid, uid } = useContext(Context.Player)
	const { profileVersion, setProfileVersion } = useContext(Context.Player)
	const { database } = useContext(Context.Database)
	const [player, setPlayer] = useState()
	const [newName, setNewName] = useState(null)
	const [newImage, setNewImage] = useState(null)
	const [newSharePosition, setNewSharePosition] = useState()	// Defaults to player.sharePosition in useEffect

	const loadPage = () => {
		console.log("Getting player details...")
		database.getUserByID(sid, uid, profileVersion)
			.then(setPlayer)
	}

	useEffect(() => loadPage(), [])

	useEffect(() => { if (player) setNewSharePosition(player.positionshare) }, [player])

	const handleUpdateUser = async (sid, uid, newName, newImage, newSharePosition) => {
		// The local database is only updated with data from the server, which handles profileversion
		CommunicationController.updateUser(sid, uid, newName, newImage, newSharePosition)	// Update on server
			.then(() => CommunicationController.getUserDetails(sid, uid))					// And save its updated version
			.then((usr) => {
				database.insertOrReplaceUser(usr)											// on local database
				setProfileVersion(usr.profileversion)
			})
			.then(loadPage)
	}

	const handleSelectImage = () => {
		// TODO: Does not work. Library problem.
		launchImageLibrary(
			{ mediaType: 'photo', includeBase64: true },
			(response) => {
				if (response.errorMessage) {
					console.log("Error selecting image: " + response.errorMessage)
					return
				} else {
					if (response.assets[0].fileSize > 100 * 1024) alert("Warning: Image too big! Max size is 100 KB")
					else setNewImage({ uri: 'data:image/png;base64' + response.assets[0].base64 })
				}
			})
	}

	// When player hasn't been loaded yet
	if (!player) return (
		<View>
			<Button title="< Back" onPress={navigation.goBack} />
			<Text>Loading...</Text>
		</View>
	)

	// After player has been loaded
	const image = player.picture ? { uri: 'data:image/png;base64,' + player.picture } : require('./assets/user_icon.png')
	const shouldConfirmBeDisabled = () => newName === null && newImage === null && newSharePosition == player.positionshare

	return (
		<View>
			<Button title="< Back" onPress={navigation.goBack} />
			<Text style={{ fontSize: 24, fontWeight: 'bold' }}>Your profile</Text>
			<View style={{ flexDirection: 'row' }}>
				<Image source={require('./assets/edit_icon.png')} style={{ width: 50, height: 50 }} />
				<TextInput
					placeholder={player.name}
					maxLength={15}
					style={{ fontSize: 36, fontWeight: 'bold' }}
					onChangeText={(str) => setNewName(str)} />
			</View>
			<TouchableOpacity onPress={() => handleSelectImage()} style={{ justifyContent: 'center', alignItems: 'center' }}>
				<Image source={image} style={{ opacity: 0.5, width: 200, height: 200 }} />
				<Image source={require('./assets/edit_icon.png')} style={{ position: 'absolute', width: 100, height: 100 }} />
			</TouchableOpacity>
			<Text>HP: {player.life} | XP: {player.experience}</Text>
			<Button
				title={(newSharePosition === true ? "Disable" : "Enable") + " position sharing"}
				onPress={() => setNewSharePosition(!newSharePosition)} />
			<Button
				title="Confirm"
				disabled={shouldConfirmBeDisabled()}
				onPress={() => handleUpdateUser(sid, uid, newName, newImage, newSharePosition)} />
		</View>
	)
}