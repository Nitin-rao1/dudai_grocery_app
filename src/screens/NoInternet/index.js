import React, {useContext} from 'react';
import {ThemeContext} from '../../theming/ThemeContext';
import NoDataWarning from '../../components/alerts/NoDataWarning';
import {scale} from 'react-native-size-matters';

// Functional component
const NoInternet = () => {
  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  // Returning
  return (
    <NoDataWarning
      backgroundColor={theme.primary}
      lottieFileName={require('../../assets/lottie/searching-wifi.json')}
      iconName="alert-triangle"
      iconSize={scale(40)}
      iconColor={theme.accent}
      message="Oh snap! Seems that you don't have an active internet connection right now."
      messageColor={theme.textLowContrast}
    />
  );
};

// Exporting
export default NoInternet;
