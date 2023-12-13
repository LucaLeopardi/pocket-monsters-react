import { View, Text, Button, Pressable } from 'react-native'

export default function UsersListItem(props) {
	return (
		<Pressable onPress={() => console.log("Pressed user " + props.data.uid)}>
			<Text style={{ fontSize: 20 }}>{props.data.uid}</Text>
			<Text>HP: {props.data.life} | XP: {props.data.experience}</Text>
		</Pressable>
	)
}