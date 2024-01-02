// Basic stuff
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
// Contexts
import * as Context from './Contexts';
// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Location and maps
import * as Location from 'expo-location';
// My components and classes
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
			<Context.Provider>
				<StatusBar style="auto" hidden={true} />
				<NavigationContainer>
					<Stack.Navigator
						initialRouteName='Registration'
						screenOptions={{ headerShown: false }}>
						<Stack.Screen name="Registration" component={RegistrationPage} />
						<Stack.Screen name="Main" component={MainPage} options={{ animation: 'fade' }} />
						<Stack.Screen name="Settings" component={SettingsPage} />
						<Stack.Screen name="Ranking" component={RankingPage}
							options={{ animation: 'slide_from_bottom', animationDuration: 150 }} />
						<Stack.Screen name="ObjectsNearby" component={ObjectsNearbyPage}
							options={{ animation: 'slide_from_bottom', animationDuration: 150 }} />
						<Stack.Screen name="ObjectDetails" component={ObjectDetailsPage} />
						<Stack.Screen name="UsersNearby" component={UsersNearbyPage}
							options={{ animation: 'slide_from_bottom', animationDuration: 150 }} />
						<Stack.Screen name="UserDetails" component={UserDetailsPage} />
						<Stack.Screen name="ErrorPage" component={ErrorPage} options={{ animation: 'none' }} />
					</Stack.Navigator>
				</NavigationContainer>
			</Context.Provider>
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