import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CommunicationController from './CommunicationController';
import { Button } from 'react-native';

export default class App extends React.Component {

	PAGES = { REGISTRATION: 0, MAIN: 1, SETTINGS: 2, RANKING: 3, OBJECTS: 4, USERS: 5, OBJECT_DETAILS: 6, USER_DETAILS: 7 }

	state = {
		sid: "EhJ9dY4pWw86sX43O2NI",
		currentPage: this.PAGES.REGISTRATION,
		testLat: 0,
		testLon: 0,
		testObjectID: "27",
		testUserID: "14115"
	}

	render() {
		let content = null

		switch (this.state.currentPage) {
			case this.PAGES.REGISTRATION:

				break

			case this.PAGES.MAIN:

				break

			case this.PAGES.SETTINGS:

				break

			case this.PAGES.RANKING:

				break

			case this.PAGES.OBJECTS:

				break

			case this.PAGES.USERS:

				break

			case this.PAGES.OBJECT_DETAILS:

				break

			case this.PAGES.USER_DETAILS:

				break

			default:
				content = <Text>ERROR: Invalid page.</Text>
				break
		}

		return (
			<View style={styles.container}>
				{content}
				<StatusBar style="auto" />
			</View>
		)

		return (
			<View style={styles.container}>
				<Button title="Register" onPress={() => this.handlePressRegisterUser()} />
				<Button title="Objects nearby" onPress={() => this.handlePressObjectsNearby(this.state.testLat, this.state.testLon)} />
				<Button title="Object details" onPress={() => this.handlePressObjectDetails(this.state.testObjectID)} />
				<Button title="Activate object" onPress={() => this.handlePressActivateObject(this.state.testObjectID)} />
				<Button title="Users nearby" onPress={() => this.handlePressUsersNearby(this.state.testLat, this.state.testLon)} />
				<Button title="User details" onPress={() => this.handlePressUserDetails(this.state.testUserID)} />
				<Button title="Update user" onPress={() => this.handlePressUpdateUser(this.state.testUserID, "TestLuca3", null, true)} />
				<Button title="Ranking" onPress={() => this.handlePressRanking()} />
				<StatusBar style="auto" />
			</View>
		);
	}

	async handlePressRegisterUser() {
		if (this.state.sid == "EhJ9dY4pWw86sX43O2NI") {
			console.log("Valid sid already present. Aborting server call.")
			return
		}
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
