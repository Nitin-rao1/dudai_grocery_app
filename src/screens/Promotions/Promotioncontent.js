import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import {IndependentColors} from '../../config/Colors';
import {ThemeContext} from '../../theming/ThemeContext';
import Menu from '../../assets/icons/svg/Menu.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {scale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
// import {
//   SCREEN_WIDTH,
//   STANDARD_HOME_MAIN_CAROUSEL_PAGINATION_INDICATOR_WIDTH,
//   STANDARD_VECTOR_ICON_SIZE,
// } from '../../config/Constants';
// import CategoriesData from '../../data/CategoriesData';
// import SingleProductRow from '../Home/SingleProductRow';
// import GridProducts from '../Home/GridProducts';

import moment from 'moment';
import {userPromotioncontent} from '../../api/categories/categoriesAndProduct';
import OrderagainitemCard from '../../components/cards/OrderagainitemCard';
import Constants from '../../constants/Constants';
import mainStyles from '../../constants/MainStyles';
import {Indicators} from '../../components/apploader';
import OrderItems from '../../components/cards/OrderagainitemCard/OrderItems';

const Promotioncontent = ({route, navigation}) => {

  const userInfo = useSelector(state => state.users.users);

  const wishList = useSelector(state => state.wishList.wishList);
  const productCart = useSelector(state => state.productCart.cartItems);
  console.log('aaaaaaaaa', route.params);
  const {image, objectId} = route.params;
  const startTime = new Date(); // Replace this with your start time
  const targetTime = new Date(startTime.getTime() + 6 * 60 * 60 * 1000);

  const [hours, setHours] = useState(6);
  const [minutes, setMinutes] = useState(0);
  const [items, setItems] = useState([]);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Define a function to update the timer every second
    const updateTimer = () => {
      // Get the current date and time
      const now = new Date();
      const targetTime = new Date(); // Replace this with your target time
      const timeRemaining = targetTime - now;

      const hoursRemaining = Math.floor(timeRemaining / 3600000);
      const minutesRemaining = Math.floor((timeRemaining % 3600000) / 60000);
      const secondsRemaining = Math.floor((timeRemaining % 60000) / 1000);

      setHours(hoursRemaining);
      setMinutes(minutesRemaining);
      setSeconds(secondsRemaining);
    };
    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  const {width: screenWidth} = Dimensions.get('window');
  const [loading, setLoading] = useState(true);

  const [totalPrice, setTotalPrice] = useState(0);

  const [Promotiondata, setPromotiondata] = useState({});

  useEffect(() => {
    userPromotioncontent({
      objectId: objectId,
      StoreId: userInfo?.selectedStoreData?.StoreId,
    })
      .then(res => {
        setPromotiondata(res.result.data);
        setItems(res.result.data.items);
        setLoading(false);
        console.log('result', res.result.data);
      })
      .catch(error => {
        navigation.goBack();
        setLoading(false);
        console.log('sssssssssssss', error);
      });
  }, []);
  // console.log('Response type:', Promotiondata[0]);

  return (
    <>
      {loading ? (
        <Indicators />
      ) : (
        <View style={styles.container}>
          <Header
            back
            onLeftPress={() => navigation.goBack()}
            title={'Promotion Details'}
          />

          <View style={styles.promotionContainer}>
            <View style={styles.imagess}>
              <Image
                style={styles.bannerImg}
                source={{uri: image}}
                resizeMode="contain"
              />
            </View>
            <View style={styles.borders} />
            <Text style={styles.imagecontent}>{Promotiondata?.Title}</Text>
            <Text style={styles.imagedes}>{Promotiondata?.Description}</Text>
          </View>

          {/* Your other components here */}
          <View style={styles.timer}>
            <Text style={styles.timerText}>
              {Promotiondata.EndDate
                ? moment(Promotiondata.EndDate.iso).format('MMMM D, YYYY')
                : 'End Date is undefined'}
            </Text>
          </View>

          <View style={mainStyles.marginTop2} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.VerticalScrollView}>
            <View style={styles.orderagainview}>
              {items.map((item, index) => {
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
                // const matchedObjectImage = imagesAllData?.find(
                //   find => find.objectId == item.ImageID,
                // );
                console.log('matchedObjectmatchedObject', item);
                const imageUrl =  Constants.imageNotFound;
                return (
                  <View key={index} style={styles.OrderWrapper}>
                    <OrderItems
                      index={index}
                      item={item}
                      promotion={true}
                      promotionData={{
                        ...Promotiondata,
                        ...{objectId: objectId},
                      }}
                      itemId={item.objectId}
                      favourite={isFavouriteMatch}
                      itemImage={item.productImageUrl}
                      itemName={item.Name}
                      originalPrice={item.Price + ' AED'}
                      weight={item.Quantity}
                      discountedPrice={`${item.newPrice} AED`}
                      itemQuantity={item.quantity}
                      productCartQuntity={isProductCardMatch}
                      onPress={() =>
                        navigation.navigate('Product', {
                          product: item,
                          productImage: item.productImageUrl,
                          productName: item.Name,
                          productQuantity: item.Quantity,
                          productOrignalPrice: item.Price,
                          productDiscountPrice: item.newPrice,
                          productAddCartQuntity: isProductCardMatch,
                          productFavorite: isFavouriteMatch,
                          productDiscription: item.Description
                            ? item.Description
                            : item.Name,
                          promotion:true,
                          promotionData: {
                            ...Promotiondata,
                            ...{objectId: objectId},
                          }
                        })
                      }
                    />
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default Promotioncontent;
