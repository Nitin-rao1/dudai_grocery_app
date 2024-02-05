import React, {useContext, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAP_KEY} from '../../constants/googleMapKey';
import Icons from '../cards/Icons/Icons';
import {IndependentColors} from '../../config/Colors';
import {scale} from 'react-native-size-matters';
import {
  OPEN_SANS_BOLD,
  OPEN_SANS_MEDIUM,
  OPEN_SANS_REGULAR,
  OPEN_SANS_SEMIBOLD,
} from '../../config/Constants';
import {ThemeContext} from '../../theming/ThemeContext';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Colors from '../../constants/Colors';

// import { GOOGLE_MAP_KEY } from '../constants/googleMapKey';

const AddressPickup = ({placheholderText, fetchAddress, onPress}) => {
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;
  const googlePlacesRef = useRef();
 
 const onPressAddress = (data, details) => {

  if (details && details.geometry && details.geometry.location) {
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    // fetchAddress(lat, lng);
    
    const resLength = details.address_components;
    let zipCode = '';
    let cityText = '';

    if (Array.isArray(resLength)) {
      const filtersResCity = resLength.filter(val => {
        if (val.types.includes('locality') || val.types.includes('sublocality')) {
          return val;
        }
        if (val.types.includes('postal_code')) {
          zipCode = val.long_name;
        }
        return false;
      });

      const dataTextCityObj =
        filtersResCity.length > 0
          ? filtersResCity[0]
          : resLength[resLength.length > 1 ? resLength.length - 2 : resLength.length - 1];

      cityText =
        dataTextCityObj && dataTextCityObj.long_name && dataTextCityObj.long_name.length > 17
          ? dataTextCityObj.short_name
          : dataTextCityObj.long_name;
    }
const addressData = {
fullAddress: data.description || "",
city:cityText || "",
area: data.structured_formatting.main_text || "",
lat:lat || '25.2048',
long:lng || '55.2708',
zipCode:zipCode || ''
}
// console.log('city name', data);
// console.log('zip code found', data.structured_formatting.main_text);

    fetchAddress(addressData);
  }
};

  const clearSearchText = () => {
    googlePlacesRef.current && googlePlacesRef.current.clear(); // Clear the text input
  };

  const renderLeftButton = () => (
    <View style={styles.searchIconContainer}>
      <Icons
        name={'search'}
        iconType={'Ionicons'}
        size={20}
        color={Colors.primary}
      />
    </View>
  );

  const renderRightButton = () => (
    <View style={styles.closeIconContainer}>
      <TouchableOpacity onPress={clearSearchText}>
        <Icons
          name={'close'}
          iconType={'AntDesign'}
          size={20}
          color={IndependentColors.black}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {/* <GooglePlacesAutocomplete
                placeholder={placheholderText}
                onPress={onPressAddress}
                fetchDetails={true}
                minLength={2}
                autoFocus={false}
                // onPress={onPressAddress}
                query={{
                    key: GOOGLE_MAP_KEY,
                    language: 'en'
                }}
                // suppressDefaultStyles
                styles={{
                    textInputContainer: styles.containerStyle,
                    textInput: styles.textInputStyle
                }}
                // renderLeftButton={renderLeftButton}
                // renderRightButton={renderRightButton}
            /> */}
        <GooglePlacesAutocomplete
          ref={googlePlacesRef}
          placeholder={placheholderText}
          onPress={onPressAddress}
          fetchDetails={true}
          enablePoweredByContainer={false}
          //   onPress={(data, details = null) => {
          //     onPressAddress(data, details);
          //   }}
          query={{
            key: GOOGLE_MAP_KEY,
            language: 'en',
          }}
          textInputProps={{
            placeholderTextColor: theme.textLowContrast,
            // colors.searchModalPlaceHolderColor
          }}
          styles={{
            container: {
              alignSelf: 'stretch',
              // borderRadius: 16,
            },
            textInput: {
              height: 46,
              color: IndependentColors.greyDark,
              //   colors.text
              // borderRadius: 16,
              // borderWidth: 1,
              borderColor: IndependentColors.black,
              //   colors.primary,
              //   backgroundColor: IndependentColors.greyLightest,
              backgroundColor: theme.secondary,
              color: theme.textHighContrast,
              //   colors.searchModalInputBackground,
              fontSize: scale(14),
              fontFamily: OPEN_SANS_SEMIBOLD,
              paddingHorizontal: scale(20),
              paddingLeft: 35,
              paddingRight: 35,
            },
          }}
          renderLeftButton={renderLeftButton}
          renderRightButton={renderRightButton}
          renderRow={rowData => {
            
            // console.log('rowdata', rowData);

            const title = rowData.structured_formatting.main_text;
            const address = rowData.structured_formatting.secondary_text;
            return (
              <View
                style={[
                  styles.resultRow,
                  {
                    backgroundColor: theme.secondary,
                  },
                ]}>
                <View style={styles.rowContainer}>
                  <View style={styles.iconContainer}>
                    <Icons
                      name={'location-pin'}
                      iconType={'MaterialIcons'}
                      size={20}
                      color={'black'}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.addressText}>{address}</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //   containerStyle: {
  //     // backgroundColor: 'white'
  //   },
  //   textInputStyle: {
  //     height: 48,
  //     color: 'black',
  //     fontSize: 16,
  //     backgroundColor: 'red',
  //   },
  //   searchIconContainer: {
  //     paddingHorizontal: 10,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   },

  resultRow: {
    // backgroundColor: 'pink', // Customize background color
    borderRadius: 16,
    right: 12,
    padding: 10, // Add padding to space out the content
    borderBottomWidth: 1,
    borderColor: 'white', // Add border color
  },
  rowContainer: {
    flexDirection: 'row',
    // alignItems: 'flex-start',
    // backgroundColor:'red',
    alignSelf:'center',
    width: wp('95'),
  },
  iconContainer: {
    marginRight: 10,
    marginTop: 4,
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 14,
    marginBottom: 5, // Space between title and address
    textAlign: 'left',
  },
  addressText: {
    fontSize: scale(14),
    color: 'gray', // Customize address text color
    textAlign: 'left',
  },
  searchIconContainer: {
    position: 'absolute',
    left: 10,
    top: 13,
    zIndex: 1,
  },
  closeIconContainer: {
    position: 'absolute',
    zIndex: 1,
    right: 10,
    top: 13,
  },
});

export default AddressPickup;
