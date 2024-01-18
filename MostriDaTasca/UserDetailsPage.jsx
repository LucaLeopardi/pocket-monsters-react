import { View, Text, Image } from 'react-native'
import { MarkerUser } from './Custom_components/Markers'
import { StyledButton } from './Custom_components/Buttons'
import { styles } from './Custom_components/Styles'
import MapView from 'react-native-maps'

export default function UserDetailsPage({ navigation, route }) {

	const { data, image } = route.params

	const map = data.positionshare ?
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
			<MarkerUser user={data} disabled={true} />
		</MapView>
		:
		<View style={styles.minimapContainer}>
			<Text style={styles.text} > Player has disabled position sharing</Text>
		</View >

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{data.name}</Text>
			<Image source={image} style={styles.profileImage} />
			<Text style={styles.text} > HP: {data.life} | XP: {data.experience}</Text>
			{map}
			<StyledButton title="▼  Close  ▼" onPress={navigation.goBack} />
		</View >
	)
}