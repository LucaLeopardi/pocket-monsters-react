import { View, Text, Image } from 'react-native'
import { MarkerUser } from './Custom_components/Markers'
import { StyledButton } from './Custom_components/StyledButton'
import { styles } from './Custom_components/Styles'
import MapView from 'react-native-maps'

export default function UserDetailsPage({ navigation, route }) {

	const { data, image } = route.params

	const map = <MapView
		style={{ width: '80%', height: 200 }}
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

	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 32, fontWeight: 'bold' }}>{data.name}</Text>
			<Image source={image} style={{ width: 200, height: 200 }} />
			<Text>HP: {data.life} | XP: {data.experience}</Text>
			{data.positionshare ? map : <Text style={{ width: '80%', height: 200 }}>Player has disabled position sharing</Text>}
			<StyledButton title="v Close v" onPress={navigation.goBack} />
		</View >
	)
}