import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import {IndependentColors} from '../../config/Colors';
import styles from './styles';

// Functional component
const Loader = ({title, titleColor, message, messageColor}) => {
  // Returning
  return (
    <View
      style={[styles.mainWrapper, {backgroundColor: IndependentColors.white}]}>
      <View style={styles.lottieViewWrapper}>
        {/* Lottie view */}
        <LottieView
          source={require('../../assets/lottie/cooking-bowl.json')}
          loop
          autoPlay
          resizeMode="contain"
        />
      </View>
      <Animatable.Text
        delay={500}
        animation="fadeInUp"
        easing="ease-in-out-sine"
        useNativeDriver={true}
        style={[styles.title, {color: titleColor}]}>
        {title}
      </Animatable.Text>
      <Animatable.Text
        delay={1000}
        animation="fadeInUp"
        useNativeDriver={true}
        easing="ease-in-out-sine"
        style={[styles.message, {color: messageColor}]}>
        {message}
      </Animatable.Text>
    </View>
  );
};

// Exporting
export default Loader;
