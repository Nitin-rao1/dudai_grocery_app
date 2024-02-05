//import liraries
import React, {Component, useCallback, useContext, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useHeaderHeight} from '@react-navigation/elements';
import FeatherIcons from 'react-native-vector-icons/Feather';
import AddressCard from '../../components/cards/AddressCard';
import ButtonDashOutlined from '../../components/buttons/ButtonDashOutlined';
import {
  OPEN_SANS_BOLD,
  STANDARD_FLEX,
  STANDARD_SPACING,
  STANDARD_TEXT_TICKER_HEIGHT,
  STANDARD_VECTOR_ICON_SIZE,
} from '../../config/Constants';
import {ThemeContext} from '../../theming/ThemeContext';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/buttons/Button';
import { IndependentColors } from '../../config/Colors';
import Edit from '../../../src/assets/icons/svg/Edit.svg';
import Delete from '../../../src/assets/icons/svg/Delete.svg';

// create a component
const AddressStep = ({onNext, onPrev}) => {
  const navigation = useNavigation();
  var Addresslist = [
    {
      id: 1,
      address_type: 'Home',
      address_type_icon: 'home',
      addressee_name: 'Jonathon Doe',
      addressee_phone_number: '+91 000-6473-000',
      Landmark: 'marrride',
      Apartment: 110,
      Area: 'megdut',
      City: 'indore',
      address: 'sayaji hotel indore m p',
      selected: true,
    },
  ];

  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  // const AddAddress = useSelector(state => state.address);
  // Addresslist = [...Addresslist, ...AddAddress.data];
  // console.log('AddAddress=============>', Addresslist);
  // console.log('============================',Addresslist[0].Apartment);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  const selectAddress = useCallback(param => {
    // Updating state value
    setSelectedAddressIndex(param);
  }, []);

  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <View
        style={[
          styles.slide,
          // {paddingTop: getStatusBarHeight() + useHeaderHeight()},
        ]}>
        <View style={styles.tickerContainer}>
          <Text style={[styles.tickerText, {color: theme.textHighContrast}]}>
            Delivery Address
          </Text>
        </View>

        <View style={styles.contentWrapper}>
          {/* Vertical scroll view */}
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            {/* Section title */}
            <Text
              style={[styles.sectionTitle, {color: theme.textHighContrast}]}>
              Select delivery address
            </Text>

            {/* Button */}
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
                onPress={() => navigation.navigate('Add Address')}
              />
            </View>

            {/* Address(es) */}
            {Addresslist.map((item, index) => (
              <View key={index} style={[styles.cardComponentWrapper]}>
                <TouchableOpacity
                  style={styles.itemContainer}
                  // onPress={() => navigation.navigate('Leaflet')}
                  >
                  <View style={styles.closeButton}>
                    <View style={styles.pointContainer}>
                      <View
                        style={{
                          backgroundColor: IndependentColors.greyLightest,
                        }}>
                        {/* style={{backgroundColor: IndependentColors.white}} */}
                        <View style={styles.pointInfo}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text
                              style={[
                                styles.pointTitle,
                                {color: theme.textHighContrast},
                              ]}>
                              {item.address_type}
                            </Text>
                            <TouchableOpacity
                              // onPress={() =>{
                                // console.log('item',item),
                                // navigation.navigate('FillAddress', {
                                //   // address: address,
                                //   // city: city,
                                //   // marker: {
                                //   //   latitude: marker.latitude,
                                //   //   latitudeDelta: 0.0169,
                                //   //   longitude: marker.longitude,
                                //   //   longitudeDelta: 0.0154,
                                //   // },
                                //   // sublocality: sublocality,
                                //   // neighborhood: neighborhood,
                                //   // landmark: landmark,
                                // })
                              // }
                              // }
                              >
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                {/* Left Icon */}
                                <Edit
                                  width={STANDARD_VECTOR_ICON_SIZE}
                                  height={STANDARD_VECTOR_ICON_SIZE}
                                />
                              </View>
                            </TouchableOpacity>
                          </View>
                          <Text
                            style={[
                              styles.pointDetails,
                              {color: theme.textLowContrast},
                            ]}>
                            {item.addressee_name}
                          </Text>

                          <Text
                            style={[
                              styles.pointDetails,
                              {color: theme.textLowContrast},
                            ]}>
                            {item.address}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text
                              style={[
                                styles.pointDetails,
                                {color: theme.textLowContrast},
                              ]}>
                              {item.addressee_phone_number}
                            </Text>
                            <TouchableOpacity
                              onPress={() => navigation.navigate('')}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                {/* Left Icon */}
                                <Delete
                                  width={STANDARD_VECTOR_ICON_SIZE}
                                  height={STANDARD_VECTOR_ICON_SIZE}
                                />
                              </View>
                            </TouchableOpacity>
                          </View>

                          <Text
                            style={[
                              styles.pointDetails,
                              {color: theme.textLowContrast},
                            ]}>
                            {item.City}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      {/* <View style={styles.buttonsty}>
        <Button
          label="Next"
          labelColor={theme.primary}
          backgroundColor={theme.accent}
          onPress={() => {
            onNext();
          }}
        />
      </View> */}
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
  cardComponentWrapper: {
    marginBottom: STANDARD_SPACING * 3,
  },
  addButtonComponentWrapper: {
    marginBottom: STANDARD_SPACING * 3,
  },
  tickerText: {
    textTransform: 'uppercase',
    fontFamily: OPEN_SANS_BOLD,
    fontSize: STANDARD_TEXT_TICKER_HEIGHT,
    // lineHeight: STANDARD_TEXT_TICKER_HEIGHT,
  },
  tickerContainer: {
    overflow: 'hidden',
    marginVertical: scale(20),
    alignItems: 'center',
  },
  contentWrapper: {
    paddingHorizontal: STANDARD_SPACING * 3,
    flex: STANDARD_FLEX,
  },
  buttonsty: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: STANDARD_SPACING * 3,
    alignSelf: 'flex-end',
  },
});

//make this component available to the app
export default AddressStep;
