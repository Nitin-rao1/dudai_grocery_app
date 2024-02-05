import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  IconButton,
  MD3Colors,
  Dimensions,
} from 'react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet'; // Import the BottomSheet component

import {ThemeContext} from '../../theming/ThemeContext';
import {IndependentColors} from '../../config/Colors';
import {
  FONT_SIZE_XS,
  FONT_SIZE_XXS,
  OPEN_SANS_BOLD,
  OPEN_SANS_MEDIUM,
  OPEN_SANS_REGULAR,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STANDARD_BORDER_RADIUS,
  STANDARD_SPACING,
  STANDARD_TEXT_TICKER_HEIGHT,
  STANDARD_VECTOR_ICON_WRAPPER_SIZE,
} from '../../config/Constants';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useHeaderHeight} from '@react-navigation/elements';
import ButtonDashOutlined from '../../components/buttons/ButtonDashOutlined';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Edit from '../../../src/assets/icons/svg/Edit.svg';
import Delete from '../../../src/assets/icons/svg/Delete.svg';
import {BackHandler, Alert} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  STANDARD_SOCIAL_ICON_SIZE,
  STANDARD_VECTOR_ICON_SIZE,
} from '../../config/Constants';
import Icons from '../../components/cards/Icons/Icons';
import Header from '../../components/Header';
import ButtonCircled from '../../components/buttons/ButtonCircled';
import Colors from '../../constants/Colors';
import SelectAddress from './SelectAddress';
import styles from './styles';
import {
  addAddresses,
  logoutToAddress,
  removeFromAddress,
} from '../../redux/slices/AddressSlice';
import {
  deleteDeliveryAddress,
  getDeliveryAddress,
} from '../../api/categories/categoriesAndProduct';
import {showMessage} from 'react-native-flash-message';
import Constants from '../../constants/Constants';
import {Indicators} from '../../components/apploader';
import {updateUser} from '../../redux/slices/SessionUser';

const DeliveryAddress = ({navigation}) => {
  const userInfo = useSelector(state => state.users.users);
  const deliveryAddress = useSelector(state => state.address.addresses);
  const dispatch = useDispatch();
  // console.log(
  //   'DeliveryAddressDeliveryAddressDeliveryAddressDeliveryAddress',
  //   deliveryAddress,
  // );
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  const theme = isLightTheme ? lightTheme : darkTheme;
  // useEffect(() => {
  //   // Show the BottomSheet when the component mounts
  //   bottomSheet.current.show();
  // }, []);

  const [images, setimages] = useState([
    {src: require('../../assets/images/ofc.png'), key: '1'},
    {src: require('../../assets/images/home.png'), key: '2'},
  ]);

  const bottomSheet = useRef(); // Create a ref for the BottomSheet

  const screen = Dimensions.get('window');
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.04;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (userInfo?.sessionToken) {
      getDeliveryAddress(userInfo.objectId)
        .then(val => {
          console.log('val', val);
          if (val.result.status == 'success') {
            dispatch(addAddresses(val.result.data));
            setLoading(false);
          } else {
            setLoading(false);
            // showMessage({
            //   message: Constants.appName,
            //   description: Constants.pleaseWait,
            //   type: Constants.msgTypeDanger,
            //   icon: Constants.msgTypeDanger,
            // });
          }
        })
        .catch(err => {
          setLoading(false);
          // showMessage({
          //   message: Constants.appName,
          //   description: Constants.pleaseWait,
          //   type: Constants.msgTypeDanger,
          //   icon: Constants.msgTypeDanger,
          // });
        });
    } else {
      setLoading(false);
    }
  }, []);
  const userSelectedAddress = val => {
    console.log('xxx', val.objectId);
    // return
    // dispatch(removeFromAddress(val.objectId))
    // dispatch(logoutToAddress())
    const deleveryAddress = {
      deleveryAddressObjectId: val.objectId,
      ...val,
    };
    dispatch(
      updateUser({
        selectedStoreDataEdit: {},
        editDeliveryAddress: false,
        editDeliveryAddressObjectId: '',
      }),
    );
    // setTimeout(() => {
    //   if (userInfo?.sessionToken) {
    //     dispatch(updateUser({deleveryAddress: deleveryAddress}));
    //   } else {
    //     dispatch(updateUser({deleveryAddress: val}));
    //   }
    // }, 1000);
      navigation.navigate('AvailableStore', {deleveryAddress:deleveryAddress});
  };
  const deleteAddress = async val => {
    if (val.IsActive == true) {
      showMessage({
        message: Constants.appName,
        description:
          'You should not remove this address since it is currently in use.',
        type: Constants.msgTypeDanger,
        icon: Constants.msgTypeDanger,
      });
    } else {
      if (userInfo?.sessionToken) {
        deleteAddressDelivery(val);
      } else {
        dispatch(removeFromAddress(val.objectId));
        dispatch(
          updateUser({
            selectedStoreDataEdit: {},
            editDeliveryAddress: false,
            editDeliveryAddressObjectId: '',
          }),
        );
      }
    }
    // dispatch(logoutToAddress())
  };

  const deleteAddressDelivery = async val => {
    setLoading(true);
    await deleteDeliveryAddress(val.objectId)
      .then(async val => {
        if (val.result.status == 'success') {
          await getDeliveryAddress(userInfo.objectId)
            .then(val => {
              if (val.result.status == 'success') {
                dispatch(addAddresses(val.result.data));
                setLoading(false);
                navigation.navigate('DeliveryAddress');
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
  };

  const editAddress = val => {
    const fillAddress = {
      address: val.Note,
      city: val.Address,
      marker: {
        latitude: val.Lat,
        longitude: val.Lng,
        latitudeDelta: 0.0169,
        longitudeDelta: 0.0154,
      },
      sublocality: '',
      neighborhood: '',
      landmark: '',
      Address3: val.Address3,
      AddressDescription: val.AddressDescription,
      ApartmentNumber: val.ApartmentNumber,
      objectId: val.objectId,
      edit: true,
    };
    dispatch(
      updateUser({
        selectedStoreDataEdit: fillAddress,
        editDeliveryAddress: true,
        editDeliveryAddressObjectId: val.objectId,
      }),
    );
    navigation.navigate('FillAddress');
  };

  const addNewDeliveryAddress = () => {
    dispatch(
      updateUser({
        selectedStoreDataEdit: {},
        editDeliveryAddress: false,
        editDeliveryAddressObjectId: '',
      }),
    );
    navigation.navigate('AddAddress');
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        back
        onLeftPress={() => navigation.goBack()}
        title={'Delivery Address'}
      />

      <View style={styles.modalContainer}>
        <Text style={styles.tickerText}>Select Address</Text>
        {!userInfo.sessionToken && deliveryAddress.length == 1 ? null : (
          <View style={styles.addButtonComponentWrapper}>
            <ButtonDashOutlined
              icon={
                <FeatherIcons
                  name="plus"
                  size={scale(20)}
                  color={theme.accent}
                />
              }
              iconWrapperBackgroundColor={theme.secondary}
              label="Add New Address"
              borderColor={theme.accent}
              labelColor={theme.textHighContrast}
              onPress={() => {
                addNewDeliveryAddress();
              }}
            />
          </View>
        )}
        <SelectAddress
          data={deliveryAddress}
          onPressEdit={item => editAddress(item)}
          onPressDelete={item => deleteAddress(item)}
          onPressSelect={item => userSelectedAddress(item)}
        />
      </View>
      {loading && <Indicators />}
    </View>
  );
};

export default DeliveryAddress;
