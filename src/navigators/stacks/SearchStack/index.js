import {createStackNavigator} from '@react-navigation/stack';
import {useContext} from 'react';
import {ThemeContext} from '../../../theming/ThemeContext';
import Home from '../../../screens/Home';
import Categories from '../../../screens/Categories';
import ListViewProducts from '../../../screens/ListViewProducts';
import GridViewProducts from '../../../screens/GridViewProducts';
import Product from '../../../screens/Product';
// import ProductReviews from '../../../screens/ProductReviews';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {IndependentColors} from '../../../config/Colors';
import {scale} from 'react-native-size-matters';
import styles from '../styles';
import Cart from '../../../screens/Cart';
import Checkout from '../../../screens/Checkout';
import {TouchableOpacity} from 'react-native';
import Contact from '../../../screens/Contact';
import Location from '../../../screens/SearchAddress';
import FillAddress from '../../../screens/FillAddress/Index';
import Leaflet from '../../../screens/Leaflet/index';
import Invoice from '../../../screens/Invoice';
import TopTabNavigation from '../../../screens/ListViewProducts/TopTabNavigation';
import SingleProductList from '../../../screens/Home/SingleProductList';
import SearchProductList from '../../../screens/SearchProductList';

// Creating stack navigator
const Stack = createStackNavigator();

// Home stack
const SearchStack = () => {
  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  // Screen options
  
  // Returning
  return (
    <Stack.Navigator  initialRouteName={'SearchProductList'}>
      <Stack.Screen
        name="SearchProductList"
        component={SearchProductList}
        options={{headerShown: false}}
      />
    
      {/* <Stack.Screen name="Leaflet" component={Leaflet} />
      <Stack.Screen name="Invoice" component={Invoice} /> */}
    </Stack.Navigator>
  );
};

// Exporting
export default SearchStack;
