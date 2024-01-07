import { View, Text, Image } from 'react-native'
import { StyledButton } from './CustomComponents'
import CommunicationController from './CommunicationController'
import { useContext } from 'react'
import * as Context from './Contexts'

export default function ObjectDetailsPage({ navigation, route }) {

	const { data, image } = route.params
	const { player: { sid, uid, weaponLevel }, updatePlayer } = useContext(Context.Player)
	const { database } = useContext(Context.Database)

	// TODO: Effect and relative message
	const activateObject = async (obj) => {
		const res = await CommunicationController.activateObject(sid, obj.id)

		// Update player data
		database.insertOrReplaceUser(await CommunicationController.getUserDetails(sid, uid))

		let popUpMessage
		switch (obj.type) {
			case 'monster':
				if (res.died === true) {
					popUpMessage = "YOU DIED\n\nAll experience and items were lost"
					updatePlayer({ weaponLevel: 0, armorLevel: 0, amuletLevel: 0 })
				}
				else popUpMessage = "YOU WON!\n\nXP is now " + res.experience
				break
			case 'weapon':
				updatePlayer({ weaponLevel: obj.level })
				popUpMessage = obj.name + " equipped!\n\nMonsters now deal " + obj.level + "% less damage"
				break
			case 'armor':
				updatePlayer({ armorLevel: obj.level })
				popUpMessage = obj.name + " equipped!\n\nMax HP increased by " + obj.level
				break
			case 'amulet':
				updatePlayer({ amuletLevel: obj.level })
				popUpMessage = obj.name + " equipped!\n\nInteraction range increased by " + obj.level + "%"
				break
			case 'candy':
				popUpMessage = obj.name + " eaten!\n\nHP is now " + res.life
				break
		}
		navigation.reset({
			index: 0,
			routes: [{ name: 'Main', params: { showPopUp: true, popUpMessage: popUpMessage } }],
		})

	}

	const getObjectTypeContent = (obj) => {
		switch (obj.type) {
			case 'monster':
				return (<View>
					<Text style={{ fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' }}>Danger</Text>
					<Text style={{ fontSize: 16, fontStyle: 'italic' }}>You could lose {Math.round(obj.level - (obj.level / 100) * weaponLevel)}-{Math.round(2 * obj.level - (2 * obj.level / 100) * weaponLevel)} HP in this fight.</Text>
					<StyledButton title='Fight' onPress={() => activateObject(obj)} />
				</View>)
			case 'weapon':
				return (<View>
					<Text style={{ fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' }}>Effect</Text>
					<Text style={{ fontSize: 16, fontStyle: 'italic' }}>Reduces Monster damage by {obj.level}%.</Text>
					<StyledButton title='Equip' onPress={() => activateObject(obj)} />
				</View>)
			case 'armor':
				return (<View>
					<Text style={{ fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' }}>Effect</Text>
					<Text style={{ fontSize: 16, fontStyle: 'italic' }}>Increases HP by {obj.level} points.</Text>
					<StyledButton title='Equip' onPress={() => activateObject(obj)} />
				</View>)
			case 'amulet':
				return (<View>
					<Text style={{ fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' }}>Effect</Text>
					<Text style={{ fontSize: 16, fontStyle: 'italic' }}>Increases map range by {obj.level}%.</Text>
					<StyledButton title='Equip' onPress={() => activateObject(obj)} />
				</View>)
			case 'candy':
				return (<View>
					<Text style={{ fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' }}>Effect</Text>
					<Text style={{ fontSize: 16, fontStyle: 'italic' }}>Restores {obj.level}-{2 * obj.level} HP, up to MAX HP.</Text>
					<StyledButton title='Eat' onPress={() => activateObject(obj)} />
				</View>)
		}
	}

	return (
		<View>
			<StyledButton title="< Back" onPress={navigation.goBack} />
			<Text style={{ fontSize: 26, fontWeight: 'bold' }}>{data.name}</Text>
			<Image source={image} style={{ width: 200, height: 200 }} />
			<Text style={{ fontSize: 20 }}>Level {data.level} {data.type}</Text>
			{getObjectTypeContent(data)}
		</View>
	)
}