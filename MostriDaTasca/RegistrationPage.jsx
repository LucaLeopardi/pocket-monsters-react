import { View, Text, Button, Linking, Pressable } from 'react-native'
import CommunicationController from './CommunicationController'
import { useContext, useEffect, useState } from 'react'
import * as Context from './Contexts'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegistrationPage({ navigation }) {

	const { sid, uid, setSID, setUID } = useContext(Context.Player)
	const [registrationEnabled, setRegistrationEnabled] = useState(false)	// Used to disable the Register button while checking local storage

	useEffect(() => {
		if (sid && uid) {				// Will trigger on re-render after SID and UID are set
			navigation.reset({			// To navigate to MainPage and prevent the user from going back to RegistrationPage
				index: 0,
				routes: [{ name: 'Main' }],
			})
		}
		else checkAlreadyRegistered()	// Check local storage
	}, [sid])							// Only SID in dependencies because it's set last

	const checkAlreadyRegistered = async () => {
		try {
			const storedUID = parseInt(await AsyncStorage.getItem("uid"))
			const storedSID = await AsyncStorage.getItem("sid")
			setUID(storedUID)
			setSID(storedSID)

			if (sid == null) setRegistrationEnabled(true)	// Enable Register button
			console.log("Stored UID: " + storedUID + " | Stored SID: " + storedSID)
		} catch (error) {
			console.log("ERROR: AsyncStorage: ", error)
		}
	}

	// If there's no SID in local storage, user is not registered. Page is rendered with a button to register to server.
	const handlePressRegister = async () => {
		const { sid: newSid, uid: newUid } = await CommunicationController.registerUser()
		console.log("New SID: " + newSid + " | New UID: " + newUid)

		try { AsyncStorage.setItem("uid", newUid.toString(), console.log("Saved UID to AsyncStorage.")) }
		catch (error) { console.log("ERROR: AsyncStorage: ", error) }

		try { AsyncStorage.setItem("sid", newSid, console.log("Saved SID to AsyncStorage.")) }
		catch (error) { console.log("ERROR: AsyncStorage: ", error) }

		setUID(newUid)
		setSID(newSid)
	}

	return (
		<View>
			<Text style={{ fontSize: 30, fontWeight: 'bold' }}>Mostri da tasca</Text>
			<Button disabled={!registrationEnabled} title="Register" onPress={handlePressRegister} />
			<Pressable onPress={() => Linking.openURL("https://icons8.com/")}>
				<Text>Icons by icons8</Text>
			</Pressable>
		</View>
	)
}