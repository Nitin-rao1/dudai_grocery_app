import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import styles from './styles';

const ListViewItemCard = ({ subCategory, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(subCategory)}>
      <View style={styles.itemCard}>
        <Text style={styles.subCategoryText}>{subCategory}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ListViewItemCard);
