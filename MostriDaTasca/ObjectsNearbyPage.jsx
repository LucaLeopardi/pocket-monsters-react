import { useContext, useEffect, useState } from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import CommunicationController from './CommunicationController'
import * as Context from './Contexts'
import ObjectsListItem from './ObjectsListItem'

export default function ObjectsNearbyPage({ navigation }) {

	const { sid, uid } = useContext(Context.Player)
	const { database } = useContext(Context.Database)
	const { nearbyObjects, setNearbyObjects } = useContext(Context.NearbyEntities)
	const [nearbyObjectsDetails, setNearbyObjectsDetails] = useState([])

	useEffect(
		() => {
			Promise.all(nearbyObjects.map((obj) => database.getObjectByID(sid, obj.id)))
				.then(setNearbyObjectsDetails)	// Calling setNearbyObjectsDetails triggers a re-render
		}, [nearbyObjects])

	return (
		<View style={{ flex: 1 }}>
			<Text style={{ fontSize: 24, fontWeight: 'bold' }}>Objects nearby</Text>
			<FlatList style={{ flex: 1 }}
				data={nearbyObjectsDetails}
				renderItem={({ item }) => <ObjectsListItem data={item} />}
				keyExtractor={(item) => item.id} />
			<Button title="v close v" onPress={navigation.goBack} />
		</View>
	)
}