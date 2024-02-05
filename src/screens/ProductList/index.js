import React, {useContext, useEffect, useState} from 'react';
import {View, ScrollView, BackHandler} from 'react-native';
import WishlistItemCard from '../../components/cards/WishlistItemCard';
// import WishlistData from '../../data/WishlistData';
import {ThemeContext} from '../../theming/ThemeContext';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
import OrderagainitemCard from '../../components/cards/OrderagainitemCard';
import Constants from '../../constants/Constants';
import EmptyCart from '../../components/emptyCart/EmptyCart';
import Header from '../../components/Header';
import {IndependentColors} from '../../config/Colors';
import {
  userProductSearch,
  userProductSearchByText,
} from '../../api/categories/categoriesAndProduct';
import {Indicators} from '../../components/apploader';
import Colors from '../../constants/Colors';
// Functional component
const ProductList = ({navigation, route}) => {
  // Using context

  const userInfo = useSelector(state => state.users.users);
  const wishList = useSelector(state => state.wishList.wishList);
  // const isproduct = useSelector(state => state.productData?.productData);
  const [loading, setLoading] = useState(true);
  const productCart = useSelector(state => state.productCart.cartItems);
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
  const dispatch = useDispatch();
  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;
  console.log('###############################', route?.params);

  // const {productData} = route.params;

  const {productData} = route.params ? route.params : {productData: null};

  const [isproduct, setProduct] = useState([]);

  useEffect(() => {
    const {type, value} = route.params || {};
    if (type === 'search') {
      // Call the search API

      userProductSearchByText({
        text: value,
        StoreId: userInfo?.selectedStoreData?.StoreId,
      })
        .then(val => {
          setProduct(val.result.items);
          setLoading(false);
          console.log('qqqqqqqqqqq:', val.result);
        })
        .catch(err => {
          setLoading(false);
        });
    } else if (type === 'qrcode') {
      userProductSearch({
        Barcode: value,
        StoreId: userInfo?.selectedStoreData?.StoreId,
      })
        .then(val => {
          console.log('ttttttttttttt:', val.result.items);
          setProduct(val.result.items);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
        });
    } else {
      console.log('missing msg');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  function handleBackButtonClick() {
    navigation.navigate('Home');
    return true;
  }
  return (
    <>
      {loading ? (
        <Indicators />
      ) : (
        <View style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
          {/* {/ Scrollview /} */}
          <Header
            back
            onLeftPress={() => navigation.navigate('Home')}
            title={'Product List'}
            headerBg={Colors.primary}
            iconColor={IndependentColors.white}
            titleAlight={'center'}
          />
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <View style={styles.orderagainview}>
              {/* {/ {isproduct.length > 0 ? /} */}
              {isproduct && isproduct.length > 0 ? (
                <>
                  {isproduct?.map((item, index) => {
                    const matchedObjectProductCard = productCart?.find(
                      find => find.item.objectId == item.objectId,
                    );
                    const isProductCardMatch =
                      matchedObjectProductCard?.quantity
                        ? matchedObjectProductCard?.quantity
                        : 0;
                    const matchedObjectFavourite = wishList?.find(
                      find => find.objectId == item.objectId,
                    );
                    const isFavouriteMatch = matchedObjectFavourite
                      ? true
                      : false;
                   
                    // console.log("matchedObjectmatchedObject",matchedObject, item.ImageID,matchedObjectFavourite);
                    const imageUrl =  Constants.imageNotFound;
                    // console.log("matchedObjectProductCard",matchedObjectFavourite);

                    return (
                      <View key={index} style={styles.OrderWrapper}>
                        <OrderagainitemCard
                          index={index}
                          item={item}
                          itemId={item.objectId}
                          favourite={isFavouriteMatch}
                          itemImage={imageUrl}
                          itemName={item.Name}
                          weight={item.Quantity}
                          discountedPrice={`${item.Price} AED`}
                          itemQuantity={item.quantity}
                          productCartQuntity={isProductCardMatch}
                          onPress={() =>
                            navigation.navigate('Product', {
                              product: item,
                              productImage: imageUrl,
                              productName: item.Name,
                              productQuantity: item.Quantity,
                              // productOrignalPrice: item.Price,
                              productDiscountPrice: item.Price,
                              productAddCartQuntity: isProductCardMatch,
                              productFavorite: isFavouriteMatch,
                              productDiscription: item.Description
                                ? item.Description
                                : item.Name,
                            })
                          }
                        />
                      </View>
                    );
                  })}
                </>
              ) : (
                <EmptyCart
                  message={'Product not Found'}
                  onPress={() => navigation.navigate('Home')}
                />
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default ProductList;



// import React, {useContext, useEffect, useState} from 'react';
// import {View, ScrollView, BackHandler} from 'react-native';
// import WishlistItemCard from '../../components/cards/WishlistItemCard';
// import WishlistData from '../../data/WishlistData';
// import {ThemeContext} from '../../theming/ThemeContext';
// import styles from './styles';
// import {useSelector, useDispatch, useStore} from 'react-redux';
// import OrderagainitemCard from '../../components/cards/OrderagainitemCard';
// import Constants from '../../constants/Constants';
// import EmptyCart from '../../components/emptyCart/EmptyCart';
// import Header from '../../components/Header';
// import {IndependentColors} from '../../config/Colors';
// import {
//   userProductSearch,
//   userProductSearchByText,
// } from '../../api/categories/categoriesAndProduct';
// import {Indicators} from '../../components/apploader';
// import imageData from '../../allImageJson.json';
// import Colors from '../../constants/Colors';
// // Functional component
// const ProductList = ({navigation, route}) => {
//   // Using context
//   //   const imagesAllData = useSelector(state => state.images.images);
//   const store = useStore();
//   const imagesAllData = imageData.data;
//   const userInfo = useSelector(state => state.users.users);
//   const wishList = useSelector(state => state.wishList.wishList);
//   // const isproduct = useSelector(state => state.productData?.productData);
//   const [loading, setLoading] = useState(true);
//   const productCart = useSelector(state => state.productCart.cartItems);
//   const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
//   const dispatch = useDispatch();
//   // Storing theme config according to the theme mode
//   const theme = isLightTheme ? lightTheme : darkTheme;
//   console.log('###############################', route?.params);

//   // const {productData} = route.params;

//   const {productData} = route.params ? route.params : {productData: null};

//   const [isproduct, setProduct] = useState([]);

//   useEffect(() => {
//     const {type, value} = route.params || {};
//     if (type === 'search') {
//       // Call the search API

//       handleSerachByText(value)
//     } else if (type === 'qrcode') {
//       userProductSearch({
//         Barcode: value,
//         StoreId: userInfo?.selectedStoreData?.StoreId,
//       })
//         .then(val => {
//           console.log('ttttttttttttt:', val.result.items);
//           setProduct(val.result.items);
//           setLoading(false);
//         })
//         .catch(err => {
//           setLoading(false);
//         });
//     } else {
//       console.log('missing msg');
//       setLoading(false);
//     }
//   }, []);

// const handleSerachByText =(value)=>{
//   userProductSearchByText({
//     text: value,
//     StoreId: userInfo?.selectedStoreData?.StoreId,
//   })
//     .then(val => {

//       const jsonData = val.result.items
//       const wishLists = store.getState().wishList.wishList;
//       const productCarts = store.getState().productCart.cartItems;
      
//       jsonData.forEach(product => {
        
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
//             const matchedObjectImage = imagesAllData?.find(
//               find => find.objectId == product.ImageID,
//             );
//             const imageUrl = matchedObjectImage?.Image?.url
//               ? matchedObjectImage?.Image?.url
//               : Constants.imageNotFound;
//           product.favourite = isFavouriteMatch;
//           product.isProductCardMatch = isProductCardMatch;
//           product.productImageUrl=imageUrl
      
//       });
//       setProduct(jsonData);
//       setLoading(false);
//       console.log('qqqqqqqqqqq:', val.result);
//     })
//     .catch(err => {
//       setLoading(false);
//     });
// }


//   useEffect(() => {
//     BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
//     return () => {
//       BackHandler.removeEventListener(
//         'hardwareBackPress',
//         handleBackButtonClick,
//       );
//     };
//   }, []);
//   function handleBackButtonClick() {
//     navigation.navigate('Home');
//     return true;
//   }
//   return (
//     <>
//       {loading ? (
//         <Indicators />
//       ) : (
//         <View style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
//           {/* {/ Scrollview /} */}
//           <Header
//             back
//             onLeftPress={() => navigation.navigate('Home')}
//             title={'Product List'}
//             headerBg={Colors.primary}
//             iconColor={IndependentColors.white}
//             titleAlight={'center'}
//           />
//           <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
//             <View style={styles.orderagainview}>
//               {/* {/ {isproduct.length > 0 ? /} */}
//               {isproduct && isproduct.length > 0 ? (
//                 <>
//                   {isproduct?.map((item, index) => {
//                     // const matchedObjectProductCard = productCart?.find(
//                     //   find => find.item.objectId == item.objectId,
//                     // );
//                     // const isProductCardMatch =
//                     //   matchedObjectProductCard?.quantity
//                     //     ? matchedObjectProductCard?.quantity
//                     //     : 0;
//                     // const matchedObjectFavourite = wishList?.find(
//                     //   find => find.objectId == item.objectId,
//                     // );
//                     // const isFavouriteMatch = matchedObjectFavourite
//                     //   ? true
//                     //   : false;
//                     // const matchedObjectImage = imagesAllData?.find(
//                     //   find => find.objectId == item.ImageID,
//                     // );
//                     // // console.log("matchedObjectmatchedObject",matchedObject, item.ImageID,matchedObjectFavourite);
//                     // const imageUrl = matchedObjectImage?.Image?.url
//                     //   ? matchedObjectImage?.Image?.url
//                     //   : Constants.imageNotFound;
//                     // // console.log("matchedObjectProductCard",matchedObjectFavourite);

//                     return (
//                       <View key={index} style={styles.OrderWrapper}>
//                         <OrderagainitemCard
//                           index={index}
//                           item={item}
//                           itemId={item.objectId}
//                           favourite={item.favourite}
//                           itemImage={item.productImageUrl}
//                           itemName={item.Name}
//                           weight={item.Quantity}
//                           discountedPrice={`${item.Price} AED`}
//                           itemQuantity={item.quantity}
//                           productCartQuntity={item.isProductCardMatch}
//                           onPress={() =>
//                             navigation.navigate('Product', {
//                               product: item,
//                               productImage: item.productImageUrl,
//                               productName: item.Name,
//                               productQuantity: item.Quantity,
//                               // productOrignalPrice: item.Price,
//                               productDiscountPrice: item.Price,
//                               productAddCartQuntity: item.isProductCardMatch,
//                               productFavorite: isFavouriteMatch,
//                               productDiscription: item.Description
//                                 ? item.Description
//                                 : item.Name,
//                             })
//                           }
//                         />
//                       </View>
//                     );
//                   })}
//                 </>
//               ) : (
//                 <EmptyCart
//                   message={'Product not Found'}
//                   onPress={() => navigation.navigate('Home')}
//                 />
//               )}
//             </View>
//           </ScrollView>
//         </View>
//       )}
//     </>
//   );
// };

// export default ProductList;
