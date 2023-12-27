import { View, Text, Button } from 'react-native'

export default function MainPage({ navigation }) {
	return (
		<View>
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Mostri da tasca</Text>
			<Button title="Settings" onPress={() => navigation.navigate("Settings")} />
			<Button title="Objects nearby" onPress={() => navigation.navigate("ObjectsNearby")} />
			<Button title="Players nearby" onPress={() => navigation.navigate("UsersNearby")} />
			<Button title="Ranking" onPress={() => navigation.navigate("Ranking")} />
		</View>
	)
}