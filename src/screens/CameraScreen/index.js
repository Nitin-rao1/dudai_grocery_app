import {ThemeContext} from '../../theming/ThemeContext';
import {useCallback, useContext, useState} from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useCameraDevice, useCodeScanner} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import styles from './styles';

// Functional component
const CameraScreen = props => {
  const {navigation, route} = props;
  const [isActive, setActive] = useState(true);

  const userInfo = useSelector(state => state.users.users);

  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
  const {height, width} = Dimensions.get('window');
  const maskRowHeight = Math.round((height - 300) / 20);
  const maskColWidth = (width - 300) / 2;

  const theme = isLightTheme ? lightTheme : darkTheme;

  const [barcodeData, setBarcodeData] = useState('');

  const device = useCameraDevice('back');

  const [torch, setTorch] = useState(false);

  // const onCodeScanned = useCallback(async codes => {
  //   // if (barcodeData == '') {
  //   //   setBarcodeData(codes[0]?.value);
  //   //   navigation.navigate('ProductList', {
  //   //     value: codes[0]?.value,
  //   //     type: 'qrcode',
  //   //   });
  //   // }
  //   setBarcodeData(codes[0]?.value);
  //   if (barcodeData == '') {
  //     navigation.navigate('ProductList', {
  //       value: codes[0]?.value,
  //       type: 'qrcode',
  //     });
  //     setActive(false);
  //   }
  //   console.log(`Scanned ${codes[0]?.value} codes!`);
  // }, []);
  const onError = useCallback(error => {
    console.error('onError codeScanner', error);
    navigation.navigate('Home');
  }, []);
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'codabar','code-128'],
    onCodeScanned: codes => {
      setBarcodeData(codes[0]?.value);
      if (barcodeData == '') {
        navigation.navigate('ProductList', {
          value: codes[0]?.value,
          type: 'qrcode',
        });
        setActive(false);
      }
      console.log(`Scanned ${codes[0]?.value} codes!`);
    },
  });

  // const codeScanner = useCodeScanner({
  //   codeTypes: ['qr', 'ean-13'],
  //   onCodeScanned: onCodeScanned,
  // });

  return (
    <>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeeButton}
            onPress={() => {
              navigation.goBack();
            }}>
            <FontAwesomeIcons
              name="times"
              color={theme.primary}
              size={scale(20)}
            />
          </TouchableOpacity>

          <Camera
            {...props}
            style={styles.cameraView}
            device={device}
            isActive={isActive}
            codeScanner={codeScanner}
            onError={onError}
            torch={torch ? 'on' : 'off'}
            // enableZoomGesture={true}
          />
          <View style={styles.maskOutter}>
            <View
              style={[{flex: maskRowHeight}, styles.maskRow, styles.maskFrame]}
            />
            <View style={[{flex: 30}, styles.maskCenter]}>
              <View style={[{width: maskColWidth}, styles.maskFrame]} />
              <View style={styles.maskInner} />
              <View style={[{width: maskColWidth}, styles.maskFrame]} />
            </View>
            <View
              style={[{flex: maskRowHeight}, styles.maskRow, styles.maskFrame]}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default CameraScreen;
