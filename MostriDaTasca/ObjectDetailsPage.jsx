import { View, Text, Button } from 'react-native'

export default function ObjectDetailsPage(props) {
	return (
		<View>
			<Button title="< Back" onPress={props.onPressGoBack} />
			<Text style={{ fontSize: 22, fontWeight: 'bold' }}></Text>
		</View>
	)
}