import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import UsersList from './UsersList';
import UserDetails from './UserDetails';
import Settings from './Settings';

export default class App extends React.Component {
	PAGES = { LIST: 0, USER_DETAILS: 1, SETTINGS: 2 }

	state = {
		currentPage: this.PAGES.LIST,
		users: [
			{ name: "Andrea", uid: 1, hp: 100, xp: 1 },
			{ name: "Beatrice", uid: 2, hp: 100, xp: 200 },
			{ name: "Carlo", uid: 3, hp: 100, xp: 100 }
		],
		selectedUser: null
	}

	render() {
		let content = null

		switch (this.state.currentPage) {
			case this.PAGES.LIST:
				content =
					<View>
						<Button title='Settings' onPress={this.handlePressSettings} />
						<Text>Users:</Text>
						<UsersList data={this.state.users} onPress={this.handlePressUser} />
					</View>
				break

			case this.PAGES.USER_DETAILS:
				content = <UserDetails
					data={this.state.users.find((u) => u.uid === this.state.selectedUser)}
					onPressHome={this.handlePressHome} />
				break

			case this.PAGES.SETTINGS:
				content = <Settings data={this.state.users[0]} onPressHome={this.handlePressHome} />
				break

			default:
				content = <Text>ERROR: Page not defined.</Text>
		}

		return (
			<View style={styles.container}>
				{content}
				<StatusBar style="auto" />
			</View>
		);
	}

	handlePressUser = (uid) => {
		console.log("User pressed:", uid)
		this.setState({ currentPage: this.PAGES.USER_DETAILS, selectedUser: uid })
	}

	handlePressHome = () => {
		console.log("Home pressed")
		this.setState({ currentPage: this.PAGES.LIST, selectedUser: null })
	}

	handlePressSettings = () => {
		console.log("Settings pressed")
		this.setState({ currentPage: this.PAGES.SETTINGS, selectedUser: null })
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
