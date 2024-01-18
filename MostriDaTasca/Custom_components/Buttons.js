import { Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './Styles';


export const StyledButton = ({ title, onPress, disabled = false, style }) =>
	<TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.styledButton, { opacity: disabled ? 0.4 : 1 }, style]} >
		<Text style={styles.buttonText}>{title}</Text>
	</TouchableOpacity>

export const ImageButton = ({ image, onPress, disabled = false, style }) =>
	<TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.imageButton, { opacity: disabled ? 0.4 : 1 }, style]}>
		<Image source={image} style={styles.imageButtonImage} />
	</TouchableOpacity>
