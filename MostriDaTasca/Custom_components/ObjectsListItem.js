import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, Image, View } from "react-native";
import { styles } from "./Styles";


export function ObjectsListItem({ data }) {
	const navigation = useNavigation()

	let image
	if (data.image) image = { uri: 'data:image/png;base64,' + data.image }
	else {
		switch (data.type) {
			case "monster":
				image = require('../assets/monster_icon.png')
				break
			case "armor":
				image = require('../assets/armor_icon.png')
				break
			case "weapon":
				image = require('../assets/weapon_icon.png')
				break
			case "amulet":
				image = require('../assets/amulet_icon.png')
				break
			case "candy":
				image = require('../assets/candy_icon.png')
		}
	}

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("ObjectDetails", { data, image })}
			style={[styles.listItem, { opacity: data.withinRange ? 1 : 0.6 }]}>
			<Image source={image} style={styles.roundImage} />
			<View style={styles.listItemContent}>
				<Text style={styles.boldText}>{data.name}</Text>
				<Text>Level {data.level} {data.type}</Text>
			</View>
			<View style={{ flex: 1, alignItems: "flex-end" }}>
				<Text >{data.distance}m</Text>
			</View>
		</TouchableOpacity >
	)
}