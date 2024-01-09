import { View, Text, Image } from 'react-native'
import { MarkerObject, StyledButton, styles } from './CustomComponents'
import CommunicationController from './CommunicationController'
import { useContext, useState } from 'react'
import * as Context from './Contexts'
import MapView from 'react-native-maps'

export default function ObjectDetailsPage({ navigation, route }) {

	const { data, image } = route.params
	const { player: { sid, uid, weaponLevel, armorLevel, amuletLevel }, updatePlayer } = useContext(Context.Player)
	const { database } = useContext(Context.Database)
	console.log(weaponLevel, armorLevel, amuletLevel)

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
		const res = await CommunicationController.activateObject(sid, obj.id)
		console.log(res)

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

		navigation.reset({
			index: 0,
			routes: [{ name: 'Main', params: { showPopUp: true, popUpMessage: popUpMessage } }],
		})
	}


	return (
		<View>
			<StyledButton title="< Back" onPress={navigation.goBack} />
			<Text style={{ fontSize: 30, fontWeight: 'bold' }}>{data.name}</Text>
			<Image source={image} style={{ width: 200, height: 200 }} />
			<Text style={{ fontSize: 20, textTransform: 'uppercase' }}>Level {data.level} {data.type}</Text>
			<Text style={{ fontSize: 16, fontWeight: 'bold' }}>{typeData.infoTitle}</Text>
			<Text style={{ fontSize: 16, fontStyle: 'italic' }}>{typeData.infoText}</Text>
			{typeData.compareText && <Text style={{ fontSize: 16, fontStyle: 'italic' }}>{typeData.compareText}</Text>}
			<StyledButton disabled={!data.withinRange} title={data.withinRange ? typeData.buttonText : "Out of range"} onPress={() => activateObject(data)} />
			<MapView
				style={{ width: '80%', height: 200 }}
				customMapStyle={styles.map}
				toolbarEnabled={false}
				initialRegion={{
					latitude: data.lat,
					longitude: data.lon,
					latitudeDelta: 0.006,	// Set purely by feel,
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
		</View>
	)
}