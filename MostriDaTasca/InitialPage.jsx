import { View, Pressable, Text, Image } from "react-native"
import { useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Context from "./Contexts";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

export default function InitialPage({ navigation }) {

	const { sid, uid, setSID, setUID } = useContext(Context.Player)
	const { setLocationPermission } = useContext(Context.Location)

	useEffect(() => { checkLocationPermission() }, [])
	useEffect(() => { checkAlreadyRegistered() }, [sid])

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
		// If SID/UID were saved locally, user has registered already. Navigate to app.
		if (sid && uid) {
			navigation.reset({
				index: 0,
				routes: [{ name: 'Main' }]
			})
			// If SID/UID were not saved locally, user has not registered yet. Navigate to registration page.
		} else {
			navigation.reset({
				index: 0,
				routes: [{ name: 'Registration' }]
			})
		}
	}

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
				setLocationPermission(result.status)
			}
		}
	}

	return (
		<View>
			<Text style={{ fontSize: 40, fontWeight: 'bold' }}>Mostri da tasca</Text>
			<Image source={require('./assets/monster_icon.png')} style={{ width: 200, height: 200 }} />
			<Pressable onPress={() => Linking.openURL("https://icons8.com/")}>
				<Text>Icons by icons8</Text>
			</Pressable>
		</View>
	)
}