import { useState, useEffect, useContext } from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import UsersListItem from './UsersListItem'
import CommunicationController from './CommunicationController'
import { PlayerContext, LocationContext } from './Contexts'

export default function UsersNearbyPage({ navigation }) {

	const { sid } = useContext(PlayerContext)
	const { lat, lon } = useContext(LocationContext)
	const [users, setUsers] = useState([])

	// TODO: add position to useEffect dependencies
	useEffect(() => { CommunicationController.getUsersNearby(sid, lat, lon).then(setUsers) }, [])	// Calling setUsers triggers a re-render

	return (
		<View>
			<Button title="< Back" onPress={navigation.goBack} />
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Players nearby</Text>
			<FlatList
				data={users}
				renderItem={({ item }) => <UsersListItem data={item} />}
				keyExtractor={(item) => item.uid} />
		</View>
	)
}