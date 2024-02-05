import {memo, useState} from 'react';
import {Text, View, Image, Pressable} from 'react-native';
import {scale} from 'react-native-size-matters';
import {IndependentColors} from '../../config/Colors';
import Plus from '../../assets/icons/svg/Plus.svg';
import Minus from '../../assets/icons/svg/Minus.svg';
import Cart from '../../assets/icons/svg/Cart.svg';
// import ButtonSquared from '../../buttons/ButtonSquared';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {STANDARD_VECTOR_ICON_SIZE} from '../../config/Constants';
import styles from './styles';
import {
  addItemToCart,
  reduceItemFromCart,
  increaseQty,
} from '../../redux/slices/CartSlice';
import {useDispatch, useSelector} from 'react-redux';
import {
  decreaseProductCount,
  increaseProductCount,
} from '../../redux/slices/HomeproductsSlice';
import Colors from '../../constants/Colors';
import {
  addToFavorite,
  logoutToggleFavorite,
  toggleFavorite,
} from '../../redux/slices/WishlistSlice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  logoutToCart,
  removeFromCart,
} from '../../redux/slices/ProductsCartSlice';
import {updateUser} from '../../redux/slices/SessionUser';
import ButtonSquared from '../../components/buttons/ButtonSquared';

// Functional component
const NotificationProduct = ({

  itemImage,
  itemName,
  originalPrice,
  weight,
  discountedPrice,
  onPress,
  item,
  favourite,
  index,
  itemId,
  productCartQuntity,
  promotion,
  promotionData,
  productDecrease,
  productIncreases
}) => {

const [productQty, setProductQty] = useState(0)


  const handleIncreaseButtonClick = (val) => {
      const qty = productQty+1;
      const priceProduct = val.PricePerItem;
    setProductQty(qty)
    productIncreases({qty:qty,priceProduct:priceProduct, product:val})

  
  };

  const handleDecreaseButtonClick = val => {
    const qty = productQty-1;
    const priceProduct = val.PricePerItem;
    setProductQty(qty)
    productDecrease({qty:qty,priceProduct:priceProduct, product:val})
  };


  return (
  
      <View  style={[styles.card, {backgroundColor: Colors.inactive}]}>
        {productQty > 0 ? (
          <View
            style={[
              styles.card,
              {
                backgroundColor: Colors.black + 80,
                height: wp('39'),
                width: wp('30'),
                marginBottom: hp('1'),
                position: 'absolute',
                zIndex: 1,
              },
            ]}>
            <View
              style={{
                width: wp('30'),
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'space-around',
              }}>
              {/* Minus button */}
              <ButtonSquared
                height={18}
                icon={<Minus width={scale(13)} height={scale(13)} />}
                onPress={() => handleDecreaseButtonClick(item)}
                backgroundColor={Colors.white}
              />
              {/* Quantity */}
              <Text style={[styles.quantity, {color: Colors.white}]}>
                {productQty}
              </Text>
              {/* Plus button */}
              <ButtonSquared
                height={18}
                icon={<Plus width={scale(13)} height={scale(13)} />}
                onPress={() => handleIncreaseButtonClick(item)}
                backgroundColor={Colors.white}
              />
            </View>
          </View>
        ) : null}
        <Pressable
          onPress={() => {
            handleIncreaseButtonClick(item);
          }}>
         
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
              <View style={styles.itemQuantityIncreaseDecreaseButtonWrapper}>
                <View style={{marginRight: wp('1')}}>
                  <ButtonSquared
                    height={18}
                    icon={<Cart width={scale(15)} height={scale(15)} />}
                    onPress={() => {
                      handleIncreaseButtonClick(item);
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
   
  );
};

// Exporting
export default memo(NotificationProduct);
