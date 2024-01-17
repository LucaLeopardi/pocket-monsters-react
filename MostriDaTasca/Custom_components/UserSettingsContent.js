import { useNavigation } from '@react-navigation/native';
import { useContext, useState, useEffect } from 'react';
import * as Context from '../Contexts';
import { Text, TouchableOpacity, Image, View, TextInput } from 'react-native';
import CommunicationController from '../CommunicationController';
import * as ImagePicker from 'expo-image-picker';
import { StyledButton } from './StyledButton';
import { styles } from './Styles';



export const UserSettingsContent = ({ profile }) => {

	const navigation = useNavigation();
	const { database } = useContext(Context.Database);
	const { player: { sid, uid }, updatePlayer } = useContext(Context.Player);
	const [newProfile, setNewProfile] = useState({
		name: null,
		picture: null,
		sharePosition: null
	});
	const updateNewProfile = (newProperties) => setNewProfile((oldProperties) => ({ ...oldProperties, ...newProperties }));

	useEffect(() => updateNewProfile({ sharePosition: profile.positionshare }), []);

	const handleUpdateUser = async (sid, uid, newProfile) => {
		const { name, picture, sharePosition } = newProfile;
		// The local database is only updated with data from the server, which handles profileversion
		CommunicationController.updateUser(sid, uid, name, picture, sharePosition) // Update on server
			.then(() => CommunicationController.getUserDetails(sid, uid)) // And save its updated version
			.then((usr) => {
				database.insertOrReplaceUser(usr); // on local database
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
		// TODO: fix changing only with changing sharePosition ???
		return (
			newProfile.name === null &&
			newProfile.picture === null &&
			(newProfile.sharePosition === null || newProfile.sharePosition == profile.positionshare));
	};

	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 24, fontWeight: 'bold' }}>Your profile</Text>
			<View style={{ flexDirection: 'row' }}>
				<Image source={require('../assets/edit_icon.png')} style={{ width: 50, height: 50 }} />
				<TextInput
					placeholder={profile.name}
					maxLength={15}
					style={{ fontSize: 36, fontWeight: 'bold' }}
					onChangeText={(str) => updateNewProfile({ name: str })} />
			</View>
			<TouchableOpacity onPress={() => handleSelectImage()} style={{ justifyContent: 'center', alignItems: 'center' }}>
				<Image source={image} style={{ opacity: 0.5, width: 200, height: 200 }} />
				<Image source={require('../assets/edit_icon.png')} style={{ position: 'absolute', width: 100, height: 100 }} />
			</TouchableOpacity>
			<Text>HP: {profile.life} | XP: {profile.experience}</Text>
			<Text>Position sharing: {newProfile.sharePosition ? "ON" : "OFF"}</Text>
			<StyledButton
				title={(newProfile.sharePosition ? "Disable" : "Enable")}
				onPress={() => updateNewProfile({ sharePosition: !newProfile.sharePosition })} />
			<StyledButton
				title="Confirm"
				disabled={shouldConfirmBeDisabled()}
				onPress={() => handleUpdateUser(sid, uid, newProfile)} />
		</View>
	);
};
