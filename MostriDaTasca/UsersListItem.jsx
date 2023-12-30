import { useNavigation } from '@react-navigation/native'
import { View, Text, Button, Pressable } from 'react-native'

export default function UsersListItem({ data }) {
	const navigation = useNavigation()


	return (
		<Pressable onPress={() => navigation.navigate("UserDetails", { data })}>
			<Text style={{ fontSize: 20 }}>{data.name}</Text>
			<Text>HP: {data.life} | XP: {data.experience}</Text>
		</Pressable>
	)
}