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
import Button from '../../components/buttons/Button';
import Checkbox from '../../components/inputs/Checkbox';
import {ThemeContext} from '../../theming/ThemeContext';
import styles from './styles';
import {Formik} from 'formik';
import * as yup from 'yup';
import Header from '../../components/Header';
import {STANDARD_VECTOR_ICON_SIZE} from '../../config/Constants';
import {IndependentColors} from '../../config/Colors';
import {userChangePassword} from '../../api/auth/auth';
import {showMessage} from 'react-native-flash-message';
import Constants from '../../constants/Constants';
import {Indicators} from '../../components/apploader';
import {useSelector} from 'react-redux';
import Colors from '../../constants/Colors';

// Functional component
const ChangePassword = ({navigation}) => {
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector(state => state.users.users);

  const onHandleSubmit = async values => {
    setLoading(true);
    await userChangePassword({
      objectId: userInfo.objectId,
      oldPassword: values.password,
      newPassword: values.newpassword,
    })
      .then(val => {
        setLoading(false);
        if (val.result.status == "failed") {
          showMessage({
            message: Constants.appName,
            description: val.result.message,
            type: Constants.msgTypeDanger,
            icon: Constants.msgTypeDanger,
          });
        } else {
          
          showMessage({
            message: Constants.appName,
            description: "Password Change Successful.",
            type: Constants.msgTypeSuccess,
            icon: Constants.msgTypeSuccess,
          });
        }
        console.log('userChangePassworduserChangePassword', val);
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

    newpassword: yup
      .string()
      .min(6, 'New Password must be at least 6 characters')
      .required('New password is required'),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newpassword'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  return (
    <View style={styles.container}>
      <Header
                      back
                      onLeftPress={() => navigation.goBack()}
                      // onRightPress={onPressLocation}
                      title={'Update Password'}
                      // right="search"
                      headerBg={Colors.primary}
                      iconColor={IndependentColors.white}
                      titleAlight={'center'}
                      style={styles.header}
                    />
      
          {/* {/ Text input /} */}

          <Formik
            initialValues={{
              password: '',
              newpassword: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema} // Add validation schema
            onSubmit={onHandleSubmit}>
            {({handleChange, handleBlur, handleSubmit, values, errors}) => {
              return (
                <>
                <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
        <ScrollView bounces={false}>
                  <View style={styles.textInputComponentWrapper}>
                    

                    <View style={styles.passwordModal}>
                      {/* {/ Password /} */}
                      <TextInput
                        label="Old Password"
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

                    {/* {/ New Password /} */}
                    <View style={styles.newPassword}>
                      <TextInput
                        label="New Password"
                        labelColor={theme.textHighContrast}
                        placeholder="Enter your new password"
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
                        onChangeText={handleChange('newpassword')}
                        onBlur={handleBlur('newpassword')}
                        value={values.newpassword}
                        secureTextEntry={true}
                      />
                      {errors.newpassword && (
                        <Text style={styles.errorText}>
                          {errors.newpassword}
                        </Text>
                      )}
                    </View>

                    {/* {/ Confirm Password /} */}
                    <View style={styles.confirmPassword}>
                      <TextInput
                        label="Confirm Password"
                        labelColor={theme.textHighContrast}
                        placeholder="Enter your confirm password"
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
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        secureTextEntry={true}
                      />
                      {errors.confirmPassword && (
                        <Text style={styles.errorText}>
                          {errors.confirmPassword}
                        </Text>
                      )}
                    </View>
                  </View>

                  <View style={{padding: 40, marginTop: 20}}>
                    <Button
                      label={'Change Password'}
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
export default ChangePassword;
