import { View, Text, Linking, Pressable, Image, ActivityIndicator } from 'react-native'
import CommunicationController from './CommunicationController'
import { useContext, useState } from 'react'
import * as Context from './Contexts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyledButton } from './CustomComponents'

export default function RegistrationPage({ navigation }) {

	const { updatePlayer } = useContext(Context.Player)
	const [signUpPressed, setSignUpPressed] = useState(false)

	const handlePressRegister = async () => {
		setSignUpPressed(true)

		const { sid: newSid, uid: newUid } = await CommunicationController.registerUser()
		console.log("New UID: " + newUid + " | New SID: " + newSid)

		try { AsyncStorage.setItem("uid", newUid.toString(), console.log("Saved UID to AsyncStorage.")) }
		catch (error) { console.log("ERROR: AsyncStorage: ", error) }

		try { AsyncStorage.setItem("sid", newSid, console.log("Saved SID to AsyncStorage.")) }
		catch (error) { console.log("ERROR: AsyncStorage: ", error) }

		updatePlayer({ uid: newUid, sid: newSid })

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
			{signUpPressed ?
				<ActivityIndicator size='large' color='#0000ff' />
				:
				<StyledButton title="Sign up" onPress={handlePressRegister} />}
			<Pressable onPress={() => Linking.openURL("https://icons8.com/")}>
				<Text>Icons by icons8</Text>
			</Pressable>
		</View>
	)
}