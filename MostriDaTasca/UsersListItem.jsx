import { View, Text, Button, Pressable } from 'react-native'

export default function UsersListItem({ navigation, data }) {
	return (
		<Pressable onPress={() => console.log("Pressed user " + data.uid)}>
			<Text style={{ fontSize: 20 }}>{data.uid}</Text>
			<Text>HP: {data.life} | XP: {data.experience}</Text>
		</Pressable>
	)
}