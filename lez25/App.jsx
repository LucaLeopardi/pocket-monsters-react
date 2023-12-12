import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CommunicationController from './CommunicationController';
import { Button } from 'react-native';
import RegistrationPage from './RegistrationPage';
import MainPage from './MainPage';
import SettingsPage from './SettingsPage';

export default class App extends React.Component {

	PAGES = { REGISTRATION: 0, MAIN: 1, SETTINGS: 2, RANKING: 3, OBJECTS: 4, USERS: 5, OBJECT_DETAILS: 6, USER_DETAILS: 7 }

	state = {
		sid: null,
		currentPage: this.PAGES.REGISTRATION,
		selectedObjectID: null,
		selectedUserID: null,
		// TODO: move to a User local data
		playerUserID: null,
		playerLat: 0,
		playerLon: 0

		// Hardcoded values for testing
		/*sid: "EhJ9dY4pWw86sX43O2NI",
		currentPage: this.PAGES.REGISTRATION,
		selectedObjectID: "27",
		selectedUserID: "14115",
		playerUserID: "14115",
		playerLat: 0,
		playerLon: 0*/
	}

	componentDidMount() {
		this.checkUserRegistered()
	}

	render() {
		let content = null

		switch (this.state.currentPage) {

			case this.PAGES.REGISTRATION:
				content = <RegistrationPage onPressRegisterUser={() => this.handlePressRegisterUser()} />
				break

			case this.PAGES.MAIN:
				content = <MainPage
					onGoToSettingsPage={() => this.handleGoToSettingsPage()}
				/>
				break

			case this.PAGES.SETTINGS:
				content = <SettingsPage
					onPressGoBack={() => this.handleGoToMainPage()}
				/>
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
				<Button title="Objects nearby" onPress={() => this.handlePressObjectsNearby(this.state.playerLat, this.state.playerLon)} />
				<Button title="Object details" onPress={() => this.handlePressObjectDetails(this.state.selectedObjectID)} />
				<Button title="Activate object" onPress={() => this.handlePressActivateObject(this.state.selectedObjectID)} />
				<Button title="Users nearby" onPress={() => this.handlePressUsersNearby(this.state.playerLat, this.state.playerLon)} />
				<Button title="User details" onPress={() => this.handlePressUserDetails(this.state.selectedUserID)} />
				<Button title="Update user" onPress={() => this.handlePressUpdateUser(this.state.selectedUserID, "TestLuca3", null, true)} />
				<Button title="Ranking" onPress={() => this.handlePressRanking()} />
				<StatusBar style="auto" />
			</View>
		);
	}

	checkUserRegistered() { if (this.state.sid == null) this.setState({ currentPage: this.PAGES.REGISTRATION }) }

	/////////////////////////
	//// BUTTON HANDLERS ////
	/////////////////////////

	//#region NAVIGATION

	handleGoToMainPage() { this.setState({ currentPage: this.PAGES.MAIN, }) }
	handleGoToObjectsPage() { this.setState({ currentPage: this.PAGES.OBJECTS, }) }
	handleGoToObjectDetailsPage() { this.setState({ currentPage: this.PAGES.OBJECT_DETAILS, }) }
	handleGoToUsersPage() { this.setState({ currentPage: this.PAGES.USERS, }) }
	handleGoToUserDetailsPage() { this.setState({ currentPage: this.PAGES.USER_DETAILS, }) }
	handleGoToSettingsPage() { this.setState({ currentPage: this.PAGES.SETTINGS, }) }
	handleGoToRankingPage() { this.setState({ currentPage: this.PAGES.RANKING, }) }

	//#endregion

	//#region SERVER CALLS

	async handlePressRegisterUser() {
		let { sid, uid } = await CommunicationController.registerUser()
		console.log(sid, uid)
		this.setState({ sid: sid, playerUserID: uid, currentPage: this.PAGES.MAIN })
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

	//#endregion
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});