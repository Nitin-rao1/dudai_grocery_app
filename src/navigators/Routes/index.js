import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, AppState} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from '../stacks/AuthStack';
import HomeDrawer from '../drawers/HomeDrawer';
import Splash from '../../screens/Splash';
import {NavigationContainer} from '@react-navigation/native';
import ListViewProducts from '../../screens/ListViewProducts';
import Cart from '../../screens/Cart';
import DeliveryAddress from '../../screens/DeliveryAddress';
import Contact from '../../screens/Contact';
import FillAddress from '../../screens/FillAddress/Index';
import Location from '../../screens/SearchAddress';
import AvailableStore from '../../screens/AvailableStore';
import Invoice from '../../screens/Invoice';
import DeliveryTime from '../../screens/Checkout/DeliveryTime';
import PaymentMethod from '../../screens/Checkout/PaymentMethod';
import ConfirmationPage from '../../screens/Checkout/ConfirmationPage';
import Promotioncontent from '../../screens/Promotions/Promotioncontent';
import ProductList from '../../screens/ProductList';
import CameraScreen from '../../screens/CameraScreen';
import Leaflet from '../../screens/Leaflet';
import NoAvailableProduct from '../../screens/NoAvailableProduct';
import Notification from '../../screens/Notification';
import { useDispatch } from 'react-redux';
import { OneSignal } from 'react-native-onesignal';
import NotificationList from '../../screens/Notification/NotificationList';

const Stack = createStackNavigator();

const RootNavigator =()=> {
  const [appState, setAppState] = useState(AppState.currentState);
  const [isMounted, setIsMounted] = useState(true);
  // const handleAppStateChange = (nextAppState) => {
  //   // console.log("appState.match(/inactive|background/) && nextAppState === 'active'",appState.match(/inactive|background/) && nextAppState === 'active');
  //   if (appState.match(/inactive|background/) && nextAppState === 'active') {
  //     setIsMounted(true);
  //     console.log("if conndition");

  //   } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
  //     setIsMounted(false);
  //     console.log("else conndition");
  //   }
  //   setAppState(nextAppState);
  // };
  // useEffect(() => {
  //   AppState.addEventListener('change', handleAppStateChange);
  //   return () => {
  //     AppState.removeEventListener('change', handleAppStateChange);
  //   };
  // }, []);
  const dispatch = useDispatch();
  // OneSignal.Notifications.addEventListener('foregroundWillDisplay', event => {
  //  const sjdjs = AppState.currentState;
  //   // dispatch(updateUser({isNotification: true}));
  //   console.log(sjdjs,'OneSignal: foregroundWillDisplay clicked:', event);
  // });
  return (
    <Stack.Navigator initialRouteName="welcomeScreen" screenOptions={{headerShown:false}}>
       {/* <Stack.Screen
      // options={{headerTitle:"List View Products"}}
        name="ListViewProducts"
        component={ListViewProducts}
        options={{headerShown: false}}
      /> */}
       <Stack.Screen
        name="welcomeScreen"
        component={Splash}
      />
      <Stack.Screen
        name="NoAvailableProduct"
        component={NoAvailableProduct}
      />
       <Stack.Screen
        name="Notification"
        component={Notification}
      />
       <Stack.Screen
        name="NotificationList"
        component={NotificationList}
      />
       <Stack.Screen name="Leaflet">
        {props => (
          <Leaflet
          {...props}
          // skipLeflet={true}
          />
        )}
      </Stack.Screen>
      
      <Stack.Screen
        name="AuthStack"
        component={AuthStack}
      />
      <Stack.Screen
        name="HomeBottomTab"
        component={HomeDrawer}
      />
       <Stack.Screen
        name="Cart"
        component={Cart}
      />
       <Stack.Screen
        name="CameraScreen"
        component={CameraScreen}
      />
       <Stack.Screen
        name="DeliveryAddress"
        component={DeliveryAddress}
      />
      <Stack.Screen
        name="AddAddress"
        component={Contact}
      />
       <Stack.Screen name="FillAddress" component={FillAddress} />
       <Stack.Screen
        name="Location"
        component={Location}
      />
       <Stack.Screen
        name="AvailableStore"
        component={AvailableStore}
      />
      <Stack.Screen name="Invoice" component={Invoice} />
      <Stack.Screen name="DeliveryTime" component={DeliveryTime} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="ConfirmationPage" component={ConfirmationPage} />
      <Stack.Screen name="Promotioncontent" component={Promotioncontent} />
      <Stack.Screen name="ProductList" component={ProductList} />

    </Stack.Navigator>
  );
}

const Routes = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Routes;