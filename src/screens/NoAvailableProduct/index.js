import React, {useContext} from 'react';
import {View, ScrollView, Text} from 'react-native';
import WishlistItemCard from '../../components/cards/WishlistItemCard';
// import WishlistData from '../../data/WishlistData';
import {ThemeContext} from '../../theming/ThemeContext';
import styles from './styles';
import {useSelector} from 'react-redux';
import OrderagainitemCard from '../../components/cards/OrderagainitemCard';
import Constants from '../../constants/Constants';
import EmptyCart from '../../components/emptyCart/EmptyCart';
import Header from '../../components/Header';
import Colors from '../../constants/Colors';
import { IndependentColors } from '../../config/Colors';
import NoProducts from './NoProducts';
import Button from '../../components/buttons/Button';

// Functional component
const NoAvailableProduct = ({navigation}) => {
  // Using context

  const wishList = useSelector(state => state.wishList.wishList);
  const productCart = useSelector(state => state.productCart.cartItems);
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  // Returning
  return (
    <View style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
      {/* Scrollview */}
      <Header
        back
        onLeftPress={() => navigation.goBack()}
        title={'Not Avalible'}
        headerBg={Colors.primary}
        iconColor={IndependentColors.white}
        titleAlight={'center'}
      />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.textheadingView}>
            <Text  style={styles.textheading} >
                Not Avalible Product
            </Text> 
        </View>
        <View style={styles.orderagainview}>
          {wishList.length > 0 ? (
            <>
              {wishList?.map((item, index) => {
                // const matchedObjectProductCard = productCart?.find(
                //   find => find.item.objectId == item.objectId,
                // );
                // const isProductCardMatch = matchedObjectProductCard?.quantity
                //   ? matchedObjectProductCard?.quantity
                //   : 0;
                // const matchedObjectFavourite = wishList?.find(
                //   find => find.objectId == item.objectId,
                // );
                // const isFavouriteMatch = matchedObjectFavourite ? true : false;

                const imageUrl = item?.productImageUrl
                  ? item?.productImageUrl
                  : Constants.imageNotFound;

                return (
                  <View key={index} style={styles.OrderWrapper}>
                    <NoProducts
                      index={index}
                      itemImage={imageUrl}
                      itemName={item.Name}
                      weight={item.Quantity}
                      discountedPrice={`${item.Price} AED`}
                    />
                  </View>
                );
              })}
            </>
          ) : (
            <EmptyCart onPress={() => navigation.navigate('Home')} />
          )}
        </View>

        <View style={styles.textheadingView}>
            <Text  style={styles.textheading} >
                Suggestion Product
            </Text> 
        </View>
        <View style={styles.orderagainview}>
          {wishList.length > 0 ? (
            <>
              {wishList?.map((item, index) => {
                const matchedObjectProductCard = productCart?.find(
                  find => find.item.objectId == item.objectId,
                );
                const isProductCardMatch = matchedObjectProductCard?.quantity
                  ? matchedObjectProductCard?.quantity
                  : 0;
                const matchedObjectFavourite = wishList?.find(
                  find => find.objectId == item.objectId,
                );
                const isFavouriteMatch = matchedObjectFavourite ? true : false;

                const imageUrl = item?.productImageUrl
                  ? item?.productImageUrl
                  : Constants.imageNotFound;

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
            <EmptyCart onPress={() => navigation.navigate('Home')} />
          )}
        </View>

        <View style={styles.buttonsty}>
            <Button
              label="Cancel"
              labelColor={theme.primary}
              backgroundColor={theme.accent}
              onPress={() => {
                alert('In development')
              }}
            />
            <Button
              label="Confirm"
              labelColor={theme.primary}
              backgroundColor={theme.accent}
              onPress={() => {
                alert('In development')
              }}
            />
          </View>
      </ScrollView>
    </View>
  );
};

// Exporting
export default NoAvailableProduct;
