import { View, Text, Button } from 'react-native'

export default function UserDetailsPage({ navigation }) {
	return (
		<View>
			<Button title="< Back" onPress={navigation.goBack} />
			<Text style={{ fontSize: 32, fontWeight: 'bold' }}>{ }</Text>

		</View>
	)
}