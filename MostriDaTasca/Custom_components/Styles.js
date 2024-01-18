import { StyleSheet } from 'react-native';

const backgroundColor = '#f7f6f4'
const primaryColor = '#FFE171'
const secondaryColor = '#ccc6b2'

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 10,
		backgroundColor: backgroundColor,
	},
	containerMinusTheMargin: {
		flex: 1,
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: backgroundColor,
	},
	styledButton: {
		backgroundColor: primaryColor,
		padding: 12,
		borderRadius: 5,
		alignSelf: 'center',
	},
	buttonText: {
		color: 'black',
		fontSize: 16,
		fontWeight: 'bold',
		textTransform: 'uppercase',
	},
	imageButton: {
		backgroundColor: primaryColor,
		width: 80,
		height: 80,
		borderRadius: 40,
		padding: 10,
		alignSelf: 'center',
		position: 'absolute',
	},
	imageButtonImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain'
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	boldText: {
		fontWeight: 'bold',
		fontSize: 18,
	},
	text: {
		fontSize: 16,
		padding: 5,
	},
	profileImage: {
		width: 150,
		height: 150,
		borderRadius: 5,
	},
	list: {
		flex: 1,
		width: '100%',
		margin: 10,
		backgroundColor: secondaryColor,
		paddingHorizontal: 30,
		paddingVertical: 3,
	},
	listItem: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 5,
		borderRadius: 5,
		marginVertical: 3,
		backgroundColor: backgroundColor,
	},
	listItemContent: {
		flexDirection: 'column',
		paddingLeft: 20,
	},
	roundImage: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	minimapContainer: {
		width: '80%',
		height: 150,
		backgroundColor: '#0003',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		margin: 10,
	},
	infoBox: {
		backgroundColor: secondaryColor,
		padding: 5,
		borderRadius: 5,
		marginTop: 0,
		alignItems: 'center',
	},
	popUp: {
		backgroundColor: backgroundColor,
		padding: 10,
		borderRadius: 5,
		position: 'absolute',
		alignSelf: 'center',
		top: '40%',
	},
	map: [
		{
			"featureType": "administrative",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#6195a0"
				}
			]
		},
		{
			"featureType": "administrative.province",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "landscape",
			"elementType": "geometry",
			"stylers": [
				{
					"lightness": "0"
				},
				{
					"saturation": "0"
				},
				{
					"color": "#f5f5f2"
				},
				{
					"gamma": "1"
				}
			]
		},
		{
			"featureType": "landscape.man_made",
			"elementType": "all",
			"stylers": [
				{
					"lightness": "-3"
				},
				{
					"gamma": "1.00"
				}
			]
		},
		{
			"featureType": "landscape.natural.terrain",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "poi",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "poi.park",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#bae5ce"
				},
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "road",
			"elementType": "all",
			"stylers": [
				{
					"saturation": -100
				},
				{
					"lightness": 45
				},
				{
					"visibility": "simplified"
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "simplified"
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#fac9a9"
				},
				{
					"visibility": "simplified"
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "labels.text",
			"stylers": [
				{
					"color": "#4e4e4e"
				}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#787878"
				}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "labels.icon",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "transit",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "simplified"
				}
			]
		},
		{
			"featureType": "transit.station.airport",
			"elementType": "labels.icon",
			"stylers": [
				{
					"hue": "#0a00ff"
				},
				{
					"saturation": "-77"
				},
				{
					"gamma": "0.57"
				},
				{
					"lightness": "0"
				}
			]
		},
		{
			"featureType": "transit.station.rail",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#43321e"
				}
			]
		},
		{
			"featureType": "transit.station.rail",
			"elementType": "labels.icon",
			"stylers": [
				{
					"hue": "#ff6c00"
				},
				{
					"lightness": "4"
				},
				{
					"gamma": "0.75"
				},
				{
					"saturation": "-68"
				}
			]
		},
		{
			"featureType": "water",
			"elementType": "all",
			"stylers": [
				{
					"color": "#eaf6f8"
				},
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "water",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#c7eced"
				}
			]
		},
		{
			"featureType": "water",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"lightness": "-49"
				},
				{
					"saturation": "-53"
				},
				{
					"gamma": "0.79"
				}
			]
		}
	]
});
