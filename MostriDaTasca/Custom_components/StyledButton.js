import { Text, TouchableOpacity, Image, View } from 'react-native';
import { styles } from './Styles';



export const StyledButton = ({ title = null, image = null, onPress = null, disabled = false, style = null }) => <TouchableOpacity onPress={onPress} style={[styles.button, { opacity: disabled ? 0.4 : 1 }, style]} disabled={disabled}>
	<View>
		{title ? <Text style={styles.buttonText}>{title}</Text> : null}
		{image ? <Image source={image} /> : null}
	</View>
</TouchableOpacity>;
