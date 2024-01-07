import React, { useEffect } from 'react'
import StorageManager from './StorageManager'
import CommunicationController from './CommunicationController'
import * as ExpoLocation from 'expo-location'


export const Player = React.createContext()

const PlayerProvider = ({ children }) => {

	const [player, setPlayer] = React.useState({
		sid: null,
		uid: null,
		profileVersion: 0,
		weaponLevel: 0,
		armorLevel: 0,
		amuletLevel: 0,
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
		if (location.permission !== 'granted') return

		let locationSubscription
		ExpoLocation.watchPositionAsync(
			// Position is updated every 3 seconds IF the user has moved at least 5 meters. This is ok as objects are stationary right now, and we only need to "discover" new, faraway objects. For full release, if objects can spawn anywhere a better solution would be to regularly update regardless of movement.
			{ accuracy: ExpoLocation.Accuracy.High, timeInterval: 3000, distanceInterval: 5 },
			(res) => {
				console.log("Updating location...")
				console.log(res.coords.latitude, " | ", res.coords.longitude)
				updateLocation({ lat: res.coords.latitude, lon: res.coords.longitude })
			})
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

	const { player: { sid, uid } } = React.useContext(Player)
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
			CommunicationController.getObjectsNearby(sid, lat, lon).then(setNearbyObjects)
		}, [lat, lon, sid])		// sid dependency to initialize at launch even if lat and lon are not immediately changed

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