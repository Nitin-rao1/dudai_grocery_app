import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import TextInput from '../../components/inputs/TextInput';
import Lock from '../../../src/assets/icons/svg/Lock.svg';
import EyeOpen from '../../../src/assets/icons/svg/EyeOpen.svg';
import Message from '../../assets/icons/svg/Message.svg';
import Button from '../../components/buttons/Button';
import Checkbox from '../../components/inputs/Checkbox';
import {ThemeContext} from '../../theming/ThemeContext';
import styles from '../ChangePassword/styles';
import {Formik} from 'formik';
import * as yup from 'yup';
import Header, {SimpleHeader} from '../../components/Header';
import {STANDARD_VECTOR_ICON_SIZE} from '../../config/Constants';
import {IndependentColors} from '../../config/Colors';
import {userChangePassword, userUpdateEmail} from '../../api/auth/auth';
import {showMessage} from 'react-native-flash-message';
import Constants from '../../constants/Constants';
import {Indicators} from '../../components/apploader';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
import {updateUser} from '../../redux/slices/SessionUser';

// Functional component
const ChangeEmail = ({navigation}) => {
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector(state => state.users.users);
  const dispatch = useDispatch();

  const onHandleSubmit = async values => {
    const formData = {
      userID: userInfo.objectId,
      email: values.email,
      password: values.password,
    };
    setLoading(true);
    await userUpdateEmail(formData)
      .then(val => {
        setLoading(false);
        if (val.result.status == 'failed') {
          showMessage({
            message: Constants.appName,
            description: val?.result?.message?.message
              ? val?.result?.message?.message
              : Constants.pleaseWait,
            type: Constants.msgTypeDanger,
            icon: Constants.msgTypeDanger,
          });
        } else {
          dispatch(
            updateUser({
              email: values.email,
              username: values.email,
              Mail: values.email,
            }),
          );
          showMessage({
            message: Constants.appName,
            description: 'Email Change Successful.',
            type: Constants.msgTypeSuccess,
            icon: Constants.msgTypeSuccess,
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

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),

    email: yup
      .string()
      .email('Please enter a valid email')
      .matches(Constants.regexEmail, 'Enter a valid email')
      .required('Email Address is Required'),
  });

  return (
    <View style={styles.container}>
      {/* {/ Text input /} */}

      <Formik
        initialValues={{
          email: userInfo.email,
          password: '',
        }}
        validationSchema={validationSchema} // Add validation schema
        onSubmit={onHandleSubmit}>
        {({
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
          values,
          errors,
        }) => {
          return (
            <>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
                <ScrollView bounces={false}>
                  <View style={styles.textInputComponentWrapper}>
                    {/* <Header
                      back
                      onLeftPress={() => navigation.goBack()}
                      // onRightPress={onPressLocation}
                      title={'Update Email Address'}
                      // right="search"
                      headerBg={Colors.primary}
                      iconColor={IndependentColors.white}
                      titleAlight={'center'}
                      style={styles.header}
                    /> */}
                    <SimpleHeader
                      back
                      onLeftPress={() => {
                        navigation.goBack();
                      }}
                      title={'Update Email Address'}
                      // headerBg={Colors.primary}
                      // iconColor={IndependentColors.white}
                    />

                    {/* {/ Email Address /} */}
                    <View style={styles.newPassword}>
                      <TextInput
                        label="Email"
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
                        value={values.email}
                      />
                      {errors.email && (
                        <Text style={styles.errorText}>{errors.email}</Text>
                      )}
                    </View>
                    <View style={styles.passwordModal}>
                      {/* {/ Password /} */}
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
                      {errors.password && (
                        <Text style={styles.errorText}>{errors.password}</Text>
                      )}
                    </View>
                  </View>

                  <View style={{padding: 40, marginTop: 20}}>
                    <Button
                      label={'Change Email'}
                      labelColor={theme.primary}
                      backgroundColor={theme.accent}
                      onPress={handleSubmit}
                    />
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </>
          );
        }}
      </Formik>

      {loading && <Indicators />}
    </View>
  );
};

// Exporting
export default ChangeEmail;
