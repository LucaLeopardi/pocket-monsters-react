import { useContext, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import * as Location from 'expo-location';
import MapView, { Circle, Marker } from 'react-native-maps';
import { LocationContext, PlayerContext } from './Contexts';

export default function MainPage({ navigation }) {

	const checkLocationPermission = async () => {
		const locationPermission = await Location.getForegroundPermissionsAsync()
		if (locationPermission.status !== 'granted') navigation.navigate("ErrorPage", { message: "The app requires location permissions to function. Please grant it your App Settings and relaunch the application." })
	}

	// Permission is granted at App startup. If it's not available now, an error page is shown.
	useEffect(() => { checkLocationPermission() }, [])

	const { sid, uid } = useContext(PlayerContext)
	const { lat, lon } = useContext(LocationContext)

	return (
		<View>
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Mostri da tasca</Text>
			<Button title="Settings" onPress={() => navigation.navigate("Settings")} />
			<Button title="Objects nearby" onPress={() => navigation.navigate("ObjectsNearby")} />
			<Button title="Players nearby" onPress={() => navigation.navigate("UsersNearby")} />
			<Button title="Ranking" onPress={() => navigation.navigate("Ranking")} />

			<MapView
				style={{ width: '100%', height: '100%' }}
				initialRegion={{
					// TODO: Set initial region to user's location
					latitude: 45.47,
					longitude: 9.23,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}>
			</MapView>
		</View>
	)
}