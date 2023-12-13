import { View, Text, Button } from 'react-native'

export default function MainPage(props) {
	return (
		<View>
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Mostri da tasca</Text>
			<Button title="Settings" onPress={props.onGoToSettingsPage} />
			<Button title="Objects nearby" onPress={props.onGoToObjectsNearbyPage} />
			<Button title="Players nearby" onPress={props.onGoToUsersNearbyPage} />
			<Button title="Ranking" onPress={props.onGoToRankingPage} />
		</View>
	)
}