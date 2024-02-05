import {memo, useContext, useState} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {IndependentColors} from '../../../config/Colors';
import Cart from '../../../assets/icons/svg/Cart.svg';
import Plus from '../../../assets/icons/svg/Plus.svg';
import Minus from '../../../assets/icons/svg/Minus.svg';
import BadgePill from '../../badges/BadgePill';
import ButtonSquared from '../../buttons/ButtonSquared';
import ButtonCircled from '../../buttons/ButtonCircled';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {STANDARD_VECTOR_ICON_SIZE} from '../../../config/Constants';
import styles from './styles';
import {ThemeContext} from '../../../theming/ThemeContext';
import {useDispatch} from 'react-redux';
import {addItemToCart} from '../../../redux/slices/CartSlice';

// Functional component
const ListViewItemCard = ({
  cardBackgroundColor,
  heartIconColor,
  heartButtonBackgroundColor,
  itemImageBackgroundColor,
  itemImage,
  itemName,
  itemNameColor,
  itemOriginalPrice,
  itemOriginalPriceColor,
  itemDiscountedPrice,
  itemDiscountedPriceColor,
  rating,
  ratingColor,
  ratingCount,
  ratingCountColor,
  ratingStatus,
  weight,
  quantity,
  actionButtonBackgroundColor,
  onPress,
  item,
  cartbutton,
  Increasebutton,
  Decreasebutton,
}) => {
  //  console.log('item.quantity======>',item.quantity);
  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;
  // Returning
  return (
    <Pressable
      style={[styles.card, {backgroundColor: cardBackgroundColor}]}
      onPress={onPress}>
      {/* Item image wrapper */}
      <View
        style={[
          styles.itemImageWrapper,
          {backgroundColor: itemImageBackgroundColor},
        ]}>
        {/* Heart button */}
        <View style={[styles.heartButtonWrapper]}>
          <ButtonCircled
            height={32}
            icon={
              <IonIcons
                name="heart-outline"
                size={STANDARD_VECTOR_ICON_SIZE}
                color={heartIconColor}
              />
            }
            backgroundColor={heartButtonBackgroundColor}
          />
        </View>

        {/* Itemm image */}
        <Image source={itemImage} style={styles.itemImage} />
      </View>

      <View style={styles.itemDetailsWrapper}>
        <View>
          {/* Item name */}
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={[styles.itemName, {color: itemNameColor}]}>
            {itemName}
          </Text>
          {/* weight */}
          <View style={styles.ratingWrapper}>
            <Text style={[styles.ratingCount, {color: ratingCountColor}]}>
              {weight}
            </Text>
          </View>
        </View>

        <View style={styles.itemPriceAndCartButtonWrapper}>
          {/* Item price */}
          <View style={styles.itemPriceWrapper}>
            <Text
              style={[
                styles.itemOriginalPrice,
                {color: itemOriginalPriceColor},
              ]}>
              {itemOriginalPrice}
            </Text>
            <Text
              style={[
                styles.itemDiscountedPrice,
                {color: itemDiscountedPriceColor},
              ]}>
              {itemDiscountedPrice}
            </Text>
          </View>

          {/* Cart button */}
          <View style={styles.itemQuantityWrapper}>
            {/* Increase button */}

            {item.quantity == 0 ? (
              <ButtonSquared
                height={32}
                icon={
                  <Cart
                    width={STANDARD_VECTOR_ICON_SIZE}
                    height={STANDARD_VECTOR_ICON_SIZE}
                  />
                }
                backgroundColor={actionButtonBackgroundColor}
                onPress={() => cartbutton(item)}
              />
            ) : null}
            {item.quantity > 0 ? (
              <>
                <ButtonSquared
                  height={28}
                  icon={
                    <Plus
                      width={STANDARD_VECTOR_ICON_SIZE}
                      height={STANDARD_VECTOR_ICON_SIZE}
                    />
                  }
                  onPress={() => Increasebutton()}
                  backgroundColor={actionButtonBackgroundColor}
                />
                <Text
                  style={[
                    styles.itemQuantity,
                    {color: theme.textHighContrast},
                  ]}>
                  {item.quantity}
                </Text>
                <ButtonSquared
                  height={28}
                  icon={
                    <Minus
                      width={STANDARD_VECTOR_ICON_SIZE}
                      height={STANDARD_VECTOR_ICON_SIZE}
                    />
                  }
                  onPress={() => Decreasebutton()}
                  backgroundColor={actionButtonBackgroundColor}
                />
              </>
            ) : null}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

// Exporting
export default memo(ListViewItemCard);

// {
//   item.quantity === 0 ? (
//     <ButtonSquared
//       height={32}
//       icon={
//         <Cart
//           width={STANDARD_VECTOR_ICON_SIZE}
//           height={STANDARD_VECTOR_ICON_SIZE}
//         />
//       }
//       backgroundColor={actionButtonBackgroundColor}
//       onPress={() => cartbutton(item)}
//     />
//   ) : (
//     <>
//       <ButtonSquared
//         height={28}
//         icon={
//           <Plus
//             width={STANDARD_VECTOR_ICON_SIZE}
//             height={STANDARD_VECTOR_ICON_SIZE}
//           />
//         }
//         onPress={onPress}
//         backgroundColor={actionButtonBackgroundColor}
//       />
//       <Text style={[styles.itemQuantity, {color: theme.textHighContrast}]}>
//         {quantity}
//       </Text>
//       <ButtonSquared
//         height={28}
//         icon={
//           <Minus
//             width={STANDARD_VECTOR_ICON_SIZE}
//             height={STANDARD_VECTOR_ICON_SIZE}
//           />
//         }
//         onPress={onPress}
//         backgroundColor={actionButtonBackgroundColor}
//       />
//     </>
//   );
// }
