import {memo, useState} from 'react';
import {Text, View, Image, Pressable} from 'react-native';
import styles from './styles';
import Colors from '../../constants/Colors';

// Functional component
const NoProducts = ({
    index,
  itemImage,
  itemName,
  originalPrice,
  weight,
  discountedPrice,
}) => {
  return (
    
      <View key={`noproduct${index}`} style={[styles.card, {backgroundColor: Colors.inactive}]}>
        <Pressable
          onPress={() => {
            alert('Not avalible');
          }}>
          <View style={styles.squareButtonComponentWrapper}></View>
          <View style={styles.itemImageWrapper}>
            <Image source={{uri: itemImage}} style={styles.itemImage} />
          </View>
          <View>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={[styles.itemName, {color: Colors.textHighContrast}]}>
              {itemName}
            </Text>
            <View style={styles.ratingWrapper}>
              <Text
                style={[styles.itemweight, {color: Colors.textHighContrast}]}>
                {weight}
              </Text>
            </View>
            {originalPrice && (
              <Text style={[styles.itemOriginalPrice, {color: Colors.primary}]}>
                {originalPrice}
              </Text>
            )}
            <View style={styles.itemPriceWrapper}>
              <Text
                style={[
                  styles.itemDiscountedPrice,
                  {color: Colors.textHighContrast},
                ]}>
                {discountedPrice}
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    
  );
};

// Exporting
export default memo(NoProducts);
