import React, {useContext} from 'react';
import {ThemeContext} from '../../theming/ThemeContext';
import NoDataWarning from '../../components/alerts/NoDataWarning';
import {scale} from 'react-native-size-matters';

// Functional component
const NoPageFound = () => {
  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  // Returning
  return (
    <NoDataWarning
      backgroundColor={theme.primary}
      lottieFileName={require('../../assets/lottie/404.json')}
      iconName="alert-triangle"
      iconSize={scale(40)}
      iconColor={theme.accent}
      message="Oh snap! Seems that the page you are looking for doesn't exist for now."
      messageColor={theme.textLowContrast}
    />
  );
};

// Exporting
export default NoPageFound;
