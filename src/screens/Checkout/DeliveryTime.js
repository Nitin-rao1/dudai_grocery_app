import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {ThemeContext} from '../../theming/ThemeContext';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import DeliveryDateTimeCard from '../../components/cards/DeliveryDateTimeCard';
import {
  FONT_SIZE_SM,
  OPEN_SANS_BOLD,
  OPEN_SANS_REGULAR,
  STANDARD_FLEX,
  STANDARD_SPACING,
  STANDARD_TEXT_TICKER_HEIGHT,
} from '../../config/Constants';
import {scale} from 'react-native-size-matters';
import {IndependentColors} from '../../config/Colors';
import {RadioButton} from 'react-native-paper';
import Button from '../../components/buttons/Button';
import mainStyles from '../../constants/MainStyles';
import Header from '../../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {showMessage} from 'react-native-flash-message';
import Constants from '../../constants/Constants';
import {updateUser} from '../../redux/slices/SessionUser';

const DeliveryTime = ({onNext, onPrev, navigation}) => {
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
  const userInfo = useSelector(state => state.users.users);
  const dispatch = useDispatch();

  const theme = isLightTheme ? lightTheme : darkTheme;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [slotsData, setSlotsData] = useState('');
  console.log('userslotsData', slotsData);

  // useEffect(() => {

  //   const timeRange = "9:00 AM - 10:00 PM";

  //   const [startTime, endTime] = timeRange.split(' - ').map(time => moment(time, 'h:mm A').format('h:mm A'));

  //   console.log("startTime:", startTime);
  //   console.log("endTime:", endTime);

  //   // console.log('slotsData', slotsData);
  // }, []);
  const handleDatePress = date => {
    setSelectedDate(date);
    setSelectedTimeSlot(null); // Reset selected time slot when date changes
  };

  return (
    <SafeAreaView style={mainStyles.container}>
      <Header
        back
        onLeftPress={() => {
          navigation.goBack();
        }}
        title={'Delivery Time Slots'}
        // headerBg={Colors.primary}
        // iconColor={IndependentColors.white}
      />
      <ScrollView nestedScrollEnabled={true}>
        <View
          style={[
            styles.slide,
            // {paddingTop: getStatusBarHeight() + useHeaderHeight()},
          ]}>
          {/* <View style={styles.tickerContainer}>
          <Text style={[styles.tickerText, {color: theme.textHighContrast}]}>
            Delivery timeslots
          </Text>
        </View> */}
          <View style={styles.contentWrapper}>
            {/* Vertical scroll view */}
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              {/* Section title */}
              <Text
                style={[styles.sectionTitle, {color: theme.textHighContrast}]}>
                Select Delivery Date & Timeslots
              </Text>

              {/* Date card */}
              <DeliveryDateTimeCard
                timeRange={userInfo.selectedStoreData.DeliveryTime}
                getTimeDateSlots={val => {
                  setSlotsData(val);
                }}
                // deliveryDates={deliveryDates}
                // selectedDate={selectedDate}
                // handleDatePress={handleDatePress}
                // timeSlots={timeSlots}
                // renderTimeSlotItem={renderTimeSlotItem}
              />
            </ScrollView>
          </View>
          <View style={styles.buttonsty}>
            <Button
              label="Prev"
              labelColor={theme.primary}
              backgroundColor={theme.accent}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Button
              label="Next"
              labelColor={theme.primary}
              backgroundColor={theme.accent}
              onPress={() => {
                if (slotsData) {
                  const [day, month, year] =
                    slotsData?.slotsDate?.date?.split('-');
                  const parsedDate = `${year}-${month}-${day}`;

                  // Parse the input time
                  const [startTime, endTime] =
                    slotsData?.slotsTime?.split(' - ');
                  const twentyFourHourEndTime = moment(
                    endTime,
                    'h:mm A',
                  ).format('HH:mm');
                  const twentyFourHourStartTime = moment(
                    startTime,
                    'h:mm A',
                  ).format('HH:mm');
                 const formateDateTime = `${parsedDate}T${twentyFourHourEndTime}:00.000`
                 
                 
                  console.log('valvalvalvalval', formateDateTime);
                  dispatch(updateUser({deliveryTimeSlots:formateDateTime}));
                  navigation.navigate('PaymentMethod')
                } else {
                  showMessage({
                    message: Constants.appName,
                    description: 'Please Select Time Slots',
                    type: Constants.msgTypeDanger,
                  });
                }
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    paddingHorizontal: STANDARD_SPACING * 3,
    flex: STANDARD_FLEX,
  },
  timeSlotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(0),
    paddingVertical: scale(10),
  },
  timeSlotText: {
    color: IndependentColors.black,
    fontSize: scale(10),
    fontFamily: OPEN_SANS_REGULAR,
  },
  tickerText: {
    textTransform: 'uppercase',
    fontFamily: OPEN_SANS_BOLD,
    fontSize: STANDARD_TEXT_TICKER_HEIGHT,
  },
  tickerContainer: {
    overflow: 'hidden',
    marginVertical: scale(20),
    alignItems: 'center',
  },
  sectionTitle: {
    marginVertical: STANDARD_SPACING * 3,
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_SM,
  },
  buttonsty: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: STANDARD_SPACING * 3,
    marginTop: '30%',
  },
});

export default DeliveryTime;
