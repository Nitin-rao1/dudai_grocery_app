import {useContext, useEffect, useRef} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import {ThemeContext} from '../../theming/ThemeContext';
import Button from '../../components/buttons/Button';
import styles from './styles';
import mainStyles from '../../constants/MainStyles';

const EmptyCart = ({onPress, message, showbutton}) => {
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
        <View style={styles.emptyimagewrapper}>
          <View style={styles.lottieViewWrapper}>
            <LottieView
              source={require('../../assets/lottie/emptycart.json')}
              ref={ref}
              loop={false}
              autoPlay={false}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.pointTitle, {color: theme.textHighContrast}]}>
            {message ? message :'Your Cart is empty!'}
            
          </Text>
          <View style={styles.StartShoppingButtonComponentWrapper}>
            {showbutton == false ? null :
            
            <Button
              label={'Start Shopping'}
              labelColor={theme.primary}
              backgroundColor={theme.accent}
              onPress={onPress}
            //   onPress={() => navigation.navigate('Home')}
            />
            }
          </View>
        </View>
      </Animatable.View>
    </SafeAreaView>
  );
};

// Exporting
export default EmptyCart;
