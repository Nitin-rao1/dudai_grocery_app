import {memo} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import styles from './styles';

// Functional component
const SingleBanner = ({uri, label, onPress, url}) => {
  // Returning
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        {label && (
          <View style={styles.sectionTitleWrapper}>
            <Text
              style={[styles.sectionTitle, {color: Colors.textHighContrast}]}>
              {label}
            </Text>
          </View>
        )}
        <View style={[styles.bannerWrapper]}>
          {url ? (
            <Image source={{uri: uri}} style={[styles.bannerImage, {borderRadius:20}]} />
          ) : (
            <Image source={uri} style={styles.bannerImage} />
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

// Exporting
export default memo(SingleBanner);
