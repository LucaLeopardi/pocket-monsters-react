import { useState, useEffect } from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import UsersListItem from './UsersListItem'

export default function UsersNearbyPage({ navigation, route }) {

	const [users, setUsers] = useState([])
	const { lat, lon } = route.params.getPlayerPosition()
	useEffect(() => { route.params.getUsersNearby(lat, lon).then(setUsers) }, [])

	return (
		<View>
			<Button title="< Back" onPress={navigation.goBack()} />
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Players nearby</Text>
			<FlatList
				data={users}
				renderItem={({ item }) => <UsersListItem data={item} />}
				keyExtractor={(item) => item.uid}
			/>
		</View>
	)
}