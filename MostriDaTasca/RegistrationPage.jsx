import { View, Text, Button, Linking, Pressable } from 'react-native'
import CommunicationController from './CommunicationController'
import { useContext, useEffect, useState } from 'react'
import * as Context from './Contexts'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function RegistrationPage({ navigation }) {

	const { sid, uid, setSID, setUID } = useContext(Context.Player)

	const handlePressRegister = async () => {
		const { sid: newSid, uid: newUid } = await CommunicationController.registerUser()
		console.log("New UID: " + newUid + " | New SID: " + newSid)

		try { AsyncStorage.setItem("uid", newUid.toString(), console.log("Saved UID to AsyncStorage.")) }
		catch (error) { console.log("ERROR: AsyncStorage: ", error) }

		try { AsyncStorage.setItem("sid", newSid, console.log("Saved SID to AsyncStorage.")) }
		catch (error) { console.log("ERROR: AsyncStorage: ", error) }

		setUID(newUid)
		setSID(newSid)

		navigation.reset({
			index: 0,
			routes: [{ name: 'Settings', params: { firstAccess: true } }]
		})
	}

	return (
		<View>
			<Text style={{ fontSize: 30, fontWeight: 'bold' }}>Mostri da tasca</Text>
			<Button title="Register" onPress={handlePressRegister} />
		</View>
	)
}