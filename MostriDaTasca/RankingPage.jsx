import { useState, useEffect, useContext } from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import UsersListItem from './UsersListItem'
import CommunicationController from './CommunicationController'
import { DatabaseContext, PlayerContext } from './Contexts'

export default function RankingPage({ navigation }) {

	const { sid } = useContext(PlayerContext)
	const { database } = useContext(DatabaseContext)
	const [ranking, setRanking] = useState([])

	useEffect(
		() => {
			console.log("Getting ranking...")
			CommunicationController.getRanking(sid)
				// For each user, get its details
				.then((ranking) => Promise.all(ranking.map((user) => database.getUserByID(sid, user.uid, user.profileversion))))
				.then(setRanking)	// Calling setRanking triggers a re-render
		}, [])

	return (
		<View style={{ flex: 1 }}>
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Top players</Text>
			<FlatList style={{ flex: 1 }}
				data={ranking}
				renderItem={({ item }) => <UsersListItem data={item} />}
				keyExtractor={(item) => item.uid} />
			<Button title="v close v" onPress={navigation.goBack} />
		</View>
	)
}