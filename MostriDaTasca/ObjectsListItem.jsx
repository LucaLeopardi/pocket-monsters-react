import { useNavigation } from "@react-navigation/native";
import { Text, Pressable } from "react-native";


export default function ObjectsListItem({ data }) {
	const navigation = useNavigation()

	return (
		<Pressable onPress={() => navigation.navigate("ObjectDetails", { data })}>
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>{data.name}</Text>
			<Text style={{ fontSize: 16 }}>Level {data.level} {data.type}</Text>
		</Pressable>
	)
}