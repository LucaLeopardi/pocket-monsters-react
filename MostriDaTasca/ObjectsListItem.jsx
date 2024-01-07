import { useNavigation } from "@react-navigation/native";
import { Text, Pressable, Image, View } from "react-native";


export default function ObjectsListItem({ data }) {
	const navigation = useNavigation()

	let image
	if (data.image) image = { uri: 'data:image/png;base64,' + data.image }
	else {
		switch (data.type) {
			case "monster":
				image = require('./assets/monster_icon.png')
				break
			case "armor":
				image = require('./assets/armor_icon.png')
				break
			case "weapon":
				image = require('./assets/weapon_icon.png')
				break
			case "amulet":
				image = require('./assets/amulet_icon.png')
				break
			case "candy":
				image = require('./assets/candy_icon.png')
		}
	}

	return (
		<Pressable onPress={() => navigation.navigate("ObjectDetails", { data, image })}>
			<View style={{ opacity: data.withinRange ? 1 : 0.5 }}>
				<Image source={image} style={{ width: 50, height: 50 }} />
				<Text style={{ fontSize: 20, fontWeight: 'bold' }}>{data.name}</Text>
				<Text style={{ fontSize: 16 }}>Level {data.level} {data.type}</Text>
			</View>
		</Pressable>
	)
}