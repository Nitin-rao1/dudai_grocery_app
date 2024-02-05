import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './styles';
import Link from '../../components/links/Link';
import Colors from '../../constants/Colors';
import {useSelector} from 'react-redux';
import GridViewItemCard from '../../components/cards/GridViewItemCard';
import Constants from '../../constants/Constants';
import mainStyles from '../../constants/MainStyles';

// Functional component
const SingleProductRow = ({
  onPress,
  label,
  data,
  navigation,
  onPressProduct,
  onPressItem,
}) => {
  const wishList = useSelector(state => state.wishList.wishList);
  const productCart = useSelector(state => state.productCart.cartItems);

  return (
    <>
      {data?.length > 0 && (
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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.horizontalScrollView}>
            {data.map((item, index) => {
              const matchedObjectProductCard = productCart?.find(
                find => find.item.objectId == item.objectId,
              );
              const isProductCardMatch = matchedObjectProductCard?.quantity
                ? matchedObjectProductCard?.quantity
                : 0;
              const imageUrl = item?.productImageUrl
                ? item?.productImageUrl
                : Constants.imageNotFound;
              const matchedObjectFavourite = wishList?.find(
                find => find.objectId == item.objectId,
              );
              const isFavouriteMatch = matchedObjectFavourite ? true : false;

              return (
                <View key={index} style={styles.itemWrapper}>
                  <GridViewItemCard
                    item={item}
                    itemImage={imageUrl}
                    itemName={item.Name}
                    favourite={isFavouriteMatch}
                    weight={item.Quantity}
                    discountedPrice={`${item.Price} AED`}
                    itemQuantity={item.Quantity}
                    onPress={() => {
                      if (onPressItem == false) {
                        console.log('not Click');
                      } else {
                        navigation.navigate(onPressProduct, {
                          product: item,
                          productImage: imageUrl,
                          productName: item.Name,
                          productQuantity: item.Quantity,
                          productDiscountPrice: item.Price,
                          productAddCartQuntity: isProductCardMatch,
                          productFavorite: isFavouriteMatch,
                          productDiscription: item.Description
                            ? item.Description
                            : item.Name,
                        });
                      }
                    }}
                  />
                </View>
              );
            })}
            <View style={mainStyles.marginLeft2} />
          </ScrollView>
        </>
      )}
    </>
  );
};

// Exporting
export default SingleProductRow;
