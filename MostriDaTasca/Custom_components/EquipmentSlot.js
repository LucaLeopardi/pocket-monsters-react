import { Text, Image, View } from 'react-native';
import { getObjectTypeIcon } from './Markers';
import { styles } from './Styles';

export function EquipmentSlot({ type, object }) {
	// Empty item slot
	if (object === null) return (
		<View style={styles.container}>
			<Text style={[styles.boldText, { textTransform: 'capitalize' }]}>{type}</Text>
			<Text style={styles.text}>Empty</Text>
			<Image source={getObjectTypeIcon(type)} style={{ width: 80, height: 80, opacity: 0.5 }} />
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
			<View style={styles.container}>
				<Text style={[styles.boldText, { textTransform: 'capitalize' }]}>{object.type}</Text>
				<Text >{object.name}</Text>
				<Image source={object.image ? { uri: 'item:image/png;base64,' + object.image } : getObjectTypeIcon(type)} style={{ width: 80, height: 80 }} />
				<Text >Level {object.level}</Text>
				<Text style={{ fontStyle: 'italic' }}>{description}</Text>
			</View>
		);
	}
};
