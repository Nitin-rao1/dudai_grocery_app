//import liraries
import React, {Component, useCallback, useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';
import {ThemeContext} from '../../theming/ThemeContext';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useHeaderHeight} from '@react-navigation/elements';
import ButtonDashOutlined from '../../components/buttons/ButtonDashOutlined';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {scale} from 'react-native-size-matters';
import PaymentMethodCard from '../../components/cards/PaymentMethodCard';
// import TextInput from '../../components/inputs/TextInput';
import {
  FONT_SIZE_MD,
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  OPEN_SANS_BOLD,
  OPEN_SANS_REGULAR,
  OPEN_SANS_SEMIBOLD,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STANDARD_FLEX,
  STANDARD_SPACING,
  STANDARD_TEXT_TICKER_HEIGHT,
} from '../../config/Constants';
import Button from '../../components/buttons/Button';
import Header from '../../components/Header';
import mainStyles from '../../constants/MainStyles';
import DeliveryDateTimeCard from '../../components/cards/DeliveryDateTimeCard';
import {showMessage} from 'react-native-flash-message';
import Constants from '../../constants/Constants';
import {useDispatch, useSelector} from 'react-redux';
import {userCreateOrderData} from '../../api/categories/categoriesAndProduct';
import {Indicators} from '../../components/apploader';
import {logoutToCart} from '../../redux/slices/ProductsCartSlice';
import {updateUser} from '../../redux/slices/SessionUser';
import Colors from '../../constants/Colors';

// create a component
const PaymentMethod = ({onNext, onPrev, navigation}) => {
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
  const productCart = useSelector(state => state.productCart.cartItems);
  const userInfo = useSelector(state => state.users.users);
  const dispatch = useDispatch();
  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;
  const [selectedPaymentCard, setSelectedPaymentCard] = useState('credit');
  const [slotsData, setSlotsData] = useState('');
  const [paymentChange, setPaymentChange] = useState('');
  const [descriptionNote, setDescriptionNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const pymentData = [
    {
      date: 'Avaliable',
      dateString: 'Pay By Cash',
      slots: [
        'No Change Needed',
        'AED 50',
        'AED 100',
        'AED 200',
        'AED 500',
        'AED 1000',
      ],
    },
    {
      // type: 'disable',
      // date: 'Avaliable',
      type: 'disable',
      date: 'Temporarily Unavailable',
      dateString: 'Bring Card Reader',
      slots: [],
      // slots: ['Visa', 'Mastercard'],
    },
    {
      type: 'disable',
      date: 'Temporarily Unavailable',
      dateString: 'Pay Online',
      slots: [],
    },
  ];

  const confirmOrder = async ({call}) => {
    setLoading(true);
    const formData = {
      ScheduledDeliveryDate: userInfo?.deliveryTimeSlots,
      Address: userInfo?.deleveryAddress?.Address,
      AddressDescription: userInfo?.deleveryAddress?.AddressDescription,
      AddressLine3: userInfo?.deleveryAddress?.Address3,
      AddressNote: userInfo?.deleveryAddress?.Note,
      Region: userInfo?.selectedStoreData?.Name,
      Name: userInfo?.FirstName,
      SurName: userInfo?.LastName,
      Phone: userInfo?.PhoneNumber,
      Store: userInfo?.selectedStoreData?.StoreId,
      Status: 0, //all time zero
      UserDistance: parseInt(userInfo?.selectedStoreData?.UserDistance),
      DeliveryFee: userInfo?.deliveryCharges,
      userID: null, //all time null
      EndUserID: userInfo?.objectId, //user id
      EarnedPoints: 0, //all time zero
      UsedPoints: 0, //all time zero
      Note: descriptionNote,
      FirstTimeOrder: false,
      Change: paymentChange,
      Call: call,
      PaymentType: 0, // cash=0 card=1 online=2 (pay by case= 0)
      lat: userInfo?.deleveryAddress?.Lat,
      lng: userInfo?.deleveryAddress?.Lng,
      TotalAmount: userInfo?.productTotalAmount,
      Order: userInfo.ordersItem,
    };
    await userCreateOrderData(formData)
      .then(val => {
        console.log('qqqqqqqqqqq:', val);
        dispatch(logoutToCart());
        dispatch(
          updateUser({
            productTotalAmount: 0,
            ordersItem: [],
            deliveryCharges: 0,
            homePageRefresh: true,
          }),
        );
        setLoading(false);
        navigation.navigate('ConfirmationPage');
      })
      .catch(err => {
        setLoading(false);

        showMessage({
          message: Constants.appName,
          description: Constants.pleaseWait,
          type: Constants.msgTypeDanger,
          icon: Constants.msgTypeDanger,
        });
      });
    console.log('userInfouserInfo', formData);
  };
  return (
    <SafeAreaView style={mainStyles.container}>
      <Header
        back
        onLeftPress={() => {
          navigation.goBack();
        }}
        title={'Pyment Method'}
        // headerBg={Colors.primary}
        // iconColor={IndependentColors.white}
      />
      <KeyboardAvoidingView
        style={mainStyles.flex1}
        behavior={Constants.keyboards}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View
            style={[
              styles.slide,
              // {paddingTop: getStatusBarHeight() + useHeaderHeight()},
            ]}>
            <View style={styles.contentWrapper}>
              {/* Vertical scroll view */}
              <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                {/* Section title */}
                <Text
                  style={[
                    styles.sectionTitle,
                    {color: theme.textHighContrast},
                  ]}>
                  Select Payment Method
                </Text>

                <DeliveryDateTimeCard
                  isData={pymentData}
                  getTimeDateSlots={val => {
                    // setSlotsData(val);

                    if (val.slotsTime == 'AED 50') {
                      setPaymentChange(50);
                    } else if (val.slotsTime == 'AED 100') {
                      setPaymentChange(100);
                    } else if (val.slotsTime == 'AED 200') {
                      setPaymentChange(200);
                    } else if (val.slotsTime == 'AED 500') {
                      setPaymentChange(500);
                    } else if (val.slotsTime == 'AED 1000') {
                      setPaymentChange(1000);
                    } else {
                      setPaymentChange(-1);
                    }
                  }}
                  // deliveryDates={deliveryDates}
                  // selectedDate={selectedDate}
                  // handleDatePress={handleDatePress}
                  // timeSlots={timeSlots}
                  // renderTimeSlotItem={renderTimeSlotItem}
                />
                <View style={styles.textAreaContainer}>
                  <TextInput
                    value={descriptionNote}
                    onChangeText={setDescriptionNote}
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    placeholder="Enter your note here..."
                    // placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                  />
                </View>
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
                label="Confirm"
                labelColor={theme.primary}
                backgroundColor={theme.accent}
                onPress={() => {
                  if (paymentChange == '') {
                    showMessage({
                      message: Constants.appName,
                      description: 'Please Select Pyment type.',
                      type: Constants.msgTypeDanger,
                    });
                  } else {
                    // confirmOrder();
                    setShowModal(true);
                    // navigation.navigate('ConfirmationPage')
                  }
                }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {loading && <Indicators />}

      <View style={styles.centeredView}>
        <Modal
          animationType="none"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.modalContainer]}>
            {/* <View style={styles.modalContainer}> */}
            <View style={styles.modalContent}>
              <Text style={styles.SuggestTitle}>Propose a Call</Text>
              <View style={styles.border} />
              <View>
                <Text
                  style={[styles.pointDetails, {color: theme.textLowContrast}]}>
                  We are going to substitute items in your order in case any
                  item is missing. Do you want us to call?
                </Text>
              </View>
              <View style={mainStyles.marginTop2} />
              <View style={styles.borderBottom} />
              <View style={styles.modalSubmitButtonWrapper}>
                <Button
                  label="No"
                  labelColor={theme.primary}
                  backgroundColor={theme.accent}
                  onPress={() => {
                    setShowModal(false);
                    confirmOrder({call: false});
                  }}
                />
                <Button
                  label="Yes"
                  labelColor={theme.primary}
                  backgroundColor={theme.accent}
                  onPress={() => {
                    setShowModal(false);
                    confirmOrder({call: true});
                  }}
                />
              </View>
            </View>
            {/* </View> */}
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  // container: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     backgroundColor: '#2c3e50',
  // },
  contentWrapper: {
    paddingHorizontal: STANDARD_SPACING * 3,
    flex: STANDARD_FLEX,
  },
  tickerText: {
    textTransform: 'uppercase',
    fontFamily: OPEN_SANS_BOLD,
    fontSize: STANDARD_TEXT_TICKER_HEIGHT,
    // lineHeight: STANDARD_TEXT_TICKER_HEIGHT,
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
  textInputWrapper: {
    marginBottom: STANDARD_SPACING * 3,
  },
  buttonsty: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: STANDARD_SPACING * 3,
    marginVertical: '5%',
  },
  textAreaContainer: {
    borderColor: Colors.inputBorderColor,
    borderWidth: 1,
    padding: 5,
    borderRadius: scale(4),
    // height: scale(120),
  },
  textArea: {
    height: scale(120),
    textAlignVertical: 'top',
    justifyContent: 'flex-start',
  },

  ///modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 40,
    height: SCREEN_HEIGHT * 0.3,

    // padding: 20,
    borderRadius: 10,
  },
  modalSubmitButtonWrapper: {
    position: 'absolute',
    bottom: 10,
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: STANDARD_SPACING * 3,
  },
  SuggestTitle: {
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_MD,
    marginVertical: STANDARD_SPACING * 3,
    color: Colors.primary,
    marginHorizontal: scale(15),
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputBorderColor,
  },
  pointDetails: {
    fontFamily: OPEN_SANS_REGULAR,
    fontSize: FONT_SIZE_XS,
    padding: 20,
  },
});

//make this component available to the app
export default PaymentMethod;
