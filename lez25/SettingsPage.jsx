import { View, Text, Button } from 'react-native'

export default function MainPage(props) {
	return (
		<View>
			<Text style={{ fontSize: 24, fontWeight: 'bold' }}>{ }'s profile</Text>
			<Button title="< Back" onPress={props.onPressGoBack} />
		</View>
	)
}