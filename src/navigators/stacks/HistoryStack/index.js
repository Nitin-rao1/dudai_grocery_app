import {createStackNavigator} from '@react-navigation/stack';
import {useContext} from 'react';
import {ThemeContext} from '../../../theming/ThemeContext';
import Settings from '../../../screens/Settings';
// import NotificationsPreferences from '../../../screens/NotificationsPreferences';
// import Languages from '../../../screens/Languages';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {scale} from 'react-native-size-matters';
import styles from '../styles';
import {IndependentColors} from '../../../config/Colors';
import History from '../../../screens/History';
// import Order from '../../../screens/Order';
// import Orders from '../../../screens/Orders';
import Invoice from '../../../screens/Invoice';
// import BottomBar from '../../../screens/BottomBar';
import Checkout from '../../../screens/Checkout';

// Creating stack navigator
const Stack = createStackNavigator();

// Settings stack
const HistoryStack = () => {
  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  // Screen options
  const screenOptions = ({navigation}) => ({
    headerTitleAlign: 'center',
    headerTitleStyle: [styles.headerTitle],
    headerTintColor: IndependentColors.white,
    headerStyle: [
      {
        backgroundColor: theme.accent,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
    ],
    headerLeft: () => (
      <FeatherIcon
        name="arrow-left"
        size={scale(20)}
        color={IndependentColors.white}
        style={styles.leftArrowIcon}
        onPress={() => navigation.goBack()}
      />
    ),
  });

  // Returning
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName={'HistoryBottomStack'}  >
      
      <Stack.Screen name="HistoryBottomStack" component={History} options={{headerShown:false}} />
      {/* <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="Invoice" component={Invoice} /> */}
      {/* <Stack.Screen
        name="History"
        component={History}
        // options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="Notification Preferences"
        component={NotificationsPreferences}
      /> */}
      {/* <Stack.Screen name="Languages" component={Languages} /> */}

      {/* <Stack.Screen name="BottomBar" component={BottomBar} /> */}
      {/* <Stack.Screen name="Checkout" component={Checkout} /> */}
      {/* <Stack.Screen name="Add Address" component={Checkout} /> */}
    </Stack.Navigator>
  );
};

// Exporting
export default HistoryStack;
