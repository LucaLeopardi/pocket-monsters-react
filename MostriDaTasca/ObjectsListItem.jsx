import { Text, Pressable } from "react-native";


export default function ObjectsListItem({ data }) {
	return (
		<Pressable onPress={() => console.log("Pressed object " + data.id)}>
			<Text style={{ fontSize: 20 }}>{data.id}</Text>
		</Pressable>
	)
}