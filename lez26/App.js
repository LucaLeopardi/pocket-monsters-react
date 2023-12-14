import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
				<Button onPress={() => this.addUser()} title="Add user" />
				<StatusBar style="auto" />
			</View>
		);
	}

	addUser() {
		this.state.db.addUser()
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