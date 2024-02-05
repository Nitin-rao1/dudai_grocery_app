import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Header from '../../components/Header';
import {IndependentColors} from '../../config/Colors';
import {Indicators} from '../../components/apploader';
import {
  addFavouriteData,
  nearByStore,
  selectedStoreData,
} from '../../api/categories/categoriesAndProduct';
import {showMessage} from 'react-native-flash-message';
import Constants from '../../constants/Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../constants/Colors';
import {
  OPEN_SANS_BOLD,
  OPEN_SANS_REGULAR,
  OPEN_SANS_SEMIBOLD,
} from '../../config/Constants';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '../../redux/slices/SessionUser';
import SingleBanner from '../../components/OfferSlider/SingleBanner';
import {logoutToCart} from '../../redux/slices/ProductsCartSlice';
import {logoutToggleFavorite} from '../../redux/slices/WishlistSlice';
import {OneSignal} from 'react-native-onesignal';

const AvailableStore = ({navigation, route}) => {
  const userInfo = useSelector(state => state.users.users);
  const selectedDeliveryAddress = route?.params?.deleveryAddress;

  const dispatch = useDispatch();
  const [storeData, setStoreData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    nearByStore(selectedDeliveryAddress?.Lat, selectedDeliveryAddress?.Lng)
      .then(val => {
        if (val.result.length > 0) {
          setLoading(false);
          setStoreData(val.result);
        } else {
          setLoading(false);
          showMessage({
            message: Constants.appName,
            description:
              'There is currently no store at your given address. Please change your address.',
            type: Constants.msgTypeDanger,
            icon: Constants.msgTypeDanger,
          });
        }
      })
      .catch(err => {
        setLoading(false);
        showMessage({
          message: Constants.appName,
          description: Constants.pleaseWait,
          type: Constants.msgTypeDanger,
          icon: Constants.msgTypeDanger,
        });
      });
  }, []);
  const onSelectStore = val => {
    if (userInfo?.selectedStoreData?.BranchId) {
      if (userInfo?.selectedStoreData?.PolygonId == val.PolygonId) {
        setLoading(true);
        handleSelectedStore(val);
      } else {
        Alert.alert(
          'Kindly Make Sure',
          'The items that are already in your cart will be removed if you select another store.',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => selectAnotherStore(val)},
          ],
        );
      }
    } else {
      setLoading(true);
      handleSelectedStore(val);
    }
  };

  const selectAnotherStore = val => {
    setLoading(true);
    if (userInfo?.sessionToken) {
      const formData = {
        objectId: userInfo.objectId,
        favoriteId: [],
      };
      addFavouriteData(formData);
    }
    dispatch(logoutToCart());
    dispatch(
      updateUser({
        productTotalAmount: 0,
        ordersItem: [],
        deliveryCharges: 0,
        homePageRefresh: true,
      }),
    );
    dispatch(logoutToggleFavorite());
    handleSelectedStore(val);
  };

  const handleSelectedStore = val => {
    if (userInfo?.sessionToken) {
      selectedStoreData(
        userInfo?.objectId,
        selectedDeliveryAddress?.deleveryAddressObjectId,
      )
        .then(res => {
          if (res.result.data) {
            dispatch(
              updateUser({
                deleveryAddress: selectedDeliveryAddress,
                selectedStoreData: val,
                firstTimeAddressSelect: true,
                homePageRefresh: true,
              }),
            );
            const onsignalTags = {Branch: val.StoreId.toString(), UserId: userInfo?.objectId.toString()}
            console.log(
              'hsbfhjdshjfghjdsgsdfdshfbhjdsbhjfdhjsb',
              onsignalTags,
            );
            // OneSignal.User.addTags({Branch: 'my_value', UserId: 'my_value2'});
            OneSignal.User.addTags(onsignalTags);
            setLoading(false);
            if (userInfo?.firstTimeAddressSelect) {
              setTimeout(() => {
                navigation.navigate('HomeBottomTab');
              }, 600);
            } else {
              setTimeout(() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'HomeBottomTab'}],
                });
              }, 600);
            }
          } else {
            setLoading(false);
            showMessage({
              message: Constants.appName,
              description: Constants.pleaseWait,
              type: Constants.msgTypeDanger,
              icon: Constants.msgTypeDanger,
            });
          }
        })
        .catch(err => {
          setLoading(false);
          showMessage({
            message: Constants.appName,
            description: Constants.pleaseWait,
            type: Constants.msgTypeDanger,
            icon: Constants.msgTypeDanger,
          });
        });
    } else {
      setLoading(false);

      dispatch(
        updateUser({
          selectedStoreData: val,
          firstTimeAddressSelect: true,
          homePageRefresh: true,
          deleveryAddress: selectedDeliveryAddress,
        }),
      );
      if (userInfo?.firstTimeAddressSelect) {
        setTimeout(() => {
          navigation.navigate('HomeBottomTab');
        }, 600);
      } else {
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'HomeBottomTab'}],
          });
        }, 600);
      }
    }
  };

  const renderitem = ({item, index}) => {
    const imageUrl = item.ImageUrl ? item.ImageUrl : Constants.imageNotFound;
    return (
      <View key={`avl${index}`}>
        <TouchableOpacity
          onPress={() => {
            onSelectStore(item);
          }}>
          <View key={`index${index}`} style={styles.itemContainer}>
            <View>
              <Image
                source={{uri: imageUrl}}
                style={styles.headerImage}
                resizeMode="contain"
              />
            </View>

            <View
              style={{
                marginLeft: wp('2'),
                width: wp('68'),
              }}>
              <View style={{}}>
                <Text
                  style={[
                    styles.txt,
                    {
                      color: Colors.black,
                      fontSize: hp('1.5'),
                      fontFamily: OPEN_SANS_SEMIBOLD,
                    },
                  ]}>
                  {item.Name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={[styles.txt]}>Min Order:</Text>
                  <Text
                    style={[
                      styles.txt,
                      {
                        color: Colors.black,
                        width: wp('28'),
                      },
                    ]}>
                    {` ` + item.minOrderAmount}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={[styles.txt]}>Distance:</Text>
                  <Text
                    style={[
                      styles.txt,
                      {
                        color: Colors.black,
                        width: wp('28'),
                      },
                    ]}>
                    {` ` + item.UserDistanceInFloat} km
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={[
                      styles.txt,
                      {
                        color: item.StoreTimeStatus
                          ? Colors.success
                          : Colors.error,
                      },
                    ]}>
                    Store Timing:
                  </Text>
                  <Text
                    style={[
                      styles.txt,
                      {
                        color: Colors.black,
                      },
                    ]}>
                    {` ` + item.StoreOpenTime}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={[
                      styles.txt,
                      {
                        color: item.DeliveryTimeStatus
                          ? Colors.success
                          : Colors.error,
                      },
                    ]}>
                    Delivery timing at your location:
                  </Text>
                  <Text
                    style={[
                      styles.txt,
                      {
                        color: Colors.black,
                        width: wp('28'),
                      },
                    ]}>
                    {` ` + item.DeliveryTime}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const headeView = () => {
    return (
      <SingleBanner
        uri={require('../../assets/images/super_grocery_sale_banner.png')}
      />
    );
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        back
        onLeftPress={() => {
          navigation.goBack();
        }}
        title={'Available Store'}
        headerBg={Colors.primary}
        iconColor={IndependentColors.white}
      />
      <View style={styles.container}>
        <Text style={styles.itemHeading}> Please Select Near By Store </Text>
      </View>

      <FlatList
        data={storeData}
        renderItem={renderitem}
        keyExtractor={item => item.objectId}
        ListHeaderComponent={headeView}
      />

      {loading && <Indicators />}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    paddingLeft: wp('3'),
    paddingBottom: wp('2'),
  },

  headerImage: {
    width: wp('25'),
    height: wp('25'),
    borderRadius: wp('2'),
    borderWidth: 0.5,
    borderColor: Colors.inputBorderColor,
  },

  itemHeading: {
    fontSize: hp('2'),
    fontFamily: OPEN_SANS_BOLD,
    marginTop: hp('1'),
    color: IndependentColors.black,
  },

  itemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: wp('100'),
    borderBottomWidth: 2,
    borderBottomColor: Colors.inputBorderColor,
    padding: wp('3'),
  },

  txt: {
    fontFamily: OPEN_SANS_REGULAR,
    fontSize: hp('1.3'),
    color: Colors.textLowContrast,
  },
});

export default AvailableStore;
