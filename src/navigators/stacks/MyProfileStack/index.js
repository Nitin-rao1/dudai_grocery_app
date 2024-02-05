import {createStackNavigator} from '@react-navigation/stack';
import {useContext} from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {scale} from 'react-native-size-matters';
import {ThemeContext} from '../../../theming/ThemeContext';
import MyProfile from '../../../screens/MyProfile';
import EditProfile from '../../../screens/EditProfile';
// import Orders from '../../../screens/Orders';
// import Order from '../../../screens/Order';
import Wishlist from '../../../screens/Wishlist';
// import Coupons from '../../../screens/Coupons';
// import MyWallet from '../../../screens/MyWallet';
// import PaymentMethods from '../../../screens/PaymentMethods';
// import Notifications from '../../../screens/Notifications';
import Invoice from '../../../screens/Invoice';
import Product from '../../../screens/Product';
import ProductReviews from '../../../screens/ProductReviews';
import {IndependentColors} from '../../../config/Colors';
import styles from '../styles';
import Settings from '../../../screens/Settings';
// import Languages from '../../../screens/Languages';
import Contact from '../../../screens/Contact';
import Location from '../../../screens/SearchAddress';
import FillAddress from '../../../screens/FillAddress/Index';
import ChangeMobileNumber from '../../../screens/ChangeMobileNo';
import ChangePassword from '../../../screens/ChangePassword';
import ChangeEmail from '../../../screens/ChangeEmail';

// Creating stack navigator
const Stack = createStackNavigator();

// My profile stack
const MyProfileStack = () => {
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
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="My Profile"
        component={MyProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen name="EditProfile"  options={{headerTitle:'Edit Profile'}} component={EditProfile} />
      {/* <Stack.Screen name="Orders" component={Orders} /> */}
      {/* <Stack.Screen name="Order" component={Order} /> */}
      {/* <Stack.Screen name="Invoice" component={Invoice} /> */}
      {/* <Stack.Screen name="Wishlist" component={Wishlist} /> */}
      {/* <Stack.Screen name="Product" component={Product} /> */}
      {/* <Stack.Screen name="Product Reviews" component={ProductReviews} /> */}
      {/* <Stack.Screen name="My Wallet" component={MyWallet} /> */}
      {/* <Stack.Screen name="Payment Methods" component={PaymentMethods} /> */}
      {/* <Stack.Screen name="Coupons" component={Coupons} /> */}
      {/* <Stack.Screen name="Notifications" component={Notifications} /> */}
      {/* <Stack.Screen name="Settings" component={Settings} /> */}
      {/* <Stack.Screen name="Languages" component={Languages} /> */}
      {/* <Stack.Screen
        name="AddAddress"
        component={Contact}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangeMobileNumber"
        component={ChangeMobileNumber}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="ChangeEmail"
        component={ChangeEmail}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Location"
        component={Location}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen name="FillAddress" component={FillAddress} /> */}
    </Stack.Navigator>
  );
};

// Exporting
export default MyProfileStack;
