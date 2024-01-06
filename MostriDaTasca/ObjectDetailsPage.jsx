import { View, Text, Button, Image } from 'react-native'
import { StyledButton } from './CustomComponents'

export default function ObjectDetailsPage({ navigation, route }) {

	const { data, image } = route.params

	// TODO: Effect and relative message
	const navigateToMainWithMessage = (message) => {
		navigation.reset({
			index: 0,
			routes: [{ name: 'Main', params: { showPopUp: true, popUpMessage: message } }],
		})
	}

	const getObjectTypeContent = (obj) => {
		switch (obj.type) {
			case 'monster':
				return (<View>
					<Text style={{ fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' }}>Danger</Text>
					<Text style={{ fontSize: 16, fontStyle: 'italic' }}>You could lose {obj.level}-{2 * obj.level} HP (ignoring equipment) in this fight.</Text>
					<StyledButton title='Fight' onPress={() => navigateToMainWithMessage("Monster " + obj.name + " activated.")} />
				</View>)
			case 'weapon':
				return (<View>
					<Text style={{ fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' }}>Effect</Text>
					<Text style={{ fontSize: 16, fontStyle: 'italic' }}>Reduces Monster damage by {obj.level}%.</Text>
					<StyledButton title='Equip' onPress={() => navigateToMainWithMessage("Item " + obj.name + " activated.")} />
				</View>)
			case 'armor':
				return (<View>
					<Text style={{ fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' }}>Effect</Text>
					<Text style={{ fontSize: 16, fontStyle: 'italic' }}>Increases HP by {obj.level} points.</Text>
					<StyledButton title='Equip' onPress={() => navigateToMainWithMessage("Item " + obj.name + " activated.")} />
				</View>)
			case 'amulet':
				return (<View>
					<Text style={{ fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' }}>Effect</Text>
					<Text style={{ fontSize: 16, fontStyle: 'italic' }}>Increases map range by {obj.level}%.</Text>
					<StyledButton title='Equip' onPress={() => navigateToMainWithMessage("Item " + obj.name + " activated.")} />
				</View>)
			case 'candy':
				return (<View>
					<Text style={{ fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' }}>Effect</Text>
					<Text style={{ fontSize: 16, fontStyle: 'italic' }}>Restores {obj.level}-{2 * obj.level} HP, up to MAX HP.</Text>
					<StyledButton title='Eat' onPress={() => navigateToMainWithMessage("Candy " + obj.name + " activated.")} />
				</View>)
			default:

		}
	}

	return (
		<View>
			<Button title="< Back" onPress={navigation.goBack} />
			<Text style={{ fontSize: 26, fontWeight: 'bold' }}>{data.name}</Text>
			<Image source={image} style={{ width: 200, height: 200 }} />
			<Text style={{ fontSize: 20 }}>Level {data.level} {data.type}</Text>
			{getObjectTypeContent(data)}
		</View>
	)
}