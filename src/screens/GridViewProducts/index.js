import {useContext} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ThemeContext} from '../../theming/ThemeContext';
// import GridViewProductsData from '../../data/GridViewProductsData';
// import GridViewItemCard from '../../components/cards/GridViewItemCard';
// import {scale} from 'react-native-size-matters';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {addItemToCart, reduceItemFromCart} from '../../redux/slices/CartSlice';
import {
  decreaseQuantity,
  increaseQuantity,
} from '../../redux/slices/ProductsSlice';
import OrderagainitemCard from '../../components/cards/OrderagainitemCard';
import Constants from '../../constants/Constants';
import mainStyles from '../../constants/MainStyles';
import OrderItems from '../../components/cards/OrderagainitemCard/OrderItems';
import Colors from '../../constants/Colors';

// Functional component
const GridViewProducts = ({navigation, route}) => {
  const wishList = useSelector(state => state.wishList.wishList);
  const productCart = useSelector(state => state.productCart.cartItems);

  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
  const data = route?.params?.data;
  // Storing theme config according to the theme mode

  // Returning
  return (
    <View style={[styles.mainWrapper, {backgroundColor: Colors.white}]}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.orderagainview}>
          {data?.map((item, index) => {
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
            console.log('matchedObjectProductCard', item);
            let myProductPrice;

            if (parseFloat(item?.DiscountedPricePerItem) > 0) {
              myProductPrice = item?.DiscountedPricePerItem;
            } else {
              // console.log("dddddddd");
              myProductPrice = parseFloat(item.Price);
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

        <View style={mainStyles.marginBottom20} />
      </ScrollView>
    </View>
  );
};

// Exporting
export default GridViewProducts;
