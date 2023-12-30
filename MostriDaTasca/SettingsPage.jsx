import { View, Text, Button } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { PlayerContext, DatabaseContext } from './Contexts'
import CommunicationController from './CommunicationController'

export default function SettingsPage({ navigation }) {

	const { sid, uid } = useContext(PlayerContext)
	const { database } = useContext(DatabaseContext)
	const [player, setPlayer] = useState()

	useEffect(() => {
		console.log("Getting player details...")
		database.getUserByID(sid, uid)
			.then(setPlayer)
	}, [])


	handleUpdateUser = async (sid, uid, newName, newImage, sharePosition) => {
		CommunicationController.updateUser(sid, uid, newName, newImage, sharePosition)
	}

	if (!player) return <Text>Loading...</Text>
	return (
		<View>
			<Button title="< Back" onPress={navigation.goBack} />
			<Text style={{ fontSize: 28, fontWeight: 'bold' }}>{player.name}'s profile</Text>
			<Text>HP: {player.life} | XP: {player.experience}</Text>
			<Button title="Confirm and update" onPress={() => handleUpdateUser(sid, uid, "LucaTest", null, true)} />
		</View>
	)
}