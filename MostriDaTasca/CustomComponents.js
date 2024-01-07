import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import * as Context from './Contexts';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import { Marker } from 'react-native-maps';


export const StyledButton = ({ title, image, onPress }) =>
	<TouchableOpacity onPress={onPress} style={styles.button}>
		<View>
			{title ? <Text style={styles.buttonText}>{title}</Text> : null}
			{image ? <Image source={image} /> : null}
		</View>
	</TouchableOpacity>


// MAP MARKERS //

export function MarkerPlayer({ lat, lon }) {
	return (
		< Marker
			coordinate={{ latitude: lat, longitude: lon }}
			image={require('./assets/player_icon.png')}
			flat={true}
			anchor={{ x: 0.5, y: 0.5 }}
		/>)
}

export function MarkerUser({ user }) {
	let image = require('./assets/user_icon.png')
	const { database } = useContext(Context.Database)
	const { player: { sid } } = useContext(Context.Player)
	const navigation = useNavigation()

	return (
		<Marker
			key={user.uid}
			image={image}
			coordinate={{ latitude: user.lat, longitude: user.lon }}
			flat={true}
			anchor={{ x: 0.5, y: 0.5 }}
			onPress={async () => {
				const data = await database.getUserByID(sid, user.uid, user.profileversion)
				if (data.picture) image = { uri: 'data:image/png;base64,' + data.picture }
				navigation.navigate('UserDetails', { data, image })
			}}
		/>)
}

export function MarkerObject({ object }) {
	let image = getObjectTypeIcon(object.type)
	const { database } = useContext(Context.Database)
	const { player: { sid } } = useContext(Context.Player)
	const navigation = useNavigation()

	return (
		<Marker
			key={object.id}
			coordinate={{ latitude: object.lat, longitude: object.lon }}
			image={image}
			flat={true}
			anchor={{ x: 0.5, y: 0.5 }}
			onPress={async () => {
				const data = await database.getObjectByID(sid, object.id)
				if (data.image) image = { uri: 'data:image/png;base64,' + data.image }
				navigation.navigate('ObjectDetails', { data, image })
			}}
		/>)
}

const getObjectTypeIcon = (type) => {
	switch (type) {
		case "monster":
			return require('./assets/monster_icon.png')
		case "armor":
			return require('./assets/armor_icon.png')
		case "weapon":
			return require('./assets/weapon_icon.png')
		case "amulet":
			return require('./assets/amulet_icon.png')
		case "candy":
			return require('./assets/candy_icon.png')
	}
}


// STYLING // 

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		backgroundColor: `red`,
		margin: 2,
		padding: 10,
		borderRadius: 5,
		alignSelf: 'center',
	},
	buttonText: {
		color: `white`,
		fontSize: 16,
		fontWeight: 'bold',
		textTransform: 'uppercase',
	},
	text: {
		fontSize: 16,
	},
	map: [
		{
			"featureType": "administrative",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#6195a0"
				}
			]
		},
		{
			"featureType": "administrative.province",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "landscape",
			"elementType": "geometry",
			"stylers": [
				{
					"lightness": "0"
				},
				{
					"saturation": "0"
				},
				{
					"color": "#f5f5f2"
				},
				{
					"gamma": "1"
				}
			]
		},
		{
			"featureType": "landscape.man_made",
			"elementType": "all",
			"stylers": [
				{
					"lightness": "-3"
				},
				{
					"gamma": "1.00"
				}
			]
		},
		{
			"featureType": "landscape.natural.terrain",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "poi",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "poi.park",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#bae5ce"
				},
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "road",
			"elementType": "all",
			"stylers": [
				{
					"saturation": -100
				},
				{
					"lightness": 45
				},
				{
					"visibility": "simplified"
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "simplified"
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#fac9a9"
				},
				{
					"visibility": "simplified"
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "labels.text",
			"stylers": [
				{
					"color": "#4e4e4e"
				}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#787878"
				}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "labels.icon",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "transit",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "simplified"
				}
			]
		},
		{
			"featureType": "transit.station.airport",
			"elementType": "labels.icon",
			"stylers": [
				{
					"hue": "#0a00ff"
				},
				{
					"saturation": "-77"
				},
				{
					"gamma": "0.57"
				},
				{
					"lightness": "0"
				}
			]
		},
		{
			"featureType": "transit.station.rail",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#43321e"
				}
			]
		},
		{
			"featureType": "transit.station.rail",
			"elementType": "labels.icon",
			"stylers": [
				{
					"hue": "#ff6c00"
				},
				{
					"lightness": "4"
				},
				{
					"gamma": "0.75"
				},
				{
					"saturation": "-68"
				}
			]
		},
		{
			"featureType": "water",
			"elementType": "all",
			"stylers": [
				{
					"color": "#eaf6f8"
				},
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "water",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#c7eced"
				}
			]
		},
		{
			"featureType": "water",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"lightness": "-49"
				},
				{
					"saturation": "-53"
				},
				{
					"gamma": "0.79"
				}
			]
		}
	]
})