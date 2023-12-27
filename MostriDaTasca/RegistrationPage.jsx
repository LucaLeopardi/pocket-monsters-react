import { View, Text, Button } from 'react-native'

export default function RegistrationPage({ navigation }) {
	return (
		<View>
			<Text style={{ fontSize: 30, fontWeight: 'bold' }}>Mostri da tasca</Text>
			<Button title="Register" onPress={() => navigation.navigate("Main")} />
		</View>
	)
}