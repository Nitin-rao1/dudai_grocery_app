import {memo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {STANDARD_VECTOR_ICON_SIZE} from '../../../config/Constants';
import styles from './styles';
import Edit from '../../../../src/assets/icons/svg/Edit.svg';

// Functional component
const AddressCard = ({
  onPress,
  cardBorderColor,
  cardBackgroundColor,
  addressTypeIconBackgroundColor,
  addressTypeIconName,
  addressTypeIconColor,
  addressType,
  addressTypeColor,
  checkCircleColor,
  addresseeName,
  addresseeNameColor,
  addresseePhoneNumber,
  addresseePhoneNumberColor,
  address,
  Apartment,
  Area,
  City,
  Landmark,
  addressColor,
  selected,
}) => {
  // Returning
  return (
    <TouchableOpacity
      style={[
        styles.card,
        {borderColor: cardBorderColor, backgroundColor: cardBackgroundColor},
      ]}
      onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.addressType}>
          <View
            style={[
              styles.addressTypeIconWrapper,
              {backgroundColor: addressTypeIconBackgroundColor},
            ]}>
            <FeatherIcons
              name={addressTypeIconName}
              size={STANDARD_VECTOR_ICON_SIZE}
              color={addressTypeIconColor}
            />
          </View>
          <Text style={[styles.addressTypeLabel, {color: addressTypeColor}]}>
            {addressType} {selected ? '(Default)' : null}
          </Text>
        </View>

        {selected && (
          <FeatherIcons
            name="check-circle"
            size={STANDARD_VECTOR_ICON_SIZE}
            color={checkCircleColor}
          />
        )}
      </View>

      <View style={[styles.addresseeWrapper]}>
        <View style={[styles.addresseeNameAndPhoneNumberWrapper]}>
          <Text style={[styles.addresseeName, {color: addresseeNameColor}]}>
            {addresseeName} -{' '}
          </Text>
          <Text
            style={[
              styles.addresseePhoneNumber,
              {color: addresseePhoneNumberColor},
            ]}>
            {addresseePhoneNumber}
          </Text>
        </View>

       
        <Text style={[styles.address, {color: addressColor}]}>{Area}</Text>
        <Text style={[styles.address, {color: addressColor}]}>{City}</Text>
        <Text style={[styles.address, {color: addressColor}]}>{Landmark}</Text>
        <Text style={[styles.address, {color: addressColor}]}>{address}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Exporting
export default memo(AddressCard);
