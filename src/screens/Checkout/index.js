import {useCallback, useContext, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {scale} from 'react-native-size-matters';
import {ThemeContext} from '../../theming/ThemeContext';
import ButtonDashOutlined from '../../components/buttons/ButtonDashOutlined';
import FeatherIcons from 'react-native-vector-icons/Feather';
import AddressCard from '../../components/cards/AddressCard';
import PaymentMethodCard from '../../components/cards/PaymentMethodCard';
import TextInput from '../../components/inputs/TextInput';
import Button from '../../components/buttons/Button';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useHeaderHeight} from '@react-navigation/elements';
// import AddressesData from '../../data/AddressesData';
import {
  SCREEN_WIDTH,
  STANDARD_TEXT_TICKER_ANIMATED_CIRCLE_SIZE,
  STANDARD_TEXT_TICKER_HEIGHT,
  STANDARD_ORDER_ICON_WRAPPER_SIZE,
} from '../../config/Constants';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {IndependentColors} from '../../config/Colors';
import {RadioButton} from 'react-native-paper';
import DeliveryDateTimeCard from '../../components/cards/DeliveryDateTimeCard';
import AddressStep from './AddressStep';
import DeliveryTime from './DeliveryTime';
import PaymentMethod from './PaymentMethod';
import ConfirmationPage from './ConfirmationPage';

// Functional component\
const Checkout = () => {
  var Addresslist = [
    {
      id: 1,
      address_type: 'Home',
      address_type_icon: 'home',
      addressee_name: 'Jonathon Doe',
      addressee_phone_number: '+91 000-6473-000',
      Landmark: 'marrride',
      Apartment: 110,
      Area: 'megdut',
      City: 'indore',
      address: 'sayaji hotel indore m p',
      selected: true,
    },
  ];
  const navigation = useNavigation();
  // const AddAddress = useSelector(state => state.address);
  // Addresslist = [...Addresslist, ...AddAddress.data];
  // console.log('AddAddress=============>', Addresslist);
  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  // Local states
  // const [addresses, setAddresses] = useState(AddressesData);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [selectedPaymentCard, setSelectedPaymentCard] = useState('credit');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);


  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };


  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <AddressStep onNext={handleNextStep} />;
      case 1:
        return <DeliveryTime onNext={handleNextStep} onPrev={handlePrevStep} />;
      case 2:
        return <PaymentMethod onNext={handleNextStep} onPrev={handlePrevStep} />;
      case 3:
        return <ConfirmationPage onPrev={handlePrevStep} />;
      default:
        return null;
    }
  };

  // Declaring text ticker labels
  const CHECKOUT_STEPS = [
    'Delivery Address',
    'Delivery timeslots',
    'Payment Method',
    'Checkout Status',
  ];

  const timeSlots = [
    {
      date: '9-Aug-2023',
      slots: [
        '09:00 AM - 11:00 AM',
        '11:30 AM - 01:30 PM',
        '02:00 PM - 04:00 PM',
        '06:00 PM - 08:00 PM',
        '08:00 PM - 10:00 PM',
      ],
    },
    {
      date: '10-Aug-2023',
      slots: [
        '10:00 AM - 12:00 PM',
        '01:00 PM - 03:00 PM',
        '04:00 PM - 06:00 PM',
        '08:00 PM - 10:00 PM',
        '11:00 PM - 12:00 PM',
      ],
    },
    {
      date: '11-Aug-2023',
      slots: [
        '10:00 AM - 12:00 PM',
        '01:00 PM - 03:00 PM',
        '04:00 PM - 06:00 PM',
        '08:00 PM - 10:00 PM',
        '11:00 PM - 12:00 PM',
      ],
    },
    {
      date: '12-Aug-2023',
      slots: [
        '10:00 AM - 12:00 PM',
        '01:00 PM - 03:00 PM',
        '04:00 PM - 06:00 PM',
        '08:00 PM - 10:00 PM',
        '11:00 PM - 12:00 PM',
      ],
    },
    // Add more time slots and dates as needed
  ];

  // Get the current date
const currentDate = new Date();

// Create an array to store the five dates
const fiveDayDates = [];

// Loop to generate the next five dates
for (let i = 0; i < 5; i++) {
  // Clone the current date
  const nextDate = new Date(currentDate);

  // Add one day to the current date
  nextDate.setDate(currentDate.getDate() + i);

  // Push the next date to the array
  fiveDayDates.push(nextDate);
}

// Print the five dates
fiveDayDates.forEach(date => {
  console.log(date.toDateString());
});

 

  // Declaring shared value
  const translationX = useSharedValue(0);

  // Handling scroll of the scroll view
  const scrollHandler = useAnimatedScrollHandler(event => {
    // Storing scrolled offset value of the x direction
    translationX.value = withTiming(event.contentOffset.x);
  });

  // Animated styles for the ticker
  const animatedTickerStyles = useAnimatedStyle(() => {
    const translateY = interpolate(
      translationX.value,
      [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      [STANDARD_TEXT_TICKER_HEIGHT, 0, -STANDARD_TEXT_TICKER_HEIGHT],
    );
    // Returning
    return {
      transform: [
        {
          translateY,
        },
      ],
    };
  });

  // Animated styles for the circle
  const animatedCircleStyles = useAnimatedStyle(() => {
    const translateX = interpolate(
      translationX.value,
      [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      [
        -STANDARD_TEXT_TICKER_ANIMATED_CIRCLE_SIZE,
        0,
        STANDARD_TEXT_TICKER_ANIMATED_CIRCLE_SIZE,
      ],
    );
    return {
      transform: [
        {
          translateX,
        },
      ],
    };
  });

  // Toggling address card selection
  const selectAddress = useCallback(param => {
    // Updating state value
    setSelectedAddressIndex(param);
  }, []);

  // Toggling payment card selection
  const selectPaymentCard = useCallback(param => {
    // Updating state value
    setSelectedPaymentCard(param);
  }, []);

  const handleDatePress = date => {
    setSelectedDate(date);
    setSelectedTimeSlot(null); // Reset selected time slot when date changes
  };
  


  // Returning
  return (
    <View style={[ {flex:1,backgroundColor: theme.primary}]}>
      <View style={[ {backgroundColor: theme.primary}]}>
        {/* Text ticker  */}
        {/* <View style={styles.tickerContainer}>
          {CHECKOUT_STEPS.map((step, index) => (
            <Animated.View key={index} style={[animatedTickerStyles]}>
              <Text
                style={[styles.tickerText, {color: theme.textHighContrast}]}>
                {step}
              </Text>
            </Animated.View>
          ))}
        </View> */}
        {renderStep()}
        {/* Pagination dots */}
        {/* <View style={styles.paginationDotsContainer}> */}
          {/* Animated circle */}
          {/* <Animated.View
            style={[
              animatedCircleStyles,
              styles.animatedCircle,
              {borderColor: theme.accent, backgroundColor: '#FB85000D'},
            ]}>
            <View
              style={[styles.paginationDot, {backgroundColor: theme.accent}]}
            />
          </Animated.View> */}
          {/* Dots */}
          {/* {CHECKOUT_STEPS.map((_, index) => (
            <View key={index} style={[styles.paginationDotWrapper]}>
              <Animated.View
                style={[
                  styles.paginationDot,
                  {backgroundColor: theme.secondary},
                ]}
              />
            </View>
          ))} */}
        {/* </View> */}
      </View>

      {/* Animated horizontal scroll view */}
      {/* <Animated.ScrollView
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={styles.horizontalScrollView}> */}
        {/* Addresses */}
      
        {/*Delivery Date & Timeslots*/}
       

        {/* Payment methods */}
      

        {/* Checkout status */}
        
      {/* </Animated.ScrollView> */}
    </View>
  );
};

// Exporting
export default Checkout;
