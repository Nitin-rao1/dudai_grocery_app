import {memo, useState} from 'react';
import {
  TextInput as RNTextInput,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import styles from './styles';
import Eyeclose from '../../../assets/icons/svg/Eyeclose.svg';
import EyeOpen from '../../../assets/icons/svg/EyeOpen.svg';
import {STANDARD_VECTOR_ICON_SIZE} from '../../../config/Constants';
import Colors from '../../../constants/Colors';
import mainStyles from '../../../constants/MainStyles';

const TextInput = ({
  label,
  labelColor,
  placeholder,
  placeholderTextColor,
  leftIcon,
  rightIcon,
  backgroundColor,
  textInputValueColor,
  numberOfLines,
  value,
  style,
  onChangeText,
  keyboardType, // Pass secureTextEntry directly
  secureTextEntry,
  isshow,
  autoCapitalize,
  editable,
}) => {
  const [hidePassword, setHidePassword] = useState(secureTextEntry);

  return (
    <>
    {!isshow && 
    
    <View style={mainStyles.marginTop1}  />
    }
    {label && 
    
      <Text style={[styles.label, {color: labelColor}]}>{label}</Text>
    }
      <View style={[styles.textInputWrapper, {backgroundColor: Colors.inactive}]}>
        {leftIcon && (
          <View style={styles.textInputIconWrapper}>{leftIcon}</View>
        )}

        <RNTextInput
          placeholder={placeholder}
          style={{
            ...{...styles.textInput, ...{color: textInputValueColor}},
            ...style,
          }}
          placeholderTextColor={placeholderTextColor}
          value={value}
          keyboardType={keyboardType}
          numberOfLines={numberOfLines}
          onChangeText={onChangeText}
          autoCapitalize={autoCapitalize}
          editable={editable}
          secureTextEntry={hidePassword} // Use secureTextEntry directly here
        />

        {secureTextEntry && ( // Conditionally render the eye icons based on secureTextEntry
          <Pressable
            onPress={() => {
              // console.log('hidePassword', hidePassword);
              setHidePassword(!hidePassword);
            }}>
            <View style={styles.textInputIconWrapper}>
              {hidePassword ? (
                <Eyeclose
                  width={STANDARD_VECTOR_ICON_SIZE}
                  height={STANDARD_VECTOR_ICON_SIZE}
                />
              ) : (
                <EyeOpen
                  width={STANDARD_VECTOR_ICON_SIZE}
                  height={STANDARD_VECTOR_ICON_SIZE}
                />
              )}
            </View>
          </Pressable>
        )}
      </View>
    </>
  );
};

export default memo(TextInput);
