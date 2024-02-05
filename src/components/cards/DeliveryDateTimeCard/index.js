import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import styles from './styles';
import {IndependentColors} from '../../../config/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icons from '../Icons/Icons';
import Colors from '../../../constants/Colors';
import {STANDARD_VECTOR_ICON_SIZE} from '../../../config/Constants';
import moment from 'moment';

const DeliveryDateTimeCard = ({timeRange, getTimeDateSlots, isData}) => {
  const [selectedDateData, setSelectedDateData] = useState([]);
  const [selectedSlotData, setSelectedSlotData] = useState({});
  const [selectedDate, setSelectedDate] = useState(0);
  const [selecteSlots, setSelecteSlots] = useState('');
  const [selectedSlotsData, setSelectedSlotsData] = useState([]);

  useEffect(() => {
    if (timeRange) {
      const isrange = timeRange ? timeRange : '00:00 AM - 00:00 PM';
      // Define the time range for slots
      const [isStartTime, isEendTime] = isrange
        ?.split(' - ')
        ?.map(time => moment(time, 'h:mm A')?.format('h:mm A'));
      const startTime = isStartTime || '';
      const endTime = isEendTime || '';
      const today = moment();
      const tomorrow = moment().add(1, 'days');
      // Function to generate time slots with a 4-hour difference
      function generateTimeSlots(startDate, endDate, startTime, endTime) {
        const timeSlots = [];
        const currentTime = moment();

        var dateStrings;
        var isDate;
        const currentDate = moment(startDate);
        const endDateMoment = moment(endDate);
        while (currentDate.isSameOrBefore(endDateMoment)) {
          const formattedDate = currentDate.format('MM/DD/YYYY');
          dateStrings = currentDate.isSame(currentTime, 'day')
            ? 'Today'
            : 'Tomorrow';
          isDate = currentDate.isSame(currentTime, 'day')
            ? moment(today).format('DD-MM-YYYY')
            : moment(tomorrow).format('DD-MM-YYYY');

          let slotTime = moment(
            formattedDate + ' ' + startTime,
            'MM/DD/YYYY h:mm A',
          );
          let nextSlotTime = moment(slotTime).add(4, 'hours');

          while (
            nextSlotTime.isSameOrBefore(
              moment(formattedDate + ' ' + endTime, 'MM/DD/YYYY h:mm A'),
            )
          ) {
            if (slotTime.isAfter(currentTime)) {
              timeSlots.push(
                slotTime.format('h:mm A') +
                  ' - ' +
                  nextSlotTime.format('h:mm A'),
              );
            }
            slotTime.add(4, 'hours');
            nextSlotTime.add(4, 'hours');
          }

          currentDate.add(1, 'days'); // Move to the next day
        }

        return {
          date: isDate,
          dateString: dateStrings,
          slots: timeSlots,
        };
      }

      // Generate slots for today and tomorrow
      const todaySlots = generateTimeSlots(today, today, startTime, endTime);
      const tomorrowSlots = generateTimeSlots(
        tomorrow,
        tomorrow,
        startTime,
        endTime,
      );

      // Create an array to hold both today's and tomorrow's slots
      const slotsData = [todaySlots, tomorrowSlots];

      console.log(slotsData);
      setSelectedDateData(slotsData);
      setSelectedDate(0);
      setSelectedSlotsData(slotsData[0]?.slots);
      setSelectedSlotData(slotsData[0]);
    } else {
      setSelectedDateData(isData);
      setSelectedDate(0);
      setSelectedSlotData(isData[0]);
      setSelectedSlotsData(isData[0]?.slots);
    }
  }, []);

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.mainwrapper}>
          {selectedDateData.map((dateItem, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.daytittle,
                {
                  backgroundColor:
                    selectedDate === index
                      ? Colors.primary
                      : dateItem?.type == 'disable'
                      ? Colors.inactive
                      : IndependentColors.white,
                  borderColor:
                    selectedDate === index
                      ? Colors.primary
                      : dateItem?.type == 'disable'
                      ? Colors.inputBorderColor
                      : IndependentColors.black,
                },
              ]}
              onPress={() => {
                if (dateItem?.type != 'disable') {
                  setSelectedSlotsData(dateItem.slots);
                  setSelecteSlots('');
                  setSelectedDate(index);
                  setSelectedSlotData(dateItem);
                } else {
                  alert(dateItem?.date);
                }
              }}>
              <Text
                style={[
                  styles.daytxt,
                  {
                    color: selectedDate === index ? 'white' : 'black',
                  },
                ]}>
                {dateItem.dateString}
              </Text>
              <Text
                style={[
                  styles.datetxt,
                  {
                    color: selectedDate === index ? 'white' : 'black',
                  },
                ]}>
                {dateItem.date}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.timeSlotsContainer}>
        {selectedSlotsData?.map((timeSlotItem, i) => {
          return (
            <View key={`timeSlotItem.date` + i}>
              <TouchableOpacity
                onPress={() => {
                  setSelecteSlots(i);
                  getTimeDateSlots({
                    slotsTime: timeSlotItem,
                    slotsDate: selectedSlotData,
                  });
                }}>
                <View
                  style={{
                    width: wp('90'),
                    borderWidth: 1,
                    borderColor:
                      selecteSlots === i ? Colors.primary : Colors.inactive,
                    borderRadius: wp('2'),
                    marginBottom: hp('1'),
                    // justifyContent:'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: wp('2'),
                    }}>
                    <View>
                      <Text>{timeSlotItem}</Text>
                    </View>
                    <View
                      style={[
                        styles.addressTypeIconWrapper,
                        {backgroundColor: Colors.inactive},
                      ]}>
                      {selecteSlots === i && (
                        <Icons
                          iconType={'Feather'}
                          name="check-circle"
                          size={STANDARD_VECTOR_ICON_SIZE}
                          color={Colors.primary}
                        />
                      )}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
        {selectedSlotsData.length == 0 && (
          <Text style={{}}>Not Slots found</Text>
        )}
      </View>
    </View>
  );
};

export default DeliveryDateTimeCard;
