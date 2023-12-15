import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import StorageManager from './StorageManager';

export default class App extends React.Component {

	state = {
		db: null,
	}

	componentDidMount() {
		this.setState({ db: new StorageManager() })
	}

	render() {
		return (
			<View style={styles.container} >
				<Button onPress={() => this.state.db.addUser(2, "Pippo", 10, 10)} title="Add user" />
				<Button onPress={() => this.state.db.getAllUsers().then(console.log)} title="Get all users" />
				<Button onPress={() => this.state.db.getUserByID(1).then(console.log)} title="Get user Mario" />
				<StatusBar style="auto" />
			</View>
		);
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