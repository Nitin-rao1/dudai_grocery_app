import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {IndependentColors} from '../../../config/Colors';
import Link from '../../links/Link';
import {STANDARD_VECTOR_ICON_SIZE} from '../../../config/Constants';

// Functional component
const OrderItemCard = ({
  borderColor,
  backgroundColor,
  cardRowLabelColor,
  cardRowValueColor,
  orderId,
  orderDate,
  trackingNo,
  itemsQuantity,
  orderTotal,
  status,
  invoiceIconColor,
  invoiceLabelColor,
  onPressInvoice,
}) => {
  return (
    <View style={[styles.card, {backgroundColor, borderColor}]}>
      {/* Order no. & date container */}
      <View style={styles.cardRow}>
        <Text style={[styles.cardRowValue, {color: cardRowValueColor}]}>
          {orderId}
        </Text>
        <Text style={[styles.cardRowValue, {color: cardRowLabelColor}]}>
          {orderDate}
        </Text>
      </View>
      {/* Tracking no. container */}
      <View style={styles.cardRow}>
        <Text style={[styles.cardRowLabel, {color: cardRowLabelColor}]}>
          Tracking No:
        </Text>
        <Text style={[styles.cardRowValue, {color: cardRowValueColor}]}>
          {trackingNo}
        </Text>
      </View>
      {/* Quantity container */}
      <View style={styles.cardRow}>
        <Text style={[styles.cardRowLabel, {color: cardRowLabelColor}]}>
          Items Quantity:
        </Text>
        <Text style={[styles.cardRowValue, {color: cardRowValueColor}]}>
          {itemsQuantity}
        </Text>
      </View>
      {/* Total container */}
      <View style={styles.cardRow}>
        <Text style={[styles.cardRowLabel, {color: cardRowLabelColor}]}>
          Order Total:
        </Text>
        <Text style={[styles.cardRowValue, {color: cardRowValueColor}]}>
          {orderTotal}
        </Text>
      </View>
      {/* Status and invoice link container */}
      <View style={styles.cardRow}>
        {/* Status & icon container */}
        <View style={styles.cardRow}>
          {/* Status */}
          <Text
            style={[
              styles.cardRowLabel,
              {
                color:
                  status === 'Packing'
                    ? IndependentColors.yellow
                    : status === 'Delivered'
                    ? IndependentColors.green
                    : status === 'Cancelled'
                    ? IndependentColors.red
                    : null,
              },
            ]}>
            {status}
          </Text>
          {/* Icon */}
          <Icon
            name={
              status === 'Packing'
                ? 'gift-outline'
                : status === 'Delivered'
                ? 'checkmark-done-outline'
                : status === 'Cancelled'
                ? 'close-circle-outline'
                : null
            }
            size={STANDARD_VECTOR_ICON_SIZE * 0.8}
            color={
              status === 'Packing'
                ? IndependentColors.yellow
                : status === 'Delivered'
                ? IndependentColors.green
                : status === 'Cancelled'
                ? IndependentColors.red
                : null
            }
            style={styles.statusIcon}
          />
        </View>
        {/* Invoice link & icon container */}
        <View style={styles.cardRow}>
          <Icon
            name="document-text"
            size={STANDARD_VECTOR_ICON_SIZE * 0.8}
            color={invoiceIconColor}
            style={styles.invoiceIcon}
          />
          {/* Link */}
          <Link
            label="Invoice"
            labelColor={invoiceLabelColor}
            onPress={onPressInvoice}
          />
        </View>
      </View>
    </View>
  );
};

// Exporting
export default OrderItemCard;
