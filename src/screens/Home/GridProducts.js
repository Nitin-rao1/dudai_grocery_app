import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './styles';
import Colors from '../../constants/Colors';
import Link from '../../components/links/Link';
import Constants from '../../constants/Constants';
import {useSelector} from 'react-redux';
import OrderItems from '../../components/cards/OrderagainitemCard/OrderItems';

// Functional component
const GridProducts = ({data, onPress, label, length, navigation}) => {
  const wishList = useSelector(state => state.wishList.wishList);
  const productCart = useSelector(state => state.productCart.cartItems);
  const isData = length ? data?.slice(0, length) : data;

  // Returning
  return (
    <>
      {data.length > 0 && (
        <>
          <View style={styles.sectionTitleAndLinkWrapper}>
            <Text
              style={[styles.sectionTitle, {color: Colors.textHighContrast}]}>
              {label}
            </Text>
            <Link
              label="See all"
              labelColor={Colors.primary}
              onPress={onPress}
            />
          </View>

          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <View style={styles.orderagainview}>
              {isData?.map((item, index) => {
                const matchedObjectProductCard = productCart?.find(
                  find => find.item.objectId == item.objectId,
                );
                const isProductCardMatch = matchedObjectProductCard?.quantity
                  ? matchedObjectProductCard?.quantity
                  : 0;
                const imageUrl = item?.ImageUrl
                  ? item?.ImageUrl
                  : Constants.imageNotFound;
                const matchedObjectFavourite = wishList?.find(
                  find => find.objectId == item.objectId,
                );
                const isFavouriteMatch = matchedObjectFavourite ? true : false;
                let myProductPrice;
                   
                if (parseFloat(item?.DiscountedPricePerItem) > 0) {
                  myProductPrice = item?.DiscountedPricePerItem
                }else{
                  // console.log("dddddddd");
                  myProductPrice = parseFloat(item.Price)
               
              }
                return (
                  <View key={index} style={styles.OrderWrapper}>
                    <OrderItems
                      index={index}
                      item={{...item, objectId: item.objectId}}
                      itemId={item.objectId}
                      favourite={isFavouriteMatch}
                      itemImage={imageUrl}
                      itemName={item.Product}
                      weight={'Qty: ' + item.Quantity}
                      discountedPrice={`${myProductPrice} AED`}
                      // discountedPrice={`${item.Price} AED`}
                      itemQuantity={item.quantity}
                      productCartQuntity={isProductCardMatch}
                      onPress={() =>
                        navigation.navigate('Product', {
                          product: {...item, objectId: item.objectId},
                          productImage: imageUrl,
                          productName: item.Product,
                          productQuantity: item.Quantity,
                          // productOrignalPrice: item.Price,
                          productDiscountPrice: myProductPrice,
                          // productDiscountPrice: item.Price,
                          productAddCartQuntity: isProductCardMatch,
                          productFavorite: isFavouriteMatch,
                          productDiscription: item.Description
                            ? item.Description
                            : item.Product,
                        })
                      }
                    />
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

// Exporting
export default GridProducts;
