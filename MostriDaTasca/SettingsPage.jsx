import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import * as Context from './Contexts'
import { UserSettingsContent } from './Custom_components/UserSettingsContent'
import { StyledButton } from './Custom_components/StyledButton'
import { EquipmentSlot } from './Custom_components/EquipmentSlot'
import { styles } from './Custom_components/Styles'

export default function SettingsPage({ navigation, route }) {

	const { player: { sid, uid, profileVersion }, updatePlayer } = useContext(Context.Player)
	const { database } = useContext(Context.Database)
	const [profile, setProfile] = useState(null)
	const [weapon, setWeapon] = useState(undefined)
	const [armor, setArmor] = useState(undefined)
	const [amulet, setAmulet] = useState(undefined)


	useEffect(() => { database.getUserByID(sid, uid, profileVersion).then(setProfile) }, [])

	useEffect(() => {
		if (profile) {
			if (profile.weapon) database.getObjectByID(sid, profile.weapon).then(setWeapon)
			else setWeapon(null)
			if (profile.armor) database.getObjectByID(sid, profile.armor).then(setArmor)
			else setArmor(null)
			if (profile.amulet) database.getObjectByID(sid, profile.amulet).then(setAmulet)
			else setAmulet(null)
		}
	}, [profile])

	// When data hasn't been loaded yet. Equipment is null if the users has no equipment.
	if (profile === null || weapon === undefined || armor === undefined || amulet === undefined) return (
		<View>
			{/* "Back" button is not rendered it firstAccess is passed as route param */}
			{route.params?.firstAccess !== true && (<StyledButton title="< Back" onPress={navigation.goBack} />)}
			<ActivityIndicator size='large' color='#0000ff' />
		</View>
	)

	// After data has been loaded
	return (
		<View style={styles.container}>
			<UserSettingsContent profile={profile} />
			{/* "Back" button and equipment is not rendered if firstAccess is passed as route param */}
			{route.params?.firstAccess !== true && (
				<View>
					<View style={{ flexDirection: 'row' }}>
						<EquipmentSlot type='weapon' object={weapon} />
						<EquipmentSlot type='armor' object={armor} />
						<EquipmentSlot type='amulet' object={amulet} />
					</View>
					<StyledButton title="v Close v" onPress={navigation.goBack} />
				</View>
			)}
		</View>
	)
}