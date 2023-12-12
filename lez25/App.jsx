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
				<Button title="Register" onPress={() => this.handlePressRegisterUser()} />
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

	async handlePressRegisterUser() {
		let { sid, uid } = await CommunicationController.registerUser()
		console.log(sid, uid)
		this.setState({ sid: sid, testUserID: uid })
	}

	async handlePressObjectsNearby(lat, lon) {
		let objects = await CommunicationController.getObjectsNearby(this.state.sid, lat, lon)
		console.log(objects)
	}

	async handlePressObjectDetails(id) {
		let obj = await CommunicationController.getObjectDetails(this.state.sid, id)
		console.log(obj)
	}

	async handlePressActivateObject(id) {
		let user = await CommunicationController.activateObject(this.state.sid, id)
		console.log(user)
	}

	async handlePressUsersNearby(lat, lon) {
		let users = await CommunicationController.getUsersNearby(this.state.sid, lat, lon)
		console.log(users)
	}

	async handlePressUserDetails(uid) {
		let user = await CommunicationController.getUserDetails(this.state.sid, uid)
		console.log(user)
	}

	async handlePressUpdateUser(uid, newName, newImage, newSharingPosition) {
		let user = await CommunicationController.updateUser(this.state.sid, uid, newName, newImage, newSharingPosition)
		console.log(user)
	}

	async handlePressRanking() {
		let ranking = await CommunicationController.getRanking(this.state.sid)
		console.log(ranking)
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
