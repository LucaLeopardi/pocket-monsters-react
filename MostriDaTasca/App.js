// Basic stuff
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
// Contexts
import { LocationContext, SIDContext } from './Contexts';
// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Location and maps
import * as Location from 'expo-location';
import MapView, { Circle, Marker } from 'react-native-maps';
// SQLite
import * as SQLite from 'expo-sqlite';
// My components and classes
import CommunicationController from './CommunicationController';
import RegistrationPage from './RegistrationPage';
import MainPage from './MainPage';
import SettingsPage from './SettingsPage';
import RankingPage from './RankingPage';
import ObjectsNearbyPage from './ObjectsNearbyPage';
import ObjectDetailsPage from './ObjectDetailsPage';
import UsersNearbyPage from './UsersNearbyPage';
import UserDetailsPage from './UserDetailsPage';

const Stack = createNativeStackNavigator();

export default class App extends React.Component {

	PAGES = { REGISTRATION: 0, MAIN: 1, SETTINGS: 2, RANKING: 3, OBJECTS_NEARBY: 4, USERS_NEARBY: 5, OBJECT_DETAILS: 6, USER_DETAILS: 7 }

	state = {
		sid: null,
		currentPage: this.PAGES.REGISTRATION,
		selectedObjectID: null,
		selectedUserID: null,
		// TODO: move to a User local data
		playerUserID: null,
		playerLat: 0.0,
		playerLon: 0.0,
	}
	/*
	componentDidMount() { this.checkUserRegistered() }
	*/
	render() {
		return (
			<SIDContext.Provider
				value={{
					sid: this.state.sid,
					setSID: (sid) => this.setState({ sid: sid })
				}}>
				<LocationContext.Provider
					value={{
						lat: this.state.playerLat,
						lon: this.state.playerLon,
						setLat: (lat) => this.setState({ playerLat: lat }),
						setLon: (lon) => this.setState({ playerLon: lon })
					}}>
					<NavigationContainer>
						<Stack.Navigator initialRouteName='Registration'>
							<Stack.Screen name="Registration" component={RegistrationPage} />
							<Stack.Screen name="Main" component={MainPage} />
							<Stack.Screen name="Settings" component={SettingsPage} />
							<Stack.Screen name="Ranking" component={RankingPage} />
							<Stack.Screen name="ObjectsNearby" component={ObjectsNearbyPage} />
							<Stack.Screen name="ObjectDetails" component={ObjectDetailsPage} />
							<Stack.Screen name="UsersNearby" component={UsersNearbyPage} />
							<Stack.Screen name="UserDetails" component={UserDetailsPage}
						/* TODO */ />
						</Stack.Navigator>
					</NavigationContainer>
				</LocationContext.Provider>
			</SIDContext.Provider>
		)

		/*
		let content = null

		switch (this.state.currentPage) {

			case this.PAGES.REGISTRATION:
					content = <RegistrationPage onPressRegisterUser={this.handlePressRegisterUser} />
					break

					case this.PAGES.MAIN:
					content = <MainPage
						onGoToSettingsPage={this.handleGoToSettingsPage}
						onGoToObjectsNearbyPage={this.handleGoToObjectsNearbyPage}
						onGoToUsersNearbyPage={this.handleGoToUsersNearbyPage}
						onGoToRankingPage={this.handleGoToRankingPage} />
					break

					case this.PAGES.SETTINGS:
					content = <SettingsPage
						onPressGoBack={this.handleGoToMainPage}
						onPressUpdateUser={this.handlePressUpdateUser}
						uid={this.state.playerUserID} />
					break

					case this.PAGES.RANKING:
					content = <RankingPage
						onPressGoBack={this.handleGoToMainPage}
						getRanking={this.handlePressGetRanking} />
					break

					case this.PAGES.OBJECTS_NEARBY:
					content = <ObjectsNearbyPage onPressGoBack={this.handleGoToMainPage}
					/>
					break

					case this.PAGES.USERS_NEARBY:
					content = <UsersNearbyPage
						onPressGoBack={this.handleGoToMainPage}
						getUsersNearby={this.handlePressUsersNearby}
						getPlayerPosition={this.getPlayerPosition} />
					break

					case this.PAGES.OBJECT_DETAILS:
					content = <ObjectDetailsPage
						onPressGoBack={this.handleGoToMainPage}
						getObjects={this.handlePressObjectsNearby} />
					break

					case this.PAGES.USER_DETAILS:
					content = <UserDetailsPage onPressGoBack={this.handleGoToMainPage}
					/>
					break

					default:
					content = <Text>ERROR: Invalid page.</Text>
					break
		}

					return (
					<View style={styles.container}>
						{content}
						<StatusBar style="auto" hidden={true} />
					</View>
					)
					*/
	}
	/*
		checkUserRegistered = () => { if (this.state.sid == null) this.setState({currentPage: this.PAGES.REGISTRATION }) }
		getPlayerPosition = () => { return {lat: this.state.playerLat, lon: this.state.playerLon } }
					*/
	/////////////////////////
	//// BUTTON HANDLERS ////
	/////////////////////////

	//#region NAVIGATION
	/*
	handleGoToMainPage = () => {this.setState({ currentPage: this.PAGES.MAIN, })}
	handleGoToObjectsNearbyPage = () => {this.setState({ currentPage: this.PAGES.OBJECTS_NEARBY, })}
	handleGoToObjectDetailsPage = () => {this.setState({ currentPage: this.PAGES.OBJECT_DETAILS, })}
	handleGoToUsersNearbyPage = () => {this.setState({ currentPage: this.PAGES.USERS_NEARBY, })}
	handleGoToUserDetailsPage = () => {this.setState({ currentPage: this.PAGES.USER_DETAILS, })}
	handleGoToSettingsPage = () => {this.setState({ currentPage: this.PAGES.SETTINGS, })}
	handleGoToRankingPage = () => {this.setState({ currentPage: this.PAGES.RANKING, })}
					*/
	//#endregion

	//#region SERVER CALLS
	/*
	handlePressRegisterUser = async () => {
						let {sid, uid} = await CommunicationController.registerUser()
					console.log(sid, uid)
					this.setState({sid: sid, playerUserID: uid, currentPage: this.PAGES.MAIN })
	}

	handlePressObjectsNearby = async (lat, lon) => {
						let objects = await CommunicationController.getObjectsNearby(this.state.sid, lat, lon)
					console.log(objects)
	}

	handlePressObjectDetails = async (id) => {
						let obj = await CommunicationController.getObjectDetails(this.state.sid, id)
					console.log(obj)
	}

	handlePressActivateObject = async (id) => {
						let user = await CommunicationController.activateObject(this.state.sid, id)
					console.log(user)
	}

	handlePressUsersNearby = async (lat, lon) => {
						let users = await CommunicationController.getUsersNearby(this.state.sid, lat, lon)
					console.log(users)
					return users
	}

	handlePressUserDetails = async (uid) => {
						let user = await CommunicationController.getUserDetails(this.state.sid, uid)
					console.log(user)
	}

	handlePressUpdateUser = async (uid, newName, newImage, newSharingPosition) => {
						let user = await CommunicationController.updateUser(this.state.sid, uid, newName, newImage, newSharingPosition)
					console.log(user)
	}

	handlePressGetRanking = async () => {
						let ranking = await CommunicationController.getRanking(this.state.sid)
					console.log(ranking)
					return ranking
	}
					*/
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