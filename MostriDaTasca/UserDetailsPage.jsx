import { View, Text, Button } from 'react-native'

export default function UserDetailsPage({ navigation, route }) {

	const { data } = route.params

	return (
		<View>
			<Button title="< Back" onPress={navigation.goBack} />
			<Text style={{ fontSize: 32, fontWeight: 'bold' }}>{data.name}</Text>
			<Text>HP: {data.life} | XP: {data.experience}</Text>
		</View>
	)
}