import { View, Text, Button } from 'react-native'

export default function ObjectsNearbyPage({ navigation }) {
	return (
		<View>
			<Button title="< Back" onPress={() => navigation.goBack()} />
			<Text style={{ fontSize: 24, fontWeight: 'bold' }}>Objects nearby</Text>

		</View>
	)
}