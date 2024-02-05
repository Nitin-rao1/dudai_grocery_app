import {memo} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

// Functional component
const BadgePill = ({label, labelColor, backgroundColor, viewStyle,txtStyle}) => {
  return (
    <View style={[styles.badge, {backgroundColor: backgroundColor},viewStyle]}>
      <Text style={[styles.label, {color: labelColor}, txtStyle]}>{label}</Text>
    </View>
  );
};

// Exporting
export default memo(BadgePill);
