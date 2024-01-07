import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import * as Context from './Contexts'
import CommunicationController from './CommunicationController'
import { launchImageLibrary } from 'react-native-image-picker'
import { StyledButton } from './CustomComponents'

export default function SettingsPage({ navigation, route }) {

	const { player: { sid, uid, profileVersion }, updatePlayer } = useContext(Context.Player)
	const { database } = useContext(Context.Database)
	const [profile, setProfile] = useState()
	const [newProfile, setNewProfile] = useState({
		name: null,
		image: null,
		sharePosition: null
	})
	const updateNewProfile = (newProperties) => setNewProfile((oldProperties) => ({ ...oldProperties, ...newProperties }))

	useEffect(() => { database.getUserByID(sid, uid, profileVersion).then(setProfile) }, [])
	useEffect(() => { if (profile) updateNewProfile({ sharePosition: profile.positionshare }) }, [profile])

	const handleUpdateUser = async (sid, uid, newProfile) => {
		const { name, image, sharePosition } = newProfile
		// The local database is only updated with data from the server, which handles profileversion
		CommunicationController.updateUser(sid, uid, name, image, sharePosition)	// Update on server
			.then(() => CommunicationController.getUserDetails(sid, uid))			// And save its updated version
			.then((usr) => {
				database.insertOrReplaceUser(usr)									// on local database
				updatePlayer({ profileVersion: usr.profileversion })
			})
			.then(navigation.reset({
				index: 0,
				routes: [{ name: 'Main' }]
			}))
	}

	const handleSelectImage = () => {
		// TODO: Does not work. EDIT: Library problem with no solution online. Nice.
		launchImageLibrary(
			{ mediaType: 'photo', includeBase64: true },
			(response) => {
				if (response.errorMessage) {
					console.log("Error selecting image: " + response.errorMessage)
					return
				} else {
					if (response.assets[0].fileSize > 100 * 1024) alert("Warning: Image too big! Max size is 100 KB")
					else updateNewProfile({ image: { uri: 'data:image/png;base64' + response.assets[0].base64 } })
				}
			})
	}

	// When player hasn't been loaded yet
	if (!profile) return (
		<View>
			<StyledButton title="< Back" onPress={navigation.goBack} />
			<ActivityIndicator size='large' color='#0000ff' />
		</View>
	)

	// After player has been loaded
	const image = profile.picture ? { uri: 'data:image/png;base64,' + profile.picture } : require('./assets/user_icon.png')
	const shouldConfirmBeDisabled = () => newProfile.name === null && newProfile.image === null && newProfile.sharePosition == profile.positionshare

	return (
		<View>
			{/* "Back" button is not rendered it firstAccess is passed as route param */}
			{route.params?.firstAccess !== true && (<StyledButton title="< Back" onPress={navigation.goBack} />)}
			<Text style={{ fontSize: 24, fontWeight: 'bold' }}>Your profile</Text>
			<View style={{ flexDirection: 'row' }}>
				<Image source={require('./assets/edit_icon.png')} style={{ width: 50, height: 50 }} />
				<TextInput
					placeholder={profile.name}
					maxLength={15}
					style={{ fontSize: 36, fontWeight: 'bold' }}
					onChangeText={(str) => updateNewProfile({ name: str })} />
			</View>
			<TouchableOpacity onPress={() => handleSelectImage()} style={{ justifyContent: 'center', alignItems: 'center' }}>
				<Image source={image} style={{ opacity: 0.5, width: 200, height: 200 }} />
				<Image source={require('./assets/edit_icon.png')} style={{ position: 'absolute', width: 100, height: 100 }} />
			</TouchableOpacity>
			<Text>HP: {profile.life} | XP: {profile.experience}</Text>
			<StyledButton
				title={(newProfile.sharePosition === true ? "Disable" : "Enable") + " position sharing"}
				onPress={() => updateNewProfile({ sharePosition: !newProfile.sharePosition })} />
			<StyledButton
				title="Confirm"
				disabled={shouldConfirmBeDisabled()}
				onPress={() => handleUpdateUser(sid, uid, newProfile)} />
		</View>
	)
}