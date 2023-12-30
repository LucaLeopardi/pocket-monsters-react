import { useNavigation } from "@react-navigation/native";
import { Text, Pressable } from "react-native";


export default function ObjectsListItem({ data }) {

	const navigation = useNavigation();

	return (
		<Pressable onPress={() => navigation.navigate("ObjectDetails", { id: data.id })}>
			<Text style={{ fontSize: 20 }}>{data.id}</Text>
		</Pressable>
	)
}