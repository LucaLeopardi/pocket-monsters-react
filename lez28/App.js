import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import MapView, { Circle, Marker } from 'react-native-maps';

export default class App extends Component {

	state = {
		sid: "qWpVdN4AxqXxOvu6gX1h",
		lat: null,
		lon: null,
		objects: [],
	}

	async componentDidMount() {
		await this.checkLocationPermission()
		this.getLocation()
	}

	render() {
		let buttons = (
			<View>
				<Button
					title="Get location"
					onPress={() => this.getLocation().then(() => console.log("Lat: " + this.state.lat + " Lon: " + this.state.lon))} />
				<Button
					title="Get nearby objects"
					onPress={() => this.getObjectsNearby(
						this.state.sid,
						this.state.lat,
						this.state.lon)
						.then(() => console.log(this.state.objects))} />
			</View>
		)

		let markers = this.state.objects.map((object) => {
			return (
				<Marker
					key={object.id}
					title={object.id.toString()}
					coordinate={{ latitude: object.lat, longitude: object.lon }}
				/>)
		})

		let map = this.state.lat && this.state.lon ? (
			<MapView
				style={{ flex: 1, width: `100%`, height: `100%` }}
				initialRegion={{
					latitude: this.state.lat,
					longitude: this.state.lon,
					latitudeDelta: 0.05,
					longitudeDelta: 0.05,
				}}>
				<Circle
					center={{ latitude: this.state.lat, longitude: this.state.lon }}
					radius={1000}
					strokeColor={"#000"}
					fillColor={"rgba(100, 100, 200, 0.5)"} />
				{markers}
			</MapView>
		) : (null)

		return (
			<View style={styles.container}>
				{buttons}
				{map}
				<StatusBar style="auto" hidden={true} />
			</View>
		)
	}

	async getObjectsNearby(sid) {
		await this.getLocation()
		let queryParamsString = new URLSearchParams({ sid: sid, lat: this.state.lat, lon: this.state.lon }).toString();

		let fetchData = {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		}
		let httpResponse = await fetch("https://develop.ewlab.di.unimi.it/mc/mostri/" + "objects" + "?" + queryParamsString, fetchData);
		const status = httpResponse.status;
		if (status == 200) this.setState({ objects: await httpResponse.json() })
		else throw new Error("SERVER ERROR: " + status + " - " + await httpResponse.text())
	}

	async getLocation() {
		const location = await Location.getCurrentPositionAsync()
		this.setState({ lat: location.coords.latitude, lon: location.coords.longitude })
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
		// paddingTop: Constants.statusBarHeight,	// Useless right now because StatusBar is hidden
	},
});