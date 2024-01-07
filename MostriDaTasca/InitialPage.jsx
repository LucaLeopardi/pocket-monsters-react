import { useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Context from "./Contexts";
import * as Location from "expo-location";
import { ActivityIndicator, View } from "react-native";

export default function InitialPage({ navigation }) {

	const { updatePlayer } = useContext(Context.Player)
	const { updateLocation } = useContext(Context.Location)

	useEffect(() => {
		checkLocationPermission()
		checkAlreadyRegistered()
	}, [])

	const checkLocationPermission = async () => {
		let result = await Location.getForegroundPermissionsAsync()
		if (result.status !== "granted") {
			result = await Location.requestForegroundPermissionsAsync()
			if (result.status !== "granted") {
				navigation.reset({
					index: 0,
					routes: [{ name: 'ErrorPage', params: { message: "The app requires location permissions to function. Please grant it your App Settings and relaunch the application." } }],
				})
			} else {
				updateLocation({ permission: result.status })
			}
		}
	}

	const checkAlreadyRegistered = async () => {
		let storedUID
		let storedSID
		try {
			storedUID = parseInt(await AsyncStorage.getItem("uid"))
			storedSID = await AsyncStorage.getItem("sid")
			updatePlayer({ uid: storedUID, sid: storedSID })
			console.log("Stored UID: " + storedUID + " | Stored SID: " + storedSID)
		} catch (error) {
			console.log("ERROR: AsyncStorage: ", error)
		}
		// If SID/UID were saved locally, user has registered already. Navigate to app.
		if (storedUID && storedSID) {
			console.log("Navigating from Initial to Main...")
			navigation.reset({
				index: 0,
				routes: [{ name: 'Main' }]
			})
			// If SID/UID were not saved locally, user has not registered yet. Navigate to registration page.
		} else {
			console.log("Navigating from Initial to Registration...")
			navigation.reset({
				index: 0,
				routes: [{ name: 'Registration' }]
			})
		}
	}

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<ActivityIndicator size="large" color="#0000ff" />
		</View>
	)
}