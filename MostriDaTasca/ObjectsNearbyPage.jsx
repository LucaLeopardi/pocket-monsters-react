import { View, Text, Button } from 'react-native'

export default function ObjectsNearbyPage(props) {
	return (
		<View>
			<Button title="< Back" onPress={props.onPressGoBack} />
			<Text style={{ fontSize: 24, fontWeight: 'bold' }}>Objects nearby</Text>

		</View>
	)
}