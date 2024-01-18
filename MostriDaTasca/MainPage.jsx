import { useContext, useEffect, useRef, useState } from 'react'
import { View, Text, Modal, ActivityIndicator } from 'react-native'
import * as Location from 'expo-location';
import MapView, { Circle } from 'react-native-maps';
import * as Context from './Contexts';
import { styles } from './Custom_components/Styles';
import { MarkerObject, MarkerPlayer, MarkerUser } from './Custom_components/Markers';
import { StyledButton, ImageButton } from './Custom_components/Buttons';

export default function MainPage({ navigation, route }) {

	// !!! Passing route params while navigating to MainPage will show a modal with the message
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

	const { player: { amuletLevel } } = useContext(Context.Player)
	const { location: { lat, lon } } = useContext(Context.Location)
	const { nearbyObjects, nearbyUsers } = useContext(Context.NearbyEntities)
	const mapRef = useRef(null)
	const defaultLatitudeDelta = 0.005	// Set purely by feel
	const defaultLongitudeDelta = 0.002

	// Update map region
	useEffect(() => { centerMapToRegion(lat, lon) }, [lat, lon])

	const centerMapToRegion = (lat, lon) => {
		if (mapRef.current) {
			mapRef.current.animateToRegion({
				latitude: lat,
				longitude: lon,
				latitudeDelta: defaultLatitudeDelta,
				longitudeDelta: defaultLongitudeDelta,
			}, 1000)
		}
	}

	// Construct map markers
	const objectsMarkers = nearbyObjects.map((obj) => <MarkerObject object={obj} key={obj.id} />)
	const usersMarkers = nearbyUsers.map((user) => <MarkerUser user={user} key={user.uid} />)
	const playerMaker = <MarkerPlayer lat={lat} lon={lon} />

	if (lat === null || lon === null) return <ActivityIndicator size='large' color='#0000ff' />

	return (
		<View style={styles.containerMinusTheMargin}>
			{/* Pop-up window, shown after object interaction */}
			{/* TODO: Fix StatusBar becoming visible when the Modal is. EDIT: Apparently it's an unresolved issue with Modal. */}
			<Modal visible={shouldPopUpShow} animationType='fade' transparent={true}>
				<View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'white', opacity: 0.4 }} />
				<View style={styles.popUp}>
					<Text style={[styles.text, { textAlign: 'center' }]} >{popUpMessage}</Text>
					<StyledButton title="OK" onPress={() => setShouldPopUpShow(false)} />
				</View>
			</Modal >
			<MapView
				ref={mapRef}
				style={{ flex: 1, width: '100%', height: '100%' }}
				customMapStyle={styles.map}
				toolbarEnabled={false}
				initialRegion={{
					latitude: lat,
					longitude: lon,
					latitudeDelta: defaultLatitudeDelta,
					longitudeDelta: defaultLongitudeDelta,
				}}>
				<Circle center={{ latitude: lat, longitude: lon }} radius={100 + amuletLevel} fillColor='#FFE17150' strokeWidth={0} />
				{usersMarkers}
				{objectsMarkers}
				{playerMaker}
			</MapView>

			<ImageButton
				image={require('./assets/crown_black.png')}
				onPress={() => navigation.navigate("Ranking")}
				style={{ top: 50, left: 20 }} />
			<ImageButton
				image={require('./assets/settings_icon_black.png')}
				onPress={() => navigation.navigate("Settings")}
				style={{ top: 50, right: 20 }} />
			<ImageButton
				image={require('./assets/search_icon_black.png')}
				onPress={() => navigation.navigate("ObjectsNearby")}
				style={{ bottom: 30, left: 20 }} />
			<ImageButton
				image={require('./assets/position_black.png')}
				onPress={() => centerMapToRegion(lat, lon)}
				style={{ bottom: 30, right: 20 }} />
			{/* Whoops. Extra page, not in the specification.
			<StyledButton title="Players nearby" onPress={() => navigation.navigate("UsersNearby")} />
			*/}
		</View >
	)
}