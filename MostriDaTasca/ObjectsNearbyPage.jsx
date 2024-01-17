import { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import * as Context from './Contexts'
import { ObjectsListItem } from './Custom_components/ObjectsListItem'
import { StyledButton } from './Custom_components/StyledButton'
import { styles } from './Custom_components/Styles'

export default function ObjectsNearbyPage({ navigation }) {

	const { player: { sid, amuletLevel } } = useContext(Context.Player)
	const { database } = useContext(Context.Database)
	const { nearbyObjects } = useContext(Context.NearbyEntities)
	const [nearbyObjectsDetails, setNearbyObjectsDetails] = useState(null)

	const getAllObjectProperties = async (obj) => {
		return database.getObjectByID(sid, obj.id)
			.then((data) => ({ ...data, lat: obj.lat, lon: obj.lon, distance: obj.distance, withinRange: obj.withinRange }))	// Add back properties not in database
	}

	useEffect(
		() => {
			Promise.all(nearbyObjects.map((obj) => getAllObjectProperties(obj)))
				.then((objs) => objs.sort((a, b) => a.distance - b.distance))
				.then(setNearbyObjectsDetails)	// Calling setNearbyObjectsDetails triggers a re-render
		}, [nearbyObjects])


	let content
	if (nearbyObjectsDetails === null) content = <ActivityIndicator style={{ flex: 1 }} size='large' color='#0000ff' />
	else content = <FlatList
		style={{ flex: 1 }}
		data={nearbyObjectsDetails}
		renderItem={({ item }) => <ObjectsListItem data={item} />}
		keyExtractor={(item) => item.id} />

	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 24, fontWeight: 'bold' }}>Objects nearby</Text>
			<Text style={{ fontSize: 20 }}>Interaction range: {100 + amuletLevel}m</Text>
			{content}
			<StyledButton title="v close v" onPress={navigation.goBack} />
		</View>
	)
}