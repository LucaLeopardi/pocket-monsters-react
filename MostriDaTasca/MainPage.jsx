import { useContext, useEffect, useRef, useState } from 'react'
import { View, Text, Button } from 'react-native'
import * as Location from 'expo-location';
import MapView, { Circle, Marker } from 'react-native-maps';
import * as Context from './Contexts';

export default function MainPage({ navigation }) {

	// Location permission is granted at App startup. If it's not available now, an error page is shown.
	const checkLocationPermission = async () => {
		const locationPermission = await Location.getForegroundPermissionsAsync()
		if (locationPermission.status !== 'granted') {
			navigation.reset({
				index: 0,
				routes: [{ name: 'ErrorPage', params: { message: "The app requires location permissions to function. Please grant it your App Settings and relaunch the application." } }],
			})
		}
	}

	useEffect(() => { checkLocationPermission() }, [])

	const { lat, lon } = useContext(Context.Location)
	const { nearbyObjects, setNearbyObjects } = useContext(Context.NearbyEntities)
	const { nearbyUsers, setNearbyUsers } = useContext(Context.NearbyEntities)
	const mapRef = useRef(null)
	const defaultLatitudeDelta = 0.06	// Set by feel
	const defaultLongitudeDelta = 0.02

	// Update map region
	useEffect(() => {
		if (mapRef.current) {
			mapRef.current.animateToRegion({
				latitude: lat,
				longitude: lon,
				latitudeDelta: defaultLatitudeDelta,
				longitudeDelta: defaultLongitudeDelta,
			}, 1000)
		}
	}, [lat, lon])

	// Construct player, objects and users markers
	const playerMaker =
		<Marker
			coordinate={{ latitude: lat, longitude: lon }}
			pinColor='yellow'
		// TODO: image={}
		/>

	const objectsMarkers = nearbyObjects.map((obj) =>
		<Marker
			key={obj.id}
			title={obj.type + " " + obj.id}
			coordinate={{ latitude: obj.lat, longitude: obj.lon }}
			pinColor='red'
		//image={}
		/>)

	const usersMarkers = nearbyUsers.map((user) =>
		<Marker
			key={user.uid}
			title={"User " + user.uid}
			coordinate={{ latitude: user.lat, longitude: user.lon }}
			pinColor='blue'
		//image={}
		/>)

	// TODO: Button to center map on player
	return (
		<View style={{ flex: 1 }}>
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Mostri da tasca</Text>
			<Button title="Settings" onPress={() => navigation.navigate("Settings")} />
			<Button title="Objects nearby" onPress={() => navigation.navigate("ObjectsNearby")} />
			<Button title="Players nearby" onPress={() => navigation.navigate("UsersNearby")} />
			<Button title="Ranking" onPress={() => navigation.navigate("Ranking")} />
			<MapView
				ref={mapRef}
				style={{ flex: 1 }}
				initialRegion={{
					latitude: lat,
					longitude: lon,
					latitudeDelta: defaultLatitudeDelta,
					longitudeDelta: defaultLongitudeDelta,
				}}>
				{usersMarkers}
				{objectsMarkers}
				{playerMaker}
			</MapView>
		</View>
	)
}