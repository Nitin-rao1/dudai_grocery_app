import {memo, useState} from 'react';
import {Text, View, Image, Pressable} from 'react-native';
import {scale} from 'react-native-size-matters';
import {IndependentColors} from '../../../config/Colors';
import Plus from '../../../assets/icons/svg/Plus.svg';
import Minus from '../../../assets/icons/svg/Minus.svg';
import Cart from '../../../assets/icons/svg/Cart.svg';
import ButtonSquared from '../../buttons/ButtonSquared';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {STANDARD_VECTOR_ICON_SIZE} from '../../../config/Constants';
import styles from './styles';
import {
  addItemToCart,
  reduceItemFromCart,
  increaseQty,
} from '../../../redux/slices/CartSlice';
import {useDispatch, useSelector} from 'react-redux';
import {
  decreaseProductCount,
  increaseProductCount,
} from '../../../redux/slices/HomeproductsSlice';
import Colors from '../../../constants/Colors';
import {
  addToFavorite,
  logoutToggleFavorite,
  toggleFavorite,
} from '../../../redux/slices/WishlistSlice';
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
} from '../../../redux/slices/ProductsCartSlice';
import {updateUser} from '../../../redux/slices/SessionUser';

// Functional component
const OrderagainitemCard = ({

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
}) => {
  const userInfo = useSelector(state => state.users.users);

  const dispatch = useDispatch();

  const handleIncreaseButtonClick = (val, img) => {


    const isDatata = {
      Barcode: val?.Barcode ? val?.Barcode : '',
      BranchIndex: val?.BranchIndex ? val?.BranchIndex : '',
      Category: val?.Category ? val?.Category : '',
      ImageID: val?.ImageID ? val?.ImageID : '',
      ImageName: val?.ImageName ? val?.ImageName : 'null',

      IsInStock: val?.IsInStock ? val?.IsInStock : true,
      IsInStore: val?.IsInStore ? val?.IsInStore : true,
      IsSelectedByBrand: val?.IsSelectedByBrand ? val?.IsSelectedByBrand : true,
      LowercaseName: val?.LowercaseName ? val?.LowercaseName : val?.Product ? val?.Product : '',
      Name: val?.Name ? val?.Name : val?.Product,
      ParentCategory: val?.ParentCategory ? val?.ParentCategory : 'null',
      Price: val?.Price ? val?.Price : 0,
      Priority: val?.Priority ? val?.Priority : '',
      Quantity: val?.Quantity ? val?.Quantity : '',
      createdAt: val?.createdAt
        ? val?.createdAt
        : {__type: 'Date', iso: new Date()},
      isGramBased: val?.isGramBased ? val?.isGramBased : false,
      objectId: val?.objectId ? val?.objectId : val?.ProductId,
      updatedAt: val?.updatedAt
        ? val?.updatedAt
        : {__type: 'Date', iso: new Date()},

      PromotionId: promotion ? promotionData?.objectId : '',
      PromotionTitle: promotion ? promotionData?.Title : '',
      PromotionType: promotion ? promotionData?.PromotionType : '',
      PricePerItem: promotion ? val?.Price : '',
      DiscountedPricePerItem: promotion ? val?.newPrice : '',
      Vat: '',
      Plu: '',
    };
    const productImageUrl = img;
    const productTotalAmount = userInfo.productTotalAmount + val?.Price;

    dispatch(addToCart({...isDatata, productImageUrl: productImageUrl}));
    dispatch(updateUser({productTotalAmount: productTotalAmount}));
  };

  const handleDecreaseButtonClick = val => {
    const productTotalAmount = userInfo.productTotalAmount - val.Price;

    dispatch(decreaseQuantity(val.objectId));
    dispatch(updateUser({productTotalAmount: productTotalAmount}));
  };

  const handleFavourites = (val, img) => {
    const isData = {
       Barcode: val?.Barcode ? val?.Barcode : '',
      BranchIndex: val?.BranchIndex ? val?.BranchIndex : '',
      Category: val?.Category ? val?.Category : '',
      ImageID: val?.ImageID ? val?.ImageID : '',
      ImageName: val?.ImageName ? val?.ImageName : 'null',
 IsInStock: val?.IsInStock ? val?.IsInStock : true,
      IsInStore: val?.IsInStore ? val?.IsInStore : true,
      IsSelectedByBrand: val?.IsSelectedByBrand ? val?.IsSelectedByBrand : true,
      LowercaseName: val?.LowercaseName ? val?.LowercaseName : val?.Product ? val?.Product : '',
      Name: val?.Name ? val?.Name : val?.Product,
      ParentCategory: val?.ParentCategory ? val?.ParentCategory : 'null',
      Price: val?.Price ? val?.Price : 0,
      Priority: val?.Priority ? val?.Priority : '',
      Quantity: val?.Quantity ? val?.Quantity : '',
      createdAt: val?.createdAt
        ? val?.createdAt
        : {__type: 'Date', iso: new Date()},
      isGramBased: val?.isGramBased ? val?.isGramBased : false,
      objectId: val?.objectId ? val?.objectId : val?.ProductId,
      updatedAt: val?.updatedAt
        ? val?.updatedAt
        : {__type: 'Date', iso: new Date()},
      PromotionId: promotion ? promotionData?.objectId : '',
      PromotionTitle: promotion ? promotionData?.Title : '',
      PromotionType: promotion ? promotionData?.PromotionType : '',
      PricePerItem: promotion ? val?.Price : '',
      DiscountedPricePerItem: promotion ? val?.newPrice : '',
      Vat: '',
      Plu: '',
    };
    const productImageUrl = img;

    dispatch(addToFavorite({...isData, productImageUrl: productImageUrl}));
  };
  return (
  
      <View  style={[styles.card, {backgroundColor: Colors.inactive}]}>
        {productCartQuntity > 0 ? (
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
                {productCartQuntity}
              </Text>
              {/* Plus button */}
              <ButtonSquared
                height={18}
                icon={<Plus width={scale(13)} height={scale(13)} />}
                onPress={() => handleIncreaseButtonClick(item, itemImage)}
                backgroundColor={Colors.white}
              />
            </View>
          </View>
        ) : null}
        <Pressable
          onPress={() => {
            handleIncreaseButtonClick(item, itemImage);
          }}>
          <View style={styles.squareButtonComponentWrapper}>
            <ButtonSquared
              height={20}
              icon={
                <IonIcons
                  name={favourite ? 'heart' : 'heart-outline'}
                  size={scale(12)}
                  color={favourite ? Colors.error : Colors.textHighContrast}
                />
              }
              onPress={() => {
                handleFavourites(item, itemImage);
              }}
            />
            <ButtonSquared
              height={20}
              icon={
                <IonIcons
                  name="information-circle-outline"
                  size={scale(15)}
                  color={Colors.primary}
                />
              }
              onPress={onPress}
            />
          </View>
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
                      handleIncreaseButtonClick(item, itemImage);
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
export default memo(OrderagainitemCard);
