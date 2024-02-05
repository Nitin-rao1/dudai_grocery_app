import {memo, useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {IndependentColors} from '../../config/Colors';
import Plus from '../../assets/icons/svg/Plus.svg';
import Minus from '../../assets/icons/svg/Minus.svg';
import Cart from '../../assets/icons/svg/Cart.svg';
// import ButtonSquared from '../../buttons/ButtonSquared';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  FONT_SIZE_XS,
  OPEN_SANS_MEDIUM,
  STANDARD_VECTOR_ICON_SIZE,
} from '../../config/Constants';
import styles from './styles';
import {
  addItemToCart,
  reduceItemFromCart,
  increaseQty,
} from '../../redux/slices/CartSlice';
import {useDispatch, useSelector} from 'react-redux';
import {
  decreaseProductCount,
  increaseProductCount,
} from '../../redux/slices/HomeproductsSlice';
import Colors from '../../constants/Colors';
import {
  addToFavorite,
  logoutToggleFavorite,
  toggleFavorite,
} from '../../redux/slices/WishlistSlice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  logoutToCart,
  removeFromCart,
} from '../../redux/slices/ProductsCartSlice';
import {updateUser} from '../../redux/slices/SessionUser';
import ButtonSquared from '../../components/buttons/ButtonSquared';
import NotificationItemCard from '../../components/cards/NotificationItemCard';
import {ThemeContext} from '../../theming/ThemeContext';
import Header from '../../components/Header';
import {
  deleteOneNotification,
  getNotification,
  getSelectedStoreData,
} from '../../api/categories/categoriesAndProduct';
import {showMessage} from 'react-native-flash-message';
import Constants from '../../constants/Constants';
import {getTimeAgo} from '../../constants/helperFunction';
import NotProductFound from '../../components/emptyCart/NotProductFound';
import mainStyles from '../../constants/MainStyles';
import {Indicators} from '../../components/apploader';
import EmptyCart from '../../components/emptyCart/EmptyCart';
import NoNotification from '../../components/emptyCart/NoNotification';

// Functional component
const NotificationList = props => {
  const {navigation, route} = props;
  const userInfo = useSelector(state => state.users.users);
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    await getNotification(userInfo?.objectId)
      .then(val => {
        if (val.result.data) {
          setList(val.result.data);
          setLoading(false);
        } else {
          showMessage({
            message: Constants.appName,
            description: Constants.pleaseWait,
            type: Constants.msgTypeDanger,
            icon: Constants.msgTypeDanger,
          });
          setLoading(false);
        }
      })
      .catch(err => {
        showMessage({
          message: Constants.appName,
          description: Constants.pleaseWait,
          type: Constants.msgTypeDanger,
          icon: Constants.msgTypeDanger,
        });
        setLoading(false);
      });
  };
  const removeNotification = param => {
    // 'worklet'; // Don't remove this line.
    const payload = {
      userId: userInfo?.objectId,
      objectIds: [param],
    };
    deleteOneNotification(payload);
  };

  const deleteAllNotification = () => {
    setLoading(true);
    const tempId = [];

    list.map(val => {
      tempId.push(val.objectId);
    });
    const payload = {
      userId: userInfo?.objectId,
      objectIds: tempId,
    };
    if (list.length === tempId.length) {
      console.log('tempId', payload);

      deleteOneNotification(payload)
        .then(val => {
          if (val.result.status == 'success') {
            setLoading(false);
            navigation.goBack();
          } else {
            setLoading(false);
          }
        })
        .catch(err => {
          setLoading(false);
        });
    }
  };

  const renderItem = ({item, index}) => {
    const timeAgoValue = getTimeAgo(item.dateAndTime.iso);
    return (
      <View key={index}>
        <NotificationItemCard
          id={item.objectId}
          avatar={require('../../assets/images/placeholder/product.png')}
          status={item.Status}
          title={item.Title}
          age={timeAgoValue}
          message={item.Description}
          cardBackgroundColor={theme.secondary}
          avatarBackgroundColor={theme.primary}
          titleColor={theme.textHighContrast}
          ageColor={theme.accent}
          messageColor={theme.textLowContrast}
          removeNotification={removeNotification}
          onPress={() => {
            return navigation.navigate('Notification', {
              notificationData: item,
              goBack: true,
              isNotiBack: true,
            });
          }}
        />
      </View>
    );
  };
  const myListEmpty = () => {
    return (
      <View
        style={{
          backgroundColor: Colors.white,
          height: hp('100'),
          width: wp('100'),
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          alignContent: 'center',
        }}>
        {loading == false && (
          <>
            <NoNotification />
            {/* <View style={{marginBottom: hp('15')}} /> */}
          </>
        )}
      </View>
    );
  };

  const myHeader = () => {
    return (
      <>
        {list.length > 0 && (
          <View
            style={{
              width: wp('90'),
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: hp('2'),
            }}>
            <Text
              style={{
                fontFamily: OPEN_SANS_MEDIUM,
                fontSize: FONT_SIZE_XS,
                color: Colors.black,
              }}>
              Notification List
            </Text>
            <TouchableOpacity
              onPress={() => {
                deleteAllNotification();
              }}>
              <Text
                style={{
                  fontFamily: OPEN_SANS_MEDIUM,
                  fontSize: FONT_SIZE_XS,
                  color: Colors.primary,
                }}>
                Clear All
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  };
  return (
    <View style={[styles.mainWrapper, {backgroundColor: Colors.white}]}>
      <Header
        back
        onLeftPress={() => {
          navigation.goBack();
        }}
        title={'Notification'}
        // headerBg={Colors.primary}
        // iconColor={IndependentColors.white}
      />

      <FlatList
        data={list}
        ListHeaderComponent={myHeader}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.objectId}-${index}`}
        pagingEnabled
        ListEmptyComponent={myListEmpty}
      />
      <View style={mainStyles.marginTop2} />
      {loading && <Indicators />}
    </View>
  );
};

// Exporting
export default memo(NotificationList);
