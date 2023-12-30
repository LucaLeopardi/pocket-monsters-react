import { useState, useEffect, useContext } from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import UsersListItem from './UsersListItem'
import CommunicationController from './CommunicationController'
import { PlayerContext } from './Contexts'

export default function RankingPage({ navigation }) {

	const { sid } = useContext(PlayerContext)
	const [ranking, setRanking] = useState([])

	useEffect(() => { CommunicationController.getRanking(sid).then(setRanking) }, [])	// Calling setRanking triggers a re-render 

	return (
		<View>
			<Button title="< Back" onPress={navigation.goBack} />
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Top players</Text>
			<FlatList
				data={ranking}
				renderItem={({ item }) => <UsersListItem data={item} />}
				keyExtractor={(item) => item.uid} />
		</View>
	)
}