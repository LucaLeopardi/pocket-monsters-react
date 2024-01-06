import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const StyledButton = ({ title, onPress }) => (
	// TODO: Change to TouchableHighlight?
	<TouchableOpacity onPress={onPress} style={styles.button}>
		<Text style={styles.buttonText}>{title}</Text>
	</TouchableOpacity>
)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},

	button: {
		backgroundColor: `red`,
		margin: 2,
		padding: 10,
		borderRadius: 10,
		alignSelf: 'flex-start',
		shadowColor: `black`,
		shadowOpacity: 0.5,
	},

	buttonText: {
		color: `white`,
		fontSize: 16,
		fontWeight: 'bold',
		textTransform: 'uppercase',
	},

	text: {
		fontSize: 16,
	},
})