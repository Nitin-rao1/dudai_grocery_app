import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import TextInput from '../../components/inputs/TextInput';
import Message from '../../../src/assets/icons/svg/Message.svg';
import Lock from '../../../src/assets/icons/svg/Lock.svg';
import EyeOpen from '../../../src/assets/icons/svg/EyeOpen.svg';
import LargeHeading from '../../components/headings/LargeHeading';
import {scale} from 'react-native-size-matters';
import Button from '../../components/buttons/Button';

import Modal from 'react-native-modal';
import Checkbox from '../../components/inputs/Checkbox';
import Link from '../../components/links/Link';
import HorizontalDivider from '../../components/dividers/HorizontalDivider';
import {ThemeContext} from '../../theming/ThemeContext';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {
  STANDARD_SOCIAL_ICON_SIZE,
  STANDARD_VECTOR_ICON_SIZE,
} from '../../config/Constants';
import {IndependentColors} from '../../config/Colors';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {forgotEmailPassword, userLogin} from '../../api/auth/auth';
import {Indicators} from '../../components/apploader';
import {useDispatch, useSelector} from 'react-redux';
import {
  loginUser,
  logoutUser,
  updateUser,
} from '../../redux/slices/SessionUser';
import Constants from '../../constants/Constants';
import mainStyles from '../../constants/MainStyles';
import {
  createDeliveryAddress,
  getDeliveryAddress,
  selectedStoreData,
} from '../../api/categories/categoriesAndProduct';
import {addAddresses} from '../../redux/slices/AddressSlice';
import {showMessage} from 'react-native-flash-message';

// import Parse from 'parse/react-nas

const Login = ({navigation}) => {
  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
  const userInfo = useSelector(state => state.users.users);
  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  // Local states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotEmailError, setForgotEmailError] = useState(false);
  const [forgotEmailTextError, setForgotEmailTextError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Toggling call request modal
  const toggleModal = () => {
    // Updating states
    setIsModalVisible(prevState => !prevState);
  };

  const addDeliveryAddress = async responseData => {
    setLoading(true);
    const deliveryData = {
      Lat: userInfo.deleveryAddress.Lat,
      Lng: userInfo.deleveryAddress.Lng,
      Address3: userInfo.deleveryAddress.Address3,
      Address: userInfo.deleveryAddress.Address,
      AddressDescription: userInfo.deleveryAddress.AddressDescription,
      ApartmentNumber: userInfo.deleveryAddress.ApartmentNumber,
      Note: userInfo.deleveryAddress.Note,
      PhoneNumber: responseData.PhoneNumber,
      UserID: responseData.objectId,
    };
    await createDeliveryAddress(deliveryData)
      .then(async res => {
        if (res.result.status == 'success') {
          await getDeliveryAddress(responseData.objectId)
            .then(async val => {
              if (val.result.status == 'success') {
                await selectedStoreData(
                  responseData.objectId,
                  res.result.data.objectId,
                )
                  .then(() => {
                    dispatch(addAddresses(val.result.data));
                    dispatch(updateUser({...userInfo, ...responseData}));
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'HomeBottomTab'}],
                    });
                    setLoading(false);
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
              } else {
                setLoading(false);
                showMessage({
                  message: Constants.appName,
                  description: Constants.pleaseWait,
                  type: Constants.msgTypeDanger,
                  icon: Constants.msgTypeDanger,
                });
              }
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
        } else {
          setLoading(false);
          showMessage({
            message: Constants.appName,
            description: Constants.pleaseWait,
            type: Constants.msgTypeDanger,
            icon: Constants.msgTypeDanger,
          });
        }
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
  };

  const handleLogin = async val => {
    // dispatch(logoutUser());
    setLoading(true);
    await userLogin(val)
      .then(responseData => {
        console.log('Login successful:', responseData);
        // setLoading(false);
        // return;
        // console.log('Login successful:', {...userInfo, ...responseData});
        // Handle the successful login response here
        if (userInfo?.objectId == 'guestUser' && userInfo?.deleveryAddress) {
          addDeliveryAddress(responseData);
        } else if (responseData.IsDeleted == true) {
          setLoading(false);
          Alert.alert(Constants.appName, Constants.deleteAccountDes, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        } else {
          console.log('Login successful:', responseData);
          dispatch(loginUser(responseData));
          dispatch(updateUser({productTotalAmount: 0}));
          setLoading(false);
          navigation.reset({
            index: 0,
            routes: [{name: 'DeliveryAddress'}],
          });
        }
        // navigation.navigate('HomeBottomTab');
        // navigation.navigate('DeliveryAddress')
      })
      .catch(error => {
        setLoading(false);
        // Handle login error here
        console.error('Login failed:', error);
      });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email')
      .matches(Constants.regexEmail, 'Enter a valid email')
      .required('Email Address is Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    //   'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character',
    // ),
  });

  const handleCheckboxClick = () => {
    // Toggle the checkbox state when clicked
    setIsChecked(!isChecked);
  };

  const validateEmail = email => {
    return String(email).toLowerCase().match(Constants.regexEmail);
  };
  const [isChecked, setIsChecked] = useState(true);

  const callForgotEmailApi = async () => {
    setLoading(true);
    await forgotEmailPassword(forgotEmail)
      .then(val => {
        if (val.result.status == 'success') {
          setLoading(false);
          showMessage({
            message: Constants.appName,
            description: val.result.message,
            type: Constants.msgTypeSuccess,
            icon: Constants.msgTypeSuccess,
          });
        } else {
          setLoading(false);
          showMessage({
            message: Constants.appName,
            description: val.result.message,
            type: Constants.msgTypeDanger,
            icon: Constants.msgTypeDanger,
          });
        }
      })
      .catch(err => {
        setLoading(false);
        console.log('errr', err);
      });
  };
  return (
    <KeyboardAvoidingView
      behavior={Constants.keyboards}
      style={mainStyles.container}>
      <ScrollView style={mainStyles.container}>
        <View style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
          <View style={styles.largeHeadingComponentWrapper}>
            <LargeHeading
              headingText="Login"
              headingColor={theme.textHighContrast}
            />
          </View>
          <Text style={[styles.info, {color: theme.textLowContrast}]}>
            Hey, Enter your account credentials to log in to your account.
          </Text>

          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={values => handleLogin(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
              resetForm,
            }) => {
              return (
                <>
                  <View style={styles.textInputComponentWrapper}>
                    <TextInput
                      label="Email"
                      labelColor={theme.textHighContrast}
                      placeholder="Enter your email address"
                      placeholderTextColor={theme.textLowContrast}
                      backgroundColor={theme.secondary}
                      textInputValueColor={theme.textHighContrast}
                      autoCapitalize="none"
                      leftIcon={
                        <Message
                          width={STANDARD_VECTOR_ICON_SIZE}
                          height={STANDARD_VECTOR_ICON_SIZE}
                        />
                      }
                      onChangeText={val => setFieldValue('email', val.trim())}
                      onBlur={handleBlur('email')}
                      value={values.email.trim()}
                      keyboardType={'email-address'}
                    />
                    {errors.email && touched.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </View>

                  <View style={styles.textInputComponentWrapper}>
                    <TextInput
                      label="Password"
                      labelColor={theme.textHighContrast}
                      placeholder="Enter your password"
                      placeholderTextColor={theme.textLowContrast}
                      backgroundColor={theme.secondary}
                      textInputValueColor={theme.textHighContrast}
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
                    {errors.password && touched.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>

                  <View style={styles.checkboxAndLinkWrapper}>
                    <View style={styles.checkboxAndLabelWrapper}>
                      {/* <TouchableOpacity onPress={handleCheckboxClick}>
                        <Checkbox
                          checked={isChecked}
                          backgroundColor={theme.secondary}
                        />
                        <Text
                          style={[
                            styles.checkboxLabel,
                            {color: theme.textLowContrast},
                          ]}>
                          Remember me
                        </Text>
                    </TouchableOpacity> */}
                    </View>
                    <View>
                      <Link
                        label={'Forgot password?'}
                        labelColor={theme.textHighContrast}
                        onPress={() => {
                          resetForm();
                          toggleModal();
                          setForgotEmail('');
                          setForgotEmailError(false);
                          setForgotEmailTextError('');
                        }}
                      />
                    </View>
                  </View>

                  <Button
                    label={'Login'}
                    labelColor={theme.primary}
                    backgroundColor={theme.accent}
                    onPress={handleSubmit}
                    // onPress={() => handleLogin()}
                  />
                  <View style={styles.questionAndLinkWrapper}>
                    <Text
                      style={[styles.question, {color: theme.textLowContrast}]}>
                      Don't have an account?
                    </Text>
                    <Link
                      label={'Create here'}
                      labelColor={theme.textHighContrast}
                      onPress={() => {
                        resetForm();
                        navigation.navigate('Register');
                      }}
                    />
                  </View>
                  <View style={styles.questions}>
                    {/* <Text style={[styles.question, { color: theme.accent }]}>
                  Skip
                </Text> */}
                    <View style={styles.verticalLine} />
                    <Link
                      label={'Skip Sign In'}
                      labelColor={theme.textHighContrast}
                      onPress={() => {
                        resetForm();
                        dispatch(logoutUser());
                        dispatch(
                          updateUser({
                            productTotalAmount: 0,
                            objectId: 'guestUser',
                          }),
                        );

                        // navigation.navigate('HomeBottomTab')
                        navigation.navigate('DeliveryAddress');
                      }}
                    />
                  </View>

                  <View style={styles.border} />

                  {isModalVisible ? (
                    <Modal
                      isVisible={isModalVisible}
                      animationIn="slideInDown"
                      animationOut="slideOutDown"
                      backdropColor={IndependentColors.black}
                      backdropOpacity={0.9}
                      style={styles.modal}>
                      <View
                        style={[
                          styles.modalBody,
                          {backgroundColor: theme.primary},
                        ]}>
                        <TextInput
                          label="Email"
                          labelColor={theme.textHighContrast}
                          placeholder="Enter valid email address"
                          placeholderTextColor={theme.textLowContrast}
                          leftIcon={
                            <Message
                              width={STANDARD_VECTOR_ICON_SIZE}
                              height={STANDARD_VECTOR_ICON_SIZE}
                            />
                          }
                          backgroundColor={theme.secondary}
                          textInputValueColor={theme.textHighContrast}
                          autoCapitalize="none"
                          value={forgotEmail}
                          onChangeText={setForgotEmail}
                        />
                        {forgotEmailError && (
                          <Text style={styles.errorText}>
                            {forgotEmailTextError}
                          </Text>
                        )}
                        <View style={styles.modalSubmitButtonWrapper}>
                          <Button
                            label="Recover Password"
                            labelColor={theme.primary}
                            backgroundColor={theme.accent}
                            onPress={() => {
                              // alert('hey')
                              if (forgotEmail == '') {
                                setForgotEmailError(true);
                                setForgotEmailTextError('is required');
                              } else if (
                                forgotEmail !== '' &&
                                validateEmail(forgotEmail)
                              ) {
                                // console.log('ppppppp');
                                toggleModal();
                                callForgotEmailApi();
                                // setForgotEmailError(true);
                                // setForgotEmailTextError('Enter valid email');
                              }
                              // else if (validateEmail(forgotEmail)) {
                              //   // setForgotEmailError(true);
                              //   // setForgotEmailTextError('done');
                              // }
                              else {
                                setForgotEmailError(true);
                                setForgotEmailTextError('Enter valid emails');
                              }
                            }}
                          />
                        </View>
                        <View
                          style={[
                            styles.modalCloseIconWrapper,
                            {backgroundColor: theme.secondary},
                          ]}>
                          <TouchableOpacity
                            activeOpacity={1}
                            onPress={toggleModal}>
                            <IonIcons
                              name="close"
                              size={scale(20)}
                              color={theme.accent}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                  ) : null}
                </>
              );
            }}
          </Formik>
        </View>
      </ScrollView>

      {loading && <Indicators />}
    </KeyboardAvoidingView>
  );
};

export default Login;
