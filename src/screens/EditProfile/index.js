// import React, {useContext, useRef, useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableOpacity,
//   Modal,
//   Pressable,
//   CheckBox,
//   PixelRatio,
//   Switch,
//   Alert,
//   //  TextInput,
//   StyleSheet,
// } from 'react-native';
// import TextInput from '../../components/inputs/TextInput';
// import Message from '../../assets/icons/svg/Message.svg';
// import Profile from '../../assets/icons/svg/Profile.svg';
// import LargeHeading from '../../components/headings/LargeHeading';
// import Button from '../../components/buttons/Button';
// import Checkbox from '../../components/inputs/Checkbox';
// import Link from '../../components/links/Link';
// import {ThemeContext} from '../../theming/ThemeContext';
// import {
//   FONT_SIZE_XS,
//   OPEN_SANS_MEDIUM,
//   STANDARD_VECTOR_ICON_SIZE,
// } from '../../config/Constants';
// import SelectDropdown from 'react-native-select-dropdown';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// //import RNPickerSelect from "react-native-picker-select";

// import CountryPicker from 'react-native-country-picker-modal';
// import Lock from '../../../src/assets/icons/svg/Lock.svg';
// import EyeOpen from '../../../src/assets/icons/svg/EyeOpen.svg';
// import * as Yup from 'yup';
// import styles from './styles';
// import {scale} from 'react-native-size-matters';
// import {Formik} from 'formik';
// import {IndependentColors} from '../../config/Colors';
// import Header from '../../components/Header';

// import OTPTextView from 'react-native-otp-textinput';
// import {showMessage, hideMessage} from 'react-native-flash-message';
// import {Linking} from 'react-native';
// import {useSelector} from 'react-redux';
// import moment from 'moment';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import Parse from 'parse/react-native.js';

// const DaysData = Array.from({length: 31}, (_, i) => (i + 1).toString());
// const MonthsData = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December',
// ];
// const currentYear = new Date().getFullYear();
// const YearsData = Array.from({length: 100}, (_, i) =>
//   (currentYear - i).toString(),
// );

// const GenderData = ['Mr.', 'Mrs.', 'Ms.'];

// const EditProfile = ({navigation, visible, onClose, onSubmit}) => {
//   const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

//   const theme = isLightTheme ? lightTheme : darkTheme;

//   const userInfo = useSelector(state => state.users.users);
//   // const userInfo = usersdata.users;
//   console.log('dddddddddddd', userInfo);

//   const [show, setShow] = useState(false);
//   const [selectCountryFlag, setSelectCountryFlag] = useState('AE');
//   const [phoneCountryFlag, setPhoneCountryFlag] = useState('AE');
//   const [phoneCountryCallingCode, setPhoneCountryCallingCode] = useState('971');
//   const [showPhoneCountryPicker, setShowPhoneCountryPicker] = useState(false);
//   const [selectedCountry, setSelectedCountry] = useState(
//     'United Arab Emirates',
//   ); // Set the default country

//   const validationSchema = Yup.object().shape({
//     title: Yup.string().required('Title is required'),
//     firstName: Yup.string()
//       .min(3, 'At least 3 characters')
//       .max(25)
//       .required('First name is required'),
//     lastName: Yup.string()
//       .min(2, 'At least 3 characters')
//       .max(25)
//       .required('Last name is required'),
//     day: Yup.string().required('Day is required'),
//     month: Yup.string().required('Month is required'),
//     year: Yup.string().required('Year is required'),
//     email: Yup.string()
//       .email('Please enter a valid email')
//       .required('Email Address is Required'),
//     phoneNum: Yup.string()
//       .matches(/^[0-9]{10}$/, 'Please enter a 10-digit mobile number')
//       .required('Phone Number is Required'),
//     // country: Yup.string().required('Select a Country is Required'),
//   });

//   const handleupdateprofile = async val => {
//     console.log('Form values=============>', val);
//   };

//   const title = userInfo.Designation;
//   const firstName = userInfo.FirstName;
//   const LastName = userInfo.LastName;
//   const Email = userInfo.Email;
//   const BasePhoneNumber = userInfo?.BasePhoneNumber;
//   const dateofbirth = userInfo?.birthDate?.iso;
//   // const formattedDate = moment(dateofbirth).format('MMMM DD, YYYY');
//   // console.log('formattedDate',formattedDate);
//   const day = moment(dateofbirth).format('DD');
//   const month = moment(dateofbirth).format('MMMM');
//   const year = moment(dateofbirth).format('YYYY');

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         style={styles.scrollView}>
//         <Formik
//           initialValues={{
//             title: title || '',
//             firstName: firstName || '',
//             lastName: LastName || '',
//             day: day || '',
//             month: month || '',
//             year: year || '',
//             email: Email || '',
//             phoneNum: BasePhoneNumber || '',
//             selectedCountry: 'United Arab Emirate',
//           }}
//           validationSchema={validationSchema}
//           onSubmit={values => handleupdateprofile(values)}>
//           {({
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             setFieldValue,
//             values,
//             errors,
//             touched,
//           }) => {
//             return (
//               <>
//                 <View style={styles.inputfield}>
//                   <View>
//                     <SelectDropdown
//                       defaultButtonText={title || 'Title'}
//                       data={GenderData}
//                       onSelect={(selectedItem, index) => {
//                         // Update the Formik value for "title" when a title is selected
//                         setFieldValue('title', selectedItem);
//                       }}
//                       buttonTextAfterSelection={(selectedItem, index) => {
//                         return selectedItem;
//                       }}
//                       rowTextForSelection={(item, index) => {
//                         return item;
//                       }}
//                       buttonStyle={{
//                         ...styles.dropdownBtnStyle,
//                         backgroundColor: theme.secondary,
//                       }}
//                       buttonTextStyle={{
//                         ...styles.dropdownBtnTxtStyle,
//                         color: theme.textHighContrast,
//                       }}
//                       renderDropdownIcon={isOpened => {
//                         return (
//                           <Ionicons
//                             // name={isOpened ? 'chevron-up' : 'chevron-down'}
//                             color={theme.textLowContrast}
//                             size={STANDARD_VECTOR_ICON_SIZE * 0.8}
//                           />
//                         );
//                       }}
//                     />
//                     {errors.title && touched.title && (
//                       <Text style={styles.errorText}>{errors.title}</Text>
//                     )}
//                   </View>

//                   {/* {/ First Name /} */}
//                   <View
//                     style={{
//                       width: '65%',
//                       marginTop: scale(-27),
//                       marginBottom: scale(18),
//                     }}>
//                     <TextInput
//                       // label="First Name"
//                       labelColor={theme.textHighContrast}
//                       placeholder=" First Name"
//                       placeholderTextColor={theme.textLowContrast}
//                       leftIcon={
//                         <Profile
//                           width={STANDARD_VECTOR_ICON_SIZE}
//                           height={STANDARD_VECTOR_ICON_SIZE}
//                         />
//                       }
//                       backgroundColor={theme.secondary}
//                       textInputValueColor={theme.textHighContrast}
//                       onChangeText={handleChange('firstName')}
//                       onBlur={handleBlur('firstName')}
//                       value={values.firstName}
//                     />
//                     {errors.firstName && touched.firstName && (
//                       <Text style={styles.errorText}>{errors.firstName}</Text>
//                     )}
//                   </View>
//                 </View>
//                 <View style={{marginTop: scale(-30), marginBottom: scale(16)}}>
//                   <TextInput
//                     // label="Last Name"
//                     labelColor={theme.textHighContrast}
//                     placeholder="Last Name"
//                     placeholderTextColor={theme.textLowContrast}
//                     leftIcon={
//                       <Profile
//                         width={STANDARD_VECTOR_ICON_SIZE}
//                         height={STANDARD_VECTOR_ICON_SIZE}
//                       />
//                     }
//                     backgroundColor={theme.secondary}
//                     textInputValueColor={theme.textHighContrast}
//                     onChangeText={handleChange('lastName')}
//                     onBlur={handleBlur('lastName')}
//                     value={values.lastName}
//                   />
//                   {errors.lastName && touched.lastName && (
//                     <Text style={styles.errorText}>{errors.lastName}</Text>
//                   )}
//                 </View>
//                 <View style={styles.dropdownsWrapper}>
//                   <SelectDropdown
//                     data={DaysData}
//                     onSelect={(selectedItem, index) => {
//                       setFieldValue('day', selectedItem);
//                       console.log(selectedItem);
//                     }}
//                     defaultButtonText={day || 'Day'}
//                     buttonTextAfterSelection={(selectedItem, index) => {
//                       return selectedItem;
//                     }}
//                     rowTextForSelection={(item, index) => {
//                       return item;
//                     }}
//                     buttonStyle={{
//                       ...styles.dropdownBtnStyle,
//                       backgroundColor: theme.secondary,
//                     }}
//                     buttonTextStyle={{
//                       ...styles.dropdownBtnTxtStyle,
//                       color: theme.textHighContrast,
//                     }}
//                     renderDropdownIcon={isOpened => {
//                       return (
//                         <Ionicons
//                           name={isOpened ? 'chevron-up' : 'chevron-down'}
//                           color={theme.textLowContrast}
//                           size={STANDARD_VECTOR_ICON_SIZE * 0.8}
//                         />
//                       );
//                     }}
//                     dropdownIconPosition={'right'}
//                     dropdownStyle={styles.dropdownDropdownStyle}
//                     rowStyle={{
//                       backgroundColor: theme.primary,
//                       borderBottomColor: theme.secondary,
//                     }}
//                     rowTextStyle={{
//                       ...styles.dropdownRowTxtStyle,
//                       color: theme.textLowContrast,
//                     }}
//                   />

//                   <SelectDropdown
//                     data={MonthsData}
//                     onSelect={(selectedItem, index) => {
//                       setFieldValue('month', selectedItem);
//                       console.log(selectedItem);
//                     }}
//                     defaultButtonText={month || 'Month'}
//                     buttonTextAfterSelection={(selectedItem, index) => {
//                       return selectedItem;
//                     }}
//                     rowTextForSelection={(item, index) => {
//                       return item;
//                     }}
//                     buttonStyle={{
//                       ...styles.dropdownBtnStyle,
//                       backgroundColor: theme.secondary,
//                     }}
//                     buttonTextStyle={{
//                       ...styles.dropdownBtnTxtStyle,
//                       color: theme.textHighContrast,
//                     }}
//                     renderDropdownIcon={isOpened => {
//                       return (
//                         <Ionicons
//                           name={isOpened ? 'chevron-up' : 'chevron-down'}
//                           color={theme.textLowContrast}
//                           size={STANDARD_VECTOR_ICON_SIZE * 0.8}
//                         />
//                       );
//                     }}
//                     dropdownIconPosition={'right'}
//                     dropdownStyle={styles.dropdownDropdownStyle}
//                     rowStyle={{
//                       backgroundColor: theme.primary,
//                       borderBottomColor: theme.secondary,
//                     }}
//                     rowTextStyle={{
//                       ...styles.dropdownRowTxtStyle,
//                       color: theme.textLowContrast,
//                     }}
//                   />

//                   <SelectDropdown
//                     data={YearsData}
//                     onSelect={(selectedItem, index) => {
//                       setFieldValue('year', selectedItem);
//                       console.log(selectedItem);
//                     }}
//                     defaultButtonText={year || 'Year'}
//                     buttonTextAfterSelection={(selectedItem, index) => {
//                       return selectedItem;
//                     }}
//                     rowTextForSelection={(item, index) => {
//                       return item;
//                     }}
//                     buttonStyle={{
//                       ...styles.dropdownBtnStyle,
//                       backgroundColor: theme.secondary,
//                     }}
//                     buttonTextStyle={{
//                       ...styles.dropdownBtnTxtStyle,
//                       color: theme.textHighContrast,
//                     }}
//                     renderDropdownIcon={isOpened => {
//                       return (
//                         <Ionicons
//                           name={isOpened ? 'chevron-up' : 'chevron-down'}
//                           color={theme.textLowContrast}
//                           size={STANDARD_VECTOR_ICON_SIZE * 0.8}
//                         />
//                       );
//                     }}
//                     dropdownIconPosition={'right'}
//                     dropdownStyle={styles.dropdownDropdownStyle}
//                     rowStyle={{
//                       backgroundColor: theme.primary,
//                       borderBottomColor: theme.secondary,
//                     }}
//                     rowTextStyle={{
//                       ...styles.dropdownRowTxtStyle,
//                       color: theme.textLowContrast,
//                     }}
//                     onChangeText={handleChange('dateofbirth')}
//                     value={values.dateofbirth}
//                   />
//                 </View>

//                 <View></View>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     bottom: scale(16),
//                   }}>
//                   {errors.day && touched.day && (
//                     <Text style={styles.errorText}>
//                       {` ${errors.day} ` +
//                         `       ${errors.month} ` +
//                         `  ${errors.year} `}
//                     </Text>
//                   )}
//                 </View>

//                 {/* {/ <View style={styles.textInputComponentWrapper}> /} */}

//                 <View style={{marginTop: -24, marginBottom: scale(14)}}>
//                   <TextInput
//                     // label="Email"
//                     labelColor={theme.textHighContrast}
//                     placeholder="Email"
//                     placeholderTextColor={theme.textLowContrast}
//                     backgroundColor={theme.secondary}
//                     textInputValueColor={theme.textHighContrast}
//                     leftIcon={
//                       <Message
//                         width={STANDARD_VECTOR_ICON_SIZE}
//                         height={STANDARD_VECTOR_ICON_SIZE}
//                       />
//                     }
//                     onChangeText={handleChange('email')}
//                     onBlur={handleBlur('email')}
//                     value={values.email}
//                   />
//                   {errors.email && touched.email && (
//                     <Text style={styles.errorText}>{errors.email}</Text>
//                   )}
//                 </View>

//                 <View style={styleses.container}>
//                   <View style={styleses.inputContainer}>
//                     <CountryPicker
//                       countryCode={phoneCountryFlag}
//                       visible={showPhoneCountryPicker}
//                       onSelect={country => {
//                         console.log('COUNTRY ==> ', country);
//                         // setPhoneCountryCode(country.cca2);
//                         setPhoneCountryCallingCode(country.callingCode);
//                         setShowPhoneCountryPicker(false);
//                         setPhoneCountryFlag(country.cca2);
//                       }}
//                       withFilter={true}
//                     />

//                     <View style={styleses.phoneTextContainer}>
//                       <Text
//                         style={[
//                           styleses.phoneCountryCallingCodeText,
//                           {color: theme.textLowContrast},
//                         ]}>
//                         +{phoneCountryCallingCode}
//                       </Text>
//                       <Text
//                         style={[
//                           styleses.phoneNoText,
//                           {color: theme.textLowContrast},
//                         ]}>
//                         <TextInput
//                           placeholder="Phone No."
//                           keyboardType="numeric"
//                           placeholderTextColor={theme.textLowContrast}
//                           onChangeText={handleChange('phoneNum')}
//                           onBlur={handleBlur('phoneNum')}
//                           value={values.phoneNum}
//                           style={{width: 225}}
//                         />
//                       </Text>
//                     </View>
//                   </View>
//                   {errors.phoneNum && touched.phoneNum && (
//                     <Text style={styles.errorText}>{errors.phoneNum}</Text>
//                   )}
//                 </View>

//                 <View style={styleses.container}>
//                   <TouchableOpacity
//                     onPress={() => setShowPhoneCountryPicker(true)}
//                     style={[styleses.countryinput,]}>
//                     <CountryPicker
//                       countryCode={selectCountryFlag}
//                       visible={showPhoneCountryPicker}
//                       onSelect={country => {
//                         console.log('Selected Country:', country);
//                         setSelectedCountry(country.name); // Update the selected country
//                         setPhoneCountryCallingCode(country.callingCode);
//                         setSelectCountryFlag(country.cca2);
//                         setShowPhoneCountryPicker(false);
//                         setFieldValue('selectedCountry', country.name);
//                       }}
//                       withFilter={true}
//                     />

//                     <View style={styleses.CountryTextContainer}>
//                       <Text
//                         style={[
//                           styleses.phoneCountryCallingCodeText,
//                           {color: theme.textLowContrast},
//                         ]}>
//                         {selectCountryFlag}
//                       </Text>
//                         <Text
//                           style={[
//                             styleses.phoneNoText,
//                             {color: theme.textHighContrast},
//                           ]}>
//                           {/* <TextInput
//                           labelColor={theme.textHighContrast}
//                           placeholder="Select Country"
//                           placeholderTextColor={theme.textLowContrast}
//                           backgroundColor={theme.secondary}
//                           textInputValueColor={theme.textHighContrast}
//                           onChangeText={text => {
//                             setSelectedCountry(text);
//                             setFieldValue('country', text);
//                           }}
//                           value={values.selectedCountry}
//                           style={{width: 225}}></TextInput> */}
//                           {values.selectedCountry}
//                         </Text>
//                     </View>
//                   </TouchableOpacity>
//                   {errors.country && touched.country && (
//                     <Text style={styles.errorText}>{errors.country}</Text>
//                   )}
//                 </View>

//                 <View
//                   style={{
//                     marginTop: '40%',
//                     marginBottom: '10%',
//                   }}>
//                   {/* Submit button */}
//                   <Button
//                     label={'Update'}
//                     labelColor={theme.primary}
//                     backgroundColor={theme.accent}
//                     onPress={handleSubmit}
//                   />
//                 </View>
//               </>
//             );
//           }}
//         </Formik>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styleses = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: "#F0EAD8",
//     marginBottom: scale(14),
//   },
//   inputContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     flexDirection: 'row',
//     backgroundColor: '#F6F6F7',
//     padding: scale(6),
//     marginTop: scale(8),
//     borderRadius: scale(8),
//   },
//   countryinput: {
//     flexDirection: 'row',
//     display: 'flex',
//     alignItems: 'center',
//     padding: scale(6),
//     marginTop: scale(8),
//     borderRadius: scale(8),
//     backgroundColor: '#F6F6F7',
//   },
//   CountryTextContainer: {
//     flexDirection: 'row',
//     alignItems: 'baseline',
//     marginBottom: scale(12),
//   },
//   phoneTextContainer: {
//     // flex: 1,
//     //  backgroundColor: "white",
//     // backgroundColor: '#F6F6F7',
//     height: '100%',
//     //borderColor: "black",
//     display: 'flex',
//     flexDirection: 'row',
//     //  alignItems: "center",
//     textAlign: 'center',
//     // padding: 2,
//   },
//   phoneCountryCallingCodeText: {
//     //  fontWeight: "bold",
//     marginRight: 16,
//     marginTop: 12,
//   },
//   phoneNoText: {
//     // fontWeight: "bold",
//     // backgroundColor:"black",
//     width: '80%',
//   },
//   keypadContainer: {
//     flex: 1,
//   },
// });
// // Exporting
// export default EditProfile;

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
import {
  getMobileOTP,
  userEditProfile,
  userRegister,
  verifyMobileOTP,
} from '../../api/auth/auth';
import {Indicators} from '../../components/apploader';
import mainStyles from '../../constants/MainStyles';
import Constants from '../../constants/Constants';
import Colors from '../../constants/Colors';
import Icons from '../../components/cards/Icons/Icons';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {updateUser} from '../../redux/slices/SessionUser';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Parse from 'parse/react-native.js';

const EditProfile = ({navigation, visible, onClose, onSubmit}) => {
  const userInfo = useSelector(state => state.users.users);
  const dispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedmonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [expectedOTP, setExpectedOTP] = useState('1234');
  const [otpInput, setOtpInput] = useState('');
  const input = useRef(null);

  const [show, setShow] = useState(false);
  const [phoneCountryFlag, setPhoneCountryFlag] = useState('AE');
  const [countryName, setCountryName] = useState(userInfo.Nationality);
  const [phoneCountryCallingCode, setPhoneCountryCallingCode] = useState('971');
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

  const updateUserProfile = async values => {
   
    const formData = {
      objectId: userInfo.objectId,
      BirthDate: moment(
        `${values.year}-${values.month}-${values.day}`,
        'YYYY MMMM D',
      ).format('YYYY-MM-DD'),
      Designation: values.title,
      FirstName: values.firstName,
      LastName: values.lastName,
      // CountryCode:'',
      Nationality:values.nationality,
    };
//  console.log(`formData`,formData);
//  return
    // const aaa = {
    //   result: {
    //     data: {
    //       ACL: [Object],
    //       BasePhoneNumber: '6855855585',
    //       BirthDate: [Object],
    //       Code: '+971',
    //       Designation: 'Mrs.',
    //       FirstName: 'lisa',
    //       IsDeleted: false,
    //       IsPanelUser: false,
    //       LastName: 'lisa',
    //       Mail: 'lisa787@gmail.com',
    //       NewRewardUsed: false,
    //       Points: 0,
    //       __type: 'Object',
    //       className: '_User',
    //       createdAt: '2023-12-06T13:22:34.413Z',
    //       email: 'lisa787@gmail.com',
    //       objectId: '6qUVG3WBLJ',
    //       updatedAt: '2023-12-07T06:59:34.359Z',
    //       username: 'lisa787@gmail.com',
    //     },
    //     success: 'User updated successfully!',
    //   },
    // };
    setLoading(true);
    await userEditProfile(formData)
      .then(val => {
        const userData = val.result.data;

        if (val.result.status == 'failed') {
          setLoading(false);
          showMessage({
            message: Constants.appName,
            description: 'User Profile Not Update. Try after some time.',
            type: Constants.msgTypeDanger,
            icon: Constants.msgTypeDanger,
          });
        } else {
          dispatch(
            updateUser({
              BirthDate: userData.BirthDate,
              Designation: userData.Designation,
              FirstName: userData.FirstName,
              LastName: userData.LastName,
              Nationality:userData.Nationality
            }),
          );
          setLoading(false);
          showMessage({
            message: Constants.appName,
            description: 'User Profile Update Successful.',
            type: Constants.msgTypeSuccess,
            icon: Constants.msgTypeSuccess,
          });
        }
      })
      .catch(err => {
        console.log('hhhhhhhhhhhhhhhhhhhhhhhhhh', err);
        setLoading(false);
        showMessage({
          message: Constants.appName,
          description: Constants.pleaseWait,
          type: Constants.msgTypeDanger,
        });
      });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Fill required'),
    firstName: Yup.string()
      .min(3, 'atleast 3 character')
      .max(25)
      .required('First name is required'),

    lastName: Yup.string()
      .min(3, 'atleast 3 character')
      .max(25)
      .required('Last name is required'),

    day: Yup.string().required('Day is required'),
    month: Yup.string().required('Month is required'),
    year: Yup.string().required('Year is required'),
    nationality: Yup.string().required('Fill required'),

    // email: Yup.string()
    //   .email('Please enter a valid email')
    //   .matches(Constants.regexEmail, 'Enter a valid email')
    //   .required('Email Address is Required'),

    // password: Yup.string()
    //   .min(6, 'Password must be at least 8 characters')
    //   .required('Password is required'),
    // confirmPassword: Yup.string()
    //   .oneOf([Yup.ref('password'), null], 'Passwords must match')
    //   .required('Confirm Password is required'),
    // phoneNum: Yup.string()
    //   .matches(/^[0-9]{10}$/, 'Please enter a 10-digit mobile number')
    //   .required('Phone Number is Required'),
    // checkbox: Yup.string().required('please fill'),
  });

  const inputRefs = [];
  // Returning
  const userBirthDate = userInfo?.BirthDate?.iso;
  const userDay = moment(userBirthDate)?.format('D');
  const userMonth = moment(userBirthDate)?.format('MMMM');
  const userYear = moment(userBirthDate)?.format('YYYY');

  console.log('aaaaaaaaaaaaaaaaaaaaaaaaa-----,', userInfo.Nationality);
  return (
    <SafeAreaView style={mainStyles.container}>
      <View style={mainStyles.marginBottom3} />

      <Formik
        initialValues={{
          title: userInfo.Designation,
          firstName: userInfo.FirstName,
          lastName: userInfo.LastName,
          day: userDay ? userDay : '',
          month: userMonth ? userMonth : '',
          year: userYear ? userYear : '',
          nationality: countryName ? countryName :'',
        }}
        validationSchema={validationSchema} // Add validation schema
        onSubmit={updateUserProfile}>
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
                          defaultButtonText={values.title}
                          defaultValue={values.title}
                          data={GenderData}
                          onSelect={(item, index) => {
                            setSelectedItem(item);
                            setFieldValue('title', item);
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
                            color: Colors.textHighContrast,
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
                        }}>
                        <TextInput
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
                          defaultButtonText={values.day}
                          defaultValue={values.day}
                          data={DaysData}
                          onSelect={(item, index) => {
                            setSelectedDay(item);
                            // Update the Formik value for "title" when a title is selected
                            setFieldValue('day', item);
                          }}
                          // defaultButtonText={'Day'}
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
                            color: Colors.textHighContrast,
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
                          defaultButtonText={values.month}
                          defaultValue={values.month}
                          data={MonthsData}
                          onSelect={(item, index) => {
                            setSelectedMonth(index + 1);
                            // Update the Formik value for "title" when a title is selected
                            setFieldValue('month', item);
                          }}
                          // defaultButtonText={'Month'}
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
                            color: Colors.textHighContrast,
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
                          defaultButtonText={values.year}
                          defaultValue={values.year}
                          data={YearsData}
                          onSelect={(item, index) => {
                            setSelectedYear(item);
                            setFieldValue('year', item);
                          }}
                          // defaultButtonText={'Year'}
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
                            color: Colors.textHighContrast,
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
                    <Pressable onPress={()=>{
                      setShowPhoneCountryPicker(true)
                    }}>

                    <View style={styles.inputContainer}>
                      <CountryPicker
                      withEmoji={false}
                      withFlag={false}
                      withFlagButton={false}
                        countryCode={phoneCountryFlag}
                        visible={showPhoneCountryPicker}
                        
                        onSelect={country => {
                          console.log('COUNTRY ==> ', country);
                          // setPhoneCountryCode(country.cca2);
                          setCountryName(country.name)
                          setFieldValue('nationality',country.name)
                          // setPhoneCountryCallingCode(country.callingCode);
                          setShowPhoneCountryPicker(false);
                          setPhoneCountryFlag(country.cca2);
                        }}
                        withFilter={true}
                        onClose={()=>{
                          setShowPhoneCountryPicker(false)
                        }}
                        renderFlagButton={()=>{
                          return(
                            <Icons
                            iconType={'Ionicons'}
                            name="globe-outline"
                            size={scale(20)}
                            color={Colors.primary}
                            style={{marginRight:wp('4')}}
                          />
                          )
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: OPEN_SANS_MEDIUM,
                          color: Colors.textHighContrast,
                          fontSize: FONT_SIZE_XS,
                        }}>
                       {countryName}
                      </Text>
                    </View>
                    </Pressable>
                    <View style={styles.errorTextView}>
                          {errors.nationality && touched.nationality && (
                            <Text style={styles.errorText}>{errors.nationality}</Text>
                          )}
                        </View>
                    {/* <View style={{}}>
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
                    </View> */}

                    <View style={mainStyles.marginBottom5} />

                    <Button
                      label={'EditProfile'}
                      // labelColor={Colors.primary}
                      // backgroundColor={
                      //   isChecked ? Colors.accent : IndependentColors.grey
                      // }
                      // disabled={!isChecked}
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
      {loading && <Indicators />}
    </SafeAreaView>
  );
};

export default EditProfile;
