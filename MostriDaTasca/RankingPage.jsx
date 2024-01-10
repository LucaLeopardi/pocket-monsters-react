import { useState, useEffect, useContext } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import UsersListItem from './UsersListItem'
import CommunicationController from './CommunicationController'
import * as Context from './Contexts'
import { StyledButton, styles } from './CustomComponents'

export default function RankingPage({ navigation }) {

	const { player: { sid } } = useContext(Context.Player)
	const { database } = useContext(Context.Database)
	const [ranking, setRanking] = useState(null)

	useEffect(
		() => {
			console.log("Getting ranking...")
			CommunicationController.getRanking(sid)
				// For each user, get its details
				.then((ranking) => Promise.all(ranking.map((user) => database.getUserByID(sid, user.uid, user.profileversion))))
				.then(setRanking)	// Calling setRanking triggers a re-render
		}, [])


	let content
	if (ranking === null) content = <ActivityIndicator style={{ flex: 1 }} size='large' color='#0000ff' />
	else content = <FlatList
		style={{ flex: 1 }}
		data={ranking}
		renderItem={({ item }) => <UsersListItem data={item} />}
		keyExtractor={(item) => item.uid} />

	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Top players</Text>
			{content}
			<StyledButton title="v close v" onPress={navigation.goBack} />
		</View>
	)
}