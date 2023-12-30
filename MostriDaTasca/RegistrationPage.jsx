import { View, Text, Button } from 'react-native'
import CommunicationController from './CommunicationController'
import { useContext, useEffect } from 'react'
import { PlayerContext } from './Contexts'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegistrationPage({ navigation }) {

	const { sid, uid, setSID, setUID } = useContext(PlayerContext)

	useEffect(() => {
		if (sid && uid) navigation.navigate("Main")	// Will trigger on re-render after SID and UID are set
		else checkAlreadyRegistered()				// Check local storage
	}, [sid])										// Only SID in dependencies because it's set last

	const checkAlreadyRegistered = async () => {
		try {
			const storedUID = parseInt(await AsyncStorage.getItem("uid"))
			const storedSID = await AsyncStorage.getItem("sid")
			setUID(storedUID)
			setSID(storedSID)
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
			<Button title="Register" onPress={handlePressRegister} />
		</View>
	)
}