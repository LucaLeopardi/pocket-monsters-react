// Basic stuff
import React from 'react';
import { StatusBar } from 'expo-status-bar';
// Contexts
import * as Context from './Contexts';
// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// My components and classes
import RegistrationPage from './RegistrationPage';
import MainPage from './MainPage';
import SettingsPage from './SettingsPage';
import RankingPage from './RankingPage';
import ObjectsNearbyPage from './ObjectsNearbyPage';
import ObjectDetailsPage from './ObjectDetailsPage';
import UsersNearbyPage from './UsersNearbyPage';
import UserDetailsPage from './UserDetailsPage';
import ErrorPage from './ErrorPage';
import InitialPage from './InitialPage';

const Stack = createNativeStackNavigator();

export default function App() {

	return (
		<Context.Provider>
			<StatusBar hidden={true} />
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName='Initial'
					screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Initial" component={InitialPage} options={{ animation: 'none' }} />
					<Stack.Screen name="Registration" component={RegistrationPage} />
					<Stack.Screen name="Main" component={MainPage} options={{ animation: 'fade' }} />
					<Stack.Screen name="Settings" component={SettingsPage}
						options={{ animation: 'slide_from_bottom', animationDuration: 150 }} />
					<Stack.Screen name="Ranking" component={RankingPage}
						options={{ animation: 'slide_from_bottom', animationDuration: 150 }} />
					<Stack.Screen name="ObjectsNearby" component={ObjectsNearbyPage}
						options={{ animation: 'slide_from_bottom', animationDuration: 150 }} />
					<Stack.Screen name="ObjectDetails" component={ObjectDetailsPage}
						options={{ animation: 'slide_from_bottom', animationDuration: 150 }} />
					{/*	Whoops. Extra page, not in the specification.
					<Stack.Screen name="UsersNearby" component={UsersNearbyPage}
					options={{ animation: 'slide_from_bottom', animationDuration: 150 }} />
					*/}
					<Stack.Screen name="UserDetails" component={UserDetailsPage}
						options={{ animation: 'slide_from_bottom', animationDuration: 150 }} />
					<Stack.Screen name="ErrorPage" component={ErrorPage} options={{ animation: 'none' }} />
				</Stack.Navigator>
			</NavigationContainer>
		</Context.Provider>
	)
}