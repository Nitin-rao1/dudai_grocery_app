import {useRef, useContext, useState, useEffect, memo} from 'react';
import {ThemeContext} from '../../theming/ThemeContext';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FeatherIcons from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {scale} from 'react-native-size-matters';
import {IndependentColors} from '../../config/Colors';
import ButtonSquared from '../../components/buttons/ButtonSquared';
import Menu from '../../assets/icons/svg/Menu.svg';
// import CategoriesData from '../../data/CategoriesData';
import {STANDARD_VECTOR_ICON_SIZE} from '../../config/Constants';
import {useCameraDevice, useCodeScanner} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
// import {addMyProducts} from '../../redux/slices/HomeproductsSlice';
import OrderagainitemCard from '../../components/cards/OrderagainitemCard';
import {UpdateCategoriesData} from '../../redux/slices/CategoriesSlice';
import Categories from './Categories';
import OfferSlider from '../../components/OfferSlider';
import SingleBanner from '../../components/OfferSlider/SingleBanner';
import SingleProductRow from './SingleProductRow';
import GridProducts from './GridProducts';
import Colors from '../../constants/Colors';
import {Indicators} from '../../components/apploader';
import {showMessage} from 'react-native-flash-message';
import Constants from '../../constants/Constants';
import {
  getLastOrederDetails,
  getSelectedStoreData,
  getSubCategoriesList,
  promotionProduct,
  selectedStoreData,
  userPromotion,
} from '../../api/categories/categoriesAndProduct';
import {updateUser} from '../../redux/slices/SessionUser';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/buttons/Button';
import {Linking} from 'react-native';
import {cameraPermission} from '../../constants/helperFunction';
import mainStyles from '../../constants/MainStyles';
import HomeCategoriesItemCard from '../../components/cards/HomeCategoriesItemCard';
import Link from '../../components/links/Link';
import SubCategories from './SubCategories';
// import SubCategoriesList from './SubCategoriesList';
import ProductRow from './ProductRow';
import {setPromotion as setPromotionList} from '../../redux/slices/PromotionSlice';
import TopDiscountProduct from './TopDiscountProduct';
// Functional component
const Home = props => {
  const {navigation, route} = props;

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.users.users);

  const productCart = useSelector(state => state.productCart.cartItems);
  const wishList = useSelector(state => state.wishList.wishList);

  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme modet
  const theme = isLightTheme ? lightTheme : darkTheme;

  // Local states
  const [storeData, setStoreData] = useState({});
  const [lastOrderData, setLastOrderData] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  const homePageRefresh = userInfo.homePageRefresh == true ? true : false;

  const [searchtext, setSearchtext] = useState('');
  // console.log("storeData",storeData)
  useEffect(() => {
    if (userInfo?.sessionToken) {
      if (homePageRefresh) {
        setLoading(true);
        getSelectedStoreData(userInfo?.objectId)
          .then(val => {
            if (val.result.data) {
              setStoreData(val.result.data);
              getDetailsLastOrder();
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
      } else {
        setStoreData(userInfo?.deleveryAddress);
      }
    } else {
      setStoreData(userInfo?.deleveryAddress);
    }
    getPromotionList();
  }, [homePageRefresh]);

  const getDetailsLastOrder = () => {
    setLoading(true);
    getLastOrederDetails(userInfo?.objectId)
      .then(val => {
        if (val.result.data) {
          setLoading(false);
          setLastOrderData(val.result.data.Order);
        } else {
          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(false);
      });
    dispatch(updateUser({homePageRefresh: false}));
  };

  const getPromotionList = async () => {
    setLoading(true);
    await promotionProduct(userInfo?.selectedStoreData?.StoreId)
      .then(val => {
        if (val.result.data) {
          console.log('val', val.result.data);
          dispatch(setPromotionList(val.result.data));
        } else {
          // setLoading(false);
        }
      })
      .catch(err => {
        // setLoading(false);
      });
  };

  const addressSelectdData =
    storeData == 'Select your address'
      ? 'Please indicate your current location address'
      : `${storeData?.ApartmentNumber} | ${storeData?.Address} | ${storeData?.Address3} | ${storeData?.AddressDescription}`;

  const onSearchPress = () => {
    if (searchtext === '') {
      showMessage({
        message: Constants.appName,
        description: 'Please enter a search term.',
        type: Constants.msgTypeDanger,
        icon: Constants.msgTypeDanger,
      });
    } else {
      navigation.navigate('ProductList', {value: searchtext, type: 'search'});
      setSearchtext('');
    }
  };

  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);

  const closeUpdateModal = () => {
    setUpdateModalVisible(false);
  };
  const [promotion, setPromotion] = useState([]);
  const [subProductList, setSubProductList] = useState([]);
  useEffect(() => {
    if (userInfo?.selectedStoreData?.StoreId) {
      setLoading(true);
      const formData = {
        StoreId: userInfo?.selectedStoreData?.StoreId,
      };
      userPromotion(formData)
        .then(res => {
          console.log('pppppppppppppppppppppppppppppppppppppppp', res.result);
          setPromotion([...res.result.promotionType10, ...res.result.data]);
          if (res.result.data.length > 0) {
            setBannerData(res.result.data);
          }
          // getSubCatProduct();
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);

          // console.log('sjfdjsg', err);
        });
    }
  }, []);

  // const getSubCatProduct = async() => {
  //   const formData = {
  //     StoreId: userInfo?.selectedStoreData?.StoreId,
  //     page: 1,
  //   };
  //  await getSubCategoriesList(formData)
  //     .then(res => {
  //       setSubProductList(res.result.data)
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       setLoading(false);

  //       // console.log('sjfdjsg', err);
  //     });
  // };
  const openCamera = async () => {
    await cameraPermission()
      .then(async data => {
        if (data == 'granted') {
          navigation.navigate('CameraScreen');
        }
      })
      .catch(err => {
        alert('Please wait a moment and try again.');
      });
  };
  return (
    <>
      <View style={[styles.mainWrapper, {backgroundColor: Colors.white}]}>
        {/* {/ Header /} */}
        <View style={styles.header}>
          {/* {/ Drawer menu icon /} */}
          <Pressable
            style={[
              styles.drawerMenuIconWrapper,
              {backgroundColor: theme.secondary},
            ]}
            onPress={() => navigation.openDrawer()}>
            <Menu
              width={STANDARD_VECTOR_ICON_SIZE}
              height={STANDARD_VECTOR_ICON_SIZE}
              fill={Colors.primary}
            />
          </Pressable>
          {/* {/ Location /} */}

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                if (userInfo.sessionToken) {
                  navigation.navigate('DeliveryAddress');
                } else {
                  navigation.navigate('DeliveryAddress');
                }
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons
                name="location-on"
                color={Colors.primary}
                size={scale(30)}
              />
              {/* {/ Location /} */}
              <Text
                ellipsizeMode="tail"
                numberOfLines={2}
                style={[styles.Location, {color: theme.textHighContrast}]}>
                {addressSelectdData}
              </Text>
            </TouchableOpacity>
          </View>

          {/* {/ total price  /} */}
          <View style={styles.priceWrapper}>
            <Text style={[styles.totalprice, {color: theme.textHighContrast}]}>
              {userInfo?.productTotalAmount
                ? userInfo?.productTotalAmount?.toFixed(2)
                : '0.00'}
            </Text>
            <Text style={[styles.Currency, {color: theme.textHighContrast}]}>
              AED
            </Text>
          </View>
          {/* Avatar change in cart in home*/}
          <Pressable
            style={[
              styles.avatarWrapper,
              {backgroundColor: IndependentColors.redLightest},
            ]}
            onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.BarBadgeStyle}>{productCart.length}</Text>
            <Image
              source={require('../../assets/illustrations/bags-shopping.png')}
              style={[styles.avatarImage, {tintColor: Colors.primary}]}
            />
          </Pressable>
        </View>

        {/* {/ Searchbar /}
        {/ ----------------- /} */}

        <View style={styles.searchbarWrapper}>
          <Pressable
            style={{flexDirection: 'row'}}
            onPress={() => {
              navigation.navigate('SearchStack');
            }}>
            {/* <TextInput
            style={[
              styles.searchbarTextInput,
              {backgroundColor: theme.secondary, color: theme.textHighContrast, },
            ]}
            placeholder="Search here..."
            placeholderTextColor={theme.textLowContrast}
            value={searchtext}
            onChangeText={setSearchtext}
            editable={false}
            
          /> */}
            <View
              style={[
                styles.searchbarTextInput,
                {
                  backgroundColor: theme.secondary,
                  color: theme.textHighContrast,
                  justifyContent: 'center',
                  width: Platform.OS === 'ios' ? wp('62') : wp('77'),
                },
              ]}>
              <Text style={{color: Colors.textLowContrast}}>
                Search here...
              </Text>
            </View>
            <View style={mainStyles.width2} />

            <ButtonSquared
              height={45}
              icon={
                <FeatherIcons
                  name="search"
                  color={theme.primary}
                  size={scale(20)}
                />
              }
              onPress={() => {
                navigation.navigate('SearchStack');
                // onSearchPress()
              }}
              backgroundColor={theme.accent}
            />
          </Pressable>
          {Platform.OS === 'ios' && (
            <ButtonSquared
              height={45}
              icon={
                <FontAwesomeIcons
                  name="qrcode"
                  color={theme.primary}
                  size={scale(20)}
                />
              }
              onPress={() => {
                openCamera();
              }}
              backgroundColor={theme.accent}
            />
          )}
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          // contentContainerStyle={styles.mainScrollView}
        >
          {promotion.length > 0 && (
            <OfferSlider
              data={promotion}
              onPress={item => {
                navigation.navigate('Promotioncontent', {
                  image: item.ImageUrl,
                  objectId: item.objectId,
                });
                // navigation.navigate('Promotions');
              }}
            />
          )}

          {/* Most popular /favorites / */}
          <SingleProductRow
            data={wishList}
            navigation={navigation}
            label={'Favorites'}
            onPress={() => navigation.navigate('WishlistStack')}
            onPressProduct={'Product'}
            onPressItem={false}
          />

          {/* <SingleBanner
            uri={require('../../assets/images/placeholder/banner3.jpg')}
            label={`Today's offer`}
            onPress={() => {
              navigation.navigate('Promotions');
            }}
          /> */}
          <Categories
            navigation={navigation}
            length={9}
            wishList={wishList}
            productCart={productCart}
            userInfo={userInfo}
            refresh={homePageRefresh}
          />

          {/* Scratch and win */}
          {bannerData[0] && (
            <SingleBanner
              uri={bannerData[0]?.ImageUrl}
              url={true}
              label={bannerData[0]?.Title}
              onPress={() => {
                navigation.navigate('Promotioncontent', {
                  image: bannerData[0]?.ImageUrl,
                  objectId: bannerData[0]?.objectId,
                });
              }}
            />
          )}

          {/* order Again */}
          <GridProducts
            data={lastOrderData}
            navigation={navigation}
            label={'Last Order items'}
            onPress={() =>
              navigation.navigate('GridViewProducts', {data: lastOrderData})
            }
            onPressProduct={'Product'}
            length={9}
            userInfo={userInfo}
          />

          {/*EXCLUSSIVE offer */}
          {bannerData[1] && (
            <SingleBanner
              uri={bannerData[1]?.ImageUrl}
              url={true}
              label={bannerData[1]?.Title}
              onPress={() => {
                navigation.navigate('Promotioncontent', {
                  image: bannerData[1]?.ImageUrl,
                  objectId: bannerData[1]?.objectId,
                });
                // navigation.navigate('Promotions');
              }}
            />
          )}
          {/* <SingleBanner
            uri={require('../../assets/images/placeholder/banner3.jpg')}
            label={`Exclusive offer`}
            onPress={() => {
              navigation.navigate('Promotions');
            }}
          /> */}

          {/* Recommendations */}
          {/* <GridProducts
            data={Myproducts}
            navigation={navigation}
            label={'Recommendations'}
            onPress={() => navigation.navigate('GridViewProducts')}
            onPressProduct={'Product'}
            length={9}
          /> */}

          {/*Special Offer */}
          {/* <SingleBanner
            uri={require('../../assets/images/placeholder/Specialoffer.png')}
            label={` Special Offer`}
            onPress={() => {
              navigation.navigate('Promotions');
            }}
          /> */}
          {/* Categories */}

          <SubCategories
            userInfo={userInfo}
            // data={subProductList}
            navigation={navigation}
            refresh={homePageRefresh}
          />
          {bannerData[2] && (
            <SingleBanner
              uri={bannerData[2]?.ImageUrl}
              url={true}
              label={bannerData[2]?.Title}
              onPress={() => {
                navigation.navigate('Promotioncontent', {
                  image: bannerData[2]?.ImageUrl,
                  objectId: bannerData[2]?.objectId,
                });
                // navigation.navigate('Promotions');
              }}
            />
          )}
          {/* <SubCategories navigation={navigation} /> */}
          {/* Recently viewed / best by Product  */}
          {/* <GridProducts
            data={Myproducts}
            navigation={navigation}
            label={'Best by Product'}
            onPress={() => navigation.navigate('GridViewProducts')}
            onPressProduct={'Product'}
            length={9}
          /> */}
          <ProductRow userInfo={userInfo} navigation={navigation} />
          {bannerData[3] && (
            <SingleBanner
              uri={bannerData[3]?.ImageUrl}
              url={true}
              label={bannerData[3]?.Title}
              onPress={() => {
                navigation.navigate('Promotioncontent', {
                  image: bannerData[3]?.ImageUrl,
                  objectId: bannerData[3]?.objectId,
                });
                // navigation.navigate('Promotions');
              }}
            />
          )}
          {/* <View style={{height: 800}}>
            <SubCategoriesList  navigation={navigation} />
          </View> */}
          {/* <SingleProductRow
            data={wishList}
            navigation={navigation}
            label={'Best by Product'}
            onPress={() => navigation.navigate('GridViewProducts')}
            onPressProduct={'Product'}
          /> */}
          <TopDiscountProduct userInfo={userInfo} navigation={navigation} />
          {userInfo?.sessionToken && <View style={mainStyles.marginTop15} />}
        </ScrollView>

        {loading && <Indicators />}
      </View>

      {/* for version update */}
      <Modal
        animationType="slide"
        transparent={true}
        // visible={true}
        visible={isUpdateModalVisible}
        // onRequestClose={closeUpdateModal}
      >
        <View style={styles.updateModalContainer}>
          <View style={styles.updateModalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              // onPress={closeUpdateModal}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.updateModalText}>
              New Version {'\n'} V2.1.0
            </Text>
            <View style={styles.ModalContent}>
              <Text style={styles.updateModalText}>
                Please update your app to access new features.
              </Text>
            </View>
            <Image
              style={[styles.image]}
              source={require('../../assets/images/update1.png')}
            />

            <Button
              label={'Update Now'}
              labelColor={theme.primary}
              backgroundColor={theme.accent}
              onPress={() => {
                // Redirect to the Play Store (Android) or App Store (iOS)
                Linking.openURL(
                  Platform.OS === 'android'
                    ? 'https://play.google.com/store/apps/details?id=your_package_name'
                    : 'https://apps.apple.com/app/your-app-id',
                );

                // Close the modal
                // closeUpdateModal();
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default memo(Home);
