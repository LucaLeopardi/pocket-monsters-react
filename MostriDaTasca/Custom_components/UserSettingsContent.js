import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import * as Context from '../Contexts';
import { Text, TouchableOpacity, Image, View, TextInput, Switch } from 'react-native';
import CommunicationController from '../CommunicationController';
import * as ImagePicker from 'expo-image-picker';
import { StyledButton } from './Buttons';
import { styles } from './Styles';



export function UserSettingsContent({ profile }) {
	const navigation = useNavigation();
	const { database } = useContext(Context.Database);
	const { player: { sid, uid }, updatePlayer } = useContext(Context.Player);
	const [newProfile, setNewProfile] = useState({
		name: profile.name,
		picture: profile.picture,
		positionshare: Boolean(profile.positionshare)
	});
	console.log(profile)
	console.log(newProfile)
	const updateNewProfile = (newProperties) => setNewProfile((oldProperties) => ({ ...oldProperties, ...newProperties }));

	const handleUpdateUser = async (sid, uid, newProfile) => {
		const { name, picture, positionshare } = newProfile;
		// The local database is only updated with data from the server, which handles profileversion
		CommunicationController.updateUser(sid, uid, name, picture, positionshare)	// Update on server
			.then(() => CommunicationController.getUserDetails(sid, uid)) 			// And save its updated version
			.then((usr) => {
				database.insertOrReplaceUser(usr); 									// on local database
				updatePlayer({ profileVersion: usr.profileversion });
			})
			.then(navigation.reset({
				index: 0,
				routes: [{ name: 'Main' }]
			}));
	};

	const handleSelectImage = async () => {
		const res = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			base64: true,
		});
		if (res.canceled) return console.log("Image selection cancelled");
		const image = res.assets[0];
		if (image) {
			if (image.fileSize > 100 * 1024) alert("Warning: Image too big! Max size is 100 KB");
			else updateNewProfile({ picture: image.base64 });
		}
	};

	let image;
	if (newProfile.picture) image = { uri: 'data:image/png;base64,' + newProfile.picture };
	else if (profile.picture) image = { uri: 'data:image/png;base64,' + profile.picture };
	else image = require('../assets/user_icon.png');

	const shouldConfirmBeDisabled = () => {
		return (
			newProfile.name == profile.name &&
			newProfile.picture == profile.picture &&
			newProfile.positionshare == profile.positionshare);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>YOUR PROFILE</Text>
			<View style={{ flexDirection: 'row' }}>
				<Image source={require('../assets/edit_icon.png')} style={{ width: 35, height: 35, alignSelf: 'center' }} />
				<TextInput
					placeholder={profile.name}
					maxLength={15}
					style={{ fontSize: 34, fontWeight: 'bold' }}
					onChangeText={(str) => updateNewProfile({ name: str })} />
			</View>
			<TouchableOpacity onPress={() => handleSelectImage()} style={{ justifyContent: 'center', alignItems: 'center' }}>
				<Image source={image} style={[styles.profileImage, { opacity: 0.4 }]} />
				<Image source={require('../assets/edit_icon.png')} style={{ position: 'absolute', width: 60, height: 60 }} />
			</TouchableOpacity>
			<Text style={styles.text}>HP: {profile.life} | XP: {profile.experience}</Text>
			<View style={{ width: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
				<Text style={styles.text}>Position sharing: {newProfile.positionshare ? "ON" : "OFF"}</Text>
				<Switch
					value={newProfile.positionshare}
					onValueChange={() => updateNewProfile({ positionshare: !newProfile.positionshare })} />
			</View>
			<StyledButton
				title={"Confirm"}
				disabled={shouldConfirmBeDisabled()}
				onPress={() => handleUpdateUser(sid, uid, newProfile)} />
		</View>
	);
};
