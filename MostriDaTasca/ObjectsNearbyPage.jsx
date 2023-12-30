import { useContext, useEffect, useState } from 'react'
import { View, Text, Button, FlatList } from 'react-native'

import CommunicationController from './CommunicationController'
import { LocationContext, PlayerContext } from './Contexts'
import ObjectsListItem from './ObjectsListItem'

export default function ObjectsNearbyPage({ navigation }) {

	const { sid } = useContext(PlayerContext)
	const { lat, lon } = useContext(LocationContext)
	const [objects, setObjects] = useState([])

	// TODO: add position to useEffect dependencies
	useEffect(() => { CommunicationController.getObjectsNearby(sid, lat, lon).then(setObjects) }, [])

	return (
		<View>
			<Button title="< Back" onPress={navigation.goBack} />
			<Text style={{ fontSize: 24, fontWeight: 'bold' }}>Objects nearby</Text>
			<FlatList
				data={objects}
				renderItem={({ item }) => <ObjectsListItem data={item} />}
				keyExtractor={(item) => item.id} />
		</View>
	)
}