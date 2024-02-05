// import React, {useContext, useEffect, useState} from 'react';
// import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
// import ListViewItemCard from '../../components/cards/ListViewItemCard';
// import ListViewProductsData from '../../data/ListViewProductsData';
// import {ThemeContext} from '../../theming/ThemeContext';
// import styles from './styles';
// import {log} from 'react-native-reanimated';
// import ListviewsubCategoryData from '../../data/ListviewsubCategoryData';
// import {IndependentColors} from '../../config/Colors';
// import {useDispatch, useSelector} from 'react-redux';
// import {
//   addProducts,
//   decreaseQuantity,
//   increaseQuantity,
// } from '../../redux/slices/ProductsSlice';
// import {addItemToCart, reduceItemFromCart} from '../../redux/slices/CartSlice';
// import Header from '../../components/Header';
// import {getSubCategories} from '../../api/categories/categoriesAndProduct';
// import {Indicators} from '../../components/apploader';
// import OrderagainitemCard from '../../components/cards/OrderagainitemCard';
// import Constants from '../../constants/Constants';
// // console.log('subcategory', ListviewsubCategoryData);
// import imageData from '../../allImageJson.json';
// import EmptyCart from '../../components/emptyCart/EmptyCart';
// import mainStyles from '../../constants/MainStyles';
// import Colors from '../../constants/Colors';
// // Functional component
// const ListViewProducts = ({navigation, route}) => {
//   // const imagesAllData = useSelector(state => state.images.images);
//   const imagesAllData = imageData.data;
//   const userInfo = useSelector(state => state.users.users);
//   const wishList = useSelector(state => state.wishList.wishList);
//   const productCart = useSelector(state => state.productCart.cartItems);

//   const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
//   const theme = isLightTheme ? lightTheme : darkTheme;
//   const categoryId = route?.params?.categoryId;

//   const myCartItems = useSelector(state => state.cart);
//   const cartlength = myCartItems.data;

//   const [subcategoryData, setSubcategoryData] = useState([]);
//   const [productData, setProductData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [selectedSubCategory, setSelectedSubCategory] = useState([]);

//   const onPressLocation = () => {
//     navigation.navigate('Cart');
//   };

//   useEffect(() => {
//     const data = {
//       parentCategory: categoryId,
//       StoreId: userInfo?.selectedStoreData?.StoreId,
//     };
//     setLoading(true);
//     getSubCategories(data)
//       .then(item => {
//         setSubcategoryData(item.result.SubCategories);
//         setProductData(item.result.SubCategories[0]?.product);
//         setLoading(false);
//         // console.log('wwwwwwwwwwwwww', item.result.SubCategories);
//         // dispatch(setCategoriesData({data: item.result.data}));
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   }, []);

//   // Returning
//   return (
//     <View style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
//       <Header
//         back
//         onLeftPress={() => navigation.goBack()}
//         onRightPress={onPressLocation}
//         rightIcon
//         cartItemsLength={cartlength.length}
//         title={route?.params?.lable}
//         RightIconName={'cart'}
//         iconType={'MaterialCommunityIcons'}
//         headerBg={Colors.primary}
//         iconColor={IndependentColors.white}
//         titleAlight={'center'}
//       />
//       <View>
//         <ScrollView
//           horizontal={true}
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.categoriesContainer}>
//           {subcategoryData.map((subCategory, index) => {
//             // console.log('subCategorydddddd', subCategory);
//             return (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => {
//                   setSelectedSubCategory(index);
//                   setProductData(subCategory.product);
//                   // handleSubCategorySelection(subCategory)
//                 }}
//                 style={[
//                   styles.categoryButton,
//                   {
//                     backgroundColor:
//                       index == selectedSubCategory
//                         ? Colors.primary
//                         : IndependentColors.white,
//                   },
//                 ]}>
//                 <Text
//                   style={[
//                     styles.categoryButtonText,
//                     {
//                       color:
//                         index == selectedSubCategory
//                           ? IndependentColors.white
//                           : IndependentColors.black,
//                     },
//                   ]}>
//                   {subCategory.Name}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </ScrollView>
//         <View style={styles.borderTop} />
//       </View>
//       {/* Scrollview */}
//       <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
//         {productData?.length > 0  ? (
//           <View style={styles.orderagainview}>
//             {productData?.map((item, index) => {
//               const matchedObjectProductCard = productCart?.find(
//                 find => find.item.objectId == item.objectId,
//               );
//               const isProductCardMatch = matchedObjectProductCard?.quantity
//                 ? matchedObjectProductCard?.quantity
//                 : 0;
//               const matchedObjectFavourite = wishList?.find(
//                 find => find.objectId == item.objectId,
//               );
//               const isFavouriteMatch = matchedObjectFavourite ? true : false;
//               const matchedObjectImage = imagesAllData?.find(
//                 find => find.objectId == item.ImageID,
//               );
//               // console.log("matchedObjectmatchedObject",matchedObject, item.ImageID,matchedObjectFavourite);
//               const imageUrl = matchedObjectImage?.Image?.url
//                 ? matchedObjectImage?.Image?.url
//                 : Constants.imageNotFound;
//                 // const imageUrl =  Constants.imageNotFound;
//                 //   const isProductCardMatch =  0;
//               // console.log("matchedObjectProductCard",matchedObjectFavourite);

//               return (
//                 <View key={index} style={styles.OrderWrapper}>
//                   <OrderagainitemCard
//                     index={index}
//                     item={item}
//                     itemId={item.objectId}
//                     favourite={isFavouriteMatch}
//                     itemImage={imageUrl}
//                     itemName={item.Name}
//                     weight={item.Quantity}
//                     discountedPrice={`${item.Price} AED`}
//                     itemQuantity={item.quantity}
//                     productCartQuntity={isProductCardMatch}
//                     onPress={() =>
//                       navigation.navigate('Product', {
//                         product: item,
//                         productImage: imageUrl,
//                         productName: item.Name,
//                         productQuantity: item.Quantity,
//                         // productOrignalPrice: item.Price,
//                         productDiscountPrice: item.Price,
//                         productAddCartQuntity: isProductCardMatch,
//                         productFavorite: isFavouriteMatch,
//                         productDiscription: item.Description
//                           ? item.Description
//                           : item.Name,
//                       })
//                     }
//                   />
//                 </View>
//               );
//             })}
//           </View>
//         ) : (
//           <>

//           {loading== false && <EmptyCart
//             message={'Product is not avalible'}
//             onPress={() => navigation.navigate('Home')}
//           />}
//           </>
//         )}

//         <View  style={mainStyles.marginTop15} />
//       </ScrollView>
//       {loading && <Indicators />}
//     </View>
//   );
// };

// // Exporting
// export default ListViewProducts;

// import React, {memo, useCallback, useContext, useEffect, useState} from 'react';
// import {
//   View,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   Pressable,
// } from 'react-native';
// import {ThemeContext} from '../../theming/ThemeContext';
// import {IndependentColors} from '../../config/Colors';
// import {useDispatch, useSelector} from 'react-redux';
// import Header from '../../components/Header';
// import {getSubCategories} from '../../api/categories/categoriesAndProduct';
// import {Indicators} from '../../components/apploader';
// import OrderagainitemCard from '../../components/cards/OrderagainitemCard';
// import Constants from '../../constants/Constants';
// import IonIcons from 'react-native-vector-icons/Ionicons';
// import Plus from '../../assets/icons/svg/Plus.svg';
// import Minus from '../../assets/icons/svg/Minus.svg';
// import Cart from '../../assets/icons/svg/Cart.svg';
// import imageData from '../../allImageJson.json';
// import EmptyCart from '../../components/emptyCart/EmptyCart';
// import Colors from '../../constants/Colors';
// import mainStyles from '../../constants/MainStyles';
// import styles from './styles';
// import OrderItems from '../../components/cards/OrderagainitemCard/OrderItems';
// import { addToFavorite } from '../../redux/slices/WishlistSlice';
// import { addToCart, decreaseQuantity } from '../../redux/slices/ProductsCartSlice';
// import { updateUser } from '../../redux/slices/SessionUser';
// import ButtonSquared from '../../components/buttons/ButtonSquared';
// import FastImage from 'react-native-fast-image';
// import pppppp from './product.json';
// import { scale } from 'react-native-size-matters';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import BigList from 'react-native-big-list';
// // Functional component
// const ListViewProducts = ({navigation, route}) => {
//   const imagesAllData = imageData.data;
//   const userInfo = useSelector(state => state.users.users);
//   const wishList = useSelector(state => state.wishList.wishList);
//   const productCart = useSelector(state => state.productCart.cartItems);
//   const [isFavourite, setIsFavourite] = useState(false);
//   const [isFavouriteIndex, setIsFavouriteIndex] = useState('');

//   const dispatch = useDispatch();
//   const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
//   const theme = isLightTheme ? lightTheme : darkTheme;
//   const categoryId = route?.params?.categoryId;

//   const myCartItems = useSelector(state => state.cart);
//   const cartlength = myCartItems.data;

//   const [subcategoryData, setSubcategoryData] = useState([]);
//   const [productData, setProductData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   //product data
//   const [isProductdata, setIsProductData] = useState(productData);
//   const [visibleData, setVisibleData] = useState([]);
//   const [showData, setShowData] = useState([]);
//   const [rerenderFlag, setRerenderFlag] = useState(false);
//   const [selectedSubCategory, setSelectedSubCategory] = useState([]);

//   const onPressLocation = () => {
//     navigation.navigate('Cart');
//   };

//   useEffect(() => {
//     const data = {
//       parentCategory: categoryId,
//       StoreId: userInfo?.selectedStoreData?.StoreId,
//     };
//     setLoading(false);
//     // getSubCategories(data)
//     //   .then(item => {
//     //     const jsonData = item.result.SubCategories;
//     //     setSubcategoryData(item.result.SubCategories);

//     //     jsonData.forEach(subcategory => {
//     //       // Iterate through each product in the subcategory
//     //       subcategory.product.forEach(product => {
//     //         const matchedObjectImage = imagesAllData?.find(
//     //           find => find.objectId == product.ImageID,
//     //         );
//     //         const imageUrl = matchedObjectImage?.Image?.url
//     //           ? matchedObjectImage?.Image?.url
//     //           : Constants.imageNotFound;

//     //           const matchedObjectFavourite = wishList?.find(
//     //             find => find.objectId == product.objectId,
//     //           );
//     //           const isFavouriteMatch = matchedObjectFavourite ? true : false;

//     //           product.productImageUrl = imageUrl;
//     //           product.favourite = isFavouriteMatch;
//     //       });
//     //   });

//     //   console.log('jsonDatajsonDatajsonDatajsonData',jsonData[0]);
//     //   setIsProductData(jsonData[0]?.product);
//     //     setVisibleData(jsonData[0]?.product?.slice(0, 10));
//     //     setProductData(jsonData[0]?.product);
//     //     // setIsProductData(item.result.SubCategories[0]?.product);
//     //     // setVisibleData(item.result.SubCategories[0]?.product?.slice(0, 10));
//     //     // setProductData(item.result.SubCategories[0]?.product);
//     //     setLoading(false);
//     //   })
//     //   .catch(() => {
//     //     setLoading(false);
//     //   });

//     const jsonData = pppppp.result.SubCategories;
//     setSubcategoryData(pppppp.result.SubCategories);

//     jsonData.forEach(subcategory => {
//       // Iterate through each product in the subcategory
//       subcategory.product.forEach(product => {
//         const matchedObjectImage = imagesAllData?.find(
//           find => find.objectId == product.ImageID,
//         );
//         const imageUrl = matchedObjectImage?.Image?.url
//           ? matchedObjectImage?.Image?.url
//           : Constants.imageNotFound;

//           const matchedObjectFavourite = wishList?.find(
//             find => find.objectId == product.objectId,
//           );
//           const isFavouriteMatch = matchedObjectFavourite ? true : false;

//           product.productImageUrl = imageUrl;
//           product.favourite = isFavouriteMatch;
//       });
//   });

//   // console.log('jsonDatajsonDatajsonDatajsonData',jsonData[0]);
//   setIsProductData(jsonData[0]?.product);
//     setVisibleData(jsonData[0]?.product);
//     setShowData(jsonData[0]?.product.slice(0,50))
//     // setVisibleData(jsonData[0]?.product?.slice(0, 10));
//     setProductData(jsonData[0]?.product);
//     setLoading(false);
//   }, []);

// const promotion = false;
//   const handleIncreaseButtonClick = (val, img) => {
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
//       Price: val?.Price ? val?.Price : 0,
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
//     const productTotalAmount = userInfo.productTotalAmount + val?.Price;

//     dispatch(addToCart({...isDatata, productImageUrl: productImageUrl}));
//     dispatch(updateUser({productTotalAmount: productTotalAmount}));
//   };

//   const handleDecreaseButtonClick = val => {
//     const productTotalAmount = userInfo.productTotalAmount - val.Price;

//     dispatch(decreaseQuantity(val.objectId));
//     dispatch(updateUser({productTotalAmount: productTotalAmount}));
//   };

//   const handleFavourites = useCallback((val, img, index) => {
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
//       Price: val?.Price ? val?.Price : 0,
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
//         ...isData,
//         productImageUrl: productImageUrl,
//         favourite: !val.favourite,
//       };

//     //   if (isFavourite) {
//     //     dispatch(removeFromFavorites(updatedProduct));
//     //   } else {
//     //     dispatch(addToFavorites(updatedProduct));
//     //   }
//     // dispatch(addToFavorite(updatedProduct));

//     // setVisibleData((prevData) => {
//     //   const updatedData = [...prevData];
//     //   updatedData[index] = updatedProduct; // Update the specific item
//     //   return updatedData;
//     // });
//   }, []);
//   // const renderDataItem = ({item, index}) => {
//   //   const matchedObjectProductCard = productCart?.find(
//   //     find => find.item.objectId == item.objectId,
//   //   );
//   //   const isProductCardMatch = matchedObjectProductCard?.quantity
//   //     ? matchedObjectProductCard?.quantity
//   //     : 0;
//   //   const matchedObjectFavourite = wishList?.find(
//   //     find => find.objectId == item.objectId,
//   //   );
//   //   const isFavouriteMatch = matchedObjectFavourite ? true : false;
//   //   const matchedObjectImage = imagesAllData?.find(
//   //     find => find.objectId == item.ImageID,
//   //   );
//   //   const imageUrl = matchedObjectImage?.Image?.url
//   //     ? matchedObjectImage?.Image?.url
//   //     : Constants.imageNotFound;
//   //   return (
//   //     <View key={index} style={styles.OrderWrapper}>
//   //       <OrderagainitemCard
//   //         index={index}
//   //         item={item}
//   //         itemId={item.objectId}
//   //         favourite={isFavouriteMatch}
//   //         itemImage={imageUrl}
//   //         itemName={item.Name}
//   //         weight={item.Quantity}
//   //         discountedPrice={`${item.Price} AED`}
//   //         itemQuantity={item.quantity}
//   //         productCartQuntity={isProductCardMatch}
//   //         onPress={() =>
//   //           navigation.navigate('Product', {
//   //             product: item,
//   //             productImage: imageUrl,
//   //             productName: item.Name,
//   //             productQuantity: item.Quantity,
//   //             // productOrignalPrice: item.Price,
//   //             productDiscountPrice: item.Price,
//   //             productAddCartQuntity: isProductCardMatch,
//   //             productFavorite: isFavouriteMatch,
//   //             productDiscription: item.Description
//   //               ? item.Description
//   //               : item.Name,
//   //           })
//   //         }
//   //       />
//   //     </View>
//   //   );
//   // };
//   // const arrayToObject = (array, keyField) => {
//   //   return array.reduce((obj, item) => {
//   //     obj[item[keyField]] = item;
//   //     return obj;
//   //   }, {});
//   // };

//   // const arrayToObjectP = (array, keyField) => {
//   //   return array.reduce((obj, item) => {
//   //     const key = keyField.split('.').reduce((acc, field) => acc[field], item);
//   //     obj[key] = item;
//   //     return obj;
//   //   }, {});
//   // };
//   // const productCartObject = arrayToObjectP(productCart, 'item.objectId');
//   // const wishListObject = arrayToObject(wishList, 'objectId');

//   const memoizedItem = React.useCallback(({item, index}) => {
//     // const matchedObjectProductCard = productCart?.find(
//     //   find => find.item.objectId == item.objectId,
//     // );
//     // const isProductCardMatch = matchedObjectProductCard?.quantity
//     //   ? matchedObjectProductCard?.quantity
//     //   : 0;
//     // const matchedObjectFavourite = wishList?.find(
//     //   find => find.objectId == item.objectId,
//     // );
//     // const isFavouriteMatch = matchedObjectFavourite ? true : false;
//     // const matchedObjectImage = imagesAllData?.find(
//     //   find => find.objectId == item.ImageID,
//     // );
//     // const imageUrl = matchedObjectImage?.Image?.url
//     //   ? matchedObjectImage?.Image?.url
//     //   : Constants.imageNotFound;
//     const isProductCardMatch = 0;
//     // const imageUrl =  Constants.imageNotFound;
// console.log("tttttttttttttttttt",index);
//     // return (
//     //   <View key={`oooo${index}`} style={styles.OrderWrapper}>
//     //     <OrderItems
//     //       index={index}
//     //       item={item}
//     //       itemId={item.objectId}
//     //       favourite={item.favourite}
//     //       itemImage={item.productImageUrl}
//     //       itemName={item.Name}
//     //       weight={item.Quantity}
//     //       discountedPrice={`${item.Price} AED`}
//     //       itemQuantity={item.quantity}
//     //       productCartQuntity={isProductCardMatch}
//     //       onPress={() =>
//     //         navigation.navigate('Product', {
//     //           product: item,
//     //           productImage: item.productImageUrl,
//     //           productName: item.Name,
//     //           productQuantity: item.Quantity,
//     //           // productOrignalPrice: item.Price,
//     //           productDiscountPrice: item.Price,
//     //           productAddCartQuntity: isProductCardMatch,
//     //           productFavorite: item.favourite,
//     //           productDiscription: item.Description
//     //             ? item.Description
//     //             : item.Name,
//     //         })
//     //       }
//     //     />

//     //   </View>
//     // );
//   });

//   console.log("MemoizedItem render parent ")
// // const MemoizedItem = React.memo(({item, index}) => {
// //   const isProductCardMatch = 0;
// //   console.log("MemoizedItem index = " , index)
// //   return (

// //   );
// // }, (prevProps, nextProps) =>{
// //     console.log(prevProps.item.favourite, nextProps.item.favourite, 'nextprops' , prevProps.item.favourite === nextProps.item.favourite );
// //     return false
// // });

//   const renderDataItem = ({item, index}) => (
//     <MemoizedItem item={item} index={index} />
//   );

//   const handleEndReached = () => {
//       setShowData(showData.concat(visibleData.slice(showData.length - 1, showData.length +50)));
//     // setVisibleData(prevVisibleData => [...prevVisibleData, ...nextBatch]);

// // alert("ddd")
//     //
//   };
//   const data = [
//     { label: "1", value: 1 },
//     { label: "2", value: 2 },
//     { label: "3", value: 3 },
//     { label: "4", value: 4 },
//     { label: "5", value: 5 },

//   ];
//   console.log("tttttttttttttttttt",visibleData.length);
//   const renderItem = ({ item, index }) =>
//   {
//     const isProductCardMatch = 0;
//     // const imageUrl =  Constants.imageNotFound;
// console.log("tttttttttttttttttt",index);
//   return(
//     <>

//     <View key={`oooo${index}`} style={styles.OrderWrapper}>
//        <OrderItems
//           index={index}
//           item={item}
//           itemId={item.objectId}
//           favourite={item.favourite}
//           itemImage={item.productImageUrl}
//           itemName={item.Name}
//           weight={item.Quantity}
//           discountedPrice={`${item.Price} AED`}
//           itemQuantity={item.quantity}
//           productCartQuntity={isProductCardMatch}
//           onPress={() =>
//             navigation.navigate('Product', {
//               product: item,
//               productImage: item.productImageUrl,
//               productName: item.Name,
//               productQuantity: item.Quantity,
//               // productOrignalPrice: item.Price,
//               productDiscountPrice: item.Price,
//               productAddCartQuntity: isProductCardMatch,
//               productFavorite: item.favourite,
//               productDiscription: item.Description
//                 ? item.Description
//                 : item.Name,
//             })
//           }
//         />

//       </View>
//     </>
//   );
//         }
//   // Returning

//   const renderEmpty = () => <Text>afdafs1</Text>;
// const renderHeader = () => <Text>afdafs2</Text>;
// const renderFooter = () => <Text>afdafs3</Text>;
//   return (
//     <View style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
//       <Header
//         back
//         onLeftPress={() => navigation.goBack()}
//         onRightPress={onPressLocation}
//         rightIcon
//         cartItemsLength={cartlength.length}
//         title={route?.params?.lable}
//         RightIconName={'cart'}
//         iconType={'MaterialCommunityIcons'}
//         headerBg={Colors.primary}
//         iconColor={IndependentColors.white}
//         titleAlight={'center'}
//       />
//       <View>
//         <ScrollView
//           horizontal={true}
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.categoriesContainer}>
//           {subcategoryData.map((subCategory, index) => {
//             return (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => {
//                   setSelectedSubCategory(index);
//                   // setProductData(subCategory.product);
//                   setIsProductData(subCategory.product);
//                   // setVisibleData(subCategory.product.slice(0, 10));
//                 }}
//                 style={[
//                   styles.categoryButton,
//                   {
//                     backgroundColor:
//                       index == selectedSubCategory
//                         ? Colors.primary
//                         : IndependentColors.white,
//                   },
//                 ]}>
//                 <Text
//                   style={[
//                     styles.categoryButtonText,
//                     {
//                       color:
//                         index == selectedSubCategory
//                           ? IndependentColors.white
//                           : IndependentColors.black,
//                     },
//                   ]}>
//                   {subCategory.Name}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </ScrollView>
//         <View style={styles.borderTop} />
//       </View>

//           <BigList
//             style={{width:wp('100'), borderWidth:2, flexWrap:'wrap'}}

//             data={visibleData}
//             numColumns={2}

//             renderItem={renderItem}
//     //         renderEmpty={renderEmpty}
//     // renderHeader={renderHeader}
//     // renderFooter={renderFooter}
//     itemHeight={hp('22')}
//     // headerHeight={90}
//     // footerHeight={100}
//             // renderItem={({item,index}) => (

//             //   <View key={`oooo-${index}`} style={styles.OrderWrapper}>
//             //     { console.log(index,"data index") }
//             //   <OrderItems
//             //     index={index}
//             //     item={item}
//             //     itemId={item.objectId}
//             //     favourite={item.favourite}
//             //     itemImage={item.productImageUrl}
//             //     itemName={item.Name}
//             //     weight={item.Quantity}
//             //     discountedPrice={`${item.Price} AED`}
//             //     itemQuantity={item.quantity}
//             //     productCartQuntity={0}
//             //     onPress={() =>
//             //       navigation.navigate('Product', {
//             //         product: item,
//             //         productImage: item.productImageUrl,
//             //         productName: item.Name,
//             //         productQuantity: item.Quantity,
//             //         // productOrignalPrice: item.Price,
//             //         productDiscountPrice: item.Price,
//             //         productAddCartQuntity: isProductCardMatch,
//             //         productFavorite: item.favourite,
//             //         productDiscription: item.Description
//             //           ? item.Description
//             //           : item.Name,
//             //       })
//             //     }
//             //   />

//             // </View>
//             // )}
//             // keyExtractor={(item, index) => `${item.objectId}-${index}`}
//             // keyExtractor={(item, index) => `${index}-${item.objectId}-${item.favourite}`}

//             // extraData={true}
//             // onEndReached={handleEndReached}
//             // onEndReachedThreshold={0.2}
//             // ListFooterComponent={() =>
//             //   isLoading ? <>
//             //    <ActivityIndicator size="large" />
//             //    <View style={{marginTop:200}} />
//             //   </>

//             //   : null
//             // }
//             // initialNumToRender={10} // Adjust based on your use case
//             // windowSize={10} // Adjust based on your use case
//             // getItemLayout={(data, index) => ({
//             //   length: 10,
//             //   offset: 10 * index,
//             //   index,
//             // })}
//           />

//     </View>
//   );
// };

// // Exporting
// export default memo(ListViewProducts);

// // import React, {useContext, useEffect, useState} from 'react';
// // import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
// // import ListViewItemCard from '../../components/cards/ListViewItemCard';
// // import ListViewProductsData from '../../data/ListViewProductsData';
// // import {ThemeContext} from '../../theming/ThemeContext';
// // import styles from './styles';
// // import {log} from 'react-native-reanimated';
// // import ListviewsubCategoryData from '../../data/ListviewsubCategoryData';
// // import {IndependentColors} from '../../config/Colors';
// // import {useDispatch, useSelector} from 'react-redux';
// // import {
// //   addProducts,
// //   decreaseQuantity,
// //   increaseQuantity,
// // } from '../../redux/slices/ProductsSlice';
// // import {addItemToCart, reduceItemFromCart} from '../../redux/slices/CartSlice';
// // import Header from '../../components/Header';
// // import {getSubCategories} from '../../api/categories/categoriesAndProduct';
// // import {Indicators} from '../../components/apploader';
// // import OrderagainitemCard from '../../components/cards/OrderagainitemCard';
// // import Constants from '../../constants/Constants';
// // // console.log('subcategory', ListviewsubCategoryData);
// // import imageData from '../../allImageJson.json';
// // import EmptyCart from '../../components/emptyCart/EmptyCart';
// // import mainStyles from '../../constants/MainStyles';
// // import Colors from '../../constants/Colors';
// // import OrderItems from '../../components/cards/OrderagainitemCard/OrderItems';
// // // Functional component
// // const ListViewProducts = ({navigation, route}) => {
// //   // const imagesAllData = useSelector(state => state.images.images);
// //   const imagesAllData = imageData.data;
// //   const userInfo = useSelector(state => state.users.users);
// //   const wishListID = useSelector(state => state.wishList.wishListID);
// //   const productCart = useSelector(state => state.productCart.cartItems);

// //   const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
// //   const theme = isLightTheme ? lightTheme : darkTheme;
// //   const categoryId = route?.params?.categoryId;

// //   const myCartItems = useSelector(state => state.cart);
// //   const cartlength = myCartItems.data;

// //   const [subcategoryData, setSubcategoryData] = useState([]);
// //   const [productData, setProductData] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const [selectedSubCategory, setSelectedSubCategory] = useState([]);

// //   const onPressLocation = () => {
// //     navigation.navigate('Cart');
// //   };

// //   useEffect(() => {
// //     const data = {
// //       parentCategory: categoryId,
// //       StoreId: userInfo?.selectedStoreData?.StoreId,
// //     };
// //     setLoading(true);
// //     getSubCategories(data)
// //       .then(item => {
// //         setSubcategoryData(item.result.SubCategories);
// //         setProductData(item.result.SubCategories[0]?.product);
// //         setLoading(false);
// //         // console.log('wwwwwwwwwwwwww', item.result.SubCategories);
// //         // dispatch(setCategoriesData({data: item.result.data}));
// //       })
// //       .catch(() => {
// //         setLoading(false);
// //       });
// //   }, []);

// //   // Returning
// //   return (
// //     <View style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
// //       <Header
// //         back
// //         onLeftPress={() => navigation.goBack()}
// //         onRightPress={onPressLocation}
// //         rightIcon
// //         cartItemsLength={cartlength.length}
// //         title={route?.params?.lable}
// //         RightIconName={'cart'}
// //         iconType={'MaterialCommunityIcons'}
// //         headerBg={Colors.primary}
// //         iconColor={IndependentColors.white}
// //         titleAlight={'center'}
// //       />
// //       <View>
// //         <ScrollView
// //           horizontal={true}
// //           showsHorizontalScrollIndicator={false}
// //           contentContainerStyle={styles.categoriesContainer}>
// //           {subcategoryData.map((subCategory, index) => {
// //             // console.log('subCategorydddddd', subCategory);
// //             return (
// //               <TouchableOpacity
// //                 key={index}
// //                 onPress={() => {
// //                   setSelectedSubCategory(index);
// //                   setProductData(subCategory.product);
// //                   // handleSubCategorySelection(subCategory)
// //                 }}
// //                 style={[
// //                   styles.categoryButton,
// //                   {
// //                     backgroundColor:
// //                       index == selectedSubCategory
// //                         ? Colors.primary
// //                         : IndependentColors.white,
// //                   },
// //                 ]}>
// //                 <Text
// //                   style={[
// //                     styles.categoryButtonText,
// //                     {
// //                       color:
// //                         index == selectedSubCategory
// //                           ? IndependentColors.white
// //                           : IndependentColors.black,
// //                     },
// //                   ]}>
// //                   {subCategory.Name}
// //                 </Text>
// //               </TouchableOpacity>
// //             );
// //           })}
// //         </ScrollView>
// //         <View style={styles.borderTop} />
// //       </View>
// //       {/* Scrollview */}
// //       <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
// //         {productData?.length > 0  ? (
// //           <View style={styles.orderagainview}>
// //             {productData?.map((item, index) => {
// //               console.log(index,"data Index")
// //               const matchedObjectProductCard = productCart?.find(
// //                 find => find.item.objectId == item.objectId,
// //               );
// //               const isProductCardMatch = matchedObjectProductCard?.quantity
// //                 ? matchedObjectProductCard?.quantity
// //                 : 0;
// //               const matchedObjectFavourite = wishListID.includes(item.objectId)
// //               const isFavouriteMatch = matchedObjectFavourite ? true : false;
// //               const matchedObjectImage = imagesAllData?.find(
// //                 find => find.objectId == item.ImageID,
// //               );
// //               // console.log("matchedObjectmatchedObject",matchedObject, item.ImageID,matchedObjectFavourite);
// //               const imageUrl = matchedObjectImage?.Image?.url
// //                 ? matchedObjectImage?.Image?.url
// //                 : Constants.imageNotFound;
// //                 // const imageUrl =  Constants.imageNotFound;
// //                 //   const isProductCardMatch =  0;
// //               // console.log("matchedObjectProductCard",matchedObjectFavourite);

// //               return (
// //                 <View key={index} style={styles.OrderWrapper}>
// //                   <OrderItems
// //                     index={index}
// //                     item={item}
// //                     itemId={item.objectId}
// //                     favourite={isFavouriteMatch}
// //                     itemImage={imageUrl}
// //                     itemName={item.Name}
// //                     weight={item.Quantity}
// //                     discountedPrice={`${item.Price} AED`}
// //                     itemQuantity={item.quantity}
// //                     productCartQuntity={isProductCardMatch}
// //                     onPress={() =>
// //                       navigation.navigate('Product', {
// //                         product: item,
// //                         productImage: imageUrl,
// //                         productName: item.Name,
// //                         productQuantity: item.Quantity,
// //                         // productOrignalPrice: item.Price,
// //                         productDiscountPrice: item.Price,
// //                         productAddCartQuntity: isProductCardMatch,
// //                         productFavorite: isFavouriteMatch,
// //                         productDiscription: item.Description
// //                           ? item.Description
// //                           : item.Name,
// //                       })
// //                     }
// //                   />
// //                 </View>
// //               );
// //             })}
// //           </View>
// //         ) : (
// //           <>

// //           {loading== false && <EmptyCart
// //             message={'Product is not avalible'}
// //             onPress={() => navigation.navigate('Home')}
// //           />}
// //           </>
// //         )}

// //         <View  style={mainStyles.marginTop15} />
// //       </ScrollView>
// //       {loading && <Indicators />}
// //     </View>
// //   );
// // };

// // // Exporting
// // export default ListViewProducts;

///this code is working
// import React, {useContext, useEffect, useState} from 'react';
// import {View, ScrollView, Text, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
// import SectionList from 'react-native-tabs-section-list';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// // import ListViewItemCard from '../../components/cards/ListViewItemCard';
// // import ListViewProductsData from '../../data/ListViewProductsData';
// import {ThemeContext} from '../../theming/ThemeContext';
// import styles from './styles';
// // import {log} from 'react-native-reanimated';
// // import ListviewsubCategoryData from '../../data/ListviewsubCategoryData';
// import {IndependentColors} from '../../config/Colors';
// import {useDispatch, useSelector, useStore} from 'react-redux';
// // import {
// //   addProducts,
// //   decreaseQuantity,
// //   increaseQuantity,
// // } from '../../redux/slices/ProductsSlice';
// // import {addItemToCart, reduceItemFromCart} from '../../redux/slices/CartSlice';
// import Header from '../../components/Header';
// import {getSubCategories} from '../../api/categories/categoriesAndProduct';
// import {Indicators} from '../../components/apploader';
// // import OrderagainitemCard from '../../components/cards/OrderagainitemCard';
// import Constants from '../../constants/Constants';
// // console.log('subcategory', ListviewsubCategoryData);
// import imageData from '../../allImageJson.json';
// import EmptyCart from '../../components/emptyCart/EmptyCart';
// import mainStyles from '../../constants/MainStyles';
// import Colors from '../../constants/Colors';
// import OrderItems from '../../components/cards/OrderagainitemCard/OrderItems';
// import BigList, {BigListItem} from 'react-native-big-list';
// import {setSubCategoriesData} from '../../redux/slices/SubCategoriesSlice';
// import hbsdhf from './product.json'
// import { useFocusEffect } from '@react-navigation/native';
// // Functional component
// const ListViewProducts = ({navigation, route}) => {
//   // const imagesAllData = useSelector(state => state.images.images);
//   const store = useStore()
//   const {productCart, wishList, userInfo} = route?.params;
//   const imagesAllData = imageData.data;
//   // const userInfo = useSelector(state => state.users.users);
//   // const wishList = useSelector(state => state.wishList.wishList);
//   // const subCategories = useSelector(state => state.subCategories.subCategories);
//   // const productCart = useSelector(state => state.productCart.cartItems);

//   const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
//   const theme = isLightTheme ? lightTheme : darkTheme;
//   const categoryId = route?.params?.categoryId;

//   // const myCartItems = useSelector(state => state.cart);
//   // const cartlength = myCartItems.data;
//   // const dispatch = useDispatch();
//   const [subcategoryData, setSubcategoryData] = useState([]);
//   const [productData, setProductData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [visibleData, setVisibleData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedSubCategory, setSelectedSubCategory] = useState(0);

//   const onPressLocation = () => {
//     navigation.navigate('Cart');
//   };

//   // useEffect(() => {
//   //   callApiForGetData()
//   // }, []);
//   // console.log('pernt data');
//   // Returning
// const callApiForGetData =()=>{
//   const data = {
//     parentCategory: categoryId,
//     StoreId: userInfo?.selectedStoreData?.StoreId,
//   };
//   setLoading(true);
//   getSubCategories(data)
//     .then(item => {

//       // console.log('wwwwwwwwwwwwww', item.result.SubCategories);
//       // dispatch(setCategoriesData({data: item.result.data}));
//       // const jsonData = hbsdhf.result.SubCategories;
//       const jsonData = item.result.SubCategories;
//       const wishLists = store.getState().wishList.wishList
//       const productCarts = store.getState().productCart.cartItems
//       jsonData.forEach(subcategory => {
//         // Iterate through each product in the subcategory
//         subcategory.product.forEach(product => {
//           const matchedObjectImage = imagesAllData?.find(
//             find => find.objectId == product.ImageID,
//           );
//           const imageUrl = matchedObjectImage?.Image?.url
//             ? matchedObjectImage?.Image?.url
//             : Constants.imageNotFound;

//           const matchedObjectFavourite = wishLists?.find(
//             find => find.objectId == product.objectId,
//           );
//           const isFavouriteMatch = matchedObjectFavourite ? true : false;
//           const matchedObjectProductCard = productCarts?.find(
//             find => find.item.objectId == product.objectId,
//           );
//           const isProductCardMatch = matchedObjectProductCard?.quantity
//             ? matchedObjectProductCard?.quantity
//             : 0;

//           product.productImageUrl = imageUrl;
//           product.favourite = isFavouriteMatch;
//           product.isProductCardMatch = isProductCardMatch;
//         });
//       });

//       console.log('jsonDatajsonDatajsonDatajsonData', jsonData[0]);
//       setSubcategoryData(jsonData);
//       setSelectedSubCategory(0)
//       setProductData(jsonData[0]?.product);
//       setVisibleData(jsonData[0].product.slice(0,30))
//       // dispatch(setSubCategoriesData(jsonData));
//       setLoading(false);
//     })
//     .catch(() => {
//       setLoading(false);
//     });
// }
// useEffect(() => {
//   const focusHandler = navigation.addListener('focus', () => {
//     callApiForGetData()
//     console.log("eeeeeeeeeeeeeeeeeeee",categoryId);
//   });
//   return focusHandler;
// }, [navigation]);
// // React.useCallback(() => {
// //   // Your code here
// //   console.log("sssssssssssss",categoryId);
// // }, [navigation])
//   // useFocusEffect(() => {

//   //   callApiForGetData()
//   //   // Your code to run when the screen is focused
//   //   console.log('Screen is focused',categoryId);
//   //   return () => {
//   //     callApiForGetData()
//   //     // Your cleanup code when the screen is unfocused
//   //     console.log('Screen is unfocused',categoryId);
//   //   };
//   // });

//   const renderItem = ({item, index}) => {
//     // const matchedObjectProductCard = productCart?.find(
//     //   find => find.item.objectId == item.objectId,
//     // );
//     // const isProductCardMatch = matchedObjectProductCard?.quantity
//     //   ? matchedObjectProductCard?.quantity
//     //   : 0;
//     // const matchedObjectFavourite = wishList?.find(
//     //   find => find.objectId == item.objectId,
//     // );
//     // const isFavouriteMatch = matchedObjectFavourite ? true : false;
//     // const matchedObjectImage = imagesAllData?.find(
//     //   find => find.objectId == item.ImageID,
//     // );
//     // console.log("matchedObjectmatchedObject",matchedObject, item.ImageID,matchedObjectFavourite);
//     // const imageUrl = matchedObjectImage?.Image?.url
//     //   ? matchedObjectImage?.Image?.url
//     //   : Constants.imageNotFound;
//     // const imageUrl = Constants.imageNotFound;
//     // const isProductCardMatch = 0;
//     // const isFavouriteMatch = false;
//     console.log('matchedObjectProductCard', item, index);

//     return (
//       <View key={index} style={styles.OrderWrapper}>
//         <OrderItems
//           index={index}
//           item={item}
//           itemId={item.objectId}
//           favourite={item.favourite}
//           itemImage={item.productImageUrl}
//           itemName={item.Name}
//           weight={item.Quantity}
//           discountedPrice={`${item.Price} AED`}
//           itemQuantity={item.quantity}
//           productCartQuntity={item.isProductCardMatch}
//           userInfo={userInfo}
//           onPress={() =>
//             navigation.navigate('Product', {
//               product: item,
//               productImage: item.productImageUrl,
//               productName: item.Name,
//               productQuantity: item.Quantity,
//               // productOrignalPrice: item.Price,
//               productDiscountPrice: item.Price,
//               productAddCartQuntity: item.isProductCardMatch,
//               productFavorite: item.favourite,
//               productDiscription: item.Description
//                 ? item.Description
//                 : item.Name,
//               isBackData : true,
//             })
//           }
//         />
//       </View>
//     );
//   };

//     const handleEndReached = () => {
//       setIsLoading(true);

//     const nextBatch = productData?.slice(visibleData.length, visibleData.length + 30);
//     setVisibleData(prevVisibleData => [...prevVisibleData, ...nextBatch]);
//     if (visibleData.length >= productData.length) {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <View style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
//       <Header
//         back
//         onLeftPress={() => navigation.goBack()}
//         onRightPress={onPressLocation}
//         rightIcon
//         // cartItemsLength={cartlength.length}
//         title={route?.params?.lable}
//         RightIconName={'cart'}
//         iconType={'MaterialCommunityIcons'}
//         headerBg={Colors.primary}
//         iconColor={IndependentColors.white}
//         titleAlight={'center'}
//       />
//       <View>
//         <ScrollView
//           horizontal={true}
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.categoriesContainer}>
//           {subcategoryData.map((subCategory, index) => {
//             // console.log('subCategorydddddd', subCategory);
//             return (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => {
//                   setSelectedSubCategory(index);
//                   setProductData(subCategory.product);
//                   setVisibleData(subCategory.product.slice(0,30))
//                   // handleSubCategorySelection(subCategory)
//                 }}
//                 style={[
//                   styles.categoryButton,
//                   {
//                     backgroundColor:
//                       index == selectedSubCategory
//                         ? Colors.primary
//                         : IndependentColors.white,
//                   },
//                 ]}>
//                 <Text
//                   style={[
//                     styles.categoryButtonText,
//                     {
//                       color:
//                         index == selectedSubCategory
//                           ? IndependentColors.white
//                           : IndependentColors.black,
//                     },
//                   ]}>
//                   {subCategory.Name}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </ScrollView>
//         <View style={styles.borderTop} />
//       </View>
//       {/* Scrollview */}
//       {/* <ScrollView bounces={false} showsVerticalScrollIndicator={false}> */}
//         {productData?.length > 0 ? (
//           <>
//          <View style={styles.orderagainview}>
//             <FlatList
//               // style={{width: wp('100'), borderWidth: 2, flexWrap: 'wrap', flexDirection:'row'}}
//               data={visibleData}
//               numColumns={3}
//               // horizontal={true}
//               renderItem={renderItem}
//               keyExtractor={(item, index) => `${item.objectId}-${index}`}
//               onEndReached={handleEndReached}
//             onEndReachedThreshold={0.9}
//             ListFooterComponent={() =>
//               isLoading ? <>
//                <ActivityIndicator size="large" />
//                <View style={{marginTop:200}} />
//               </>

//               : null
//             }
//             initialNumToRender={30}
//               // itemHeight={hp('22')}
//             />

// {/* <SectionList
//           sections={subcategoryData}
//           keyExtractor={item => item.objectId}
//           stickySectionHeadersEnabled={false}
//           scrollToLocationOffset={50}
//           tabBarStyle={styles.tabBar}
//           ItemSeparatorComponent={() => <View style={styles.separator} />}
//           renderTab={({ Name, isActive }) => (
//             <View
//               style={[
//                 styles.tabContainer,
//                 { borderBottomWidth: isActive ? 1 : 0 }
//               ]}
//             >
//               <Text
//                 style={[
//                   styles.tabText,
//                   { color: isActive ? '#090909' : '#9e9e9e' }
//                 ]}
//               >
//                 {Name}
//               </Text>
//             </View>
//           )}
//           renderSectionHeader={({ section }) => (
//             <View>
//               <View style={styles.sectionHeaderContainer} />
//               <Text style={styles.sectionHeaderText}>{section.Name}</Text>
//             </View>
//           )}
//         renderItem={renderItem}
//           // renderItem={({ item }) => (
//           //   <View style={styles.itemContainer}>
//           //     <View style={styles.itemRow}>
//           //       <Text style={styles.itemTitle}>{item.Name}</Text>
//           //       <Text style={styles.itemPrice}>${item.price}</Text>
//           //     </View>
//           //     <Text style={styles.itemDescription}>{item.description}</Text>
//           //   </View>
//           // )}
//         /> */}
//             {/* {productData?.map((item, index) => {
//               const matchedObjectProductCard = productCart?.find(
//                 find => find.item.objectId == item.objectId,
//               );
//               const isProductCardMatch = matchedObjectProductCard?.quantity
//                 ? matchedObjectProductCard?.quantity
//                 : 0;
//               const matchedObjectFavourite = wishList?.find(
//                 find => find.objectId == item.objectId,
//               );
//               const isFavouriteMatch = matchedObjectFavourite ? true : false;
//               const matchedObjectImage = imagesAllData?.find(
//                 find => find.objectId == item.ImageID,
//               );
//               // console.log("matchedObjectmatchedObject",matchedObject, item.ImageID,matchedObjectFavourite);
//               const imageUrl = matchedObjectImage?.Image?.url
//                 ? matchedObjectImage?.Image?.url
//                 : Constants.imageNotFound;
//                 // const imageUrl =  Constants.imageNotFound;
//                 //   const isProductCardMatch =  0;
//               console.log("matchedObjectProductCard",index);

//               return (
//                 <View key={index} style={styles.OrderWrapper}>
//                   <OrderItems
//                     index={index}
//                     item={item}
//                     itemId={item.objectId}
//                     favourite={isFavouriteMatch}
//                     itemImage={imageUrl}
//                     itemName={item.Name}
//                     weight={item.Quantity}
//                     discountedPrice={`${item.Price} AED`}
//                     itemQuantity={item.quantity}
//                     productCartQuntity={isProductCardMatch}
//                     onPress={() =>
//                       navigation.navigate('Product', {
//                         product: item,
//                         productImage: imageUrl,
//                         productName: item.Name,
//                         productQuantity: item.Quantity,
//                         // productOrignalPrice: item.Price,
//                         productDiscountPrice: item.Price,
//                         productAddCartQuntity: isProductCardMatch,
//                         productFavorite: isFavouriteMatch,
//                         productDiscription: item.Description
//                           ? item.Description
//                           : item.Name,
//                       })
//                     }

//                   />
//                 </View>
//               );
//             })} */}
//            </View>
//           </>
//         ) : (
//           <>
//             {loading == false && (
//               <EmptyCart
//                 message={'Product is not avalible'}
//                 onPress={() => navigation.navigate('Home')}
//               />
//             )}
//           </>
//         )}

//         <View style={mainStyles.marginTop15} />
//       {/* </ScrollView> */}
//       {loading && <Indicators />}
//     </View>
//   );
// };

// // Exporting
// export default ListViewProducts;

// last Code 15Jan2024
// import React, {useContext, useEffect, useState} from 'react';
// import {
//   View,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
// } from 'react-native';
// import {ThemeContext} from '../../theming/ThemeContext';
// import styles from './styles';
// import {IndependentColors} from '../../config/Colors';
// import {useDispatch, useSelector, useStore} from 'react-redux';

// import Header from '../../components/Header';
// import {getSubCategories} from '../../api/categories/categoriesAndProduct';
// import {Indicators} from '../../components/apploader';
// import Constants from '../../constants/Constants';
// import imageData from '../../allImageJson.json';
// import EmptyCart from '../../components/emptyCart/EmptyCart';
// import mainStyles from '../../constants/MainStyles';
// import Colors from '../../constants/Colors';
// import OrderItems from '../../components/cards/OrderagainitemCard/OrderItems';
// import {setSubCategoriesData} from '../../redux/slices/SubCategoriesSlice';
// import { updateUser } from '../../redux/slices/SessionUser';

// // Functional component
// const ListViewProducts = ({navigation, route}) => {
//   const store = useStore();
//   const {productCart, wishList, userInfo} = route?.params;
//   const subCategories = useSelector(state => state.subCategories.subCategories);
//   const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
//   const theme = isLightTheme ? lightTheme : darkTheme;
//   const categoryId = route?.params?.categoryId;
//   const [subcategoryData, setSubcategoryData] = useState([]);
//   const [productData, setProductData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [visibleData, setVisibleData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedSubCategory, setSelectedSubCategory] = useState(0);
//   const dispatch = useDispatch();
//   const onPressLocation = () => {
//     navigation.navigate('Cart');
//   };

//   useEffect(() => {
//     // if (store.getState().subCategories.subCategories.length ==) {

//     // }
//     callApiForGetData();
//   }, []);
//   console.log('pernt data');
//   // Returning
//   const callApiForGetData = () => {
//     const data = {
//       parentCategory: categoryId,
//       StoreId: userInfo?.selectedStoreData?.StoreId,
//     };
//     setLoading(true);
//     getSubCategories(data)
//       .then(item => {
//         const jsonData = item.result.SubCategories;
//         const wishLists = store.getState().wishList.wishList;
//         const productCarts = store.getState().productCart.cartItems;
//         jsonData.forEach(subcategory => {
//           subcategory.product.forEach(product => {
//             const matchedObjectFavourite = wishLists?.find(
//               find => find.objectId == product.objectId,
//             );
//             const isFavouriteMatch = matchedObjectFavourite ? true : false;
//             const matchedObjectProductCard = productCarts?.find(
//               find => find.item.objectId == product.objectId,
//             );
//             const isProductCardMatch = matchedObjectProductCard?.quantity
//               ? matchedObjectProductCard?.quantity
//               : 0;

//             product.favourite = isFavouriteMatch;
//             product.isProductCardMatch = isProductCardMatch;
//           });
//         });

//         console.log('jsonDatajsonDatajsonDatajsonData', jsonData[0]);
//         dispatch(setSubCategoriesData(jsonData));
//         setSubcategoryData(jsonData);
//         setSelectedSubCategory(0);
//         setProductData(jsonData[0]?.product);
//         setVisibleData(jsonData[0].product.slice(0, 30));
//         setLoading(false);
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   };
//   useEffect(() => {
//     const focusHandler = navigation.addListener('focus', () => {
//       const userInfos = store.getState().users.users.refreshCategoriesPage;
//       // alert(userInfos)
//       // callApiForGetData()
//       if (userInfos == true) {
//         // alert(categoryId)
//         subCategoriesRefreshData()

//       }
//       // console.log("eeeeeeeeeeeeeeeeeeee",categoryId);
//     });
//     return focusHandler;
//   }, [navigation]);

//   const subCategoriesRefreshData =()=>{
//     const subCategoriess = store.getState().subCategories.subCategories
//     const wishLists = store.getState().wishList.wishList;
//     const productCarts = store.getState().productCart.cartItems;
//     const jsonData = subCategoriess;
//     console.log("eeeeeeeeeeeeeeeeeeee",jsonData);
//     jsonData.forEach(subcategory => {
//       subcategory.product.forEach(product => {
//         const matchedObjectFavourite = wishLists?.find(
//           find => find.objectId == product.objectId,
//         );
//         const isFavouriteMatch = matchedObjectFavourite ? true : false;
//         const matchedObjectProductCard = productCarts?.find(
//           find => find.item.objectId == product.objectId,
//         );
//         const isProductCardMatch = matchedObjectProductCard?.quantity
//           ? matchedObjectProductCard?.quantity
//           : 0;

//           product.favourite = isFavouriteMatch;
//           product.isProductCardMatch = isProductCardMatch;

//       });
//     });
//     dispatch(setSubCategoriesData(jsonData));
//     setSubcategoryData(jsonData);
//     setSelectedSubCategory(selectedSubCategory);
//     setProductData(jsonData[0]?.product);
//     setVisibleData(jsonData[0]?.product?.slice(0, 30));
//      dispatch(updateUser({refreshCategoriesPage: false}));
//   }
//   const renderItem = ({item, index}) => {
//     console.log('matchedObjectProductCard',index);

//     return (
//       <View key={index} style={styles.OrderWrapper}>
//         <OrderItems
//           index={index}
//           item={item}
//           itemId={item.objectId}
//           favourite={item.favourite}
//           itemImage={item.productImageUrl}
//           itemName={item.Name}
//           weight={item.Quantity}
//           discountedPrice={`${item.Price} AED`}
//           itemQuantity={item.quantity}
//           productCartQuntity={item.isProductCardMatch}
//           userInfo={userInfo}
//           onPress={() =>
//             navigation.navigate('Product', {
//               product: item,
//               productImage: item.productImageUrl,
//               productName: item.Name,
//               productQuantity: item.Quantity,
//               // productOrignalPrice: item.Price,
//               productDiscountPrice: item.Price,
//               productAddCartQuntity: item.isProductCardMatch,
//               productFavorite: item.favourite,
//               productDiscription: item.Description
//                 ? item.Description
//                 : item.Name,
//               isBackData: true,
//             })
//           }
//         />
//       </View>
//     );
//   };

//   const handleEndReached = () => {
//     setIsLoading(true);

//     const nextBatch = productData?.slice(
//       visibleData.length,
//       visibleData.length + 90,
//     );
//     setVisibleData(prevVisibleData => [...prevVisibleData, ...nextBatch]);
//     if (visibleData.length >= productData.length) {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <View style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
//       <Header
//         back
//         onLeftPress={() => navigation.goBack()}
//         onRightPress={()=>onPressLocation()}
//         rightIcon
//         title={route?.params?.lable}
//         RightIconName={'cart'}
//         iconType={'MaterialCommunityIcons'}
//         headerBg={Colors.primary}
//         iconColor={IndependentColors.white}
//         titleAlight={'center'}
//       />

//       <>
//       {productData && subcategoryData ?
//       <>
//       <View>
//         <ScrollView
//           horizontal={true}
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.categoriesContainer}>
//           {subcategoryData.map((subCategory, index) => {
//             return (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => {
//                   setSelectedSubCategory(index);
//                   setProductData(subCategory.product);
//                   setVisibleData(subCategory.product.slice(0, 30));
//                 }}
//                 style={[
//                   styles.categoryButton,
//                   {
//                     backgroundColor:
//                       index == selectedSubCategory
//                         ? Colors.primary
//                         : IndependentColors.white,
//                   },
//                 ]}>
//                 <Text
//                   style={[
//                     styles.categoryButtonText,
//                     {
//                       color:
//                         index == selectedSubCategory
//                           ? IndependentColors.white
//                           : IndependentColors.black,
//                     },
//                   ]}>
//                   {subCategory.Name}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </ScrollView>
//         {loading == false  &&   <View style={styles.borderTop} />}
//       </View>

//       {/* {productData?.length > 0 ? ( */}
//         {/* <>
//           {subcategoryData.map((isItem, ind) => {
//             return ( */}
//               {/* <>
//                 {selectedSubCategory == ind ? ( */}
//                   <>
//                     <View style={styles.orderagainview}>
//                       <FlatList
//                         data={visibleData}
//                         numColumns={3}
//                         renderItem={renderItem}
//                         keyExtractor={(item, index) =>
//                           `${item.objectId}-${index}`
//                         }
//                         onEndReached={()=>handleEndReached()}
//                         onEndReachedThreshold={0.9}
//                         ListFooterComponent={() =>
//                           isLoading ? (
//                             <>
//                               <ActivityIndicator size="large" />
//                               <View style={{marginTop: 200}} />
//                             </>
//                           ) : null
//                         }
//                         initialNumToRender={30}
//                       />
//                       {

//                     }
//                       <View  style={userInfo.sessionToken ? mainStyles.marginBottom22: mainStyles.marginTop15} />
//                       {/* {isItem.product.map((item, index)=>{

//                         return(
//                           <View key={index} style={styles.OrderWrapper}>
//                           <OrderItems
//                             index={index}
//                             item={item}
//                             itemId={item.objectId}
//                             favourite={item.favourite}
//                             itemImage={item.productImageUrl}
//                             itemName={item.Name}
//                             weight={item.Quantity}
//                             discountedPrice={`${item.Price} AED`}
//                             itemQuantity={item.quantity}
//                             productCartQuntity={item.isProductCardMatch}
//                             userInfo={userInfo}
//                             onPress={() =>
//                               navigation.navigate('Product', {
//                                 product: item,
//                                 productImage: item.productImageUrl,
//                                 productName: item.Name,
//                                 productQuantity: item.Quantity,
//                                 // productOrignalPrice: item.Price,
//                                 productDiscountPrice: item.Price,
//                                 productAddCartQuntity: item.isProductCardMatch,
//                                 productFavorite: item.favourite,
//                                 productDiscription: item.Description
//                                   ? item.Description
//                                   : item.Name,
//                                 isBackData: true,
//                               })
//                             }
//                           />
//                         </View>
//                         )
//                       })} */}
//                     </View>
//                   </>
//                 {/* ) : null}
//               </> */}
//             {/* );
//           })} */}
//           {/* <View style={styles.orderagainview}>
//             <FlatList
//               data={visibleData}
//               numColumns={3}
//               renderItem={renderItem}
//               keyExtractor={(item, index) => `${item.objectId}-${index}`}
//               onEndReached={handleEndReached}
//               onEndReachedThreshold={0.9}
//               ListFooterComponent={() =>
//                 isLoading ? (
//                   <>
//                     <ActivityIndicator size="large" />
//                     <View style={{marginTop: 200}} />
//                   </>
//                 ) : null
//               }
//               initialNumToRender={30}
//             />
//           </View> */}
//         {/* </> */}
//       {/* ) : (
//         <>
//           {loading == false && (
//             <EmptyCart
//               message={'Product is not available'}
//               onPress={() => navigation.navigate('Home')}
//             />
//           )}
//         </>
//       )} */}
//       </>
//       :
//       <View style={styles.emptyItem}>
//       {loading == false && (
//         <EmptyCart
//           message={'Product is not available'}
//           onPress={() => navigation.navigate('Home')}
//         />
//       )}
//    </View>

//     }
//       </>

//       <View style={mainStyles.marginTop15} />
//       {loading && <Indicators />}
//     </View>
//   );
// };

// // Exporting
// export default ListViewProducts;

///working as dynamic
// import React, {useContext, useEffect, useState} from 'react';
// import {
//   View,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
// } from 'react-native';
// import {ThemeContext} from '../../theming/ThemeContext';
// import styles from './styles';
// import {IndependentColors} from '../../config/Colors';
// import {useDispatch, useSelector, useStore} from 'react-redux';

// import Header from '../../components/Header';
// import {getSubCategories} from '../../api/categories/categoriesAndProduct';
// import {Indicators} from '../../components/apploader';
// import Constants from '../../constants/Constants';
// import imageData from '../../allImageJson.json';
// import EmptyCart from '../../components/emptyCart/EmptyCart';
// import mainStyles from '../../constants/MainStyles';
// import Colors from '../../constants/Colors';
// import OrderItems from '../../components/cards/OrderagainitemCard/OrderItems';
// import {setSubCategoriesData} from '../../redux/slices/SubCategoriesSlice';
// import {updateUser} from '../../redux/slices/SessionUser';
// import {TabBar, TabView} from 'react-native-tab-view';
// import jsosss from '../Home/ppppp.json';
// // Functional component
// const ListViewProducts = ({navigation, route}) => {
//   const store = useStore();
//   const {productCart, wishList, userInfo, subCategoriesList} = route?.params;
//   const subCategories = useSelector(state => state.subCategories.subCategories);
//   const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
//   const theme = isLightTheme ? lightTheme : darkTheme;
//   const categoryId = route?.params?.categoryId;
//   const [subcategoryData, setSubcategoryData] = useState([]);
//   const [productData, setProductData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [visibleData, setVisibleData] = useState(jsosss.slice(0, 5));
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedSubCategory, setSelectedSubCategory] = useState(0);
//   const dispatch = useDispatch();
//   const onPressLocation = () => {
//     navigation.navigate('Cart');
//   };

//   useEffect(() => {
//     // if (store.getState().subCategories.subCategories.length ==) {

//     // }
//     callApiForGetData();
//   }, []);
//   // console.log('pernt data', subCategoriesList);
//   // Returning
//   const callApiForGetData = () => {
//     const data = {
//       parentCategory: categoryId,
//       StoreId: userInfo?.selectedStoreData?.StoreId,
//     };
//     setLoading(true);
//     getSubCategories(data)
//       .then(item => {
//         const jsonData = item.result.SubCategories;
//         // const wishLists = store.getState().wishList.wishList;
//         // const productCarts = store.getState().productCart.cartItems;
//         // jsonData.forEach(subcategory => {
//         //   subcategory.product.forEach(product => {
//         //     const matchedObjectFavourite = wishLists?.find(
//         //       find => find.objectId == product.objectId,
//         //     );
//         //     const isFavouriteMatch = matchedObjectFavourite ? true : false;
//         //     const matchedObjectProductCard = productCarts?.find(
//         //       find => find.item.objectId == product.objectId,
//         //     );
//         //     const isProductCardMatch = matchedObjectProductCard?.quantity
//         //       ? matchedObjectProductCard?.quantity
//         //       : 0;

//         //     product.favourite = isFavouriteMatch;
//         //     product.isProductCardMatch = isProductCardMatch;
//         //   });
//         // });

//         console.log('jsonDatajsonDatajsonDatajsonData', jsonData[0]);
//         // dispatch(setSubCategoriesData(jsonData));
//         setSubcategoryData(jsonData);
//         setSelectedSubCategory(0);
//         setProductData(jsonData[0]?.product);
//         setVisibleData(jsonData[0].product.slice(0, 30));
//         setLoading(false);
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   };
//   // useEffect(() => {
//   //   const focusHandler = navigation.addListener('focus', () => {
//   //     const userInfos = store.getState().users.users.refreshCategoriesPage;
//   //     // alert(userInfos)
//   //     // callApiForGetData()
//   //     if (userInfos == true) {
//   //       // alert(categoryId)
//   //       subCategoriesRefreshData();
//   //     }
//   //     // console.log("eeeeeeeeeeeeeeeeeeee",categoryId);
//   //   });
//   //   return focusHandler;
//   // }, [navigation]);

//   const subCategoriesRefreshData = () => {
//     const subCategoriess = store.getState().subCategories.subCategories;
//     const wishLists = store.getState().wishList.wishList;
//     const productCarts = store.getState().productCart.cartItems;
//     const jsonData = subCategoriess;
//     console.log('eeeeeeeeeeeeeeeeeeee', jsonData);
//     jsonData.forEach(subcategory => {
//       subcategory.product.forEach(product => {
//         const matchedObjectFavourite = wishLists?.find(
//           find => find.objectId == product.objectId,
//         );
//         const isFavouriteMatch = matchedObjectFavourite ? true : false;
//         const matchedObjectProductCard = productCarts?.find(
//           find => find.item.objectId == product.objectId,
//         );
//         const isProductCardMatch = matchedObjectProductCard?.quantity
//           ? matchedObjectProductCard?.quantity
//           : 0;

//         product.favourite = isFavouriteMatch;
//         product.isProductCardMatch = isProductCardMatch;
//       });
//     });
//     dispatch(setSubCategoriesData(jsonData));
//     setSubcategoryData(jsonData);
//     setSelectedSubCategory(selectedSubCategory);
//     setProductData(jsonData[0]?.product);
//     setVisibleData(jsonData[0]?.product?.slice(0, 30));
//     dispatch(updateUser({refreshCategoriesPage: false}));
//   };
//   const renderItem = ({item, index}) => {
//     return (
//       <View key={index} style={styles.OrderWrapper}>
//         <OrderItems
//           index={index}
//           item={item}
//           itemId={item.objectId}
//           favourite={item.favourite}
//           itemImage={item.productImageUrl}
//           itemName={item.Name}
//           weight={item.Quantity}
//           discountedPrice={`${item.Price} AED`}
//           itemQuantity={item.quantity}
//           productCartQuntity={item.isProductCardMatch}
//           userInfo={userInfo}
//           onPress={() =>
//             navigation.navigate('Product', {
//               product: item,
//               productImage: item.productImageUrl,
//               productName: item.Name,
//               productQuantity: item.Quantity,
//               // productOrignalPrice: item.Price,
//               productDiscountPrice: item.Price,
//               productAddCartQuntity: item.isProductCardMatch,
//               productFavorite: item.favourite,
//               productDiscription: item.Description
//                 ? item.Description
//                 : item.Name,
//               isBackData: true,
//             })
//           }
//         />
//       </View>
//     );
//   };

//   const handleEndReached = () => {
//     setIsLoading(true);

//     const nextBatch = productData?.slice(
//       visibleData.length,
//       visibleData.length + 90,
//     );
//     setVisibleData(prevVisibleData => [...prevVisibleData, ...nextBatch]);
//     if (visibleData.length >= productData.length) {
//       setIsLoading(false);
//     }
//   };
//   const [index, setIndex] = useState(0);
//   const [routes] = useState(
//     subcategoryData.map((subcategory, index) => {
//       console.log(subcategory);
//       return {
//         key: `${index}`,
//         title: subcategory.Name,
//         subList: subcategory.product,
//       };
//     }),
//   );

//   const fetchDataForTab = async subList => {
//     try {
//       setIsLoading(true);
//       // // Make API call using your utility function
//       // const data = await fetchDataFromApi(subList); // Replace with your actual API endpoint and data processing logic
//       // setVisibleData(data.slice(10, 20)); // Update visibleData state with fetched data

//       const formData = {
//         StoreId: 12,
//         ParentCategory: subList.ParentCategory,
//         subCategory: subList.objectId,
//         page: 1,
//       };
//       if (index == 0) {
//         setVisibleData(jsosss.slice(0, 30));
//       } else if (index == 2) {
//         setVisibleData(jsosss.slice(31, 40));
//       }

//       // getSubCategories(formData)
//       // .then(item => {
//       //   const jsonData = item.result;
//       //   console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",jsonData);

//       //   setSubcategoryData(jsonData);
//       //   setSelectedSubCategory(0);
//       //   setProductData(jsonData[0]?.product);
//       //   setVisibleData(jsonData[0].product.slice(0, 30));
//       //   setLoading(false);
//       // })
//       // .catch(() => {
//       //   setLoading(false);
//       // });
//     } catch (error) {
//       setIsLoading(false);
//       console.error('Error fetching data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // useEffect(() => {
//   //   fetchDataForTab(routes[index].subList); // Fetch data when the scene is rendered
//   // }, [index, routes]);
//   const renderScene = ({route}) => {
//     const subcategory = subcategoryData.find(s => s.Name === route.title);
//     console.log('routerouteroute', route);
//     return (
//       <FlatList
//         data={subcategory}
//         numColumns={3}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => `${item.objectId}-${index}`}
//         ListFooterComponent={() => (
//           <>
//             {isLoading ? <ActivityIndicator size="large" /> : null}
//             <View
//               style={
//                 userInfo.sessionToken
//                   ? mainStyles.marginTop15
//                   : mainStyles.marginTop15
//               }
//             />
//           </>
//         )}
//       />
//     );
//   };

//   const renderTabBar = props => {
//     console.log('ddddddddddddddddddddddddddddddd');
//     return (
//       <TabBar
//         {...props}
//         scrollEnabled={true}
//         indicatorStyle={{backgroundColor: Colors.primary, height: 2}} // Customize the indicator style
//         style={{backgroundColor: 'white', elevation: 0, shadowOpacity: 0}} // Customize the background style
//         labelStyle={{color: 'black', fontSize: 16, fontWeight: 'bold'}} // Customize the label style
//         // onTabPress={(val)=>{
//         //   console.log("sjndiufiusdppppppppprrrrrrrrrrrrrrr",val.route.subList);
//         //   setVisibleData(jsosss.slice(10,20))
//         // }}
//         renderLabel={({route, focused, color}) => (
//           <Text
//             style={{
//               color: focused ? Colors.primary : Colors.black,
//               textAlign: 'center',
//             }}>
//             {route.title}
//           </Text>
//         )} // Customize the label rendering
//       />
//     );
//   };

//   return (
//     <View style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
//       <Header
//         back
//         onLeftPress={() => navigation.goBack()}
//         onRightPress={() => onPressLocation()}
//         rightIcon
//         title={route?.params?.lable}
//         RightIconName={'cart'}
//         iconType={'MaterialCommunityIcons'}
//         headerBg={Colors.primary}
//         iconColor={IndependentColors.white}
//         titleAlight={'center'}
//       />

//       <>
//       <View style={{flex: 1}}>
//           <TabView
//             navigationState={{index, routes}}
//             renderScene={renderScene}
//             onIndexChange={setIndex}
//             renderTabBar={renderTabBar}
//             swipeEnabled={false}
//           />
//         </View>
//       </>
//       {loading && <Indicators />}
//     </View>
//   );
// };

// // Exporting
// export default ListViewProducts;

////working old version
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {ThemeContext} from '../../theming/ThemeContext';
import styles from './styles';
import {IndependentColors} from '../../config/Colors';
import {useDispatch, useSelector, useStore} from 'react-redux';

import Header from '../../components/Header';
import {getSubCategories} from '../../api/categories/categoriesAndProduct';
import {Indicators} from '../../components/apploader';
import EmptyCart from '../../components/emptyCart/EmptyCart';
import mainStyles from '../../constants/MainStyles';
import Colors from '../../constants/Colors';
import OrderItems from '../../components/cards/OrderagainitemCard/OrderItems';
import {setSubCategoriesData} from '../../redux/slices/SubCategoriesSlice';
import {updateUser} from '../../redux/slices/SessionUser';

// Functional component
const ListViewProducts = ({navigation, route}) => {
  const store = useStore();
  const scrollViewRef = useRef();
  const {productCart, wishList, userInfo} = route?.params;
  const subCategories = useSelector(state => state.subCategories.subCategories);
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  const categoryId = route?.params?.categoryId;
  const [subcategoryData, setSubcategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleData, setVisibleData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(0);
  const dispatch = useDispatch();
  const onPressLocation = () => {
    navigation.navigate('Cart');
  };

  useEffect(() => {
    // if (store.getState().subCategories.subCategories.length ==) {

    // }
    callApiForGetData();
  }, []);
  console.log('pernt data');
  // Returning
  const callApiForGetData = () => {
    const data = {
      parentCategory: categoryId,
      StoreId: userInfo?.selectedStoreData?.StoreId,
    };
    setLoading(true);
    getSubCategories(data)
      .then(item => {
        const jsonData = item.result.SubCategories;
        // const wishLists = store.getState().wishList.wishList;
        // const productCarts = store.getState().productCart.cartItems;
        // jsonData.forEach(subcategory => {
        //   subcategory.product.forEach(product => {
        //     const matchedObjectFavourite = wishLists?.find(
        //       find => find.objectId == product.objectId,
        //     );
        //     const isFavouriteMatch = matchedObjectFavourite ? true : false;
        //     const matchedObjectProductCard = productCarts?.find(
        //       find => find.item.objectId == product.objectId,
        //     );
        //     const isProductCardMatch = matchedObjectProductCard?.quantity
        //       ? matchedObjectProductCard?.quantity
        //       : 0;

        //     product.favourite = isFavouriteMatch;
        //     product.isProductCardMatch = isProductCardMatch;
        //   });
        // });

        // console.log('jsonDatajsonDatajsonDatajsonData', jsonData[0]);
        dispatch(setSubCategoriesData(jsonData));
        setSubcategoryData(jsonData);
        setSelectedSubCategory(0);
        setProductData(jsonData[0]?.product);
        setVisibleData(jsonData[0].product.slice(0, 30));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      const userInfos = store.getState().users.users.refreshCategoriesPage;
      // alert(userInfos)
      // callApiForGetData()
      // setVisibleData(prevVisibleData => [...prevVisibleData, ...jsonData]);

      // setSubcategoryData(jsonData);
      // setSelectedSubCategory(0);
      // setProductData(jsonData[0]?.product);
      // setVisibleData(jsonData[0].product.slice(0, 30));
      // if (userInfos==true) {
        
      //   scrollViewRef?.current?.scrollToIndex({
      //     index: 0,
      //     // animated: true,
      //   });
      
      // console.log('subcategoryData.', subcategoryData.length);
      // console.log('productData', productData.length);
      // console.log('selectedSubCategory', selectedSubCategory);
      // console.log('visibleData', visibleData.length);
      // // console.log('visibleData', visibleData);
      // setSubcategoryData(prev => prev);
      // setSelectedSubCategory(prev => prev);
      // setProductData(prev => prev);
      // setVisibleData(prev => prev);
      // dispatch(updateUser({refreshCategoriesPage: false}));
      // setIsLoading(false);
      // }
      // if (userInfos == true) {
      // setSubcategoryData(prev => [...prev, ...subcategoryData]);
      // setSelectedSubCategory(0);
      // setProductData(prev => [...prev[0]?.product, ...productCart[0]?.product]);
      // setVisibleData(prev => [...prev[0]?.product?.slice(0, 30), ...visibleData[0]?.product?.slice(0, 30)]);
      // }
      if (userInfos == true) {
        // alert(categoryId)
        subCategoriesRefreshData();
      }
      // console.log("eeeeeeeeeeeeeeeeeeee",categoryId);
    });
    return focusHandler;
  }, [navigation]);

  const subCategoriesRefreshData = () => {
    const subCategoriess = store.getState().subCategories.subCategories;
    // const wishLists = store.getState().wishList.wishList;
    // const productCarts = store.getState().productCart.cartItems;
    const jsonData = subCategoriess;
    // console.log('eeeeeeeeeeeeeeeeeeee', jsonData);
    // jsonData.forEach(subcategory => {
    //   subcategory.product.forEach(product => {
    //     const matchedObjectFavourite = wishLists?.find(
    //       find => find.objectId == product.objectId,
    //     );
    //     const isFavouriteMatch = matchedObjectFavourite ? true : false;
    //     const matchedObjectProductCard = productCarts?.find(
    //       find => find.item.objectId == product.objectId,
    //     );
    //     const isProductCardMatch = matchedObjectProductCard?.quantity
    //       ? matchedObjectProductCard?.quantity
    //       : 0;

    //     product.favourite = isFavouriteMatch;
    //     product.isProductCardMatch = isProductCardMatch;
    //   });
    // });
    dispatch(setSubCategoriesData(jsonData));
    setSubcategoryData(jsonData);
    setSelectedSubCategory(selectedSubCategory);
    setProductData(jsonData[0]?.product);
    setVisibleData(jsonData[0]?.product?.slice(0, 30));
    dispatch(updateUser({refreshCategoriesPage: false}));
  };
  const renderItem = ({item, index}) => {
    console.log('matchedObjectProductCard', index);

    return (
      <View key={index} style={styles.OrderWrapper}>
        <OrderItems
          index={index}
          item={item}
          itemId={item.objectId}
          // favourite={item.favourite}
          itemImage={item.productImageUrl}
          itemName={item.Name}
          weight={item.Quantity}
          discountedPrice={`${item.Price} AED`}
          itemQuantity={item.quantity}
          productCartQuntity={item.isProductCardMatch}
          userInfo={userInfo}
          onPress={() =>
            navigation.navigate('Product', {
              product: item,
              productImage: item.productImageUrl,
              productName: item.Name,
              productQuantity: item.Quantity,
              // productOrignalPrice: item.Price,
              productDiscountPrice: item.Price,
              productAddCartQuntity: item.isProductCardMatch,
              // productFavorite: item.favourite,
              productDiscription: item.Description
                ? item.Description
                : item.Name,
              isBackData: true,
            })
          }
        />
      </View>
    );
  };

  const handleEndReached = () => {
    setIsLoading(true);

    const nextBatch = productData?.slice(
      visibleData.length,
      visibleData.length + 30,
    );
    setVisibleData(prevVisibleData => [...prevVisibleData, ...nextBatch]);
    if (visibleData.length >= productData.length) {
      setIsLoading(false);
    }
  };
  return (
    <View style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
      <Header
        back
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => onPressLocation()}
        rightIcon
        title={route?.params?.lable}
        RightIconName={'cart'}
        iconType={'MaterialCommunityIcons'}
        headerBg={Colors.primary}
        iconColor={IndependentColors.white}
        titleAlight={'center'}
      />

      <>
        {productData && subcategoryData ? (
          <>
            <View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContainer}>
                {subcategoryData.map((subCategory, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        scrollViewRef.current.scrollToIndex({
                          index: 0,
                          animated: false,
                        });
                        setSelectedSubCategory(index);
                        setProductData(subCategory.product);
                        setVisibleData(subCategory.product.slice(0, 30));
                      }}
                      style={[
                        styles.categoryButton,
                        {
                          backgroundColor:
                            index == selectedSubCategory
                              ? Colors.primary
                              : IndependentColors.white,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.categoryButtonText,
                          {
                            color:
                              index == selectedSubCategory
                                ? IndependentColors.white
                                : IndependentColors.black,
                          },
                        ]}>
                        {subCategory.Name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              {loading == false && <View style={styles.borderTop} />}
            </View>

            <>
              <View style={styles.orderagainview}>
                <FlatList
                  ref={scrollViewRef}
                  data={visibleData}
                  numColumns={3}
                  showsVerticalScrollIndicator={false}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => `${item.objectId}-${index}`}
                  onEndReachedThreshold={0.5}
                  onEndReached={handleEndReached}
                  contentOffset={{x: 0, y: 0}}
                  ListFooterComponent={() => (
                    <>
                      {isLoading ? <ActivityIndicator size="large" /> : null}
                      <View
                        style={
                          userInfo.sessionToken
                            ? mainStyles.marginBottom25
                            : mainStyles.marginTop15
                        }
                      />
                    </>
                  )}
                />
              
              </View>
            </>
          </>
        ) : (
          <View style={styles.emptyItem}>
            {loading == false && (
              <EmptyCart
                message={'Product is not available'}
                onPress={() => navigation.navigate('Home')}
              />
            )}
          </View>
        )}
      </>

      {/* <View style={mainStyles.marginTop15} /> */}
      {loading && <Indicators />}
    </View>
  );
};

// Exporting
export default ListViewProducts;
