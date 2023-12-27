import { View, Text, Button } from 'react-native'

export default function SettingsPage({ navigation, onPressUpdateUser, uid }) {
	return (
		<View>
			<Button title="< Back" onPress={() => navigation.goBack()} />
			<Text style={{ fontSize: 28, fontWeight: 'bold' }}>{ }'s profile</Text>
			<Button title="Update" onPress={() => onPressUpdateUser(uid, "LucaTest", null, true)} />
		</View>
	)
}