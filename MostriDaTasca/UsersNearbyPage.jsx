import { useState, useEffect, useContext } from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import UsersListItem from './UsersListItem'
import CommunicationController from './CommunicationController'
import * as Context from './Contexts'

export default function UsersNearbyPage({ navigation }) {

	const { player: { sid } } = useContext(Context.Player)
	const { database } = useContext(Context.Database)
	const { nearbyUsers } = useContext(Context.NearbyEntities)
	const [nearbyUsersDetails, setNearbyUsersDetails] = useState([])

	useEffect(
		() => {
			Promise.all(nearbyUsers.map((user) => database.getUserByID(sid, user.uid, user.profileversion)))
				.then(setNearbyUsersDetails)	// Calling setNearbyUsersDetails triggers a re-render
		}, [nearbyUsers])

	return (
		<View style={{ flex: 1 }}>
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Players nearby</Text>
			<FlatList style={{ flex: 1 }}
				data={nearbyUsersDetails}
				renderItem={({ item }) => <UsersListItem data={item} />}
				keyExtractor={(item) => item.uid} />
			<Button title="v close v" onPress={navigation.goBack} />
		</View>
	)
}