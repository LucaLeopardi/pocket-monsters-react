import { View, Text, Button, Image } from 'react-native'

export default function UserDetailsPage({ navigation, route }) {

	const { data, image } = route.params

	return (
		<View>
			<Button title="< Back" onPress={navigation.goBack} />
			<Text style={{ fontSize: 32, fontWeight: 'bold' }}>{data.name}</Text>
			<Image source={image} style={{ width: 200, height: 200 }} />
			<Text>HP: {data.life} | XP: {data.experience}</Text>
		</View>
	)
}