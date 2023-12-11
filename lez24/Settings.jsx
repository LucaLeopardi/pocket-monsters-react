import { View, Button, Text } from "react-native";

export default function Settings({ data: user, onPressHome }) {
	return (
		<View>
			<Button title='Home' onPress={onPressHome} />
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user.name}'s profile</Text>
			<Text style={{ fontSize: 16, fontWeight: 'bold' }}>HP: {user.hp} | XP: {user.xp}</Text>
		</View>
	)
}