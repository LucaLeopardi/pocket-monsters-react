import { Text, Image, View } from 'react-native';
import { getObjectTypeIcon } from './Markers';

export const EquipmentSlot = ({ type, object }) => {
	// Empty item slot
	if (object === null) return (
		<View>
			<Text style={{ fontSize: 20, fontWeight: 'bold', textTransform: 'capitalize' }}>{type}</Text>
			<Text style={{ fontSize: 16 }}>Empty</Text>
			<Image source={getObjectTypeIcon(type)} style={{ width: 100, height: 100, opacity: 0.5 }} />
		</View>
	);

	// Item info
	else {
		let description;
		switch (object.type) {
			case 'weapon':
				description = "+ " + object.level + "% DMG RES";
				break;
			case 'armor':
				description = "+ " + object.level + " HP";
				break;
			case 'amulet':
				description = "+ " + object.level + "% Reach";
				break;
		}
		return (
			<View>
				<Text style={{ fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' }}>{object.type}</Text>
				<Text style={{ fontSize: 16, textTransform: 'capitalize' }}>{object.name}</Text>
				<Image source={object.image ? { uri: 'item:image/png;base64,' + object.image } : getObjectTypeIcon(type)} style={{ width: 100, height: 100 }} />
				<Text style={{ fontSize: 16 }}>Level {object.level}</Text>
				<Text style={{ fontSize: 16, fontStyle: 'italic' }}>{description}</Text>
			</View>
		);
	}
};
