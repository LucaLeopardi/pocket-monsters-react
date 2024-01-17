import { useState, useEffect, useContext } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import CommunicationController from './CommunicationController'
import * as Context from './Contexts'
import { UsersListItem } from './Custom_components/UsersListItem'
import { StyledButton } from './Custom_components/StyledButton'
import { styles } from './Custom_components/Styles'

export default function RankingPage({ navigation }) {

	const { player: { sid } } = useContext(Context.Player)
	const { database } = useContext(Context.Database)
	const [ranking, setRanking] = useState(null)

	useEffect(
		() => {
			console.log("Getting ranking...")
			CommunicationController.getRanking(sid)
				// For each user, get its details
				.then((ranking) => Promise.all(ranking.map(
					async (userRanking) => {
						return {
							...(await database.getUserByID(sid, userRanking.uid, userRanking.profileversion)),
							// This data is not up-to-date in the database
							life: userRanking.life,
							experience: userRanking.experience,
							lat: userRanking.lat,
							lon: userRanking.lon
						}
					}
				)))
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