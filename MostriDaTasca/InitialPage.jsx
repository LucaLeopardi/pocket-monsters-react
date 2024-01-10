import { useEffect, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Context from "./Contexts";
import * as Location from "expo-location";
import { ActivityIndicator, View } from "react-native";
import { styles } from "./CustomComponents";

export default function InitialPage({ navigation }) {

	const { player, updatePlayer } = useContext(Context.Player)
	const { updateLocation } = useContext(Context.Location)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		checkLocationPermission()
		loadAsyncStorage()
	}, [])

	useEffect(() => { checkAlreadyRegistered() }, [loading])

	const checkLocationPermission = async () => {
		let result = await Location.getForegroundPermissionsAsync()
		if (result.status !== "granted") {
			result = await Location.requestForegroundPermissionsAsync()
			if (result.status !== "granted") {
				navigation.reset({
					index: 0,
					routes: [{ name: 'ErrorPage', params: { message: "The app requires location permissions to function. Please grant it your App Settings and relaunch the application." } }],
				})
			}
		}
		updateLocation({ permission: result.status })
	}

	const loadAsyncStorage = async () => {
		let temp = {}
		for (const [key, value] of Object.entries(player)) {
			let storedValue
			try {
				if (key === "sid") storedValue = await AsyncStorage.getItem(key)	// SID is the only string,
				else {																// the rest are integers
					storedValue = parseInt(await AsyncStorage.getItem(key))
					storedValue = isNaN(storedValue) ? 0 : storedValue
				}
			} catch (error) {
				console.log("ERROR: AsyncStorage: ", error)
			}
			temp = { ...temp, [key]: storedValue }
		}
		console.log("Loaded from AsyncStorage: ", temp)
		updatePlayer(temp)
		setLoading(false)
	}

	const checkAlreadyRegistered = async () => {
		if (loading) return
		// If SID/UID were saved locally, user has registered already. Navigate to app.
		if (player.uid && player.sid) {
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
		<View style={styles.container}>
			<ActivityIndicator size="large" color="#0000ff" />
		</View>
	)
}