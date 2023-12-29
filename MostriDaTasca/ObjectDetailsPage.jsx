import { View, Text, Button } from 'react-native'

export default function ObjectDetailsPage({ navigation }) {
	return (
		<View>
			<Button title="< Back" onPress={() => navigation.goBack()} />
			<Text style={{ fontSize: 22, fontWeight: 'bold' }}></Text>

		</View>
	)
}