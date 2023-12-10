import React from "react";
import { FlatList, View, Text } from "react-native"

export default function UsersList(props) {
	return (
		<View>
			<FlatList data={props.data} renderItem={(u) => <Text>{u.name}</Text>} keyExtractor={(u) => u.uid} />
		</View>
	)
}