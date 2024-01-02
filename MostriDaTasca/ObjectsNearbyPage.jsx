import { useContext, useEffect, useState } from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import CommunicationController from './CommunicationController'
import { DatabaseContext, LocationContext, PlayerContext } from './Contexts'
import ObjectsListItem from './ObjectsListItem'

export default function ObjectsNearbyPage({ navigation }) {

	const { sid } = useContext(PlayerContext)
	const { lat, lon } = useContext(LocationContext)
	const { database } = useContext(DatabaseContext)
	const [objects, setObjects] = useState([])

	// TODO: add position to useEffect dependencies
	useEffect(() => {
		console.log("Getting objects nearby...")
		CommunicationController.getObjectsNearby(sid, lat, lon)
			// For each object, get its details from the database
			.then((nearbyObjects) => Promise.all(nearbyObjects.map((obj) => database.getObjectByID(sid, obj.id))))
			.then(setObjects)	// Calling setObjects triggers a re-render
	}, [])

	return (
		<View>
			<Text style={{ fontSize: 24, fontWeight: 'bold' }}>Objects nearby</Text>
			<FlatList
				data={objects}
				renderItem={({ item }) => <ObjectsListItem data={item} />}
				keyExtractor={(item) => item.id} />
			<Button title="v close v" onPress={navigation.goBack} />
		</View>
	)
}