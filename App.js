import {useState, useEffect} from 'react';
import {LogBox, SafeAreaView, Platform} from 'react-native';
import Statusbar from './src/components/others/Statusbar';
import {ThemeContextProvider} from './src/theming/ThemeContextProvider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppStyles from './AppStyles';
import {Provider} from 'react-redux';
import store, {persistor} from './src/redux/store/Store';
import FlashMessage from 'react-native-flash-message';
import Routes from './src/navigators/Routes';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import SplashScreen from 'react-native-splash-screen';
import { ONESIGNAL_APP_ID } from './src/env';
// import {API_URL, API_TOKEN, ONESIGNAL_APP_ID} from '@env';
import {PersistGate} from 'redux-persist/integration/react';
import Colors from './src/constants/Colors';
// App

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  // Local states


  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize(ONESIGNAL_APP_ID);

  // // requestPermission will show the native iOS or Android notification permission prompt.
  // // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  OneSignal.Notifications.requestPermission(true);

  // Method for listening for notification clicks
 
  // const userInfo = useSelector(state => state.users.users);
  // console.log("apppppppppppppppppp",userInfo);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const MainNavigation = Routes;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={AppStyles.gestureHandlerRootView}>
          <ThemeContextProvider>
            <Statusbar
              backgroundColor={Colors.primary}
              barStyle="light-content"
            />
            {Platform.OS == 'ios' && (
              <FlashMessage
                position="top"
                // style={{marginTop: scale(25)}}
              />
            )}
            <SafeAreaView style={AppStyles.topSafeAreaView}>
              {Platform.OS == 'android' && (
                <FlashMessage
                  position="top"
                  // style={{marginTop: scale(25)}}
                />
              )}
              <MainNavigation />
              {/* <NavigationContainer>
              <Routes />
            </NavigationContainer> */}
            </SafeAreaView>
            <SafeAreaView style={AppStyles.bottomSafeAreaView} />
          </ThemeContextProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

// Exporting
export default App;
