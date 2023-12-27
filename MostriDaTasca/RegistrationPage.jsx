import { View, Text, Button } from 'react-native'
import CommunicationController from './CommunicationController'
import { useContext } from 'react'
import { SIDContext } from './Contexts'

export default function RegistrationPage({ navigation }) {

	const { sid, setSID } = useContext(SIDContext)

	handlePressRegister = async () => {
		setSID((await CommunicationController.registerUser()).sid)
		// TODO: also save uid
		navigation.navigate("Main")
	}

	return (
		<View>
			<Text style={{ fontSize: 30, fontWeight: 'bold' }}>Mostri da tasca</Text>
			<Button title="Register" onPress={handlePressRegister} />
		</View>
	)
}