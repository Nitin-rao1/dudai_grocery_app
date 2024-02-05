import {useContext, useEffect, useRef} from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import {ThemeContext} from '../../theming/ThemeContext';
import Button from '../../components/buttons/Button';
import styles from './styles';
import mainStyles from '../../constants/MainStyles';

const NotProductFound = ({onPress, message, showbutton}) => {
  const ref = useRef();

  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  useEffect(() => {
    if (ref.current) {
      ref.current?.play();
    }
  }, [ref.current]);

  // Returning
  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View
        style={[styles.mainWrapper, {backgroundColor: theme.primary}]}
        delay={100}
        animation="fadeInUp"
        easing="ease-in-out-back"
        useNativeDriver={true}>
       
          <View style={styles.imageViewWrapper}>
            <Image
              style={styles.img}
              source={require('../../assets/images/productNotFound.jpeg')}
            />
          </View>
        
      </Animatable.View>
    </SafeAreaView>
  );
};

// Exporting
export default NotProductFound;
