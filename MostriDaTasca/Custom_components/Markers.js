import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import * as Context from '../Contexts';
import { Marker } from 'react-native-maps';


export function MarkerPlayer({ lat, lon }) {
	return (
		<Marker
			coordinate={{ latitude: lat, longitude: lon }}
			image={require('../assets/player_icon.png')}
			flat={true}
			anchor={{ x: 0.5, y: 0.5 }} />);
}

export function MarkerUser({ user: userNearby, disabled = false }) {
	let image = require('../assets/user_icon.png');
	const { database } = useContext(Context.Database);
	const { player: { sid } } = useContext(Context.Player);
	const navigation = useNavigation();

	const handlePress = async () => {
		if (disabled) return;
		data = await database.getUserByID(sid, userNearby.uid, userNearby.profileversion);
		data = { ...data, lat: userNearby.lat, lon: userNearby.lon, life: userNearby.life, experience: userNearby.experience }; // Have to re-add properties not stored in the database
		if (data.picture) image = { uri: 'data:image/png;base64,' + data.picture };
		navigation.navigate('UserDetails', { data, image });
	};

	return (
		<Marker
			key={userNearby.uid}
			image={image}
			coordinate={{ latitude: userNearby.lat, longitude: userNearby.lon }}
			flat={true}
			anchor={{ x: 0.5, y: 0.5 }}
			onPress={handlePress} />);
}

export function MarkerObject({ object, disabled = false }) {
	let image = getObjectTypeIcon(object.type);
	const { database } = useContext(Context.Database);
	const { player: { sid } } = useContext(Context.Player);
	const navigation = useNavigation();

	return (
		<Marker
			key={object.id}
			coordinate={{ latitude: object.lat, longitude: object.lon }}
			image={image}
			flat={true}
			anchor={{ x: 0.5, y: 0.5 }}
			onPress={async () => {
				if (disabled) return;
				let data = await database.getObjectByID(sid, object.id);
				data = { ...data, lat: object.lat, lon: object.lon, distance: object.distance, withinRange: object.withinRange }; // Have to re-add properties not stored in the database
				if (data.image) image = { uri: 'data:image/png;base64,' + data.image };
				navigation.navigate('ObjectDetails', { data, image });
			}} />);
}

export function getObjectTypeIcon(type) {
	switch (type) {
		case "monster":
			return require('../assets/monster_icon.png')
		case "armor":
			return require('../assets/armor_icon.png')
		case "weapon":
			return require('../assets/weapon_icon.png')
		case "amulet":
			return require('../assets/amulet_icon.png')
		case "candy":
			return require('../assets/candy_icon.png')
	}
}
