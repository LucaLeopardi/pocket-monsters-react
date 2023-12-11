import React from "react";
import { FlatList, View, Text } from "react-native"
import ListItem from "./ListItem";

export default function UsersList(props) {
	return (
		<View>
			<FlatList data={props.data}
				renderItem={({ item }) => <ListItem data={item} onPress={props.onPress} />}
				keyExtractor={(u) => u.uid} />
		</View>
	)
}