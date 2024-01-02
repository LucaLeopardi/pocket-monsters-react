import { useState, useEffect, useContext } from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import UsersListItem from './UsersListItem'
import CommunicationController from './CommunicationController'
import { PlayerContext, LocationContext, DatabaseContext } from './Contexts'

export default function UsersNearbyPage({ navigation }) {

	const { sid } = useContext(PlayerContext)
	const { lat, lon } = useContext(LocationContext)
	const { database } = useContext(DatabaseContext)
	const [users, setUsers] = useState([])

	// TODO: add position to useEffect dependencies
	useEffect(
		() => {
			console.log("Getting users nearby...")
			CommunicationController.getUsersNearby(sid, lat, lon)
				// For each user, get its details from the database
				.then((nearbyUsers) => Promise.all(nearbyUsers.map((user) => database.getUserByID(sid, user.uid, user.profileversion))))
				.then(setUsers)	// Calling setUsers triggers a re-render
		}, [])

	return (
		<View>
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Players nearby</Text>
			<FlatList
				data={users}
				renderItem={({ item }) => <UsersListItem data={item} />}
				keyExtractor={(item) => item.uid} />
			<Button title="v close v" onPress={navigation.goBack} />
		</View>
	)
}