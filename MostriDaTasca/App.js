// Basic stuff
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
// Contexts
import { LocationContext, PlayerContext, DatabaseContext } from './Contexts';
// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Location and maps
import * as Location from 'expo-location';
import MapView, { Circle, Marker } from 'react-native-maps';
// Local storage
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import StorageManager from './StorageManager';
import ErrorPage from './ErrorPage';

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
	state = {
		sid: null,
		playerUID: null,
		playerLat: 0.0,
		playerLon: 0.0,
		localDB: null,
	}

	async componentDidMount() {
		// Ask for location permission. If not granted, will give an error in map Screen
		await this.checkLocationPermission()
		this.setState({ localDB: new StorageManager() })
	}

	render() {
		return (
			<PlayerContext.Provider
				value={{
					sid: this.state.sid,
					uid: this.state.playerUID,
					setSID: (sid) => this.setState({ sid: sid }),
					setUID: (uid) => this.setState({ playerUID: uid })
				}}>
				<LocationContext.Provider
					value={{
						lat: this.state.playerLat,
						lon: this.state.playerLon,
						setLat: (lat) => this.setState({ playerLat: lat }),
						setLon: (lon) => this.setState({ playerLon: lon })
					}}>
					<DatabaseContext.Provider
						value={{
							database: this.state.localDB
						}}>
						<StatusBar style="auto" hidden={true} />
						<NavigationContainer>
							<Stack.Navigator
								initialRouteName='Registration'
								screenOptions={{ headerShown: false }}>
								<Stack.Screen name="Registration" component={RegistrationPage} />
								<Stack.Screen name="Main" component={MainPage} />
								<Stack.Screen name="Settings" component={SettingsPage} />
								<Stack.Screen name="Ranking" component={RankingPage} />
								<Stack.Screen name="ObjectsNearby" component={ObjectsNearbyPage} />
								<Stack.Screen name="ObjectDetails" component={ObjectDetailsPage} />
								<Stack.Screen name="UsersNearby" component={UsersNearbyPage} />
								<Stack.Screen name="UserDetails" component={UserDetailsPage} />
								<Stack.Screen name="ErrorPage" component={ErrorPage} />
							</Stack.Navigator>
						</NavigationContainer>
					</DatabaseContext.Provider>
				</LocationContext.Provider>
			</PlayerContext.Provider>
		)
	}

	async checkLocationPermission() {
		const locationPermission = await Location.getForegroundPermissionsAsync()
		if (locationPermission.status !== "granted") {
			await Location.requestForegroundPermissionsAsync()
		}
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