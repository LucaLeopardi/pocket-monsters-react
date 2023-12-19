import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class App extends Component {

	state = {
		sid: "qWpVdN4AxqXxOvu6gX1h",
		lat: null,
		lon: null,
	}

	render() {
		return (
			<View style={styles.container}>
				<Button
					title="Get location from server"
					onPress={() => this.getObjectsNearby(
						this.state.sid,
						this.state.lat,
						this.state.lon)
						.then(console.log)} />
				<StatusBar style="auto" />
			</View>
		)
	}

	async getObjectsNearby(sid, lat, lon) {
		let queryParamsString = new URLSearchParams({ sid: sid, lat: lat, lon: lon }).toString();

		let fetchData = {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		}
		let httpResponse = await fetch("https://develop.ewlab.di.unimi.it/mc/mostri/" + "objects" + "?" + queryParamsString, fetchData);
		const status = httpResponse.status;
		if (status == 200) return await httpResponse.json();
		else throw new Error("SERVER ERROR: " + status + " - " + await httpResponse.text());
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
