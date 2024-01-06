import { View, Text, Button, Image } from 'react-native'

export default function ObjectDetailsPage({ navigation, route }) {

	const { data, image } = route.params

	// TODO: Interact with object

	// TODO: Description based on type

	return (
		<View>
			<Button title="< Back" onPress={navigation.goBack} />
			<Text style={{ fontSize: 26, fontWeight: 'bold' }}>{data.name}</Text>
			<Image source={image} style={{ width: 200, height: 200 }} />
			<Text style={{ fontSize: 20 }}>Level {data.level} {data.type}</Text>
			<Button title='Interact' onPress={() => console.log("Object " + data.name + " activated.")} />
		</View>
	)
}