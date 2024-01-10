import { View, Text } from "react-native";
import { styles } from "./CustomComponents";

export default function ErrorPage({ navigation, route }) {
	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 30 }}>OOOPS!</Text>
			<Text style={{ fontSize: 24 }}>An error occurred</Text>
			<Text style={{ fontSize: 20 }}>{route.params.message}</Text>
		</View>
	)
}