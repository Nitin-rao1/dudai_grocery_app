import React, {useContext} from 'react';
import {View, Text, ScrollView, Platform} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../../theming/ThemeContext';
import {STANDARD_VECTOR_ICON_SIZE} from '../../config/Constants';
import Button from '../../components/buttons/Button';
import {scale} from 'react-native-size-matters';
import {Linking} from 'react-native';
import Colors from '../../constants/Colors';
import styles from './styles';

const StoreBranch = ({data, title}) => {
  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  const theme = isLightTheme ? lightTheme : darkTheme;

  const onClickCall = val => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${val}`;
    } else {
      number = `tel:${val}`;
    }
    Linking.openURL(number);
  };

  const openOnMaps = async (lat, lng) => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});

    const latLng = `${lat},${lng}`;

    const label = 'Custom Label';

    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };
  return (
    <ScrollView bounces={false}>
      {title && (
        <View style={styles.discIconAndPointTitleWrapper}>
          <IonIcons
            name="disc"
            size={STANDARD_VECTOR_ICON_SIZE * 0.8}
            color={theme.accent}
          />
          <Text style={[styles.pointTitle, {color: theme.textHighContrast}]}>
            {title}
          </Text>
        </View>
      )}

      {data?.map((branch, i) => (
        <View key={`branch${i}`} style={styles.branchContainer}>
          <View style={styles.ViewContentCOntainerStyle}>
            <Text
              style={[
                styles.branchName,
                {color: theme.textHighContrast, marginVertical: scale(5)},
              ]}>
              {branch?.Name}
              {/* {(branch, MailAddress)} */}
            </Text>
            <Text style={[styles.branchinfo, {color: theme.textLowContrast}]}>
              Delivery: {branch?.OpenHours}
            </Text>
            <Text style={[styles.branchinfo, {color: theme.textLowContrast}]}>
              {/* {branch.pinPoints} */}
              {branch?.createdAt}
            </Text>
            <Text style={[styles.branchinfo, {color: theme.textLowContrast}]}>
              {/* Satwa@newwmart.com */}
              Email: {branch?.MailAddress}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Button
                label={'Call'}
                containerStyle={styles.buttonContiner}
                labelColor={Colors.black}
                borderWidth={1}
                iconname={'call'}
                iconType={'MaterialIcons'}
                color={Colors.success}
                size={25}
                onPress={() => {
                  onClickCall(branch?.PhoneNumber);
                }}
              />

              <Button
                label={'Find'}
                containerStyle={styles.buttonContiner}
                labelColor={Colors.black}
                borderWidth={1}
                iconname={'map-marker'}
                iconType={'MaterialCommunityIcons'}
                color={Colors.error}
                size={25}
                onPress={() => {
                  const latitude = branch?.lat;
                  const longitude = branch?.lng;
                  const label = 'Location Label';
                  openOnMaps(latitude, longitude);
                }}
              />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default StoreBranch;
