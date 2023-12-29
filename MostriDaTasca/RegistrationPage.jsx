import { View, Text, Button } from 'react-native'
import CommunicationController from './CommunicationController'
import { useContext, useEffect } from 'react'
import { SIDContext } from './Contexts'

export default function RegistrationPage({ navigation }) {

	const { sid, setSID } = useContext(SIDContext)

	useEffect(() => {
		console.log("SID: " + sid);
		if (sid) navigation.navigate("Main")
		else if (sid === undefined) throw new Error("SID couldn't be retrieved")
	}, [sid]);

	handlePressRegister = async () => {
		setSID((await CommunicationController.registerUser()).sid)
	}

	return (
		<View>
			<Text style={{ fontSize: 30, fontWeight: 'bold' }}>Mostri da tasca</Text>
			<Button title="Register" onPress={handlePressRegister} />
		</View>
	)
}