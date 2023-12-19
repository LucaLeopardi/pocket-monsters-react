import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

export default class App extends Component {

	state = {
		sid: "qWpVdN4AxqXxOvu6gX1h",
		lat: null,
		lon: null,
	}

	componentDidMount() {
		this.checkLocationPermission()
	}

	render() {
		return (
			<View style={styles.container}>
				<Button
					title="Get location"
					onPress={() => this.getLocation().then(console.log)} />
				<Button
					title="Get nearby objects"
					onPress={() => this.getObjectsNearby(
						this.state.sid,
						this.state.lat,
						this.state.lon)
						.then(console.log)} />
				<StatusBar style="auto" />
			</View>
		)
	}

	async getObjectsNearby(sid) {
		const { lat, lon } = await this.getLocation()
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

	async getLocation() {
		const location = await Location.getCurrentPositionAsync()
		return { lat: location.coords.latitude, lon: location.coords.longitude }
	}

	async checkLocationPermission() {
		let locationPermission = (await Location.getForegroundPermissionsAsync()).granted
		if (locationPermission === false) {
			const permissionRequest = await Location.requestForegroundPermissionsAsync()
			if (permissionRequest.status === "granted") locationPermission = true
		}
		if (locationPermission === false) throw new Error("ERROR: App requires location permission")
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