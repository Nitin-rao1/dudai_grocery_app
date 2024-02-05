//import liraries
import React, {Component, useContext, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ThemeContext} from '../../theming/ThemeContext';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useHeaderHeight} from '@react-navigation/elements';
import FeatherIcons from 'react-native-vector-icons/Feather';
import Button from '../../components/buttons/Button';
import {useNavigation} from '@react-navigation/native';
import {
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  OPEN_SANS_BOLD,
  OPEN_SANS_REGULAR,
  STANDARD_ORDER_ICON_WRAPPER_SIZE,
  STANDARD_SPACING,
} from '../../config/Constants';
import {logoutToCart} from '../../redux/slices/ProductsCartSlice';
import {useDispatch} from 'react-redux';
import {updateUser} from '../../redux/slices/SessionUser';

// create a component
const ConfirmationPage = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  useEffect(()=>{
    setTimeout(() => {
      goToHomePage()
    }, 500);
  },[])

  const goToHomePage = ()=>{
    dispatch(logoutToCart());
    dispatch(
      updateUser({
        productTotalAmount: 0,
        ordersItem: [],
        deliveryCharges: 0,
        homePageRefresh:true
      }),
    );
    // navigation.navigate('HomeBottomTabs', {
    //   screen: 'HistoryBottomStack',
    // });
    // navigation.navigate('HistoryBottomStack');
    navigation.navigate('Home');
  }
  return (
    <View
      style={[
        styles.slide,
        {paddingTop: getStatusBarHeight() + useHeaderHeight()},
      ]}>
      <View style={styles.contentWrapper}>
        <View style={styles.checkoutStatus}>
          <View
            style={[
              styles.orderSuccessCheckMarkWrapper,
              {backgroundColor: theme.accent},
            ]}>
            <FeatherIcons
              name="check"
              size={STANDARD_ORDER_ICON_WRAPPER_SIZE * 0.5}
              color={theme.primary}
            />
          </View>

          <Text
            style={[styles.orderStatusTitle, {color: theme.textHighContrast}]}>
            Order Placed!
          </Text>

          <Text
            style={[styles.orderStatusMessage, {color: theme.textLowContrast}]}>
            Hey! your order was placed successfully. For more details about your
            order status click the button below.
          </Text>

          <Button
            label="Continue Shopping"
            labelColor={theme.primary}
            backgroundColor={theme.accent}
            onPress={() => {
              goToHomePage()
            }}
          />
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    paddingHorizontal: STANDARD_SPACING * 3,
    // flex: 1,
  },
  checkoutStatus: {
    alignItems: 'center',
    justifyContent: 'center',
    // Remove the position and size properties from here
  },
  orderSuccessCheckMarkWrapper: {
    width: STANDARD_ORDER_ICON_WRAPPER_SIZE,
    aspectRatio: 1,
    borderRadius: STANDARD_ORDER_ICON_WRAPPER_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderStatusTitle: {
    marginVertical: STANDARD_SPACING * 3,
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_SM,
  },
  orderStatusMessage: {
    fontFamily: OPEN_SANS_REGULAR,
    fontSize: FONT_SIZE_XS,
    textAlign: 'center',
    marginHorizontal: STANDARD_SPACING * 3,
    marginBottom: STANDARD_SPACING * 4,
  },
});

// make this component available to the app
export default ConfirmationPage;
