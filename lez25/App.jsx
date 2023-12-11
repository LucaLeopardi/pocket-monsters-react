import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CommunicationController from './CommunicationController';
import { Button } from 'react-native';

export default class App extends React.Component {

	state = {
		uid: "qWpVdN4AxqXxOvu6gX1h"
	}

	render() {
		return (
			<View style={styles.container}>
				<Button title="Ranking" onPress={this.handlePressRanking} />
				<StatusBar style="auto" />
			</View>
		);
	}

	handlePressRanking = () => CommunicationController.getRanking(this.state.uid).then((ranking) => console.log(ranking))
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
