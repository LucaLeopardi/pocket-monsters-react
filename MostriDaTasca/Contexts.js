import React, { useEffect } from 'react'
import StorageManager from './StorageManager'
import CommunicationController from './CommunicationController'
import * as ExpoLocation from 'expo-location'
import * as geolib from 'geolib'


export const Player = React.createContext()

const PlayerProvider = ({ children }) => {

	const [player, setPlayer] = React.useState({
		sid: null,
		uid: null,
		profileVersion: 0,
		weaponLevel: 0,		// Used for client side damage prediction
		armorLevel: 0,		// Currently unused
		amuletLevel: 0,		// Used for client side interaction range calculation
	})
	const updatePlayer = (newProperties) => setPlayer((oldProperties) => ({ ...oldProperties, ...newProperties }))

	return (
		<Player.Provider value={{ player, updatePlayer }}>
			{children}
		</Player.Provider>
	)
}


export const Location = React.createContext()

const LocationProvider = ({ children }) => {

	const [location, setLocation] = React.useState({
		lat: 45.46,
		lon: 9.22,
		permission: null
	})

	const updateLocation = (newProperties) => setLocation((oldProperties) => ({ ...oldProperties, ...newProperties }))

	useEffect(() => {
		if (location.permission !== 'granted') {
			console.log("No location permission")
			return
		}

		let locationSubscription
		ExpoLocation.watchPositionAsync(
			{ accuracy: ExpoLocation.Accuracy.High, timeInterval: 5000, distanceInterval: 0 },
			(res) => updateLocation({ lat: res.coords.latitude, lon: res.coords.longitude }))
			.then((res) => locationSubscription = res)
		// Cleanup function
		return () => { if (locationSubscription) locationSubscription.remove() }
	}, [location.permission])

	return (
		<Location.Provider value={{ location, updateLocation }}>
			{children}
		</Location.Provider>
	)
}


export const NearbyEntities = React.createContext()

const NearbyEntitiesProvider = ({ children }) => {

	const { player: { sid, uid, amuletLevel } } = React.useContext(Player)
	const { location: { lat, lon } } = React.useContext(Location)
	const [nearbyUsers, setNearbyUsers] = React.useState([])
	const [nearbyObjects, setNearbyObjects] = React.useState([])

	useEffect(
		() => {
			if (sid == null) return		// To avoid sending requests at launch before user data is loaded or created

			console.log("Getting users nearby...")
			CommunicationController.getUsersNearby(sid, lat, lon)
				.then((res) => res.filter((user) => user.uid != uid))
				.then(setNearbyUsers)
			console.log("Getting objects nearby...")
			CommunicationController.getObjectsNearby(sid, lat, lon)
				.then((objs) => objs.map((obj) => {
					// Add distance and withinRange properties to each object
					dist = geolib.getDistance({ latitude: lat, longitude: lon }, { latitude: obj.lat, longitude: obj.lon })
					return { ...obj, distance: dist, withinRange: dist <= 100 + amuletLevel }
				}))
				.then(setNearbyObjects)
		}, [lat, lon, amuletLevel, sid])		// sid dependency to initialize at launch even if lat and lon are not immediately changed

	return (
		<NearbyEntities.Provider value={{ nearbyUsers, nearbyObjects, setNearbyUsers, setNearbyObjects }}>
			{children}
		</NearbyEntities.Provider>
	)
}


export const Database = React.createContext()

const DatabaseProvider = ({ children }) => {

	const [database, setDatabase] = React.useState(new StorageManager())

	return (
		<Database.Provider value={{ database }}>
			{children}
		</Database.Provider>
	)
}


export const Provider = ({ children }) => {
	return (
		<PlayerProvider>
			<LocationProvider>
				<NearbyEntitiesProvider>
					<DatabaseProvider>
						{children}
					</DatabaseProvider>
				</NearbyEntitiesProvider>
			</LocationProvider>
		</PlayerProvider>
	)
}