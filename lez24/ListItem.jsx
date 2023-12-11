import { View, Text, Button } from 'react-native'

export default function ListItem(props) {
	return (
		<View>
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>{props.data.name}</Text>
			<Text>HP: {props.data.hp} | XP: {props.data.xp}</Text>
			<Button title='Details' onPress={() => props.onPress(props.data.uid)} />
		</View>
	)
}