import React, {useContext, useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Pressable,
  CheckBox,
  PixelRatio,
  Switch,
  Alert,
  //  TextInput,
  StyleSheet,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import TextInput from '../../components/inputs/TextInput';
import Message from '../../assets/icons/svg/Message.svg';
import Profile from '../../assets/icons/svg/Profile.svg';
import LargeHeading from '../../components/headings/LargeHeading';
import Button from '../../components/buttons/Button';
import Checkbox from '../../components/inputs/Checkbox';
import Link from '../../components/links/Link';
import {
  FONT_SIZE_XS,
  OPEN_SANS_MEDIUM,
  STANDARD_VECTOR_ICON_SIZE,
} from '../../config/Constants';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import RNPickerSelect from "react-native-picker-select";

import CountryPicker from 'react-native-country-picker-modal';
import Lock from '../../../src/assets/icons/svg/Lock.svg';
import EyeOpen from '../../../src/assets/icons/svg/EyeOpen.svg';
import * as Yup from 'yup';
import styles from './styles';
import {scale} from 'react-native-size-matters';
import {Formik} from 'formik';
import {IndependentColors} from '../../config/Colors';
import Header from '../../components/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import OTPTextView from 'react-native-otp-textinput';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {Linking} from 'react-native';
import {SubmitOTP, generateOTP} from '../../api/auth/otpverify';
import {getMobileOTP, userRegister, verifyMobileOTP} from '../../api/auth/auth';
import {Indicators} from '../../components/apploader';
import mainStyles from '../../constants/MainStyles';
import Constants from '../../constants/Constants';
import Colors from '../../constants/Colors';
import Icons from '../../components/cards/Icons/Icons';
import moment from 'moment';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Parse from 'parse/react-native.js';

const Register = ({navigation, visible, onClose, onSubmit}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedmonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [expectedOTP, setExpectedOTP] = useState('1234');
  const [otpInput, setOtpInput] = useState('');
  const input = useRef(null);

  const [show, setShow] = useState(false);
  const [phoneCountryFlag, setPhoneCountryFlag] = useState('AE');
  const [phoneCountryCallingCode, setPhoneCountryCallingCode] = useState('971');
  const [nationalityCode, setNationalityCode] = useState('971');
  const [nationalityFlag, setNationalityFlag] = useState('AE');
  const [showNationality, setShowNationality] = useState(false);
  const [nationalityText, setNationalityText] = useState('');
  const [showPhoneCountryPicker, setShowPhoneCountryPicker] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [registerdata, setRegisterData] = useState({});
  const [loading, setLoading] = useState(false);

  const GenderData = ['Mr.', 'Mrs.', 'Ms.'];

  const DaysData = Array.from({length: 31}, (_, i) => (i + 1).toString());
  const MonthsData = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const currentYear = new Date().getFullYear();
  const yearTurns18 = currentYear - 18;
  const YearsData = Array.from({length: 100}, (_, i) =>
    (yearTurns18 - i).toString(),
  );

  const handleOTPSubmit = async values => {
    console.log('hhhhhhhhhh', registerdata);
    // showMessage({
    //   message: 'OTP verification failed. Please try again.',
    //   type: 'danger',
    // });
    // return
    Keyboard.dismiss();
    const otpVerificationData = {
      OTP: otpInput, // The entered OTP
      phoneNumber: `+${phoneCountryCallingCode}${registerdata.phoneNum}`, // Use the mobile number from your registration form
    };
    console.log('valvalvalvalvalvalvalvalval', otpVerificationData);
    if (otpInput.length === 4) {
      setLoading(true);
      await verifyMobileOTP(otpVerificationData)
        .then(val => {
          if (val.result.status == 'success') {
            userRegistration();
          } else {
            setLoading(false);
            showMessage({
              message: Constants.appName,
              description: 'Please Check Otp',
              type: Constants.msgTypeWarning,
            });
          }
        })
        .catch(err => {
          setLoading(false);
          showMessage({
            message: Constants.appName,
            description: Constants.pleaseWait,
            type: Constants.msgTypeDanger,
          });
        });
    } else {
      // OTP is not valid, display an error message.
      showMessage({
        message: 'Please Enter OTP.',
        type: 'danger',
      });
    }
  };
  const asss = moment(
    `${registerdata.year}-${selectedmonth}-${registerdata.day}`,
  ).format('YYYY-MM-DDT00:00:00');
 

  const userGetOTP = async values => {
    const username = values.email;
    const Mail = values.email;
    setRegisterData({...values, username, Mail});
    const phoneFormData = {
      phoneNumber: `+${phoneCountryCallingCode}${values.phoneNum}`
    }
    console.log(
      '`${registerdata.day}-${selectedmonth}-${registerdata.year}`',
      phoneFormData,
    );
    // return
    setShowOTPModal(true);
    await getMobileOTP(phoneFormData)
      .then(val => {
        console.log("my OTP IS",val);
      })
      .catch(err => {
        setLoading(false);
        showMessage({
          message: Constants.appName,
          description: Constants.pleaseWait,
          type: Constants.msgTypeDanger,
        });
      });
    // try {
    //   // Send OTP to the user's mobile number (values.phoneNum)
    //   const otpData = {
    //     mobile: values.phoneNum,
    //     // Other necessary data for OTP generation
    //   };

    //   // Make an API call to generate OTP
    //   const response = await generateOTP(otpData);
    //   console.log('response=============', response.data);

    //   // Check the response from the OTP generation API
    //   if (response.status === 200) {
    //     // OTP sent successfully
    //     // Proceed with showing the OTP verification modal
    //     setShowOTPModal(true);
    //   } else {
    //     // Handle error, show a message, etc.
    //     showMessage({
    //       message: 'Failed to send OTP. Please try again.',
    //       type: 'danger',
    //     });
    //   }
    // } catch (error) {
    //   // Handle the error, show a message, etc.
    //   showMessage({
    //     message: 'An error occurred. Please try again later.',
    //     type: 'danger',
    //   });
    // }
  };

  const userRegistration = async val => {
    //   var tttt = `${registerdata.day}-${selectedmonth}-${registerdata.year}`
    // const iiiii = moment(tttt).format('YYYY-MM-DD')
    const countryCode =
      phoneCountryCallingCode == '971'
        ? phoneCountryCallingCode
        : phoneCountryCallingCode[0];

    var data = {
      BirthDate: moment(
        `${registerdata.year}-${selectedmonth}-${registerdata.day}`,
      ).format('YYYY-MM-DD'),
      username: registerdata.username,
      email: registerdata.username,
      Designation: registerdata.title,
      FirstName: registerdata.firstName,
      LastName: registerdata.lastName,
      IsPanelUser: false,
      Code: `+${countryCode}`,
      // Nationality: 'India',
      BasePhoneNumber: registerdata.phoneNum,
      PhoneNumber: `+${countryCode}${registerdata.phoneNum}`,
      NewRewardUsed: false,
      LowercaseFullName: `${registerdata.firstName.toLowerCase()} ${registerdata.lastName.toLowerCase()}`,
      Mail: registerdata.username,
      password: registerdata.password,
      Nationality:nationalityText
    };
    console.log('vallllllllll', data);
    setLoading(true);
    // return;
    await userRegister(data)
      .then(responseData => {
        // Handle the successful login response here
        console.log('Registration successful:', responseData);

        setLoading(false);
        setShowOTPModal(false);
        if (responseData.result.status == 'failed') {
          showMessage({
            message: Constants.appName,
            description: responseData.result.message,
            type: Constants.msgTypeWarning,
          });
        } else {
          showMessage({
            message: Constants.appName,
            description: 'Successfully registered!',
            type: Constants.msgTypeSuccess,
          });
          navigation.navigate('Login');
        }
      })
      .catch(error => {
        setLoading(false);
        setShowOTPModal(false);
        showMessage({
          message: Constants.appName,
          description: Constants.pleaseWait,
          type: Constants.msgTypeDanger,
        });
        console.error('Registration failed:', error);
      });
  };

  const handleCellTextChange = async (text, i) => {
    console.log('ddddddddddddd');
  };

  const [timer, setTimer] = useState(59);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [timer]);

  const onResendCode = () => {
    setTimer(59);
    userGetOTP(registerdata)
  };
  const strings = {
    RESEND_CODE: 'Resend Code',
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Fill required'),
    firstName: Yup.string()
      .min(3, 'Atleast 3 character')
      .max(25)
      .required('First name is required'),

    lastName: Yup.string()
      .min(3, 'atleast 3 character')
      .max(25)
      .required('Last name is required'),

    day: Yup.string().required('Day is required'),
    month: Yup.string().required('Month is required'),
    year: Yup.string().required('Year is required'),

    email: Yup.string()
      .email('Please enter a valid email')
      .matches(Constants.regexEmail, 'Enter a valid email')
      .required('Email Address is required'),

    password: Yup.string()
      .min(6, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    phoneNum: Yup.string()
      .matches(/^[0-9]{9}$/, 'Please enter a vaild mobile number')
      .required('Phone Number is required'),
    // checkbox: Yup.string().required('please fill'),
  });

  const [otp, setOTP] = useState(['s', 'a', 'r', 'a']);

  const handleOTPChange = (text, index) => {
    const updatedOTP = [...otp];
    updatedOTP[index] = text;
    setOTP(updatedOTP);

    if (text.length === 1 && index < otp.length - 1) {
      // Move focus to the next input
      inputRefs[index + 1].focus();
    }
  };

  const inputRefs = [];
  // Returning
  return (
    <SafeAreaView style={mainStyles.container}>
      <Header
        back
        onLeftPress={() => navigation.goBack()}
        iconColor={IndependentColors.black}
        title="Personal Details"
        // style={styles.header}
      />

      {/* <KeyboardAvoidingView
        style={mainStyles.flex1}
        behavior={Constants.keyboards}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          <View style={styles.largeHeadingComponentWrapper}></View> */}
      <Formik
        initialValues={{
          title: '',
          firstName: '',
          lastName: '',
          day: '',
          month: '',
          year: '',
          email: '',
          password: '',
          confirmPassword: '',
          phoneNum: '',
          // checkbox: isChecked,
        }}
        // validationSchema={validationSchema} // Add validation schema
        // onSubmit={values => console.log(values)}>
        validationSchema={validationSchema} // Add validation schema
        onSubmit={values => {
          // console.log('iiiiiiiiiiiiiiiiiiiiii', values);
          // setShowOTPModal(true);
          if (isChecked == true) {
            userGetOTP(values);
          } else {
            showMessage({
              message: Constants.appName,
              description: 'Please agree term & condition',
              type: Constants.msgTypeDanger,
              icon: Constants.msgTypeDanger,
            });
          }
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => {
          return (
            <>
              <KeyboardAvoidingView
                style={mainStyles.flex1}
                behavior={Constants.keyboards}>
                <ScrollView>
                  <View style={styles.largeHeadingComponentWrapper}>
                    <LargeHeading
                      headingText="Registration"
                      headingColor={Colors.textHighContrast}
                      // headingColor={theme.textHighContrast}
                    />

                    <Text
                      style={[styles.info, {color: Colors.textLowContrast}]}>
                      Hey, Enter your Personal Details to create your account.
                    </Text>
                  </View>

                  <View
                    style={{
                      width: wp('95'),
                      alignSelf: 'center',
                      // borderWidth: 2,
                    }}>
                    <View style={styles.inputfield}>
                      <View style={{width: wp('28')}}>
                        <View style={mainStyles.marginTop1} />
                        <SelectDropdown
                          defaultButtonText="Title"
                          data={GenderData}
                          onSelect={(item, index) => {
                            setSelectedItem(item);
                            // Update the Formik value for "title" when a title is selected
                            setFieldValue('title', item);
                          }}
                          buttonTextAfterSelection={(item, index) => {
                            return item;
                          }}
                          rowTextForSelection={(item, index) => {
                            return item;
                          }}
                          rowStyle={{
                            backgroundColor: Colors.inactive,
                            borderBottomColor: Colors.inputBorderColor,
                          }}
                          buttonStyle={{
                            ...styles.dropdownBtnStyle,
                            backgroundColor: Colors.inactive,
                          }}
                          buttonTextStyle={{
                            ...styles.dropdownBtnTxtStyle,
                            color: selectedItem
                              ? Colors.textHighContrast
                              : Colors.textLowContrast,
                          }}
                          renderDropdownIcon={isOpened => {
                            return (
                              <Ionicons
                                name={isOpened ? 'chevron-up' : 'chevron-down'}
                                color={Colors.textLowContrast}
                                size={STANDARD_VECTOR_ICON_SIZE * 0.8}
                              />
                            );
                          }}
                        />
                        <View style={styles.errorTextView}>
                          {errors.title && touched.title && (
                            <Text style={styles.errorText}>{errors.title}</Text>
                          )}
                        </View>
                      </View>

                      {/* {/ First Name /} */}
                      <View
                        style={{
                          width: '65%',
                          // alignItems:'center',
                          // justifyContent:'center',
                          // alignContent:'center',
                          // alignSelf:'center'
                          // marginTop: scale(-27),
                          // marginBottom: scale(14),
                        }}>
                        <TextInput
                          // label="First Name"
                          // labelColor={Colors.textHighContrast}
                          placeholder=" First Name"
                          placeholderTextColor={Colors.textLowContrast}
                          leftIcon={
                            <Profile
                              width={STANDARD_VECTOR_ICON_SIZE}
                              height={STANDARD_VECTOR_ICON_SIZE}
                            />
                          }
                          backgroundColor={Colors.secondary}
                          textInputValueColor={Colors.textHighContrast}
                          onChangeText={handleChange('firstName')}
                          onBlur={handleBlur('firstName')}
                          value={values.firstName}
                        />
                        <View style={styles.errorTextView}>
                          {errors.firstName && touched.firstName && (
                            <Text style={styles.errorText}>
                              {errors.firstName}
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>

                    {/* {/ Last Name /}
                {/ <View style={styles.textInputComponentWrapper}> /} */}
                    <View style={{}}>
                      <TextInput
                        // label="Last Name"
                        labelColor={Colors.textHighContrast}
                        placeholder="Last Name"
                        placeholderTextColor={Colors.textLowContrast}
                        leftIcon={
                          <Profile
                            width={STANDARD_VECTOR_ICON_SIZE}
                            height={STANDARD_VECTOR_ICON_SIZE}
                          />
                        }
                        backgroundColor={Colors.secondary}
                        textInputValueColor={Colors.textHighContrast}
                        onChangeText={handleChange('lastName')}
                        onBlur={handleBlur('lastName')}
                        value={values.lastName}
                      />
                      <View style={styles.errorTextView}>
                        {errors.lastName && touched.lastName && (
                          <Text style={styles.errorText}>
                            {errors.lastName}
                          </Text>
                        )}
                      </View>
                    </View>
                    <View style={mainStyles.marginTop1} />
                    <View style={styles.dropdownsWrapper}>
                      <View>
                        <SelectDropdown
                          data={DaysData}
                          onSelect={(item, index) => {
                            setSelectedDay(item);
                            // Update the Formik value for "title" when a title is selected
                            setFieldValue('day', item);
                          }}
                          defaultButtonText={'Day'}
                          buttonTextAfterSelection={(item, index) => {
                            return item;
                          }}
                          rowTextForSelection={(item, index) => {
                            return item;
                          }}
                          buttonStyle={{
                            ...styles.dropdownBtnStyle,
                            backgroundColor: Colors.inactive,
                          }}
                          buttonTextStyle={{
                            ...styles.dropdownBtnTxtStyle,
                            color: selectedDay
                              ? Colors.textHighContrast
                              : Colors.textLowContrast,
                          }}
                          renderDropdownIcon={isOpened => {
                            return (
                              <Ionicons
                                name={isOpened ? 'chevron-up' : 'chevron-down'}
                                color={Colors.textLowContrast}
                                size={STANDARD_VECTOR_ICON_SIZE * 0.8}
                              />
                            );
                          }}
                          dropdownIconPosition={'right'}
                          dropdownStyle={styles.dropdownDropdownStyle}
                          rowStyle={{
                            backgroundColor: Colors.inactive,
                            borderBottomColor: Colors.inputBorderColor,
                          }}
                          rowTextStyle={{
                            ...styles.dropdownRowTxtStyle,
                            color: Colors.textLowContrast,
                          }}
                        />
                        <View style={styles.errorTextView}>
                          {errors.day && touched.day && (
                            <Text style={styles.errorText}>{errors.day}</Text>
                          )}
                        </View>
                      </View>
                      <View>
                        <SelectDropdown
                          data={MonthsData}
                          onSelect={(item, index) => {
                            setSelectedMonth(index + 1);
                            // Update the Formik value for "title" when a title is selected
                            setFieldValue('month', item);
                          }}
                          defaultButtonText={'Month'}
                          buttonTextAfterSelection={(item, index) => {
                            return item;
                          }}
                          rowTextForSelection={(item, index) => {
                            return item;
                          }}
                          buttonStyle={{
                            ...styles.dropdownBtnStyle,
                            backgroundColor: Colors.inactive,
                          }}
                          buttonTextStyle={{
                            ...styles.dropdownBtnTxtStyle,
                            color: selectedmonth
                              ? Colors.textHighContrast
                              : Colors.textLowContrast,
                          }}
                          renderDropdownIcon={isOpened => {
                            return (
                              <Ionicons
                                name={isOpened ? 'chevron-up' : 'chevron-down'}
                                color={Colors.textLowContrast}
                                size={STANDARD_VECTOR_ICON_SIZE * 0.8}
                              />
                            );
                          }}
                          dropdownIconPosition={'right'}
                          dropdownStyle={styles.dropdownDropdownStyle}
                          rowStyle={{
                            backgroundColor: Colors.inactive,
                            borderBottomColor: Colors.inputBorderColor,
                          }}
                          rowTextStyle={{
                            ...styles.dropdownRowTxtStyle,
                            color: Colors.textLowContrast,
                          }}
                        />
                        <View style={styles.errorTextView}>
                          {errors.month && touched.month && (
                            <Text style={styles.errorText}>{errors.month}</Text>
                          )}
                        </View>
                      </View>
                      <View>
                        <SelectDropdown
                          data={YearsData}
                          onSelect={(item, index) => {
                            setSelectedYear(item);
                            setFieldValue('year', item);
                          }}
                          defaultButtonText={'Year'}
                          buttonTextAfterSelection={(item, index) => {
                            return item;
                          }}
                          rowTextForSelection={(item, index) => {
                            return item;
                          }}
                          buttonStyle={{
                            ...styles.dropdownBtnStyle,
                            backgroundColor: Colors.inactive,
                          }}
                          buttonTextStyle={{
                            ...styles.dropdownBtnTxtStyle,
                            color: selectedYear
                              ? Colors.textHighContrast
                              : Colors.textLowContrast,
                          }}
                          renderDropdownIcon={isOpened => {
                            return (
                              <Ionicons
                                name={isOpened ? 'chevron-up' : 'chevron-down'}
                                color={Colors.textLowContrast}
                                size={STANDARD_VECTOR_ICON_SIZE * 0.8}
                              />
                            );
                          }}
                          dropdownIconPosition={'right'}
                          dropdownStyle={styles.dropdownDropdownStyle}
                          rowStyle={{
                            backgroundColor: Colors.inactive,
                            borderBottomColor: Colors.inputBorderColor,
                          }}
                          rowTextStyle={{
                            ...styles.dropdownRowTxtStyle,
                            color: Colors.textLowContrast,
                          }}
                          onChangeText={handleChange('dateofbirth')}
                          value={values.dateofbirth}
                        />
                        <View style={styles.errorTextView}>
                          {errors.year && touched.year && (
                            <Text style={styles.errorText}>{errors.year}</Text>
                          )}
                        </View>
                      </View>
                    </View>
                    {/* <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // bottom: scale(10),
                      }}>
                      {errors.day && touched.day && (
                        <Text style={styles.errorText}>
                          {` ${errors.day} ` +
                            `                    ${errors.month} ` +
                            `               ${errors.year} `}
                        </Text>
                      )}
                    </View> */}

                    {/* {/ <View style={styles.textInputComponentWrapper}> /} */}

                    <View style={{}}>
                      <TextInput
                        // label="Email"
                        labelColor={Colors.textHighContrast}
                        placeholder="Email"
                        autoCapitalize="none"
                        placeholderTextColor={Colors.textLowContrast}
                        backgroundColor={Colors.secondary}
                        textInputValueColor={Colors.textHighContrast}
                        leftIcon={
                          <Message
                            width={STANDARD_VECTOR_ICON_SIZE}
                            height={STANDARD_VECTOR_ICON_SIZE}
                          />
                        }
                        keyboardType={'email-address'}
                        onChangeText={val => setFieldValue('email', val.trim())}
                        // onBlur={handleBlur("email")}
                        value={values.email}
                      />
                      <View style={styles.errorTextView}>
                        {errors.email && touched.email && (
                          <Text style={styles.errorText}>{errors.email}</Text>
                        )}
                      </View>
                    </View>
                    {/* {/ Password /}
                {/ <View style={styles.textInputComponentWrapper}> /} */}
                    <View style={{}}>
                      <TextInput
                        // label="Password"
                        labelColor={Colors.textHighContrast}
                        placeholder=" Password"
                        placeholderTextColor={Colors.textLowContrast}
                        backgroundColor={Colors.secondary}
                        textInputValueColor={Colors.textHighContrast}
                        leftIcon={
                          <Lock
                            width={STANDARD_VECTOR_ICON_SIZE}
                            height={STANDARD_VECTOR_ICON_SIZE}
                          />
                        }
                        rightIcon={
                          <EyeOpen
                            width={STANDARD_VECTOR_ICON_SIZE}
                            height={STANDARD_VECTOR_ICON_SIZE}
                          />
                        }
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry={true}
                      />
                      <View style={styles.errorTextView}>
                        {errors.password && touched.password && (
                          <Text style={styles.errorText}>
                            {errors.password}
                          </Text>
                        )}
                      </View>
                    </View>
                    {/* {/ Confirm Password /}
                {/ <View style={styles.textInputComponentWrapper}> /}
                {/ <View style={styles.textInputComponentWrapper}> /} */}
                    <View style={{}}>
                      <TextInput
                        // label="Confirm Password"
                        labelColor={Colors.textHighContrast}
                        placeholder=" Confirm Password"
                        placeholderTextColor={Colors.textLowContrast}
                        backgroundColor={Colors.secondary}
                        textInputValueColor={Colors.textHighContrast}
                        leftIcon={
                          <Lock
                            width={STANDARD_VECTOR_ICON_SIZE}
                            height={STANDARD_VECTOR_ICON_SIZE}
                          />
                        }
                        rightIcon={
                          <EyeOpen
                            width={STANDARD_VECTOR_ICON_SIZE}
                            height={STANDARD_VECTOR_ICON_SIZE}
                          />
                        }
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        secureTextEntry={true}
                      />
                      <View style={styles.errorTextView}>
                        {errors.confirmPassword && touched.confirmPassword && (
                          <Text style={styles.errorText}>
                            {errors.confirmPassword}
                          </Text>
                        )}
                      </View>
                    </View>

                    <View style={styles.container}>
                      <View style={styles.inputContainer}>
                        <CountryPicker
                          countryCode={phoneCountryFlag}
                          visible={showPhoneCountryPicker}
                          onSelect={country => {
                            // console.log('COUNTRY ==> ', country);
                            // setPhoneCountryCode(country.cca2);
                            setPhoneCountryCallingCode(country.callingCode);
                            setShowPhoneCountryPicker(false);
                            setPhoneCountryFlag(country.cca2);
                          }}
                          withFilter={true}
                        />

                        <View style={styles.phoneTextContainer}>
                          <Text
                            style={[
                              styles.phoneCountryCallingCodeText,
                              {color: Colors.textLowContrast},
                            ]}>
                            +{phoneCountryCallingCode}
                          </Text>
                          <View
                            style={[
                              styles.phoneNoText,
                              {color: Colors.textLowContrast},
                            ]}>
                            <TextInput
                              placeholder="Phone No."
                              keyboardType="numeric"
                              placeholderTextColor={Colors.textLowContrast}
                              onChangeText={handleChange('phoneNum')}
                              onBlur={handleBlur('phoneNum')}
                              value={values.phoneNum}
                              isshow={true}
                            />
                          </View>
                        </View>
                      </View>
                      <View style={styles.errorTextView}>
                        {errors.phoneNum && touched.phoneNum && (
                          <Text style={styles.errorText}>
                            {errors.phoneNum}
                          </Text>
                        )}
                      </View>
                    </View>

              


                    {/* //new nationality */}
                    <Pressable
                      onPress={() => {
                        setShowNationality(true);
                        // setShowPhoneCountryPicker(true);
                      }}>
                      <View style={styles.inputContainer1}>
                        <CountryPicker
                          withEmoji={false}
                          withFlag={true}
                          withFlagButton={false}
                          countryCode={phoneCountryFlag}
                          visible={showNationality}
                          onSelect={country => {
                            setNationalityCode(country.callingCode);
                            setNationalityFlag(country.cca2);
                            setNationalityText(country.name);
                            setShowNationality(false);
                            console.log('COUNTRY ==> ', country);
                            // // setPhoneCountryCode(country.cca2);
                            // setCountryName(country.name);
                            // setFieldValue('nationality', country.name);
                            // // setPhoneCountryCallingCode(country.callingCode);
                            // setShowPhoneCountryPicker(false);
                            // setPhoneCountryFlag(country.cca2);
                          }}
                          withFilter={true}
                          onClose={() => {
                            setShowNationality(false);
                            // setShowPhoneCountryPicker(false);
                          }}
                          renderFlagButton={() => {
                            return (
                              <Icons
                                iconType={'Ionicons'}
                                name="globe-outline"
                                size={scale(20)}
                                color={Colors.primary}
                                style={{marginRight: wp('4')}}
                              />
                            );
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: OPEN_SANS_MEDIUM,
                            color: nationalityText? Colors.textHighContrast : Colors.textLowContrast,
                            fontSize: FONT_SIZE_XS,
                          }}>
                          {nationalityText? nationalityText :  'Nationality'}
                        </Text>
                      </View>
                    </Pressable>

                    <View style={styles.checkboxAndLabelWrapper}>
                      <Checkbox
                        checked={isChecked}
                        backgroundColor={Colors.inactive}
                        onPress={() => setIsChecked(!isChecked)}
                      />
                      <View style={styles.checkboxLabel}>
                        <Text style={{flexShrink: 1}}>
                          <Text
                            style={[
                              styles.checkboxLabel,
                              {color: Colors.textLowContrast},
                            ]}>
                            I agree to
                          </Text>
                          <Text
                            style={styles.linking}
                            onPress={() =>
                              Linking.openURL(
                                'https://westzoneapp.com/termsofservice/westzone.html',
                              )
                            }>
                            Terms of Use
                          </Text>
                          <Text
                            style={[
                              styles.checkboxLabel,
                              {color: Colors.textLowContrast},
                            ]}>
                            {' '}
                            and{' '}
                          </Text>
                          <Text
                            style={styles.privacylinking}
                            onPress={() =>
                              Linking.openURL(
                                'https://westzoneapp.com/privacypolicy/westzone.html',
                              )
                            }>
                            Privacy Policy
                          </Text>
                          <Text
                            style={[
                              styles.checkboxLabel,
                              {color: Colors.textLowContrast},
                            ]}>
                            {' '}
                            of this app
                          </Text>
                        </Text>
                      </View>
                    </View>

                    {/*Register button*/}
                    <Button
                      label={'Register'}
                      // labelColor={Colors.primary}
                      // backgroundColor={
                      //   isChecked ? Colors.accent : IndependentColors.grey
                      // }
                      // disabled={!isChecked}
                      onPress={handleSubmit}
                    />

                    {/* Question & link */}
                    <View style={styles.questionAndLinkWrapper}>
                      {/* Question */}
                      <Text
                        style={[
                          styles.question,
                          {color: Colors.textLowContrast},
                        ]}>
                        Already have an account?
                      </Text>

                      {/* Link */}
                      <Link
                        label={'Login here'}
                        labelColor={Colors.textHighContrast}
                        onPress={() => navigation.navigate('Login')}
                      />
                    </View>
                    <View style={mainStyles.marginBottom3} />
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </>
          );
        }}
      </Formik>
      {/* </ScrollView> */}

      <Modal
        visible={showOTPModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowOTPModal(false)}>
        <View style={styles.modalWrapper}>
          <View
            style={[styles.modalviewwrapper, {backgroundColor: Colors.white}]}>
            <View style={{position: 'absolute', right: hp('2'), top: hp('2')}}>
              <Icons
                iconType={'Ionicons'}
                name={'close'}
                color={'red'}
                onPress={() => setShowOTPModal(false)}
              />
            </View>
            <Text style={[styles.opttext, {color: Colors.textHighContrast}]}>
              Enter OTP:
            </Text>
            <OTPTextView
              ref={input}
              textInputStyle={[
                styles.textInputContainer,
                {backgroundColor: Colors.inactive},
              ]}
              handleTextChange={val => {
                if (val.length == 4) {
                  Keyboard.dismiss();
                }
                setOtpInput(val);
              }}
              handleCellTextChange={handleCellTextChange}
              inputCount={4}
              keyboardType="numeric"
              autoFocus
              // tintColor={IndependentColors.black}
              // offTintColor={IndependentColors.black}
            />

            <View style={[styles.questionAndResendLinkWrapper]}>
              <Text style={[styles.question, {color: Colors.textLowContrast}]}>
                Didn't get OTP code?
              </Text>
              {timer > 0 ? (
                <Text>{timer}</Text>
              ) : (
                <Link
                  label="Resend code"
                  labelColor={Colors.accent}
                  onPress={onResendCode}
                />
              )}
            </View>

            <View style={styles.otpbutton}>
              <Button
                label={'Submit OTP'}
                // labelColor={Colors.white}
                backgroundColor={Colors.accent}
                onPress={handleOTPSubmit}
              />
            </View>
          </View>
          {loading && <Indicators isLoading={loading} />}
        </View>
      </Modal>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

export default Register;


    //   {/* {select Nationality} */}
    //   <Pressable
    //   onPress={() => {
    //     setShowNationality(true);
    //   }}>
    //   <View style={styles.container}>
    //     <View style={styles.inputContainer}>
    //       <CountryPicker
    //         countryCode={nationalityFlag}
    //         visible={showNationality}
    //         onSelect={country => {
    //           setNationalityCode(country.callingCode);
    //           setNationalityFlag(country.cca2);
    //           setNationalityText(country.name);
    //           setShowNationality(false);
    //         }}
    //         onClose={() => {
    //           setShowNationality(false);
    //         }}
    //         withFilter={true}
    //       />

    //       <View style={styles.phoneTextContainer}>
    //         <Text
    //           style={[
    //             styles.phoneCountryCallingCodeText,
    //             {color: Colors.textLowContrast},
    //           ]}>
    //           +{nationalityCode}
    //         </Text>
    //         <View
    //           style={[
    //             styles.phoneNoText,
    //             {color: Colors.textLowContrast},
    //           ]}>
    //           <TextInput
    //             editable={false}
    //             placeholder="Nationality"
    //             // keyboardType="numeric"
    //             placeholderTextColor={Colors.textLowContrast}
    //             onChangeText={setNationalityText}
    //             textInputValueColor={
    //               nationalityText && Colors.textHighContrast
    //             }
    //             // onBlur={handleBlur('phoneNum')}
    //             value={nationalityText}
    //             isshow={true}
    //           />
    //         </View>
    //       </View>
    //     </View>
    //     <View style={styles.errorTextView}>
    //       {/* {errors.phoneNum && touched.phoneNum && (
    //     <Text style={styles.errorText}>{errors.phoneNum}</Text>
    //   )} */}
    //     </View>
    //   </View>
    // </Pressable>