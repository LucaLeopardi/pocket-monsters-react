import { useContext, useEffect, useRef, useState } from 'react'
import { View, Text, Modal } from 'react-native'
import * as Location from 'expo-location';
import MapView, { Circle, Marker } from 'react-native-maps';
import * as Context from './Contexts';
import { MarkerObject, MarkerPlayer, MarkerUser, StyledButton, styles } from './CustomComponents';
import { StatusBar } from 'expo-status-bar';

export default function MainPage({ navigation, route }) {

	// !!! Passing params while navigating to MainPage will show a modal with the message
	const { showPopUp, popUpMessage } = route.params ? route.params : { showPopUp: false, popUpMessage: null }
	const [shouldPopUpShow, setShouldPopUpShow] = useState(showPopUp)

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
			{/* Pop-up window, shown after object interaction */}
			{/* TODO: Fix StatusBar becoming visible when the Modal is. EDIT: Apparently it's an unresolved issue. */}
			<Modal visible={shouldPopUpShow} animationType='fade' transparent={true}>
				<View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'white', opacity: 0.5 }} />
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
						<Text>{popUpMessage}</Text>
						<StyledButton title="OK" onPress={() => setShouldPopUpShow(false)} />
					</View>
				</View>
			</Modal>

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