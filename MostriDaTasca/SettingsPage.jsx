import { View, Text, Button } from 'react-native'

export default function SettingsPage(props) {
	return (
		<View>
			<Button title="< Back" onPress={props.onPressGoBack} />
			<Text style={{ fontSize: 28, fontWeight: 'bold' }}>{ }'s profile</Text>
			<Button title="Update" onPress={() => props.onPressUpdateUser(props.uid, "LucaTest", null, true)} />
		</View>
	)
}