import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useRef, useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ThemeContext} from '../../../theming/ThemeContext';
import {scale} from 'react-native-size-matters';
import HomeStack from '../../stacks/HomeStack';
import CartStack from '../../stacks/CartStack';
import MyProfileStack from '../../stacks/MyProfileStack';
import SettingsStack from '../../stacks/SettingsStack';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {STANDARD_VECTOR_ICON_SIZE} from '../../../config/Constants';
import styles from './styles';
import HistoryStack from '../../stacks/HistoryStack';
import Wishlist from '../../../screens/Wishlist';
import WishlistStack from '../../stacks/WishlistStack';
import Icons from '../../../components/cards/Icons/Icons';
import {IndependentColors} from '../../../config/Colors';
import * as Animatable from 'react-native-animatable';
import History from '../../../screens/History';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../../screens/Home';
import SearchStack from '../../stacks/SearchStack';

const TabArr = [
  {
    route: 'Home Stack',
    label: 'Home',
    type: 'Feather',
    icon: 'home',
    component: HomeStack,
  },
  {
    route: 'WishlistStack',
    label: 'Wishlist',
    type: 'Feather',
    icon: 'heart',
    component: WishlistStack,
  },
  {
    route: 'History Stack',
    label: 'History',
    type: 'MaterialIcons',
    icon: 'location-searching',
    component: HistoryStack,
  },
  {
    route: 'My Profile Stack',
    label: 'Profile',
    type: 'Feather',
    icon: 'user',
    component: MyProfileStack,
  },
];
// Creating bottom tab navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// Home bottom tab navigator
const HomeBottomTab = () => {
  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
  const userInfo = useSelector(state => state.users.users);
  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  // Screen options
  const screenOptions = {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
      borderTopWidth: 0,
      backgroundColor: theme.primary,
      elevation: 0,
      height: scale(50),
    },
  };
  const animate1 = {
    0: {scale: 0.5, translateY: 7},
    0.92: {translateY: -34},
    1: {scale: 1.2, translateY: -24},
  };
  const animate2 = {
    0: {scale: 1.2, translateY: -24},
    1: {scale: 1, translateY: 7},
  };

  const circle1 = {
    0: {scale: 0},
    0.3: {scale: 0.9},
    0.5: {scale: 0.2},
    0.8: {scale: 0.7},
    1: {scale: 1},
  };
  const circle2 = {0: {scale: 1}, 1: {scale: 0}};

  const TabButton = props => {
    const {item, onPress, accessibilityState} = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);
    const circleRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
      if (focused) {
        viewRef.current.animate(animate1);
        circleRef.current.animate(circle1);
        textRef.current.transitionTo({scale: 1});
      } 
      // else {
      //   viewRef.current.animate(animate2);
      //   circleRef.current.animate(circle2);
      //   textRef.current.transitionTo({scale: 0});
      // }
    }, []);

    return (
      <TouchableOpacity
        onPress={(val)=>onPress(val)}
        activeOpacity={1}
        style={styles.container}>
        <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
          <View style={styles.btn(focused, theme)}>
            <Animatable.View
              ref={circleRef}
              style={styles.circle(focused, theme)}
            />
            <Icons
              iconType={item.type}
              name={item.icon}
              color={focused ? IndependentColors.white : theme.accent}
            />
          </View>
          <Animatable.Text ref={textRef} style={styles.text(focused, theme)}>
            {item.label}
          </Animatable.Text>
        </Animatable.View>
      </TouchableOpacity>
    );
  };
  console.log('dddddddd');
  // Returning
  return (
    <>
      {userInfo?.sessionToken ? (
       
        <Tab.Navigator
          initialRouteName={'Home Stack'}
          screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabBar,

            tabBarHideOnKeyboard: true,
          }}>
          {/* {TabArr.map((item, index) => {
        return ( */}
          <Tab.Screen
            // key={index}
            name={'Home Stack'}
            component={HomeStack}
            listeners={({navigation}) => ({
              tabPress: e => {
                navigation.navigate('Home Stack');
              },
            })}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => (
                <TabButton
                  {...props}
                  item={{
                    route: 'Home Stack',
                    label: 'Home',
                    type: 'Feather',
                    icon: 'home',
                  }}
                />
              ),
            }}
          />
          <Tab.Screen
            // key={index}
            name={'WishlistStack'}
            component={WishlistStack}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => (
                <TabButton
                  {...props}
                  item={{
                    route: 'WishlistStack',
                    label: 'Favourite',
                    type: 'Feather',
                    icon: 'heart',
                  }}
                />
              ),
            }}
          />
          <Tab.Screen
           
            name={'SearchStack'}
            component={SearchStack}
            options={{
              tabBarShowLabel: false,
              unmountOnBlur:true,
              tabBarButton: props => (
                <TabButton
                  {...props}
                  item={{
                    route: 'SearchStack',
                    label: 'Search',
                    type: 'MaterialCommunityIcons',
                    icon: 'archive-search-outline',
                  }}
                />
              ),
            }}
          />
          <Tab.Screen
            // key={index}
            // name={'History Stack'}
            // component={HistoryStack}
            name={'HistoryStack'}
            component={HistoryStack}
            options={{
              tabBarShowLabel: false,
              unmountOnBlur:true,
              tabBarButton: props => (
                <TabButton
                  {...props}
                  item={{
                    route: 'History Stack',
                    label: 'History',
                    type: 'MaterialIcons',
                    icon: 'location-searching',
                  }}
                />
              ),
            }}
          />
           
          <Tab.Screen
            // key={index}
            name={'My Profile Stack'}
            component={MyProfileStack}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => (
                <TabButton
                  {...props}
                  item={{
                    route: 'My Profile Stack',
                    label: 'Profile',
                    type: 'Feather',
                    icon: 'user',
                  }}
                />
              ),
            }}
          />
          {/* );
      })} */}
        </Tab.Navigator>
      ) : (
        <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen
          name={'Home Stack'}
          component={HomeStack}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name={'SearchStack'}
          component={SearchStack}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      )}
    </>
  );
};

// Exporting
export default HomeBottomTab;
