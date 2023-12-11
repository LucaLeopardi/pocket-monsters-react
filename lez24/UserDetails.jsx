import { Button, Text, View } from 'react-native';

export default function UserDetails({ data: user, onPressHome }) {
	let userDescription = user.xp > user.hp ? user.name + " è ganzo!" : user.name + " fa schifo."

	return (
		<View>
			<Button title='Home' onPress={onPressHome} />
			<Text style={{ fontSize: 24, fontWeight: 'bold' }}>{user.name}</Text>
			<Text>HP: {user.hp} | XP: {user.xp}</Text>
			<Text>{userDescription}</Text>
		</View>
	)
}