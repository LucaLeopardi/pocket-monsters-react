import React, { useEffect } from 'react'
import StorageManager from './StorageManager'
import CommunicationController from './CommunicationController'


export const Player = React.createContext()

export const PlayerProvider = ({ children }) => {
	const [sid, setSID] = React.useState(null)
	const [uid, setUID] = React.useState(null)

	return (
		<Player.Provider value={{ sid, uid, setSID, setUID }}>
			{children}
		</Player.Provider>
	)
}


export const Location = React.createContext()

export const LocationProvider = ({ children }) => {
	const [lat, setLat] = React.useState(45.46)
	const [lon, setLon] = React.useState(9.22)

	return (
		<Location.Provider value={{ lat, lon, setLat, setLon }}>
			{children}
		</Location.Provider>
	)
}


export const NearbyEntities = React.createContext()

export const NearbyEntitiesProvider = ({ children }) => {
	const { sid, uid } = React.useContext(Player)
	const { lat, lon } = React.useContext(Location)
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

export const DatabaseProvider = ({ children }) => {
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