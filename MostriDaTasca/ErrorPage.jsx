import { View, Text } from "react-native";

export default function ErrorPage({ navigation, route }) {
	return (
		<View>
			<Text style={{ fontSize: 30 }}>OOOPS!</Text>
			<Text style={{ fontSize: 24 }}>An error occurred</Text>
			<Text style={{ fontSize: 20 }}>{route.params.message}</Text>
		</View>
	)
}