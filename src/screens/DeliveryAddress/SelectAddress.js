import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  IconButton,
  MD3Colors,
  Dimensions,
} from 'react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet'; // Import the BottomSheet component

import {ThemeContext} from '../../theming/ThemeContext';
import {IndependentColors} from '../../config/Colors';
import {
  FONT_SIZE_XS,
  FONT_SIZE_XXS,
  OPEN_SANS_BOLD,
  OPEN_SANS_MEDIUM,
  OPEN_SANS_REGULAR,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STANDARD_BORDER_RADIUS,
  STANDARD_SPACING,
  STANDARD_TEXT_TICKER_HEIGHT,
  STANDARD_VECTOR_ICON_WRAPPER_SIZE,
} from '../../config/Constants';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useHeaderHeight} from '@react-navigation/elements';
import ButtonDashOutlined from '../../components/buttons/ButtonDashOutlined';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Edit from '../../../src/assets/icons/svg/Edit.svg';
import Delete from '../../../src/assets/icons/svg/Delete.svg';
import {BackHandler, Alert} from 'react-native';

import {
  STANDARD_SOCIAL_ICON_SIZE,
  STANDARD_VECTOR_ICON_SIZE,
} from '../../config/Constants';
import Icons from '../../components/cards/Icons/Icons';
import Header from '../../components/Header';
import ButtonCircled from '../../components/buttons/ButtonCircled';
import Colors from '../../constants/Colors';
import styles from './styles';

const SelectAddress = ({data, onPressEdit, onPressDelete, onPressSelect}) => {
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  const theme = isLightTheme ? lightTheme : darkTheme;

  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleAddressSelection = val => {

    if (selectedAddress === val.objectId) {
      setSelectedAddress(null); // Deselect the address
    } else {
      setSelectedAddress(val.objectId);
      onPressSelect(val) // Select the address
    }
  };
  const renderitem = ({item, index}) => {
    // console.log('ssssssssssssssssss', item);

    return (
      <TouchableOpacity
      key={index}
        style={[
          styles.itemContainer,
          {
            borderColor:
              item.objectId === selectedAddress ? theme.accent : 'lightgrey',
          },
        ]}
        onPress={() => {
         
          handleAddressSelection(item);
          // navigation.navigate('Login');
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={[
                styles.addressTypeIconWrapper,
                {backgroundColor: theme.secondary},
              ]}>
              <Icons
                name={'location-on'}
                iconType={'MaterialIcons'}
                color={theme.accent}
                size={STANDARD_VECTOR_ICON_SIZE}
              />
            </View>

            <View style={styles.closeButton}>
              <Text
                style={[styles.pointDetails, {color: theme.textLowContrast}]}>
                {item.Address3}
              </Text>
              <Text
                style={[styles.pointDetails, {color: theme.textLowContrast}]}>
                {item.ApartmentNumber}
              </Text>
              <Text
                style={[styles.pointDetails, {color: theme.textLowContrast}]}>
                {item.Address}
              </Text>
              <Text
                style={[styles.pointDetails, {color: theme.textLowContrast}]}>
                {item.AddressDescription}
              </Text>
                  {/* <Text
                    style={[styles.pointDetails, {color: theme.textLowContrast}]}>
                    {item.City}
                  </Text> */}
              <Text
                style={[styles.pointDetails, {color: theme.textLowContrast}]}>
                {item.Note}
              </Text>
             
            </View>
          </View>
          {selectedAddress === item.objectId ? (
             <View
             style={[
               styles.addressTypeIconWrapper,
               {backgroundColor: theme.secondary},
             ]}>
             {item.objectId === selectedAddress && (
               <FeatherIcons
                 name="check-circle"
                 size={STANDARD_VECTOR_ICON_SIZE}
                 color={theme.accent}
               />
             )}
           </View>
          ) : (
            <View style={{justifyContent: 'space-between'}}>
              <ButtonCircled
                height={32}
                icon={
                  <Edit
                    width={STANDARD_VECTOR_ICON_SIZE}
                    height={STANDARD_VECTOR_ICON_SIZE}
                    color={Colors.error}
                  />
                }
                backgroundColor={theme.secondary}
                onPress={()=>onPressEdit(item)}
              />
              <ButtonCircled
                height={32}
                icon={
                  <Delete
                    width={STANDARD_VECTOR_ICON_SIZE}
                    height={STANDARD_VECTOR_ICON_SIZE}
                  />
                }
                backgroundColor={theme.secondary}
                onPress={()=>onPressDelete(item)}
              />
            </View>
           
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={{marginBottom: scale(20)}}
      data={data}
      renderItem={renderitem}
      keyExtractor={item => item.objectId}
    />
  );
};


export default SelectAddress;
