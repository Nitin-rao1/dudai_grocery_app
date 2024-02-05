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

// Creating stack navigator
const Stack = createStackNavigator();

// Settings stack
const SettingsStack = () => {
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
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Notification Preferences"
        component={NotificationsPreferences}
      /> */}
      {/* <Stack.Screen name="Languages" component={Languages} /> */}
    </Stack.Navigator>
  );
};

// Exporting
export default SettingsStack;
