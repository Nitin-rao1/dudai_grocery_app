// import React, {memo, useState} from 'react';
// import {Text, View, Pressable} from 'react-native';
// import {scale} from 'react-native-size-matters';
// import Plus from '../../../assets/icons/svg/Plus.svg';
// import Minus from '../../../assets/icons/svg/Minus.svg';
// import Cart from '../../../assets/icons/svg/Cart.svg';
// import ButtonSquared from '../../buttons/ButtonSquared';
// import IonIcons from 'react-native-vector-icons/Ionicons';
// import styles from './styles';
// import {useDispatch, useStore} from 'react-redux';
// import Colors from '../../../constants/Colors';
// import {addToFavorite} from '../../../redux/slices/WishlistSlice';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {
//   addToCart,
//   decreaseQuantity,
//   logoutToCart,
// } from '../../../redux/slices/ProductsCartSlice';
// import {updateUser} from '../../../redux/slices/SessionUser';
// import FastImage from 'react-native-fast-image';
// import {addFavouriteData} from '../../../api/categories/categoriesAndProduct';

// // Functional component
// const OrderItems = ({
//   itemImage,
//   itemName,
//   originalPrice,
//   weight,
//   discountedPrice,
//   onPress,
//   item,
//   favourite,
//   index,
//   itemId,
//   productCartQuntity,
//   promotion,
//   promotionData,
//   userInfo,
//   allData,
// }) => {
//   const store = useStore();
//   const followData = store.getState().wishList.wishListID;
//   const productQty = store.getState().productCart.cartItems;

//   const isFavouriteMatch = followData.some(value => value == item.objectId);
//   const matchedObjectProductCard = productQty?.find(
//     find => find.item.objectId == item.objectId,
//   );
//   const isProductCardMatch = matchedObjectProductCard?.quantity
//     ? matchedObjectProductCard?.quantity
//     : 0;

//   const [isFavourite, setIsFavourite] = useState(isFavouriteMatch);
//   const [isProductCartQuntity, setIsProductCartQuntity] =
//     useState(isProductCardMatch);
//   const [isProductTotalAmount, setIsProductTotalAmount] = useState(
//     userInfo?.productTotalAmount,
//   );

//   const dispatch = useDispatch();

//   const handleIncreaseButtonClick = (val, img) => {
//     const myProductPrice = promotion ? val.newPrice : val?.Price ? val?.Price : 0

//     const isDatata = {
//       Barcode: val?.Barcode ? val?.Barcode : '',
//       BranchIndex: val?.BranchIndex ? val?.BranchIndex : '',
//       Category: val?.Category ? val?.Category : '',
//       ImageID: val?.ImageID ? val?.ImageID : '',
//       ImageName: val?.ImageName ? val?.ImageName : 'null',

//       IsInStock: val?.IsInStock ? val?.IsInStock : true,
//       IsInStore: val?.IsInStore ? val?.IsInStore : true,
//       IsSelectedByBrand: val?.IsSelectedByBrand ? val?.IsSelectedByBrand : true,
//       LowercaseName: val?.LowercaseName
//         ? val?.LowercaseName
//         : val?.Product
//         ? val?.Product
//         : '',
//       Name: val?.Name ? val?.Name : val?.Product,
//       ParentCategory: val?.ParentCategory ? val?.ParentCategory : 'null',
//       Price: myProductPrice,
//       Priority: val?.Priority ? val?.Priority : '',
//       Quantity: val?.Quantity ? val?.Quantity : '',
//       createdAt: val?.createdAt
//         ? val?.createdAt
//         : {__type: 'Date', iso: new Date()},
//       isGramBased: val?.isGramBased ? val?.isGramBased : false,
//       objectId: val?.objectId ? val?.objectId : val?.ProductId,
//       updatedAt: val?.updatedAt
//         ? val?.updatedAt
//         : {__type: 'Date', iso: new Date()},

//       PromotionId: promotion ? promotionData?.objectId : '',
//       PromotionTitle: promotion ? promotionData?.Title : '',
//       PromotionType: promotion ? promotionData?.PromotionType : '',
//       PricePerItem: promotion ? val?.Price : '',
//       DiscountedPricePerItem: promotion ? val?.newPrice : '',
//       Vat: '',
//       Plu: '',
//     };

//     const userInfoaa = store.getState().users.users.productTotalAmount;
//     const productImageUrl = img;
//     const productTotalAmount = userInfoaa + myProductPrice;

//     setIsProductCartQuntity(isProductCartQuntity + 1);
//     setIsProductTotalAmount(prev => productTotalAmount + prev);
//     dispatch(addToCart({...isDatata, productImageUrl: productImageUrl}));
//     dispatch(updateUser({productTotalAmount: productTotalAmount}));
//     console.log("asjgdcuygasuygfcuydshjcgv",userInfoaa, myProductPrice);

//   };

//   const handleDecreaseButtonClick = val => {
//     const userInfoaa = store.getState().users.users.productTotalAmount;
//     const cartItem = store.getState().productCart.cartItems;
//     const productTotalAmount = userInfoaa - val.Price;
//     setIsProductTotalAmount(prev => productTotalAmount - prev);

//     setIsProductCartQuntity(isProductCartQuntity - 1);

//     dispatch(decreaseQuantity(val.objectId));
//     dispatch(updateUser({productTotalAmount: productTotalAmount}));
//     if (productTotalAmount <= 0) {
//       dispatch(updateUser({productTotalAmount: 0}));
//       dispatch(logoutToCart());
//     }
//   };

//   const handleFavourites = (val, img) => {
//     const userIs = store.getState().users.users.sessionToken;
//     setIsFavourite(!isFavourite);
//     const isData = {
//       Barcode: val?.Barcode ? val?.Barcode : '',
//       BranchIndex: val?.BranchIndex ? val?.BranchIndex : '',
//       Category: val?.Category ? val?.Category : '',
//       ImageID: val?.ImageID ? val?.ImageID : '',
//       ImageName: val?.ImageName ? val?.ImageName : 'null',
//       IsInStock: val?.IsInStock ? val?.IsInStock : true,
//       IsInStore: val?.IsInStore ? val?.IsInStore : true,
//       IsSelectedByBrand: val?.IsSelectedByBrand ? val?.IsSelectedByBrand : true,
//       LowercaseName: val?.LowercaseName
//         ? val?.LowercaseName
//         : val?.Product
//         ? val?.Product
//         : '',
//       Name: val?.Name ? val?.Name : val?.Product,
//       ParentCategory: val?.ParentCategory ? val?.ParentCategory : 'null',
//       Price: promotion ? val.newPrice : val?.Price ? val?.Price : 0,
//       Priority: val?.Priority ? val?.Priority : '',
//       Quantity: val?.Quantity ? val?.Quantity : '',
//       createdAt: val?.createdAt
//         ? val?.createdAt
//         : {__type: 'Date', iso: new Date()},
//       isGramBased: val?.isGramBased ? val?.isGramBased : false,
//       objectId: val?.objectId ? val?.objectId : val?.ProductId,
//       updatedAt: val?.updatedAt
//         ? val?.updatedAt
//         : {__type: 'Date', iso: new Date()},
//       PromotionId: promotion ? promotionData?.objectId : '',
//       PromotionTitle: promotion ? promotionData?.Title : '',
//       PromotionType: promotion ? promotionData?.PromotionType : '',
//       PricePerItem: promotion ? val?.Price : '',
//       DiscountedPricePerItem: promotion ? val?.newPrice : '',
//       Vat: '',
//       Plu: '',
//     };
//     const productImageUrl = img;
//     //
//     const updatedProduct = {
//       ...isData,
//       productImageUrl: productImageUrl,
//       favourite: !isFavourite,
//     };

//     dispatch(addToFavorite(updatedProduct));
//     if (userIs) {

//       setFavouriteData(val?.objectId);
//     }
//   };

//   const setFavouriteData = async data => {
//     const userID = store.getState().users.users.objectId;
//     const formData = {
//       objectId: userID,
//       favoriteIds: data.toString(),
//     };
//     await addFavouriteData(formData)
//       .then(val => {})
//       .catch(err => {});
//   };
//   return (
//     <View style={[styles.card, {backgroundColor: Colors.inactive}]}>
//       {isProductCardMatch > 0 ? (
//         <View
//           style={[
//             styles.card,
//             {
//               backgroundColor: Colors.black + 80,
//               height: wp('39'),
//               width: wp('30'),
//               marginBottom: hp('1'),
//               position: 'absolute',
//               zIndex: 1,
//             },
//           ]}>
//           <View
//             style={{
//               width: wp('30'),
//               flexDirection: 'row',
//               alignItems: 'center',
//               alignSelf: 'center',
//               justifyContent: 'space-around',
//             }}>
//             {/* Minus button */}
//             <ButtonSquared
//               height={18}
//               icon={<Minus width={scale(13)} height={scale(13)} />}
//               onPress={() => handleDecreaseButtonClick(item)}
//               backgroundColor={Colors.white}
//             />
//             {/* Quantity */}
//             <Text style={[styles.quantity, {color: Colors.white}]}>
//               {isProductCardMatch}
//             </Text>
//             {/* Plus button */}
//             <ButtonSquared
//               height={18}
//               icon={<Plus width={scale(13)} height={scale(13)} />}
//               onPress={() => handleIncreaseButtonClick(item, itemImage)}
//               backgroundColor={Colors.white}
//             />
//           </View>
//         </View>
//       ) : null}
//       <Pressable
//         onPress={() => {
//           handleIncreaseButtonClick(item, itemImage);
//         }}>
//         <View style={styles.squareButtonComponentWrapper}>
//           <ButtonSquared
//             height={20}
//             icon={
//               <IonIcons
//                 name={isFavouriteMatch ? 'heart' : 'heart-outline'}
//                 size={scale(12)}
//                 color={
//                   isFavouriteMatch ? Colors.error : Colors.textHighContrast
//                 }
//               />
//             }
//             onPress={() => {
//               handleFavourites(item, itemImage);
//             }}
//           />
//           <ButtonSquared
//             height={20}
//             icon={
//               <IonIcons
//                 name="information-circle-outline"
//                 size={scale(15)}
//                 color={Colors.primary}
//               />
//             }
//             onPress={onPress}
//           />
//         </View>
//         <View style={styles.itemImageWrapper}>
//           <FastImage
//             style={styles.itemImage}
//             source={{
//               uri: itemImage,
//               priority: FastImage.priority.high,
//             }}
//           />
//         </View>
//         <View>
//           <Text
//             ellipsizeMode="tail"
//             numberOfLines={1}
//             style={[styles.itemName, {color: Colors.textHighContrast}]}>
//             {itemName}
//           </Text>
//           <View style={styles.ratingWrapper}>
//             <Text style={[styles.itemweight, {color: Colors.textHighContrast}]}>
//               {weight}
//             </Text>
//           </View>
//           {originalPrice && (
//             <Text style={[styles.itemOriginalPrice, {color: Colors.primary}]}>
//               {originalPrice}
//             </Text>
//           )}
//           <View style={styles.itemPriceWrapper}>
//             <Text
//               style={[
//                 styles.itemDiscountedPrice,
//                 {color: Colors.textHighContrast},
//               ]}>
//               {discountedPrice}
//             </Text>
//             <View style={styles.itemQuantityIncreaseDecreaseButtonWrapper}>
//               <View style={{marginRight: wp('1')}}>
//                 <ButtonSquared
//                   height={18}
//                   icon={<Cart width={scale(15)} height={scale(15)} />}
//                   onPress={() => {
//                     handleIncreaseButtonClick(item, itemImage);
//                   }}
//                 />
//               </View>
//             </View>
//           </View>
//         </View>
//       </Pressable>
//     </View>
//   );
// };

// // Exporting
// export default memo(OrderItems);

import React, {memo, useState} from 'react';
import {Text, View, Pressable, Image} from 'react-native';
import {scale} from 'react-native-size-matters';
import Plus from '../../../assets/icons/svg/Plus.svg';
import Minus from '../../../assets/icons/svg/Minus.svg';
import Cart from '../../../assets/icons/svg/Cart.svg';
import ButtonSquared from '../../buttons/ButtonSquared';
import Entypo from 'react-native-vector-icons/Entypo';
import IonIcons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {useDispatch, useStore} from 'react-redux';
import Colors from '../../../constants/Colors';
import PromotionSVG from '../../../assets/icons/svg/PromotionSVG.svg';

import {addToFavorite} from '../../../redux/slices/WishlistSlice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  addToCart,
  decreaseQuantity,
  logoutToCart,
} from '../../../redux/slices/ProductsCartSlice';
import {updateUser} from '../../../redux/slices/SessionUser';
import FastImage from 'react-native-fast-image';
import {addFavouriteData} from '../../../api/categories/categoriesAndProduct';
import { STANDARD_VECTOR_ICON_SIZE } from '../../../config/Constants';

// Functional component
const OrderItems = ({
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
  userInfo,
  allData,
}) => {
  const store = useStore();
  const followData = store.getState().wishList.wishListID;
  const productQty = store.getState().productCart.cartItems;
  const promotionList = store.getState().promotionList.promotionList;

  const isFavouriteMatch = followData?.some(value => value == item.objectId);
  // const isPromotionMatch = promotionList?.some(
  //   value => value?.objectId == item?.objectId,
  // );
  const isPromotionData = promotionList?.find(
    find => find.objectId == item.objectId,
  );
  const isPromotionMatch = isPromotionData ? true : false;
  const myProductPrice = isPromotionMatch
    ? isPromotionData.NewPrice
    : item?.Price
    ? item?.Price
    : 0;
  const matchedObjectProductCard = productQty?.find(
    find => find.item.objectId == item.objectId,
  );
  const isProductCardMatch = matchedObjectProductCard?.quantity
    ? matchedObjectProductCard?.quantity
    : 0;

  const [isFavourite, setIsFavourite] = useState(isFavouriteMatch);
  const [isProductCartQuntity, setIsProductCartQuntity] =
    useState(isProductCardMatch);
  const [isProductTotalAmount, setIsProductTotalAmount] = useState(
    userInfo?.productTotalAmount,
  );

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
      LowercaseName: val?.LowercaseName
        ? val?.LowercaseName
        : val?.Product
        ? val?.Product
        : '',
      Name: val?.Name ? val?.Name : val?.Product,
      ParentCategory: val?.ParentCategory ? val?.ParentCategory : 'null',
      Price: myProductPrice,
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

      PromotionId: isPromotionMatch ? isPromotionData.PromotionId : '',
      PromotionTitle: isPromotionMatch ? isPromotionData.PromotionTitle : '',
      PromotionType: isPromotionMatch ? isPromotionData.PromotionType : '',
      PricePerItem: val?.Price,
      DiscountedPricePerItem: isPromotionMatch ? isPromotionData.NewPrice : '',
      Vat: '',
      Plu: '',
    };

    const userInfoaa = store.getState().users.users.productTotalAmount;
    const productImageUrl = img;
    const productTotalAmount = userInfoaa + myProductPrice;

    setIsProductCartQuntity(isProductCartQuntity + 1);
    setIsProductTotalAmount(prev => productTotalAmount + prev);
    dispatch(addToCart({...isDatata, productImageUrl: productImageUrl}));
    dispatch(updateUser({productTotalAmount: productTotalAmount}));
    console.log('asjgdcuygasuygfcuydshjcgv', userInfoaa, myProductPrice);
  };

  const handleDecreaseButtonClick = val => {
    const userInfoaa = store.getState().users.users.productTotalAmount;
    const cartItem = store.getState().productCart.cartItems;
    const productTotalAmount = userInfoaa - val.Price;
    setIsProductTotalAmount(prev => productTotalAmount - prev);

    setIsProductCartQuntity(isProductCartQuntity - 1);

    dispatch(decreaseQuantity(val.objectId));
    dispatch(updateUser({productTotalAmount: productTotalAmount}));
    if (productTotalAmount <= 0) {
      dispatch(updateUser({productTotalAmount: 0}));
      dispatch(logoutToCart());
    }
  };

  const handleFavourites = (val, img) => {
    const userIs = store.getState().users.users.sessionToken;
    setIsFavourite(!isFavourite);
    const isData = {
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
      Price: myProductPrice,
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
      PromotionId: isPromotionMatch ? isPromotionData.PromotionId : '',
      PromotionTitle: isPromotionMatch ? isPromotionData.PromotionTitle : '',
      PromotionType: isPromotionMatch ? isPromotionData.PromotionType : '',
      PricePerItem: val?.Price,
      DiscountedPricePerItem: isPromotionMatch ? isPromotionData.NewPrice : '',
      Vat: '',
      Plu: '',
    };
    const productImageUrl = img;
    //
    const updatedProduct = {
      ...isData,
      productImageUrl: productImageUrl,
      favourite: !isFavourite,
    };

    dispatch(addToFavorite(updatedProduct));
    if (userIs) {
      setFavouriteData(val?.objectId);
    }
  };

  const setFavouriteData = async data => {
    const userID = store.getState().users.users.objectId;
    const formData = {
      objectId: userID,
      favoriteIds: data.toString(),
    };
    await addFavouriteData(formData)
      .then(val => {})
      .catch(err => {});
  };
  return (
    <View style={[styles.card, {backgroundColor: Colors.inactive}]}>
      {isProductCardMatch > 0 ? (
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
              {isProductCardMatch}
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
                name={isFavouriteMatch ? 'heart' : 'heart-outline'}
                size={scale(12)}
                color={
                  isFavouriteMatch ? Colors.error : Colors.textHighContrast
                }
              />
            }
            onPress={() => {
              handleFavourites(item, itemImage);
            }}
          />
          {isPromotionMatch ? (
            // <Image style={{height:40, width:40}} source={require('../../../assets/images/placeholder/p12.png')} />
            <View
            style={{
              // width: wp('7'),
              // height: wp('4'),
              // padding:wp('0.2'),
              // paddingHorizontal:wp('1'),
              // backgroundColor: Colors.primary,
              top:wp('-1.5'),
              // borderRadius:wp('2')
            }}>
            <PromotionSVG
            width={scale(40)}
            height={scale(40)}
          />
          </View>
            // <ButtonSquared
            //   height={20}
            //   icon={
            //     <Entypo
            //       name="price-tag"
            //       size={scale(15)}
            //       color={Colors.primary}
            //     />
            //   }
            //   // onPress={onPress}
            // />
          ) : (
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
          )}
          {/* <View
            style={{
              // width: wp('7'),
              // height: wp('4'),
              padding:wp('0.2'),
              paddingHorizontal:wp('1'),
              backgroundColor: Colors.primary,
              top:wp('-2'),
              borderRadius:wp('2')
            }}>
            <Text style={{color: Colors.white}}>promotion</Text>
          </View> */}
        </View>
        <View style={styles.itemImageWrapper}>
          <FastImage
            style={styles.itemImage}
            source={{
              uri: itemImage,
              priority: FastImage.priority.high,
            }}
          />
        </View>
        <View>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={[styles.itemName, {color: Colors.textHighContrast}]}>
            {itemName}
          </Text>
          <View style={styles.ratingWrapper}>
            <Text style={[styles.itemweight, {color: Colors.textHighContrast}]}>
              {weight}
            </Text>
          </View>
          {isPromotionMatch && (
            <Text style={[styles.itemOriginalPrice, {color: Colors.primary}]}>
              {item.Price} AED
            </Text>
          )}
          <View style={styles.itemPriceWrapper}>
            <Text
              style={[
                styles.itemDiscountedPrice,
                {color: Colors.textHighContrast},
              ]}>
              {myProductPrice} AED
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
export default memo(OrderItems);
