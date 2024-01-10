import { useState, useEffect, useContext } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import UsersListItem from './UsersListItem'
import * as Context from './Contexts'
import { StyledButton, styles } from './CustomComponents'

export default function UsersNearbyPage({ navigation }) {

	const { player: { sid } } = useContext(Context.Player)
	const { database } = useContext(Context.Database)
	const { nearbyUsers } = useContext(Context.NearbyEntities)
	const [nearbyUsersDetails, setNearbyUsersDetails] = useState(null)

	useEffect(
		() => {
			Promise.all(nearbyUsers.map((user) => database.getUserByID(sid, user.uid, user.profileversion)))
				.then(setNearbyUsersDetails)	// Calling setNearbyUsersDetails triggers a re-render
		}, [nearbyUsers])

	if (nearbyUsersDetails === null) return <ActivityIndicator size='large' color='#0000ff' />

	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Players nearby</Text>
			<FlatList style={{ flex: 1 }}
				data={nearbyUsersDetails}
				renderItem={({ item }) => <UsersListItem data={item} />}
				keyExtractor={(item) => item.uid} />
			<StyledButton title="v close v" onPress={navigation.goBack} />
		</View>
	)
}