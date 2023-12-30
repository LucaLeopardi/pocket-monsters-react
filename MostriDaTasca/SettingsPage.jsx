import { View, Text, Button } from 'react-native'
import { useContext } from 'react'
import { PlayerContext } from './Contexts'
import CommunicationController from './CommunicationController'

export default function SettingsPage({ navigation }) {

	const { sid, uid } = useContext(PlayerContext)

	handleUpdateUser = async (sid, uid, newName, newImage, sharePosition) => {
		CommunicationController.updateUser(sid, uid, newName, newImage, sharePosition)
	}

	return (
		<View>
			<Button title="< Back" onPress={navigation.goBack} />
			<Text style={{ fontSize: 28, fontWeight: 'bold' }}>{ }'s profile</Text>
			<Button title="Update" onPress={() => handleUpdateUser(sid, uid, "LucaTest", null, true)} />
		</View>
	)
}