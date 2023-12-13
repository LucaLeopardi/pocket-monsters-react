import { View, Text, Button } from 'react-native'

export default function UserDetailsPage(props) {
	return (
		<View>
			<Button title="< Back" onPress={props.onPressGoBack} />
			<Text style={{ fontSize: 32, fontWeight: 'bold' }}>{ }</Text>

		</View>
	)
}