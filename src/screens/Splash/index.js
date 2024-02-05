import {useEffect, useState} from 'react';
import {View, ImageBackground, AppState} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useDispatch, useSelector, useStore} from 'react-redux';
import styles from './styles';
import {updateUser} from '../../redux/slices/SessionUser';
import {OneSignal} from 'react-native-onesignal';

// Functional component
const Splash = ({navigation}) => {
  const userInfo = useSelector(state => state.users.users);
  const store = useStore();
  //   const [navigataionsData,  setNavigataionsData] = useState(false)
  const dispatch = useDispatch();
  // console.log('sspppppplllllllllll', userInfo);
  OneSignal.Notifications.addEventListener('foregroundWillDisplay', event => {
    event.preventDefault();
    // some async work
    console.log('foregroundWillDisplay11111111', event);
    // alert('rrrr')
    if (event?.notification?.additionalData?.status == 5) {
      
      dispatch(updateUser({isForeground: true, isNotification: false}));
    }
    // Use display() to display the notification after some async work
    event.getNotification().display();
  });
  OneSignal.Notifications.addEventListener('click', event => {

    const isForeground = store.getState()?.users?.users?.isForeground;
    console.log(
      'isForeground OneSignal: click clicked:',
      isForeground,
    );
    // if (isForeground == true) {
    //   if (event?.notification?.additionalData?.status == 5) {
    //     // setNavigataionsData(false)
    //     dispatch(updateUser({notificationData: event?.notification}));
    //     return navigation.navigate('Notification');

    //     // navigateScreens({isTrue:false})
    //     // alert('if')
    //   } else {
    //     // setNavigataionsData(false)
    //     console.log("ifELse");
    //     dispatch(updateUser({isForeground: false}));
    //     // alert('else')
    //     // navigateScreens({isTrue:true})
    //   }
    // } else {
    //   console.log("ELse");

    //   // setNavigataionsData(false)
    //   dispatch(updateUser({isForeground: false}));
    //   dispatch(
    //     updateUser({
    //       isNotification: true,
    //       notificationData: event?.notification,
    //     }),
    //   );
    // }
    // console.log('OneSignal: notification clicked:', event);


    if (isForeground == true && event?.notification?.additionalData?.status == 5) {
       
          dispatch(updateUser({notificationData: event?.notification, isNotification: false}));
          return navigation.navigate('Notification');
  
        // } else {
        //   console.log("ifELse");
        //   dispatch(updateUser({isForeground: false, isNotification: false }));
        // }
      }
       if (event?.notification?.additionalData?.status != 5) {
        dispatch(updateUser({isForeground: false, isNotification: false}));
      }
      
      
      if (isForeground == false && event?.notification?.additionalData?.status == 5) {
        console.log("ELse");
  
        dispatch(updateUser({isForeground: false}));
        dispatch(
          updateUser({
            isNotification: true,
            notificationData: event?.notification,
          }),
        );
      }
  });
  useEffect(() => {
    setTimeout(() => {
      // Updating states

      navigateScreens({isTrue: false});
    }, 3000);
  }, []);

  const navigateScreens = ({isTrue}) => {
    const isNotification = store.getState()?.users?.users?.isNotification;
    // console.log("navigateScreens",isNotification);
    if (isNotification == true) {
      navigation.navigate('Notification');
    } else {
      dispatch(updateUser({homePageRefresh: true}));
      if (userInfo.sessionToken) {
        if (userInfo.firstTimeAddressSelect) {
          navigation.reset({
            index: 0,
            routes: [{name: 'HomeBottomTab'}],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{name: 'DeliveryAddress'}],
          });
        }
        // navigation.navigate('AuthStack');

        // navigation.navigate('HomeBottomTab');
      } else if (userInfo.objectId == 'guestUser') {
        if (userInfo.firstTimeAddressSelect == true) {
          navigation.reset({
            index: 0,
            routes: [{name: 'HomeBottomTab'}],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{name: 'AuthStack'}],
          });
        }
      } else if (userInfo?.leafletIsSkipTrue == false) {
        navigation.reset({
          index: 0,
          routes: [{name: 'AuthStack'}],
        });
      } else {
        navigation.reset({
          index: 0,
          // routes: [{name: 'Leaflet'}],
          routes: [{name: 'AuthStack'}],
        });

        // navigation.navigate('AuthStack');
      }
    }
  };
  return (
    <Animatable.View
      style={[styles.mainWrapper]}
      delay={100}
      animation="fadeIn"
      easing="ease-in-out-sine"
      useNativeDriver={true}>
      {/* Image background */}
      <ImageBackground
        source={require('../../assets/images/backgrounds/food-pattern-bg.jpg')}
        style={styles.imageBackground}
        resizeMode="cover">
        <View style={styles.imageBackgroundOverlay}>
          {/* Logo wrapper */}
          <View style={styles.logoWrapper}>
            {/* Logo */}
            <Animatable.Image
              source={require('../../assets/images/256.png')}
              style={styles.logo}
              delay={600}
              animation="fadeInDown"
              easing="ease-in-out-back"
              useNativeDriver={true}
            />
          </View>
          {/* Title wrapper */}
          <View style={styles.titleWrapper}>
            {/* Title */}
            <Animatable.Text
              style={styles.title}
              delay={1100}
              animation="fadeInLeft"
              easing="ease-in-out-sine"
              useNativeDriver={true}>
              Grocery{' '}
            </Animatable.Text>
            {/* Title highlighted */}
            <Animatable.Text
              style={[styles.title, styles.titleHighlighted]}
              delay={1600}
              animation="fadeInRight"
              easing="ease-in-out-sine"
              useNativeDriver={true}>
              Service
            </Animatable.Text>
          </View>
          {/* Message */}
          <Animatable.Text
            style={styles.message}
            delay={2100}
            animation="fadeInUp"
            easing="ease-in-out-back"
            useNativeDriver={true}>
            App For Both iOS & Android
          </Animatable.Text>
        </View>
      </ImageBackground>
    </Animatable.View>
  );
};

// Exporting
export default Splash;
