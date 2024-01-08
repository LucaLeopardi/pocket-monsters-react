import { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import * as Context from './Contexts'
import ObjectsListItem from './ObjectsListItem'
import { StyledButton } from './CustomComponents'

export default function ObjectsNearbyPage({ navigation }) {

	const { player: { sid } } = useContext(Context.Player)
	const { database } = useContext(Context.Database)
	const { nearbyObjects } = useContext(Context.NearbyEntities)
	const [nearbyObjectsDetails, setNearbyObjectsDetails] = useState(null)

	const getObjectAndDistance = async (obj) => {
		return database.getObjectByID(sid, obj.id)
			.then((details) => ({ ...details, withinRange: obj.withinRange }))
	}

	useEffect(
		() => {
			Promise.all(nearbyObjects.map((obj) => getObjectAndDistance(obj)))
				.then(setNearbyObjectsDetails)	// Calling setNearbyObjectsDetails triggers a re-render
		}, [nearbyObjects])

	if (nearbyObjectsDetails === null) return <ActivityIndicator size='large' color='#0000ff' />

	return (
		<View style={{ flex: 1 }}>
			<Text style={{ fontSize: 24, fontWeight: 'bold' }}>Objects nearby</Text>
			<FlatList style={{ flex: 1 }}
				data={nearbyObjectsDetails}
				renderItem={({ item }) => <ObjectsListItem data={item} />}
				keyExtractor={(item) => item.id} />
			<StyledButton title="v close v" onPress={navigation.goBack} />
		</View>
	)
}