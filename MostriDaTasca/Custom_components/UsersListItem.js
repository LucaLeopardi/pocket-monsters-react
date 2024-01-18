import { useNavigation } from '@react-navigation/native'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styles } from './Styles'

export function UsersListItem({ data }) {
	const navigation = useNavigation()

	const image = data.picture ? { uri: 'data:image/png;base64,' + data.picture } : require('../assets/user_icon.png')

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("UserDetails", { data, image })}
			style={styles.listItem}>
			<Image source={image} style={styles.roundImage} />
			<View style={styles.listItemContent}>
				<Text style={styles.boldText}>{data.name}</Text>
				<Text> HP: {data.life} | XP: {data.experience}</Text>
			</View>
		</TouchableOpacity >
	)
}