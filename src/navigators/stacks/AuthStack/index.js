import {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ThemeContext} from '../../../theming/ThemeContext';
import Login from '../../../screens/Login';
import Register from '../../../screens/Register';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {scale} from 'react-native-size-matters';
import styles from '../styles';
import {IndependentColors} from '../../../config/Colors';
// import BottomBar from '../../../screens/BottomBar';
import Contact from '../../../screens/Contact';
import FillAddress from '../../../screens/FillAddress/Index';
import Leaflet from '../../../screens/Leaflet';

// Creating stack navigator
const Stack = createStackNavigator();

// Auth stack
const AuthStack = () => {
  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;
  // Options
  const screenOptions = ({navigation}) => ({
    headerTitleAlign: 'center',
    headerTitleStyle: [styles.headerTitle],
    headerTintColor: IndependentColors.white,
    headerStyle: {
      backgroundColor: theme.accent,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerLeft: () => (
      <FeatherIcon
        name="arrow-left"
        size={scale(20)}
        color={theme.primary}
        style={styles.leftArrowIcon}
        onPress={() => navigation.goBack()}
      />
    ),
  });

  // Returning
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName='Login'>
    {/* <Stack.Screen
        name="BottomBar"
        component={BottomBar}
        options={{headerShown: false}}
      /> */}

      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Add Address"
        component={Contact}
        options={{headerShown: false}}
      />
{/* <Stack.Screen name="Leaflet" options={{headerShown: false}}>
        {props => (
          <Leaflet
          {...props}
          skipLeflet={true}
          />
        )}
      </Stack.Screen> */}
      {/* <Stack.Screen name="FillAddress" component={FillAddress} /> */}
    </Stack.Navigator>
  );
};

// Exporting
export default AuthStack;
