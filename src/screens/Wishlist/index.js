import React, {useContext, useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {ThemeContext} from '../../theming/ThemeContext';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import Constants from '../../constants/Constants';
import EmptyCart from '../../components/emptyCart/EmptyCart';
import mainStyles from '../../constants/MainStyles';
import {
  addFavouriteData,
  getFavouriteData,
} from '../../api/categories/categoriesAndProduct';
import {showMessage} from 'react-native-flash-message';
import {setFavoriteData} from '../../redux/slices/WishlistSlice';
import {Indicators} from '../../components/apploader';
import OrderItems from '../../components/cards/OrderagainitemCard/OrderItems';

// Functional component
const Wishlist = ({navigation}) => {
  // Using context

  const userInfo = useSelector(state => state.users.users);

  const wishList = useSelector(state => state.wishList.wishList);
  const wishListID = useSelector(state => state.wishList.wishListID);
  const productCart = useSelector(state => state.productCart.cartItems);
  const dispatch = useDispatch();

  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userInfo?.sessionToken) {
      setLoading(true);
      if (wishListID.length > 0) {
        handleFavouriteData();
      } else {
        handleGetFavouriteData();
      }
    } else {
      setLoading(false);
    }
  }, []);

  const handleFavouriteData = async () => {
    setFavouriteData(wishListID);
  };

  const setFavouriteData = async data => {
    const formData = {
      objectId: userInfo.objectId,
      favoriteIds: data.toString(),
    };

    // return;
    await addFavouriteData(formData)
      .then(val => {
        handleGetFavouriteData();
      })
      .catch(err => {
        handleGetFavouriteData();
        showMessage({
          message: Constants.appName,
          description: Constants.pleaseWait,
          type: Constants.msgTypeDanger,
          icon: Constants.msgTypeDanger,
        });
      });
  };

  const handleGetFavouriteData = async () => {
    const favFormData = {
      objectId: userInfo.objectId,
      StoreId: userInfo?.selectedStoreData?.StoreId,
    };
    await getFavouriteData(favFormData)
      .then(resp => {
        if (resp.result.data.length > 0) {
          dispatch(setFavoriteData(resp.result.data));

          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(false);
        showMessage({
          message: Constants.appName,
          description: Constants.pleaseWait + 'get',
          type: Constants.msgTypeDanger,
          icon: Constants.msgTypeDanger,
        });
      });
  };

  // Returning
  return (
    <>
      {loading ? (
        <Indicators />
      ) : (
        <View style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <View style={styles.orderagainview}>
              {wishList.length > 0 ? (
                <>
                  {wishList?.map((item, index) => {
                    console.log();
                    const matchedObjectProductCard = productCart?.find(
                      find => find.item.objectId == item.objectId,
                    );
                    const isProductCardMatch =
                      matchedObjectProductCard?.quantity
                        ? matchedObjectProductCard?.quantity
                        : 0;
                    const isFavouriteMatch = wishList?.some(
                      value => value == item.objectId,
                    );
                    return (
                      <View key={index} style={styles.OrderWrapper}>
                        <OrderItems
                          index={index}
                          item={item}
                          itemId={item.objectId}
                          favourite={isFavouriteMatch}
                          itemImage={item.productImageUrl}
                          itemName={item.Name}
                          weight={item.Quantity}
                          discountedPrice={`${item.Price} AED`}
                          itemQuantity={item.quantity}
                          productCartQuntity={isProductCardMatch}
                          onPress={() =>
                            navigation.navigate('Product', {
                              product: item,
                              productImage: item.productImageUrl,
                              productName: item.Name,
                              productQuantity: item.Quantity,

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
                  message={'Your Favourite List Empty'}
                  showbutton={false}
                  onPress={() => navigation.navigate('Home')}
                />
              )}
            </View>
            <View style={mainStyles.marginTop20} />
          </ScrollView>
        </View>
      )}
    </>
  );
};

// Exporting
export default Wishlist;
