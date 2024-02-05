import {memo} from 'react';
import {Pressable, TouchableOpacity} from 'react-native';
import styles from './styles';
import {scale} from 'react-native-size-matters';

// Functional component
const ButtonSquared = ({height, icon, backgroundColor,onPress}) => {
  return (
    <Pressable
      style={[
        styles.button,
        {
          height: scale(height),
          backgroundColor: backgroundColor,
          borderRadius: height * 0.2,
        },
      ]} onPress={onPress}>
      {icon}
    </Pressable>
  );
};

// Exporting
export default memo(ButtonSquared);
