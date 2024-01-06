import { View, Text, Button, Linking, Pressable, Image } from 'react-native'
import CommunicationController from './CommunicationController'
import { useContext } from 'react'
import * as Context from './Contexts'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function RegistrationPage({ navigation }) {

	const { setSID, setUID } = useContext(Context.Player)

	const handlePressRegister = async () => {
		const { sid: newSid, uid: newUid } = await CommunicationController.registerUser()
		console.log("New UID: " + newUid + " | New SID: " + newSid)

		try { AsyncStorage.setItem("uid", newUid.toString(), console.log("Saved UID to AsyncStorage.")) }
		catch (error) { console.log("ERROR: AsyncStorage: ", error) }

		try { AsyncStorage.setItem("sid", newSid, console.log("Saved SID to AsyncStorage.")) }
		catch (error) { console.log("ERROR: AsyncStorage: ", error) }

		setUID(newUid)
		setSID(newSid)

		console.log("Navigating from Registration to Settings...")
		navigation.reset({
			index: 0,
			routes: [{ name: 'Settings', params: { firstAccess: true } }]
		})
	}

	return (
		<View>
			<Text style={{ fontSize: 50, fontWeight: 'bold', textTransform: 'uppercase' }}>Pocket Monsters</Text>
			<Image source={require('./assets/app_icon.png')} style={{ width: 100, height: 100 }} />
			<Button title="Sign up" onPress={handlePressRegister} />
			<Pressable onPress={() => Linking.openURL("https://icons8.com/")}>
				<Text>Icons by icons8</Text>
			</Pressable>
		</View>
	)
}