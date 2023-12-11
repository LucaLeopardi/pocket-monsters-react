import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CommunicationController from './CommunicationController';
import { Button } from 'react-native';

export default class App extends React.Component {

	state = {
		sid: "qWpVdN4AxqXxOvu6gX1h",
		testLat: 0,
		testLon: 0,
		testObjectID: "27",
		testUserID: "513"	// Currently gives an error for update user as it's not me
	}

	render() {
		return (
			<View style={styles.container}>
				<Button title="Objects nearby" onPress={() => this.handlePressObjectsNearby(this.state.testLat, this.state.testLon)} />
				<Button title="Object details" onPress={() => this.handlePressObjectDetails(this.state.testObjectID)} />
				<Button title="Activate object" onPress={() => this.handlePressActivateObject(this.state.testObjectID)} />
				<Button title="Users nearby" onPress={() => this.handlePressUsersNearby(this.state.testLat, this.state.testLon)} />
				<Button title="User details" onPress={() => this.handlePressUserDetails(this.state.testUserID)} />
				<Button title="Update user" onPress={() => this.handlePressUpdateUser(this.state.testUserID, "TestLuca2", null, true)} />
				<Button title="Ranking" onPress={() => this.handlePressRanking()} />
				<StatusBar style="auto" />
			</View>
		);
	}

	handlePressObjectsNearby(lat, lon) { CommunicationController.getObjectsNearby(this.state.sid, lat, lon).then((objects) => console.log(objects)) }

	handlePressObjectDetails(id) { CommunicationController.getObjectDetails(this.state.sid, id).then((obj) => console.log(obj)) }

	handlePressActivateObject(id) { CommunicationController.activateObject(this.state.sid, id).then((user) => console.log(user)) }

	handlePressUsersNearby(lat, lon) { CommunicationController.getUsersNearby(this.state.sid, lat, lon).then((users) => console.log(users)) }

	handlePressUserDetails(uid) { CommunicationController.getUserDetails(this.state.sid, uid).then((user) => console.log(user)) }

	handlePressUpdateUser(uid, newName, newImage, newSharingPosition) { CommunicationController.updateUser(this.state.sid, uid, newName, newImage, newSharingPosition).then((user) => console.log(user)) }

	handlePressRanking() { CommunicationController.getRanking(this.state.sid).then((ranking) => console.log(ranking)) }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
