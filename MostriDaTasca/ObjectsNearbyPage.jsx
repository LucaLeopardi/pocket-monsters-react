import { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import * as Context from './Contexts'
import ObjectsListItem from './ObjectsListItem'
import { StyledButton } from './CustomComponents'
import * as geolib from 'geolib'

export default function ObjectsNearbyPage({ navigation }) {

	const { player: { sid, amuletLevel } } = useContext(Context.Player)
	const { location: { lat, lon } } = useContext(Context.Location)
	const { database } = useContext(Context.Database)
	const { nearbyObjects } = useContext(Context.NearbyEntities)
	const [nearbyObjectsDetails, setNearbyObjectsDetails] = useState(null)

	useEffect(
		() => {
			Promise.all(nearbyObjects.map((obj) => database.getObjectByID(sid, obj.id)))
				.then((objs) => objs.map((obj) => ({ ...obj, withinRange: checkWithinRange(obj) })))
				// TODO, maybe: Sort by if within range
				.then(setNearbyObjectsDetails)	// Calling setNearbyObjectsDetails triggers a re-render
		}, [nearbyObjects])

	const checkWithinRange = (obj) => {
		const distance = geolib.getDistance({ latitude: lat, longitude: lon }, { latitude: obj.lat, longitude: obj.lon })
		return distance <= 100 + amuletLevel 	// Amulet level is actually a percentage, but base is 100 so...
	}

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