import { useState, useEffect } from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import UsersListItem from './UsersListItem'

export default function RankingPage({ onPressGoBack, getRanking }) {

	const [ranking, setRanking] = useState([])
	useEffect(() => { getRanking().then(setRanking) }, [])	// Calling setRanking triggers a re-render 

	return (
		<View>
			<Button title="< Back" onPress={onPressGoBack} />
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Top players</Text>
			<FlatList
				data={ranking}
				renderItem={({ item }) => <UsersListItem data={item} />}
				keyExtractor={(item) => item.uid} />
		</View>
	)
}