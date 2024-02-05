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
import {useDispatch} from 'react-redux';
import {
  decreaseProductCount,
  increaseProductCount,
} from '../../../redux/slices/HomeproductsSlice';
import Colors from '../../../constants/Colors';
import {addToFavorite} from '../../../redux/slices/WishlistSlice';

// Functional component
const GridViewItemCard = ({
  cardBackgroundColor,
  heartIconColor,
  heartIconBackgroundColor,
  itemImage,
  itemName,
  rating,
  ratingColor,
  ratingCount,
  ratingCountColor,
  itemNameColor,
  originalPrice,
  weight,
  originalPriceColor,
  discountedPrice,
  discountedPriceColor,
  onPress,
  // itemQuantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
  Cartbutton,
  Increasebutton,
  Decreasebutton,
  showCartButton,
  favourite,
  item,
}) => {
  const dispatch = useDispatch();

  const handleFavourites = val => {
    const isData = {
      // Barcode: val.Barcode,
      // BranchIndex: val.BranchIndex ? val.BranchIndex : 1,
      // Category: val.Category ? val.Category : '2a6mASmQ7y',
      // ImageID: val.ImageID ? val.ImageID : val.ImageId,
      // ImageName: val.ImageName ? val.ImageName : '8888196111821',

      // IsInStock: val.IsInStock ? val.IsInStock : true,
      // IsInStore: val.IsInStore ? val.IsInStore : true,
      // IsSelectedByBrand: val.IsSelectedByBrand ? val.IsSelectedByBrand : true,
      // LowercaseName: val.LowercaseName ? val.LowercaseName : val.Product,
      // Name: val.Name ? val.Name : val.Product,
      // ParentCategory: val.ParentCategory ? val.ParentCategory : '91EhhzjORo',
      // Price: val.Price ? val.Price : val.Price,
      // Priority: val.Priority ? val.Priority : 7207,
      // Quantity: val.Quantity ? val.Quantity : val.Quantity,
      // createdAt: val.createdAt
      //   ? val.createdAt
      //   : {__type: 'Date', iso: '2018-03-13T08:18:01.538Z'},
      // isGramBased: val.isGramBased ? val.isGramBased : false,
      // objectId: val.objectId ? val.objectId : val.ProductId,
      // updatedAt: val.updatedAt
      //   ? val.updatedAt
      //   : {__type: 'Date', iso: '2023-11-02T08:39:58.238Z'},
      Barcode: val?.Barcode ? val?.Barcode : '',
      BranchIndex: val?.BranchIndex ? val?.BranchIndex : '',
      Category: val?.Category ? val?.Category : '',
      ImageID: val?.ImageID ? val?.ImageID : '',
      ImageName: val?.ImageName ? val?.ImageName : 'null',

      IsInStock: val?.IsInStock ? val?.IsInStock : true,
      IsInStore: val?.IsInStore ? val?.IsInStore : true,
      IsSelectedByBrand: val?.IsSelectedByBrand ? val?.IsSelectedByBrand : true,
      LowercaseName: val?.LowercaseName
        ? val?.LowercaseName
        : val?.Product
        ? val?.Product
        : '',
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

      PromotionId: '',
      PromotionTitle: '',
      PromotionType: '',
      PricePerItem: '',
      DiscountedPricePerItem: '',
      Vat: '',
      Plu: '',
    };
    dispatch(addToFavorite(isData));
  };

  // Returning
  return (
    <Pressable
      style={[styles.card, {backgroundColor: Colors.inactive}]}
      onPress={onPress}>
      <View style={styles.squareButtonComponentWrapper}>
        <ButtonSquared
          height={scale(15)}
          icon={
            <IonIcons
              name={favourite ? 'heart' : 'heart-outline'}
              size={scale(15)}
              color={favourite ? Colors.error : Colors.textHighContrast}
            />
          }
          onPress={() => {
            handleFavourites(item);
          }}
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
          <View style={styles.ratingStarsWrapper}></View>
          <Text style={[styles.itemweight, {color: Colors.textHighContrast}]}>
            {weight}
          </Text>
        </View>
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
  );
};

// Exporting
export default memo(GridViewItemCard);
