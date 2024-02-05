//import libraries
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {Component, useContext, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import AddressPickup from '../../components/AddressPickup';
import Button from '../../components/buttons/Button';
import {IndependentColors} from '../../config/Colors';
import {ThemeContext} from '../../theming/ThemeContext';
import {showError, showSuccess} from '../../components/helperFunction';
import { scale } from 'react-native-size-matters';
import { OPEN_SANS_BOLD, OPEN_SANS_MEDIUM, OPEN_SANS_SEMIBOLD } from '../../config/Constants';
import Icons from '../../components/cards/Icons/Icons';
import mainStyles from '../../constants/MainStyles';
// import CustomBtn from '../components/CustomBtn';
// import { showError } from '../helper/helperFunction';

const Location = props => {
  const route = useRoute();
  const navigation = useNavigation();

  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  const [state, setState] = useState({
    pickupCords: {},
  });

  const {pickupCords} = state;

  // const checkValid = () => {
  //   if (Object.keys(pickupCords).length === 0) {
  //     showError('Please enter your location');
  //     return false;
  //   }
  //   return true;
  // };

  // const onDone = () => {
  //   const isValid = checkValid();
  //   if (isValid) {
  //     navigation.setOptions({
  //       params: {
  //         getCordinates: (data) => {
  //           props.route.params.getCordinates(data);
  //         },
  //       },
  //     });
  //     showSuccess('show your location');
  //     navigation.navigate('Add Address', { location: pickupCords });
  //   }
  // };



  const fetchAddressCords = (item) => {
    // console.log("latittude", lat);
    // console.log("longitue",lng);
    // const  pickupCords=  {
    //   latitude: lat,
    //   longitude: lng,
    //   address: address,
    // };
    navigation.navigate('AddAddress', { location: item });
    // setState({
    //   ...state,
    //   // pickupCords: {
    //   //   latitude: lat,
    //   //   longitude: lng,
    //   //   address: address,
    //   // },
    // });
    // Update the marker's position in the Contact component
    // props.route.params.getCordinates({
    //   pickupCords: {
    //     latitude: lat,
    //     longitude: lng,
    //     address: address,
    //   },
    // });
  };
  // console.log('props=======>', props);

  // console.log("pickup cords=============>", pickupCords);

  // const fetchAddressCords = (lat, lng, zipCode, cityText) => {
  //   console.log('zip code==>>>', zipCode);
  //   console.log('city texts', cityText);
  //   setState({
  //     ...state,
  //     destinationCords: {
  //       latitude: lat,
  //       longitude: lng,
  //     },
  //   });
  // };
  

  return (
    <SafeAreaView
        // keyboardShouldPersistTaps="handled"
        style={mainStyles.container}>
    <View style={styles.container}>
          {/* <View style={{marginVertical:scale(15),marginHorizontal:scale(8)}}>
            <Text style={styles.txtlocation}>Select a location</Text>
          </View> */}
        <AddressPickup
          placheholderText="Enter your area..."
          fetchAddress={fetchAddressCords}
          // onPress={onDone}
        />
     
      
    </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtlocation:{
    fontSize:scale(18),
    fontFamily:OPEN_SANS_SEMIBOLD,
    color:IndependentColors.black,
  }
});
export default Location;






















