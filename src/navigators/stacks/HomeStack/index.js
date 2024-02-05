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
import ProductPagination from '../../../screens/Home/ProductPagination';
import PopularSubCategoriesList from '../../../screens/Home/PopularSubCategoriesList';

// Creating stack navigator
const Stack = createStackNavigator();

// Home stack
const HomeStack = () => {
  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  // Screen options
  const screenOptions = ({navigation, route}) => {

    // console.log('navigation, route', route);
    return {
      title: route?.params?.lable ? route?.params?.lable : route?.params?.key,
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
      // headerRight: () => (
      //   <FeatherIcon
      //     name="shopping-cart" // Replace with your icon name
      //     size={scale(20)}
      //     color={IndependentColors.white}
      //     style={styles.rightIcon}
      //     onPress={() => navigation.navigate('Cart')}
      //   />
      // ),
    };
  };

  // Returning
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName={'Home'}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Cart"
        component={Cart}
        // options={{headerShown: false}}
      /> */}
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen
      // options={{headerTitle:"List View Products"}}
        name="SingleProductList"
        component={SingleProductList}
        options={{headerShown: false}}
      />
       <Stack.Screen
      // options={{headerTitle:"List View Products"}}
        name="PopularSubCategoriesList"
        component={PopularSubCategoriesList}
        options={{headerShown: false}}
      />
      <Stack.Screen
      // options={{headerTitle:"List View Products"}}
        name="ProductPagination"
        component={ProductPagination}
        options={{headerShown: false}}
      />
      <Stack.Screen
      // options={{headerTitle:"List View Products"}}
        name="ListViewProducts"
        component={ListViewProducts}
        options={{headerShown: false}}
      />
       <Stack.Screen
      // options={{headerTitle:"List View Products"}}
        name="TopTabNavigation"
        component={TopTabNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen name="GridViewProducts" options={{headerTitle:"Grid View Products"}} component={GridViewProducts} />
      <Stack.Screen name="Product" component={Product} 
       options={{headerShown: false}}
      />
      {/* <Stack.Screen name="Product Reviews" component={ProductReviews} /> */}
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen
        name="Add Address"
        component={Contact}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Location"
        component={Location}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen name="FillAddress" component={FillAddress} /> */}
      <Stack.Screen name="Leaflet" component={Leaflet} />
      <Stack.Screen name="Invoice" component={Invoice} />
    </Stack.Navigator>
  );
};

// Exporting
export default HomeStack;
