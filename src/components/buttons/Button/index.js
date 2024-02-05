import {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import Icons from '../../cards/Icons/Icons';
import Colors from '../../../constants/Colors';

// Functional component
const Button = ({
  label,
  labelColor,
  backgroundColor,
  onPress,
  iconname,
  iconType,
  size,
  color,
  borderWidth,
  borderColor,
  disabled,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor:backgroundColor? backgroundColor : disabled ? Colors.primary : Colors.primary,
          // borderWidth: disabled ? 0 : 1,
          // borderColor: disabled ? Colors.primary : Colors.primary,
        },
        containerStyle
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Icons name={iconname} iconType={iconType} size={size} color={color} />
      <Text
        style={[styles.label, {color: labelColor ? labelColor : Colors.white}]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

// Exporting
export default memo(Button);
