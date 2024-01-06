import { useContext, useEffect, useRef } from 'react'
import { View, Text } from 'react-native'
import * as Location from 'expo-location';
import MapView, { Circle, Marker } from 'react-native-maps';
import * as Context from './Contexts';
import { MarkerObject, MarkerPlayer, MarkerUser, StyledButton, styles } from './CustomComponents';

export default function MainPage({ navigation }) {

	// Location permission is granted at App startup. If it's not available now, an error page is shown.
	useEffect(() => { checkLocationPermission() }, [])

	const checkLocationPermission = async () => {
		const locationPermission = await Location.getForegroundPermissionsAsync()
		if (locationPermission.status !== 'granted') {
			navigation.reset({
				index: 0,
				routes: [{ name: 'ErrorPage', params: { message: "The app requires location permissions to function. Please grant it your App Settings and relaunch the application." } }],
			})
		}
	}

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


	// Construct map markers
	const objectsMarkers = nearbyObjects.map((obj) => <MarkerObject object={obj} key={obj.id} />)
	const usersMarkers = nearbyUsers.map((user) => <MarkerUser user={user} key={user.uid} />)
	const playerMaker = <MarkerPlayer lat={lat} lon={lon} />

	// TODO: Change Button to stylable custom component
	// TODO: Button to center map on player
	return (
		<View style={{ flex: 1 }}>
			<Text style={{ fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' }}>Pocket Monsters</Text>
			<StyledButton title="Settings" onPress={() => navigation.navigate("Settings")} />
			<StyledButton title="Objects nearby" onPress={() => navigation.navigate("ObjectsNearby")} />
			<StyledButton title="Players nearby" onPress={() => navigation.navigate("UsersNearby")} />
			<StyledButton title="Ranking" onPress={() => navigation.navigate("Ranking")} />
			<MapView
				ref={mapRef}
				style={{ flex: 1 }}
				customMapStyle={styles.map}
				toolbarEnabled={false}
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