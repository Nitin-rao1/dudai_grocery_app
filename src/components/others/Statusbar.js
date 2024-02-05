import {StatusBar, SafeAreaView} from 'react-native';
import React from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';

// Functional component
const Statusbar = ({backgroundColor, ...props}) => {
  // Returning
  return (
    <SafeAreaView style={[{height: getStatusBarHeight(), backgroundColor}]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  );
};

// Exporting
export default Statusbar;
