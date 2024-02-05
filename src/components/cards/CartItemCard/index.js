import {memo} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {IndependentColors} from '../../../config/Colors';
import Plus from '../../../assets/icons/svg/Plus.svg';
import Minus from '../../../assets/icons/svg/Minus.svg';
import Trash from '../../../assets/icons/svg/Trash.svg';
import BadgePill from '../../badges/BadgePill';
import ButtonSquared from '../../buttons/ButtonSquared';
import ButtonCircled from '../../buttons/ButtonCircled';
import {STANDARD_VECTOR_ICON_SIZE} from '../../../config/Constants';
import styles from './styles';
import Colors from '../../../constants/Colors';
import {scale} from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Functional component
const CartItemCard = ({
  onCardPress,
  cardBackgroundColor,
  trashButtonBackgroundColor,
  itemImageBackgroundColor,
  itemImage,
  itemName,
  itemNameColor,
  itemPrice,
  itemPriceColor,
  itemQuantity,
  itemQuantityColor,
  itemType,
  actionButtonBackgroundColor,
  item,
  IncreaseButton,
  Decreasebutton,
  quantity,
  deleteItem,
}) => {
  // Returning
  return (
    <Pressable
      style={[styles.card, {backgroundColor: cardBackgroundColor}]}
      onPress={onCardPress}>
      {/* Item image wrapper */}
      <View
        style={[
          styles.itemImageWrapper,
          {backgroundColor: itemImageBackgroundColor},
        ]}>
        {/* Trash button */}
        <View style={[styles.trashButtonWrapper]}>
          <ButtonCircled
            height={32}
            icon={
              <Trash
                width={STANDARD_VECTOR_ICON_SIZE}
                height={STANDARD_VECTOR_ICON_SIZE}
              />
            }
            backgroundColor={trashButtonBackgroundColor}
            onPress={deleteItem}
          />
        </View>

        {/* Itemm image */}
        <Image source={{uri: itemImage}} style={styles.itemImage} />
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

          {/* Badge */}
          <BadgePill
            label={quantity}
            txtStyle={{fontSize: scale(10), color: Colors.inputBorderColor}}
            viewStyle={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              // height: 10,
            }}
            // labelColor={Colors.red}
            // backgroundColor={Colors.white}
          />
          {/* {itemType === 'Non veg' ? (
            <BadgePill
              label={'Non veg'}
              labelColor={IndependentColors.red}
              backgroundColor={IndependentColors.redLightest}
            />
          ) : (
            <BadgePill
              label={'Pure veg'}
              labelColor={IndependentColors.green}
              backgroundColor={IndependentColors.greenLightest}
            />
          )} */}
        </View>

        <View style={styles.itemPriceQuantityWrapper}>
          {/* Item price */}
          <View style={{width: wp('25'), justifyContent: 'center'}}>
            <Text style={[styles.itemPrice, {color: itemPriceColor}]}>
              {itemPrice}
            </Text>
          </View>

          <View style={styles.itemQuantityIncreaseDecreaseButtonWrapper}>
            {/* Decrease button */}
            {item.quantity == 0 ? null : (
              <ButtonSquared
                height={32}
                icon={
                  <Minus
                    width={STANDARD_VECTOR_ICON_SIZE}
                    height={STANDARD_VECTOR_ICON_SIZE}
                  />
                }
                onPress={() => Decreasebutton(item)}
                backgroundColor={actionButtonBackgroundColor}
              />
            )}
            {/* Quantity */}
            {item.quantity == 0 ? null : (
              <Text style={[styles.quantity, {color: itemQuantityColor}]}>
                {itemQuantity}
              </Text>
            )}
            {/* Increase button */}
            {item.quantity == 0 ? null : (
              <ButtonSquared
                height={32}
                icon={
                  <Plus
                    width={STANDARD_VECTOR_ICON_SIZE}
                    height={STANDARD_VECTOR_ICON_SIZE}
                  />
                }
                onPress={() => IncreaseButton(item)}
                backgroundColor={actionButtonBackgroundColor}
              />
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

// Exporting
export default memo(CartItemCard);
