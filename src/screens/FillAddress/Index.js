import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import TextInput from '../../components/inputs/TextInput';
import Message from '../../../src/assets/icons/svg/Message.svg';
import Button from '../../components/buttons/Button';
import {ThemeContext} from '../../theming/ThemeContext';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView, {
  MapMarker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {
  addAddress,
  addAddresses,
  addToAddress,
  updateAddressByObjectId,
} from '../../redux/slices/AddressSlice';
import {STANDARD_VECTOR_ICON_SIZE} from '../../config/Constants';
import {showMessage, hideMessage} from 'react-native-flash-message';
import Constants from '../../constants/Constants';
import {
  createDeliveryAddress,
  getDeliveryAddress,
  putDeliveryAddress,
} from '../../api/categories/categoriesAndProduct';
import {Indicators} from '../../components/apploader';
import Icons from '../../components/cards/Icons/Icons';
import Header from '../../components/Header';
import mainStyles from '../../constants/MainStyles';

// Functional component
const FillAddress = ({navigation, route}) => {
  const userInfo = useSelector(state => state.users.users);
  const deliveryAddress = useSelector(state => state.address.addresses);
  const dispatch = useDispatch();
  const allAddressdata = userInfo?.selectedStoreDataEdit;
  // const address = userInfo?.selectedStoreDataEdit?.address;
  // const marker = userInfo?.selectedStoreDataEdit?.marker;
  // const sublocality = userInfo?.selectedStoreDataEdit?.sublocality;
  // const neighborhood = userInfo?.selectedStoreDataEdit?.neighborhood;
  // const landmark = userInfo?.selectedStoreDataEdit?.landmark;
  // const screen = Dimensions.get('window');
  // const ASPECT_RATIO = screen.width / screen.height;
  // const LATITUDE_DELTA = 0.04;
  // const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(userInfo?.selectedStoreDataEdit?.city);
  const [marker, setMarker] = useState(userInfo?.selectedStoreDataEdit?.marker);

  const [area, setArea] = useState(allAddressdata?.AddressDescription || '');
  const [street, setStreet] = useState(allAddressdata?.Address3 || '');
  const [apartment, setApartment] = useState(
    allAddressdata?.ApartmentNumber || '',
  );
  const [fullAddress, setFullAddress] = useState(allAddressdata?.address);

  const handleValidation = () => {
    let isValid = true;
    const errorMessages = {};

    if (!city) {
      isValid = false;
      errorMessages.city = 'City is required.';
    } else if (!area) {
      isValid = false;
      errorMessages.area = 'Area Name | Building Name is required.';
    } else if (!street) {
      isValid = false;
      errorMessages.street = 'Landmark | Street Number is required.';
    } else if (!apartment) {
      isValid = false;
      errorMessages.apartment = 'Apartment Number | Villa | Block is required.';
    } else if (!fullAddress) {
      isValid = false;
      errorMessages.fullAddress = 'Full address(street/Floor) is required.';
    }

    // if (!isValid) {
    //   // Display error messages one by one
    //   if (errorMessages.city) {
    //     Alert.alert('Required Alert', errorMessages.city);
    //   } else if (errorMessages.area) {
    //     Alert.alert('Required Alert', errorMessages.area);
    //   } else if (errorMessages.street) {
    //     Alert.alert('Required Alert', errorMessages.street);
    //   } else if (errorMessages.apartment) {
    //     Alert.alert('Required Alert', errorMessages.apartment);
    //   } else if (errorMessages.fullAddress) {
    //     Alert.alert('Required Alert', errorMessages.fullAddress);
    //   }
    // }
    if (!isValid) {
      // Display error messages using showMessage
      if (errorMessages.city) {
        showMessage({
          message: Constants.appName,
          description: errorMessages.city,
          type: 'danger',
          icon: 'danger',
        });
      } else if (errorMessages.area) {
        showMessage({
          message: Constants.appName,
          description: errorMessages.area,
          type: 'danger',
          icon: 'danger',
        });
      } else if (errorMessages.street) {
        showMessage({
          message: Constants.appName,
          description: errorMessages.street,
          type: 'danger',
          icon: 'danger',
        });
      } else if (errorMessages.apartment) {
        showMessage({
          message: Constants.appName,
          description: errorMessages.apartment,
          type: 'danger',
          icon: 'danger',
        });
      } else if (errorMessages.fullAddress) {
        showMessage({
          message: Constants.appName,
          description: errorMessages.fullAddress,
          type: 'danger',
          icon: 'danger',
        });
      }
    }

    return isValid;
  };
  console.log('sssssssssssssss', userInfo);
  const AddressesData = () => {
    if (handleValidation()) {
      // newAddress.push({
      //   id: 1,
      //   address_type: 'Home',
      //   address_type_icon: 'home',
      //   addressee_name: 'Jonathon Doe',
      //   addressee_phone_number: '+91 000-6473-000',
      //   Landmark: `${street}`,
      //   Apartment: `${apartment}`,
      //   Area: `${area}`,
      //   City: `${city}`,
      //   address: `${fullAddress}`,
      //   selected: true,
      // });
      // showMessage({
      //   message: 'Your success message here',
      //   type: 'success',
      //   icon: 'success',
      // });
      // dispatch(addAddress(newAddress));
      // // Navigate to another screen
      // navigation.navigate('Checkout');
      // navigation.navigate('HomeBottomTab');

      const isData = {
        Lat: allAddressdata.marker.latitude,
        Lng: allAddressdata.marker.longitude,
        Address3: street,
        Address: city,
        AddressDescription: area,
        ApartmentNumber: apartment,
        Note: fullAddress,
        PhoneNumber: '',
        UserID: userInfo.sessionToken ? userInfo.objectId : 'guestUser',
        IsActive: false,
        BranchId: -1, //only for guest user
        createdAt: new Date(),
        updatedAt: new Date(),
        objectId:
          userInfo?.editDeliveryAddress == true
            ? userInfo?.editDeliveryAddressObjectId
            : new Date(),
        __type: 'Object',
        className: 'UserAddress',
      };
      console.log('hfqwhbuwevj', isData);
      // return
      if (userInfo.sessionToken) {
        if (userInfo?.editDeliveryAddress == true) {
          updateDeliveryAddress();
        } else {
          addDeliveryAddress();
        }
      } else {
        if (userInfo?.editDeliveryAddress == true) {
          dispatch(updateAddressByObjectId(isData.objectId, isData));
        } else {
          dispatch(addToAddress(isData));
        }
        navigation.navigate('DeliveryAddress');
      }
    }
  };
  useEffect(() => {
    setCity(userInfo?.selectedStoreDataEdit?.city);
    setMarker(userInfo?.selectedStoreDataEdit?.marker);
    setArea(userInfo?.selectedStoreDataEdit?.AddressDescription);

    setStreet(userInfo?.selectedStoreDataEdit?.Address3);
    setApartment(userInfo?.selectedStoreDataEdit?.ApartmentNumber);
    setFullAddress(userInfo?.selectedStoreDataEdit?.address);
  }, [userInfo]);
  const addDeliveryAddress = async () => {
    setLoading(true);
    const deliveryData = {
      Lat: allAddressdata.marker.latitude,
      Lng: allAddressdata.marker.longitude,
      Address3: street,
      Address: city,
      AddressDescription: area,
      ApartmentNumber: apartment,
      Note: fullAddress,
      PhoneNumber: userInfo.PhoneNumber,
      UserID: userInfo.objectId,
    };
    await createDeliveryAddress(deliveryData)
      .then(async val => {
        console.log("ddddddddddddddddddd",val);
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
  const updateDeliveryAddress = async () => {
    setLoading(true);
    const deliveryData = {
      Lat: allAddressdata.marker.latitude,
      Lng: allAddressdata.marker.longitude,
      Address3: street,
      Address: city,
      AddressDescription: area,
      ApartmentNumber: apartment,
      Note: fullAddress,
      PhoneNumber: userInfo.PhoneNumber,
      UserID: userInfo.objectId,
      BranchId: -1,
      objectId: allAddressdata.objectId,
    };
    console.log('hfqwhbuwevj', deliveryData, allAddressdata.objectId);
    // return;
    await putDeliveryAddress(deliveryData)
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
  return (
    <View style={mainStyles.container}>
      <Header
        back
        onLeftPress={() => {
          navigation.goBack();
        }}
        title={'Address Details'}
        // headerBg={Colors.primary}
        // iconColor={IndependentColors.white}
      />
   
   <KeyboardAvoidingView
            style={mainStyles.flex1}
            behavior={Constants.keyboards}>
          <ScrollView>
     
        <MapView initialRegion={marker} style={styles.mapView}>
          <MapMarker
            title={userInfo?.selectedStoreDataEdit?.city}
            description={userInfo?.selectedStoreDataEdit?.address}
            image={require('../../assets/icons/png/map-marker.png')}
            // style={{height:20, width:20}}
            coordinate={marker}
          />
        </MapView>
     
       <View style={styles.mainWrapper}>

      
            <View style={{height: hp('1')}} />
            <Button
              label={'Search To Change Location'}
              labelColor={theme.primary}
              backgroundColor={theme.accent}
              onPress={() => navigation.navigate('AddAddress')}
            />
            <View style={{height: hp('2')}}></View>
            <View style={styles.textInputComponentWrapper}>
              <TextInput
                labelColor={theme.textHighContrast}
                placeholder="City"
                placeholderTextColor={theme.textLowContrast}
                leftIcon={
                  <Message
                    width={STANDARD_VECTOR_ICON_SIZE}
                    height={STANDARD_VECTOR_ICON_SIZE}
                  />
                }
                backgroundColor={theme.secondary}
                textInputValueColor={theme.textHighContrast}
                value={city}
                onChangeText={txt => setCity(txt)}
              />
            </View>

            <View style={styles.textInputComponentWrapper}>
              <TextInput
                labelColor={theme.textHighContrast}
                placeholder="Area Name | Building Name*"
                placeholderTextColor={theme.textLowContrast}
                leftIcon={
                  <Message
                    width={STANDARD_VECTOR_ICON_SIZE}
                    height={STANDARD_VECTOR_ICON_SIZE}
                  />
                }
                backgroundColor={theme.secondary}
                textInputValueColor={theme.textHighContrast}
                value={area}
                onChangeText={txt => setArea(txt)}
              />
            </View>

            <View style={styles.textInputComponentWrapper}>
              <TextInput
                labelColor={theme.textHighContrast}
                placeholder="Landmark | Street Number*"
                placeholderTextColor={theme.textLowContrast}
                leftIcon={
                  <Message
                    width={STANDARD_VECTOR_ICON_SIZE}
                    height={STANDARD_VECTOR_ICON_SIZE}
                  />
                }
                backgroundColor={theme.secondary}
                textInputValueColor={theme.textHighContrast}
                value={street}
                onChangeText={txt => setStreet(txt)}
              />
            </View>

            <View style={styles.textInputComponentWrapper}>
              <TextInput
                labelColor={theme.textHighContrast}
                placeholder="Apartment Number | Villa | Block*"
                placeholderTextColor={theme.textLowContrast}
                leftIcon={
                  <Message
                    width={STANDARD_VECTOR_ICON_SIZE}
                    height={STANDARD_VECTOR_ICON_SIZE}
                  />
                }
                backgroundColor={theme.secondary}
                textInputValueColor={theme.textHighContrast}
                value={apartment}
                onChangeText={txt => setApartment(txt)}
              />
            </View>

            <View style={styles.textInputComponentWrapper}>
              <TextInput
                labelColor={theme.textHighContrast}
                placeholder="Full address(street/Floor)*"
                placeholderTextColor={theme.textLowContrast}
                leftIcon={
                  <Message
                    width={STANDARD_VECTOR_ICON_SIZE}
                    height={STANDARD_VECTOR_ICON_SIZE}
                  />
                }
                backgroundColor={theme.secondary}
                textInputValueColor={theme.textHighContrast}
                numberOfLines={4}
                value={fullAddress}
                onChangeText={txt => setFullAddress(txt)}
              />
            </View>
            <View style={styles.buttonwrapper}>
              <Button
                label={'Cancel'}
                labelColor={theme.primary}
                backgroundColor={theme.accent}
                onPress={() => navigation.goBack()}
              />

              <Button
                label={'Confirm'}
                labelColor={theme.primary}
                backgroundColor={theme.accent}
                onPress={() => AddressesData()}
                // onPress={() => navigation.navigate('HomeBottomTab')}
              />
            </View>
            </View>
      </ScrollView>
        </KeyboardAvoidingView>
     
      {loading && <Indicators />}
    </View>
  );
};

export default FillAddress;
