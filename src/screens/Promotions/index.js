import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import styles from './styles';
import {IndependentColors} from '../../config/Colors';
import {ThemeContext} from '../../theming/ThemeContext';
import Menu from '../../assets/icons/svg/Menu.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {scale} from 'react-native-size-matters';
import {
  SCREEN_WIDTH,
  STANDARD_HOME_MAIN_CAROUSEL_PAGINATION_INDICATOR_WIDTH,
  STANDARD_VECTOR_ICON_SIZE,
} from '../../config/Constants';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation
import {useSelector} from 'react-redux';
import Header from '../../components/Header';
import {userPromotion} from '../../api/categories/categoriesAndProduct';
import {Indicators} from '../../components/apploader';
import EmptyCart from '../../components/emptyCart/EmptyCart';

const Promotions = () => {
  const userInfo = useSelector(state => state.users.users);

  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  const productCart = useSelector(state => state.productCart.cartItems);
  const {width: screenWidth} = Dimensions.get('window');
  const navigation = useNavigation(); // Initialize navigation
  const [totalPrice, setTotalPrice] = useState(0);
  const [Promotion, setPromotion] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const formData = {
      StoreId: userInfo?.selectedStoreData?.StoreId,
    };
    console.log('result', formData)
    userPromotion(formData)
      .then(res => {
        setPromotion(res.result.promotionType10);
        setLoading(false);

        // console.log('result', res);
      })
      .catch(err => {
        setLoading(false);
        // console.log('sjfdjsg', err);
      });
  }, []);
  // console.log('Response type:', Promotion[0]);

  return (
    <View style={styles.container}>
      <Header
        back
        onLeftPress={() => navigation.goBack()}
        title={'Promotion'}
        // headerBg={Colors.primary}
        // iconColor={IndependentColors.white}
        // titleAlight={'center'}
      />

      <ScrollView>
        {Promotion.map((item, index) => (
          <View style={styles.promotionContainer} key={index}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Promotioncontent', {
                  image: item.ImageUrl,
                  objectId: item.objectId,
                })
              }>
              <View style={styles.imagess}>
                <Image
                  style={styles.bannerImg}
                  source={{uri: item.ImageUrl}}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.borders} />
              <Text style={styles.imagecontent}>{item.Title}</Text>
              <Text style={styles.imagedes}>{item.Description}</Text>
            </TouchableOpacity>
          </View>
        ))}

{Promotion.length == 0 && loading == false && (
        <EmptyCart
          message={'Promotion is not available'}
          onPress={() => navigation.navigate('Home')}
        />
      )}
      </ScrollView>
      {loading && <Indicators />}
    </View>
  );
};
export default Promotions;

//  {
//    Promotion.map((item, index) => (
//      <View style={styles.promotionContainer}>
//        <TouchableOpacity
//          onPress={() =>
//            navigation.navigate('Promotioncontent', {
//              image: item.ImageUrl,
//              objectId: item.objectId,
//            })
//          }
//          key={index}>
//          <View style={styles.imagess}>
//            <Image style={{width: '100%', height: '60%'}} src={item.ImageUrl} />
//            <Text style={styles.imagecontent}>
//              {/* Delivery Time */}
//              {item.Title}
//              {}
//            </Text>
//            <Text>{item.Description}</Text>
//          </View>
//        </TouchableOpacity>
//      </View>
//    ));
//  }
