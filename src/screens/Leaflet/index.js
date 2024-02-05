// import React, {Component} from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import styles from './styles';
// import Header from '../../components/Header';

// const Leaflet = ({navigation}) => {
//   return (
//     <View style={styles.container}>
//        <Header
//         back
//         onLeftPress={() => navigation.goBack()}
//         // onRightPress={onPressLocation}
//         // rightIcon
//         // cartItemsLength={cartlength.length}
//         title={'Leaflet'}
//         // RightIconName={'cart'}
//         // iconType={'MaterialCommunityIcons'}
//         // headerBg={Colors.primary}
//         // iconColor={IndependentColors.white}
//         // titleAlight={'center'}
//       />
//       <Text>Leaflet In development</Text>
//     </View>
//   );
// };

// export default Leaflet;

import react, {useState, useContext, useEffect} from 'react';
import {View, Text, Dimensions, Alert} from 'react-native';
import Pdf from 'react-native-pdf';
import styles from './styles';
import {ThemeContext} from '../../theming/ThemeContext';
import {Indicators} from '../../components/apploader';
import Header from '../../components/Header';
import {IndependentColors} from '../../config/Colors';
import Button from '../../components/buttons/Button';
import Colors from '../../constants/Colors';
import {updateUser} from '../../redux/slices/SessionUser';
import {useDispatch} from 'react-redux';
import {userLeaflet} from '../../api/categories/categoriesAndProduct';
import { showMessage } from 'react-native-flash-message';
import Constants from '../../constants/Constants';

const Leaflet = ({navigation, route, skipLeflet}) => {
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);
  const [leafletData, setLeafletData] = useState('');
  // Storing theme config according to the theme mode
  const skipNavigation = skipLeflet ? true : false;
  const dispatch = useDispatch();
  const theme = isLightTheme ? lightTheme : darkTheme;
  const handleSkip = () => {
    dispatch(updateUser({leafletIsSkipTrue: false}));
    navigation.reset({
      index: 0,
      routes: [{name: 'AuthStack'}],
    });
  };
  useEffect(() => {
    setIsLoading(true);

    fetchData();
  }, []);
  const fetchData = async () => {
    await userLeaflet()
      .then(val => {
        if (val.result.data.IsActive == true) {
          setIsLoading(false);
          setLeafletData(val.result.data.Leaflet.url);
        } else {
          if (skipNavigation == true) {
            setIsLoading(false);
            navigation.reset({
              index: 0,
              routes: [{name: 'AuthStack'}],
            });
          } else {
            setIsLoading(false);
            showMessage({
              message: Constants.appName,
              description: "At time not Leaflet available",
              type: Constants.msgTypeDanger,
              icon: Constants.msgTypeDanger,
            });
            navigation.goBack();

          }
        }
        console.log("userLeafletuserLeaflet",val.result.data.Leaflet.url);
      })
      .catch(err => {
        if (skipNavigation == true) {
          setIsLoading(false);
          navigation.reset({
            index: 0,
            routes: [{name: 'AuthStack'}],
          });
        } else {
          setIsLoading(false);
          showMessage({
            message: Constants.appName,
            description: "At time not Leaflet available",
            type: Constants.msgTypeDanger,
            icon: Constants.msgTypeDanger,
          });
          navigation.goBack();
        }
      });
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const apiResponse = await userLeaflet(/ pass any required data /);
  //       console.log('API Response:', apiResponse);
  //       setLeafletData(apiResponse.result.data.Leaflet);
  //     } catch (error) {
  //       console.error('API Error:', error);
  //       // Alert.alert('Error', 'Failed to fetch leaflet data. Please try again.');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      {isLoading ? (
        <Indicators />
      ) : (
        <View style={[styles.container, {backgroundColor: theme.primary}]}>
          <Header
            back={!skipNavigation}
            onLeftPress={() => navigation.goBack()}
            title={'Leaflet'}
            headerBg={Colors.primary}
            iconColor={IndependentColors.white}
            titleAlight={'center'}
          />

          <View style={styles.pdfview}>
            <Pdf
              trustAllCerts={false}
              source={{
                uri: leafletData,
              }}
              style={{flex: 1, width: Dimensions.get('window').width}}
            />
            {/* {/ {isLoading && <Indicators />} /} */}
          </View>
          {skipNavigation == true && (
            <View style={styles.skipbutton}>
              <Button
                label="Skip"
                // onPress={() => navigation.navigate('Home')}
                onPress={() => handleSkip()}
                backgroundColor={Colors.primary}
              />
            </View>
          )}
        </View>
      )}
    </>
  );
};
export default Leaflet;
