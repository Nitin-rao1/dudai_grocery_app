import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Colors from '../../../constants/Colors';
import styles from './styles';

const CategoryItemCard = ({
  image,
  label,
  labelColor,
  backgroundColor,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
       <View  style={styles.itemImageLabelWrapper}> 
      <View
        style={[
          styles.itemImageWrapper,
          {
            backgroundColor: Colors.primary,
          },
        ]}
      >
        <Image source={{uri:image}} style={styles.itemImage}/>
      </View>
        <View style={styles.labelContainer}>
          <Text 
            style={[styles.label, { color: Colors.white }]}>{label}</Text>
        </View>
        </View>
    </TouchableOpacity>
  );
};

export default memo(CategoryItemCard);
