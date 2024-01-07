import { useNavigation } from '@react-navigation/native'
import { View, Text, Pressable, Image } from 'react-native'

export default function UsersListItem({ data }) {
	const navigation = useNavigation()

	const image = data.picture ? { uri: 'data:image/png;base64,' + data.picture } : require('./assets/user_icon.png')

	return (
		<Pressable
			onPress={() => navigation.navigate("UserDetails", { data, image })}
			style={{ flexDirection: 'row', padding: 5 }}>
			<Image source={image} style={{ width: 50, height: 50 }} />
			<View style={{ flexDirection: 'column' }}>
				<Text style={{ fontSize: 20 }}>{data.name}</Text>
				<Text>HP: {data.life} | XP: {data.experience}</Text>
			</View>
		</Pressable>
	)
}