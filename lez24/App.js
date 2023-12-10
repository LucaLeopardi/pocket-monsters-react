import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import UsersList from './UsersList';

export default class App extends React.Component {
	state = {
		users: [
			{ name: "Andrea", uid: 1, hp: 100, xp: 1 },
			{ name: "Beatrice", uid: 2, hp: 100, xp: 200 },
			{ name: "Carlo", uid: 3, hp: 100, xp: 100 }
		]
	}
	render() {
		return (
			<View style={styles.container}>
				<Text>Users:</Text>
				<UsersList data={this.state.users} />
				<StatusBar style="auto" />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
