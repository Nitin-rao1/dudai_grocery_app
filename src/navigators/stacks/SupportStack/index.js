import {createStackNavigator} from '@react-navigation/stack';
import {useContext} from 'react';
import {ThemeContext} from '../../../theming/ThemeContext';
// import Support from '../../../screens/Support';
// import Chat from '../../../screens/Chat';
import Contact from '../../../screens/Contact';
// import Help from '../../../screens/Help';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {scale} from 'react-native-size-matters';
import {IndependentColors} from '../../../config/Colors';
import styles from '../styles';

// Creating stack navigator
const Stack = createStackNavigator();

// Support stack
const SupportStack = () => {
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
      {/* <Stack.Screen name="Support" component={Support} /> */}
      {/* <Stack.Screen name="Chat" component={Chat} /> */}
      <Stack.Screen name="Contact" component={Contact} />
      {/* <Stack.Screen name="Help" component={Help} /> */}
    </Stack.Navigator>
  );
};

// Exporting
export default SupportStack;
