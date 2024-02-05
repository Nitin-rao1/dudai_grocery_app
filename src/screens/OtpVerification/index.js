import {useState, useContext} from 'react';
import {View, Text, Image} from 'react-native';
import {ThemeContext} from '../../theming/ThemeContext';
import LargeHeading from '../../components/headings/LargeHeading';
import OTPTextView from 'react-native-otp-textinput';
import Link from '../../components/links/Link';
import styles from './styles';

// Functional component
const OtpVerification = () => {
  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  // Local states
  const [otpText, setOtpText] = useState('');

  // Returning
  return (
    <View style={[styles.mainWrapper, {backgroundColor: theme.accent}]}>
      <View style={[styles.largeHeadingComponentWrapper]}>
        <LargeHeading
          headingText="Verify OTP Sent To Your Mobile Number!"
          headingColor="white"
          textAlign="center"
        />
      </View>
      <View
        style={[
          styles.otpVerificationFormWrapper,
          {backgroundColor: theme.primary},
        ]}>
        <View
          style={[
            styles.otpLockIconWrapper,
            {backgroundColor: theme.secondary},
          ]}>
          <Image
            style={styles.otpLockIcon}
            source={require('../../assets/icons/png/otp-lock.png')}
          />
        </View>

        <Text
          style={[styles.otpLockIconTitle, {color: theme.textHighContrast}]}>
          OTP Verification
        </Text>

        <Text
          style={[styles.otpLockIconSubtitle, {color: theme.textLowContrast}]}>
          Enter 4 Digit OTP code Sent To +91 7280000000
        </Text>

        <OTPTextView
          textInputStyle={[styles.otpTextView]}
          tintColor={theme.accent}
          inputCount={4}
          handleTextChange={text => setOtpText(text)}
        />

        <View style={[styles.questionAndResendLinkWrapper]}>
          <Text style={[styles.question, {color: theme.textLowContrast}]}>
            Didn't get OTP code?
          </Text>
          <Link label="Resend code" labelColor={theme.accent} />
        </View>
      </View>
    </View>
  );
};

// Exporting
export default OtpVerification;
