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
import {STANDARD_VECTOR_ICON_SIZE} from '../../config/Constants';
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
import Header, { SimpleHeader } from '../../components/Header';
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
import { useSelector } from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Parse from 'parse/react-native.js';

const ChangeMobileNumber = ({navigation, visible, onClose, onSubmit}) => {

  const [otpInput, setOtpInput] = useState('');
  const input = useRef(null);
  const userInfo = useSelector(state => state.users.users);

  const [phoneCountryFlag, setPhoneCountryFlag] = useState('AE');
  const [phoneCountryCallingCode, setPhoneCountryCallingCode] = useState('971');
  const [showPhoneCountryPicker, setShowPhoneCountryPicker] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOTPSubmit = async values => {
    Keyboard.dismiss();
    // const otpVerificationData = {
    //   otp: otpInput, // The entered OTP
    //   mobileNumber: userInfo.Code+mobileNumber, // Use the mobile number from your registration form
    // };
    const otpVerificationData = {
      OTP: otpInput, // The entered OTP
      phoneNumber: `+${phoneCountryCallingCode}${mobileNumber}`, // Use the mobile number from your registration form
    };
    // return
    if (otpInput.length === 4) {
      setLoading(true);
      await verifyMobileOTP(otpVerificationData)
        .then(val => {
          if (val.result.status == 'success') {
            setLoading(false);
            setShowOTPModal(false);
            showMessage({
              message: Constants.appName,
              description: 'Successfully update Mobile number.',
              type: Constants.msgTypeSuccess,
            });
          } else {
            setLoading(false);
            showMessage({
              message: Constants.appName,
              description: 'Please Check OTP',
              type: Constants.msgTypeInfo,
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

  const userGetOTP = async values => {
    const phoneFormData = {
      phoneNumber: `+${phoneCountryCallingCode}${values.phoneNum}`
    }
    // console.log("phoneFormData",phoneFormData);
    // return
    await getMobileOTP(phoneFormData)
      .then(val => {
        setMobileNumber(values.phoneNum)
        setShowOTPModal(true);
      })
      .catch(err => {
        setLoading(false);
        showMessage({
          message: Constants.appName,
          description: Constants.pleaseWait,
          type: Constants.msgTypeDanger,
        });
      });
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
  };
  const strings = {
    RESEND_CODE: 'Resend Code',
  };

  const validationSchema = Yup.object().shape({
    phoneNum: Yup.string()
      .matches(/^[0-9]{9}$/, 'Please enter a 10-digit mobile number')
      .required('Phone Number is Required'),
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
      {/* <Header
        back
        onLeftPress={() => navigation.goBack()}
        iconColor={IndependentColors.black}
        title="Change Mobile Number shdbhhshdckjd"
      /> */}
        <SimpleHeader
            back
            onLeftPress={() => {
              navigation.goBack();
            }}
            title={'Change Mobile Number'}
            // headerBg={Colors.primary}
            // iconColor={IndependentColors.white}
          />

      <Formik
        initialValues={{
          phoneNum: userInfo.BasePhoneNumber,
        }}
        validationSchema={validationSchema} // Add validation schema
        onSubmit={values => {
          // alert('ssss')
          // return
          userGetOTP(values);
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
                <ScrollView bounces={false}>
                  <View style={styles.largeHeadingComponentWrapper}>
                    <Text
                      style={[styles.info, {color: Colors.textLowContrast}]}>
                      An additional layer of authentication increases security.
                    </Text>
                  </View>

                  <View
                    style={{
                      width: wp('95'),
                      alignSelf: 'center',
                      // borderWidth: 2,
                    }}>
                    <View style={mainStyles.marginTop1} />
                    <View style={styles.container}>
                      <View style={styles.inputContainer}>
                        <CountryPicker
                          countryCode={phoneCountryFlag}
                          visible={showPhoneCountryPicker}
                          onSelect={country => {
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
                    {/*ChangeMobileNumber button*/}
                    <Button
                      label={'Otp Varification'}
                      onPress={handleSubmit}
                    />
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
              // handleCellTextChange={handleCellTextChange}
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
                // labelColor={Colors.primary}
                backgroundColor={Colors.accent}
                onPress={()=>handleOTPSubmit()}
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

export default ChangeMobileNumber;
