import { View, Text, Image, Modal, ActivityIndicator } from 'react-native'
import CommunicationController from './CommunicationController'
import { useContext, useState } from 'react'
import * as Context from './Contexts'
import MapView from 'react-native-maps'
import { MarkerObject } from './Custom_components/Markers'
import { StyledButton } from './Custom_components/Buttons'
import { styles } from './Custom_components/Styles'


export default function ObjectDetailsPage({ navigation, route }) {

	const { data, image } = route.params
	const { player: { sid, uid, weaponLevel, armorLevel, amuletLevel }, updatePlayer } = useContext(Context.Player)
	const { nearbyObjects, setNearbyObjects } = useContext(Context.NearbyEntities)
	const { database } = useContext(Context.Database)
	const [shouldOverlayShow, setShouldOverlayShow] = useState(false)

	const setTypeSpecificData = (obj) => {
		let temp
		switch (obj.type) {
			case 'monster':
				temp = {
					popUpMessageWon: "YOU WON!\n\nYou gained " + obj.level + "XP!",
					popUpMessageDied: "YOU DIED\n\nAll experience and items were lost",
					playerUpdateDataDied: { weaponLevel: 0, armorLevel: 0, amuletLevel: 0 },
					infoTitle: 'Danger',
					infoText: 'You could lose ' + Math.round(obj.level - (obj.level / 100) * weaponLevel) + '-' + Math.round(2 * obj.level - (2 * obj.level / 100) * weaponLevel) + ' HP in this fight.',
					buttonText: 'Fight'
				}
				break
			case 'weapon':
				temp = {
					popUpMessage: obj.name + " equipped!\n\nMonsters now deal " + obj.level + "% less damage",
					playerUpdateData: { weaponLevel: obj.level },
					infoTitle: 'Effect',
					infoText: 'Reduces Monster damage by ' + obj.level + '%.',
					compareText: 'Current: ' + weaponLevel + '%',
					buttonText: 'Equip'
				}
				break
			case 'armor':
				temp = {
					popUpMessage: obj.name + " equipped!\n\nMAX HP increased by " + obj.level,
					playerUpdateData: { armorLevel: obj.level },
					infoTitle: 'Effect',
					infoText: 'Increases MAX HP by ' + obj.level + ' points.',
					compareText: 'Current: +' + armorLevel + ' HP',
					buttonText: 'Equip'
				}
				break
			case 'amulet':
				temp = {
					popUpMessage: obj.name + " equipped!\n\nInteraction range increased by " + obj.level + "%",
					playerUpdateData: { amuletLevel: obj.level },
					infoTitle: 'Effect',
					infoText: 'Increases interaction range on map by ' + obj.level + '%.',
					compareText: 'Current: ' + amuletLevel + '%',
					buttonText: 'Equip'
				}
				break
			case 'candy':
				temp = {
					popUpMessage: obj.name + " eaten!\n\nHP restored",
					infoTitle: 'Effect',
					infoText: 'Restores ' + obj.level + '-' + 2 * obj.level + ' HP, up to MAX HP.',
					buttonText: 'Eat'
				}
				break
		}
		return temp
	}

	const [typeData, setTypeData] = useState(setTypeSpecificData(data))

	const activateObject = async (obj) => {
		setShouldOverlayShow(true)
		const res = await CommunicationController.activateObject(sid, obj.id)

		database.insertOrReplaceUser(await CommunicationController.getUserDetails(sid, uid))

		let popUpMessage
		let playerUpdateData
		if (obj.type === 'monster') {
			if (res.died === true) {
				popUpMessage = typeData.popUpMessageDied
				playerUpdateData = typeData.playerUpdateDataDied
			} else {
				popUpMessage = typeData.popUpMessageWon
			}
		} else {
			popUpMessage = typeData.popUpMessage
			playerUpdateData = typeData.playerUpdateData
		}

		if (playerUpdateData) updatePlayer(playerUpdateData)
		// Remove object from nearby objects list. The server will do it (in an eventual release) but until they refresh it would still be there
		setNearbyObjects(nearbyObjects.filter((o) => o.id !== obj.id))

		navigation.reset({
			index: 0,
			routes: [{ name: 'Main', params: { showPopUp: true, popUpMessage: popUpMessage } }],
		})
	}


	return (
		<View style={[styles.container]}>
			<Modal visible={shouldOverlayShow} animationType='fade' transparent={true} >
				<View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'white', opacity: 0.5 }} />
				<ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />
			</Modal>
			<Text style={styles.title}>{data.name}</Text>
			<Text style={{ fontSize: 20, textTransform: 'capitalize' }}>Level {data.level} {data.type}</Text>
			<Image source={image} style={styles.profileImage} />
			<View style={styles.infoBox}>
				<Text style={styles.boldText}>{typeData.infoTitle}</Text>
				<Text style={styles.text}>{typeData.infoText}</Text>
				{typeData.compareText && <Text style={[styles.text, { fontStyle: 'italic' }]}>{typeData.compareText}</Text>}
			</View>
			<MapView
				style={styles.minimapContainer}
				customMapStyle={styles.map}
				toolbarEnabled={false}
				initialRegion={{
					latitude: data.lat,
					longitude: data.lon,
					latitudeDelta: 0.002,	// Set purely by feel,
					longitudeDelta: 0.002,
				}}
				// Lock map, to keep it simple. But maybe it would be better to let the user scroll around?
				scrollEnabled={false}
				zoomEnabled={false}
				rotateEnabled={false}
				pitchEnabled={false}>
				<MarkerObject object={data} disabled={true} />
			</MapView>
			<Text style={{ fontSize: 16, fontStyle: 'italic' }}>Distance: {data.distance}m</Text>
			<StyledButton disabled={!data.withinRange} title={data.withinRange ? typeData.buttonText : "Out of range"} onPress={() => activateObject(data)} />
			<StyledButton title="▼  Close  ▼" onPress={navigation.goBack} />
		</View >
	)
}