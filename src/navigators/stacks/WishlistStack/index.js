import {createStackNavigator} from '@react-navigation/stack';
import {useContext} from 'react';
import {ThemeContext} from '../../../theming/ThemeContext';
import {IndependentColors} from '../../../config/Colors';
import Cart from '../../../screens/Cart';
import Checkout from '../../../screens/Checkout';
import Product from '../../../screens/Product';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {scale} from 'react-native-size-matters';
import styles from '../styles';
import ProductReviews from '../../../screens/ProductReviews';
import Wishlist from '../../../screens/Wishlist';

// Creating stack navigator
const Stack = createStackNavigator();

// Cart stack
const WishlistStack = () => {
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
    <Stack.Navigator initialRouteName="Wishlist" screenOptions={screenOptions}>
      <Stack.Screen
        name="Wishlist"
        component={Wishlist}

        options={{title:'Favourite'}}
      />
      {/* <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Product Reviews" component={ProductReviews} />
      <Stack.Screen name="Checkout" component={Checkout} /> */}
    </Stack.Navigator>
  );
};

// Exporting
export default WishlistStack;
