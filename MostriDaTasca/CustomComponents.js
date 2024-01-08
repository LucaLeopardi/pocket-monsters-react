import { useNavigation } from '@react-navigation/native';
import { useContext, useState, useEffect } from 'react';
import * as Context from './Contexts';
import { StyleSheet, Text, TouchableOpacity, Image, View, TextInput } from 'react-native';
import { Marker } from 'react-native-maps';
import CommunicationController from './CommunicationController';


export const StyledButton = ({ title = null, image = null, onPress = null, disabled = false }) =>
	<TouchableOpacity onPress={onPress} style={[styles.button, { opacity: disabled ? 0.4 : 1 }]} disabled={disabled} >
		<View>
			{title ? <Text style={styles.buttonText}>{title}</Text> : null}
			{image ? <Image source={image} /> : null}
		</View>
	</TouchableOpacity >


export const UserSettingsContent = ({ profile }) => {

	const navigation = useNavigation()
	const { database } = useContext(Context.Database)
	const { player: { sid, uid }, updatePlayer } = useContext(Context.Player)
	const [newProfile, setNewProfile] = useState({
		name: null,
		image: null,
		sharePosition: null
	})
	const updateNewProfile = (newProperties) => setNewProfile((oldProperties) => ({ ...oldProperties, ...newProperties }))

	useEffect(() => updateNewProfile({ sharePosition: profile.positionshare }), [])

	const handleUpdateUser = async (sid, uid, newProfile) => {
		const { name, image, sharePosition } = newProfile
		// The local database is only updated with data from the server, which handles profileversion
		CommunicationController.updateUser(sid, uid, name, image, sharePosition)	// Update on server
			.then(() => CommunicationController.getUserDetails(sid, uid))			// And save its updated version
			.then((usr) => {
				database.insertOrReplaceUser(usr)									// on local database
				updatePlayer({ profileVersion: usr.profileversion })
			})
			.then(navigation.reset({
				index: 0,
				routes: [{ name: 'Main' }]
			}))
	}

	// TODO: Does not work. EDIT: Library problem with no solution online. Nice.
	const handleSelectImage = () => {
		launchImageLibrary(
			{ mediaType: 'photo', includeBase64: true },
			(response) => {
				if (response.errorMessage) {
					console.log("Error selecting image: " + response.errorMessage)
					return
				} else {
					if (response.assets[0].fileSize > 100 * 1024) alert("Warning: Image too big! Max size is 100 KB")
					else updateNewProfile({ image: { uri: 'data:image/png;base64' + response.assets[0].base64 } })
				}
			})
	}

	const image = profile.picture ? { uri: 'data:image/png;base64,' + profile.picture } : require('./assets/user_icon.png')
	const shouldConfirmBeDisabled = () => newProfile.name === null && newProfile.image === null && newProfile.sharePosition == profile.positionshare

	return (
		<View>
			<Text style={{ fontSize: 24, fontWeight: 'bold' }}>Your profile</Text>
			<View style={{ flexDirection: 'row' }}>
				<Image source={require('./assets/edit_icon.png')} style={{ width: 50, height: 50 }} />
				<TextInput
					placeholder={profile.name}
					maxLength={15}
					style={{ fontSize: 36, fontWeight: 'bold' }}
					onChangeText={(str) => updateNewProfile({ name: str })} />
			</View>
			<TouchableOpacity onPress={() => handleSelectImage()} style={{ justifyContent: 'center', alignItems: 'center' }}>
				<Image source={image} style={{ opacity: 0.5, width: 200, height: 200 }} />
				<Image source={require('./assets/edit_icon.png')} style={{ position: 'absolute', width: 100, height: 100 }} />
			</TouchableOpacity>
			<Text>HP: {profile.life} | XP: {profile.experience}</Text>
			<Text>Position sharing: {newProfile.sharePosition ? "ON" : "OFF"}</Text>
			<StyledButton
				title={(newProfile.sharePosition === true ? "Disable" : "Enable")}
				onPress={() => updateNewProfile({ sharePosition: !newProfile.sharePosition })} />
			<StyledButton
				title="Confirm"
				disabled={shouldConfirmBeDisabled()}
				onPress={() => handleUpdateUser(sid, uid, newProfile)} />
		</View>
	)
}


export const EquipmentSlot = ({ type, object }) => {
	// Empty slot
	if (object === null) return (
		<View>
			<Text style={{ fontSize: 20, fontWeight: 'bold', textTransform: 'capitalize' }}>{type}</Text>
			<Image source={getObjectTypeIcon(type)} style={{ width: 100, height: 100, opacity: 0.5 }} />
			<Text style={{ fontSize: 16 }}>Empty</Text>
		</View>
	)
	// Item info
	else {
		let description
		switch (object.type) {
			case 'weapon':
				description = "- " + object.level + "% Monster damage"
				break
			case 'armor':
				description = "+ " + object.level + " HP"
				break
			case 'amulet':
				description = "+ " + object.level + "% reach"
				break
		}
		return (
			<View>
				<Text style={{ fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' }}>{object.type}</Text>
				<Text style={{ fontSize: 16, textTransform: 'capitalize' }}>{object.name}</Text>
				<Image source={object.image ? { uri: 'item:image/png;base64,' + object.image } : getObjectTypeIcon(type)} style={{ width: 100, height: 100 }} />
				<Text style={{ fontSize: 16 }}>Level {object.level}</Text>
				<Text style={{ fontSize: 16, fontStyle: 'italic' }}>{description}</Text>
			</View>
		)
	}
}


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