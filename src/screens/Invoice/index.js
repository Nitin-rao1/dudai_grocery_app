import {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {ThemeContext} from '../../theming/ThemeContext';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {scale} from 'react-native-size-matters';
import BadgePill from '../../components/badges/BadgePill';
import {IndependentColors} from '../../config/Colors';
import ButtonCircled from '../../components/buttons/ButtonCircled';
import {STANDARD_VECTOR_ICON_SIZE} from '../../config/Constants';
import styles from './styles';
import {NavigationContainer} from '@react-navigation/native';
// import PaymentMethods from '../PaymentMethods';

import * as Animatable from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import {addItemToCart, reduceItemFromCart} from '../../redux/slices/CartSlice';
import {
  decreaseQuantity,
  increaseQuantity,
} from '../../redux/slices/ProductsSlice';
import {
  decreaseProductCount,
  increaseProductCount,
} from '../../redux/slices/HomeproductsSlice';
import Constants from '../../constants/Constants';
import moment from 'moment';
import Colors from '../../constants/Colors';
import Header, {SimpleHeader} from '../../components/Header';
import {
  cancelOrders,
  getOrederDetails,
} from '../../api/categories/categoriesAndProduct';
import Button from '../../components/buttons/Button';
import {Indicators} from '../../components/apploader';
import {showMessage} from 'react-native-flash-message';
import mainStyles from '../../constants/MainStyles';
import {updateUser} from '../../redux/slices/SessionUser';
import {addToCart, logoutToCart} from '../../redux/slices/ProductsCartSlice';
import TextInput from '../../components/inputs/TextInput';
import SelectDropdown from 'react-native-select-dropdown';
import Icons from '../../components/cards/Icons/Icons';
// import InvoiceData from './InvoiceData';
// Functional component
const Invoice = ({navigation, route}) => {
  const userInfo = useSelector(state => state.users.users);
  const productCart = useSelector(state => state.productCart.cartItems);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [errorSelectModel, setErrorSelectModel] = useState(false);
  const [errorSelectText, setErrorSelectText] = useState(false);
  const [orderInfo, setorderInfo] = useState({});

  const [isCancelOrderModalVisible, setCancelOrderModalVisible] =
    useState(false);

  // Function to toggle the visibility of the cancel order modal

  const [orderStatusTxt, setOrderStatusTxt] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [textCancelReason, setTextCancelReason] = useState('');
  const [orderStatusNotShowButton, setOrderStatusNotShowButton] =
    useState(true);
  const toDayDate = orderId
    ? moment(orderInfo?.createdAt?.iso).format('ddd MM, YYYY')
    : moment(new Date()).format('ddd MM, YYYY');
  const orderId = route?.params?.orderData?.objectId ? true : false;
  const totalAmount = orderId
    ? orderInfo?.TotalAmount + orderInfo?.DeliveryFee
    : userInfo?.productTotalAmount + userInfo?.deliveryCharges;
  // console.log('Products:.....', userInfo);

  console.log(
    route?.params?.orderData?.objectId,
    'myCartItemsscreen===>:.....',
    orderInfo?.objectId,
  );

  //  const manageOrdersStatus = orderId ? orderInfo?.Status == 0 || orderInfo?.Status == 1 || orderInfo?.Status == 2 ? '' : null :null
  const cartItemsArray = orderId ? orderInfo?.Order : productCart;

  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  useEffect(() => {
    if (orderId) {
      setLoading(true);
      getOrederDetails(userInfo.objectId, route?.params?.orderData?.objectId)
        .then(val => {
          console.log('valvalvalvalvalvalval', val.result.data.Status);
          if (val.result.data) {
            setLoading(false);
            setorderInfo(val.result.data);
            if (
              val.result.data.Status == 0 ||
              val.result.data.Status == 1 ||
              val.result.data.Status == 2
            ) {
              setOrderStatusTxt('Cancel Order');
            } else if (val.result.data.Status == 4) {
              setOrderStatusTxt('Re-Order');
            } else {
              setOrderStatusNotShowButton(false);
            }
          } else {
            showMessage({
              message: Constants.appName,
              description: 'Not Found',
              type: Constants.msgTypeDanger,
            });
            navigation.goBack();
            setLoading(false);
          }
        })
        .catch(err => {
          showMessage({
            message: Constants.appName,
            description: Constants.pleaseWait,
            type: Constants.msgTypeDanger,
          });
          navigation.goBack();
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const onClickNext = () => {
    const orderTemp = [];
    productCart.map(item => {
      orderTemp.push({
        ProductId: item?.item?.objectId,
        ImageId: item?.item?.ImageID,
        Quantity: item?.quantity, // cart quntity
        qty:item.item.Quantity, // product Quntity
        // Quantity: `${item?.quantity?.toString()}`,
        Product: item?.item?.Name,
        Description: item?.item?.Description ? item?.item?.Description : '',
        Price: item?.item?.Price* item.quantity,
        // Price: `${item?.item?.Price?.toString()}`,
        FormattedPrice: null,
        IsAvailable: true,
        Barcode: item?.item?.Barcode,
        PromotionId: item?.item?.PromotionId,
        PromotionTitle: item?.item?.PromotionTitle,
        PromotionType: item?.item?.PromotionType,
        PricePerItem: item?.item?.PricePerItem ? item?.item?.PricePerItem : item?.item?.Price,
        // PricePerItem: `${item?.item?.PricePerItem?.toString()}`,
        DiscountedPricePerItem: item?.item?.DiscountedPricePerItem? item?.item?.DiscountedPricePerItem : 0,
        Vat: item?.item?.Vat,
        IsCanceled: false,
        Plu: item?.item?.Plu,
        ImageUrl: item?.item?.productImageUrl
          ? item?.item?.productImageUrl
          : '',
      });
    });
    dispatch(updateUser({ordersItem: orderTemp}));
    navigation.navigate('DeliveryTime');
  };
  const reOrderData = () => {
    setLoading(true);
    dispatch(logoutToCart());
    dispatch(
      updateUser({
        productTotalAmount: 0,
        ordersItem: [],
        deliveryCharges: 0,
        // homePageRefresh: true,
      }),
    );
    // navigation.navigate('Cart');
    // setLoading(false);

    // alert('In Development');
    // return;
    let priceTotalProduct = 0;
    setTimeout(() => {
      cartItemsArray.map((item, i) => {
        priceTotalProduct = priceTotalProduct + parseFloat(item?.Price);

        const isDatata = {
          Barcode: item?.Barcode ? item?.Barcode : '',
          BranchIndex: item?.BranchIndex ? item?.BranchIndex : '',
          Category: item?.Category ? item?.Category : '',
          ImageID: item?.ImageId ? item?.ImageId : '',
          ImageName: item?.ImageName ? item?.ImageName : 'null',
          productImageUrl: item?.ImageUrl ? item?.ImageUrl : '',
          IsInStock: item?.IsInStock ? item?.IsInStock : true,
          IsInStore: item?.IsInStore ? item?.IsInStore : true,
          IsSelectedByBrand: item?.IsSelectedByBrand
            ? item?.IsSelectedByBrand
            : true,
          LowercaseName: item?.Product ? item?.Product.toLowerCase() : '',
          Name: item?.Product ? item?.Product : '',
          ParentCategory: item?.ParentCategory ? item?.ParentCategory : 'null',
          Price: parseFloat(item?.Price) ? parseFloat(item?.Price) : 0,
          Priority: item?.Priority ? item?.Priority : '',
          Quantity: item?.Quantity ? item?.Quantity : '',
          createdAt: item?.createdAt
            ? item?.createdAt
            : {__type: 'Date', iso: new Date()},
          isGramBased: item?.isGramBased ? item?.isGramBased : false,
          objectId: item?.ProductId ? item?.ProductId : '',
          updatedAt: item?.updatedAt
            ? item?.updatedAt
            : {__type: 'Date', iso: new Date()},

          PromotionId: item?.PromotionId ? item?.PromotionId : '',
          PromotionTitle: item?.PromotionTitle ? item?.PromotionTitle : '',
          PromotionType: item?.PromotionType ? item?.PromotionType : '',
          PricePerItem: item?.PricePerItem ? item?.PricePerItem : '',
          DiscountedPricePerItem: item?.DiscountedPricePerItem
            ? item?.DiscountedPricePerItem
            : '',
          Vat: '',
          Plu: '',
        };
        dispatch(addToCart(isDatata));
      });
      dispatch(updateUser({productTotalAmount: priceTotalProduct}));

      navigation.navigate('Cart');
      setLoading(false);
      // console.log('wwwwwwwwwwwwwww', priceTotalProduct);
    }, 700);
    // const aaaaa=  {
    //   "ImageId": "iZj7FV4R7L",
    //   "Barcode": "4803925270116",
    //   "Product": "Lipton Red Tea  450Ml",
    //   "Price": "5.1",
    //   "Quantity": "1",
    //   "ProductId": "QJ2Dp8xodn",

    //     "Description": "",
    //     "FormattedPrice": null,
    //     "IsAvailable": true,

    //     "PromotionId": "",
    //     "PromotionTitle": "",
    //     "PromotionType": "",
    //     "PricePerItem": "",
    //     "DiscountedPricePerItem": "",
    //     "Vat": "",
    //     "IsCanceled": false,
    //     "Plu": "",
    //     "ImageUrl": "https://parsefiles.back4app.com/4G4bdIqfovJisnN5NLpjYiZI3ho5Ra0RfAj5S8q9/563786334a35388e825fc338252497ff_4803925270116.jpg"
    // },
    // return;

    // const productImageUrl = img;
    // const productTotalAmount = userInfo.productTotalAmount + val?.Price;

    // dispatch(addToCart({...isDatata, productImageUrl: productImageUrl}));
    // dispatch(updateUser({productTotalAmount: productTotalAmount}));
  };
  const openAlertMsg = () => {
    Alert.alert(
      'Kindly Make Sure',
      'The items that are already in your cart will be removed if you place a Reorder.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => reOrderData()},
      ],
    );
  };

  const Product = [
    'Late Delivery',
    'Out of Stock Items',
    'Going Out',
    'Ordered Twice',
    'Adding Additional Items',
    'Other',
  ];

  const handleDropdownSelect = selectedItem => {
    setSelectedReason(selectedItem);
    setTextCancelReason('');
    setErrorSelectModel(false);
    // If "Other" is selected, you can show a TextInput or perform any other action
    if (selectedItem === 'Other') {
      setErrorSelectText(true);
      // Add your logic here to handle the "Other" case
    } else {
      setErrorSelectText(false);
    }
  };
  const toggleCancelOrderModal = () => {
    setCancelOrderModalVisible(!isCancelOrderModalVisible);
  };
  const checkOrderStatus = orderStatus => {
    if (orderStatus == 0 || orderStatus == 1 || orderStatus == 2) {
      toggleCancelOrderModal();
      setErrorSelectModel(false);
      setErrorSelectText(false);
      setSelectedReason('');
      setTextCancelReason('');
      // alert('Cancel Order In development');
    } else if (orderStatus == 4) {
      // alert('Re-Order')
      openAlertMsg();
    } else {
      alert('In development');
    }
  };

  const sendCancelOrderReason = () => {
    if (selectedReason == '') {
      setErrorSelectModel(true);
    } else if (selectedReason == 'Other' && textCancelReason == '') {
      setErrorSelectText(true);
    } else {
      userCancelOrder();
    }
  };

  const userCancelOrder = async () => {
    // alert('suss in development');
    setCancelOrderModalVisible(false);
    // navigation.navigate('HomeBottomTabs', {
    //     screen: 'HistoryStack',

    //   });
    // navigation.navigate('HistoryStack')
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: 'HistoryStack'}],
    // });

    const formData = {
      userID: userInfo.objectId,
      objectId: orderInfo?.objectId, //order Id
      Status: 4,
      CancelReason: textCancelReason ? textCancelReason : selectedReason,
    };
    // console.log("aaaaaaaaaaaaaaa",formData);
    // return
    setLoading(true);
    await cancelOrders(formData)
      .then(val => {
        if (val?.result) {
          navigation.navigate('HistoryBottomStack', {refreshPage: true});
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(false);
        showMessage({
          message: Constants.appName,
          description: Constants.pleaseWait,
          type: Constants.msgTypeDanger,
          icon: Constants.msgTypeDanger,
        });
      });
  };
  // Returning
  return (
    <>
      {loading ? (
        <Indicators />
      ) : (
        <View style={[styles.mainWrapper, {backgroundColor: theme.accent}]}>
          <SimpleHeader
            back
            onLeftPress={() => {
              navigation.goBack();
            }}
            title={'Order Details'}
            // headerBg={Colors.primary}
            // iconColor={IndependentColors.white}
          />
          <View style={[styles.topContentWrapper]}>
            <View>
              <Text style={[styles.payeeName, {color: theme.primary}]}>
                {orderId
                  ? orderInfo?.Name + ' ' + orderInfo?.SurName
                  : userInfo.FirstName + ' ' + userInfo.LastName}
              </Text>
              <Text style={[styles.totalAmount]}>
                {orderId ? orderInfo?.Phone : userInfo.PhoneNumber}
              </Text>

              <View style={[styles.invoiceNumberAndStatusWrapper]}>
                <View style={[styles.invoiceNumberWrapper]}>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={4}
                    style={[styles.invoiceNumberLabel, {color: theme.primary}]}>
                    {orderId
                      ? `${orderInfo?.Address} ${orderInfo?.AddressLine3} ${orderInfo?.AddressDescription} ${orderInfo?.AddressNote}`
                      : `${userInfo?.deleveryAddress?.ApartmentNumber} ${userInfo?.deleveryAddress?.Address} ${userInfo?.deleveryAddress?.Address3} ${userInfo?.deleveryAddress?.AddressDescription} ${userInfo?.deleveryAddress?.Note}`}
                  </Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={[styles.totalAmount]}>Total Amount</Text>
                  <BadgePill
                    label={totalAmount?.toFixed(2) + ' AED'}
                    labelColor={Colors.primary}
                    backgroundColor={theme.primary}
                  />
                </View>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.bottomContentWrapper,
              {backgroundColor: theme.primary},
            ]}>
            <View style={[styles.invoiceIssueDetailsWrapper]}>
              <View>
                <Text
                  style={[
                    styles.issuedAndDueOnLabel,
                    {color: theme.textLowContrast},
                  ]}>
                  Issued on
                </Text>
                <Text
                  style={[
                    styles.issuedAndDueDate,
                    {color: theme.textHighContrast},
                  ]}>
                  {toDayDate}
                </Text>
              </View>

              <View style={[styles.payeeDetailsWrapper]}>
                {/* <View
              style={[
                styles.payeeAvatarWrapper,
                {backgroundColor: theme.secondary},
              ]}>
              <Image
                style={styles.payeeAvatar}
                source={require('../../assets/images/placeholder/100x100-rounded.png')}
              />
            </View> */}
                <Text
                  style={[
                    styles.issuedAndDueOnLabel,
                    {color: theme.textLowContrast},
                  ]}>
                  Kilometer
                </Text>
                <Text
                  style={[
                    styles.issuedAndDueDate,
                    {color: theme.textHighContrast},
                  ]}>
                  {orderId
                    ? orderInfo?.UserDistance
                    : userInfo?.selectedStoreData?.UserDistanceInFloat}{' '}
                  km
                </Text>
              </View>
              {orderInfo?.FinishDate?.iso && (
                <View style={[styles.dueOnWrapper]}>
                  <Text
                    style={[
                      styles.issuedAndDueOnLabel,
                      {color: theme.textLowContrast},
                    ]}>
                    Due on
                  </Text>
                  <Text
                    style={[
                      styles.issuedAndDueDate,
                      {color: theme.textHighContrast},
                    ]}>
                    {orderId
                      ? moment(orderInfo?.FinishDate?.iso).format(
                          'ddd MM, YYYY',
                        )
                      : moment(new Date()).format('ddd MM, YYYY')}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.orderedItemsWrapper}>
              <Text style={[styles.orderedItemsLabel, {color: theme.accent}]}>
                Ordered items
              </Text>

              <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <Animatable.View>
                  <ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}>
                    {cartItemsArray?.length > 0 ? (
                      cartItemsArray?.map((item, index) => {
                        // const stringWithoutDollar = item.price.replace(/\$/g, '');
                        let myProductPrice;
                        if (orderId) {
                          if (parseFloat(item?.DiscountedPricePerItem) > 0) {
                            myProductPrice = item?.DiscountedPricePerItem
                          }else{
                            // console.log("dddddddd");
                            myProductPrice = parseFloat(item.PricePerItem)
                          }
                        } else {
                          myProductPrice = parseFloat(item.item.Price)
                        }
                        // const myProductPrice = orderId ? item?.DiscountedPricePerItem ? item?.DiscountedPricePerItem : parseFloat(item.PricePerItem)  : parseFloat(item.item.Price);
                        // console.log('asvdvgav:',  myProductPrice);
                        const imageUrl = orderId
                          ? item?.ImageUrl
                          : item?.item?.productImageUrl
                          ? item?.item?.productImageUrl
                          : Constants.imageNotFound;
                        const productName = orderId
                          ? item.Product
                          : item.item.Name;
                        const productPrice = orderId
                          ? parseFloat(item.PricePerItem)
                          : parseFloat(item.item.Price);
                        const productQuantity = orderId
                          ? item.Quantity
                          : item.quantity;
                        const productTotalPrice =
                        myProductPrice * productQuantity;
                        return (
                          <View
                            key={index + 'index'}
                            style={[
                              styles.orderedItemWrapper,
                              {backgroundColor: theme.secondary},
                            ]}>
                            <View
                              style={[styles.orderedItemNameAndPriceWrapper]}>
                              <View style={styles.orderedItemNameWrapper}>
                                <Image
                                  source={{uri: imageUrl}}
                                  style={styles.mainCarouselFlatListItemImage}
                                />
                              </View>
                              <View style={styles.orderedItemCostWrapper}>
                                <Text
                                  style={[
                                    styles.orderedItemName,
                                    {color: theme.textHighContrast},
                                  ]}
                                  ellipsizeMode="tail"
                                  numberOfLines={1}>
                                  {productName}
                                </Text>
                                <Text
                                  style={[
                                    styles.orderedItemQtyAndRate,
                                    {color: theme.textLowContrast},
                                  ]}>
                                  {myProductPrice?.toFixed(2)} x {productQuantity}
                                </Text>
                              </View>
                              <View>
                                <Text
                                  style={[
                                    styles.orderedItemCost,
                                    {color: theme.accent},
                                  ]}>
                                  {productTotalPrice?.toFixed(2)}
                                  {/* {productPrice * productQuantity +'\n'}AED */}
                                </Text>
                              </View>
                            </View>
                          </View>
                        );
                      })
                    ) : (
                      <View style={styles.emptyimagewrapper}>
                        {/* <Image
                      // resizeMode="cover"
                      style={styles.emptyimage}
                      source={require('../../assets/images/placeholder/Empty-bag.png')}
                    /> */}
                        <Text
                          style={[
                            styles.pointTitle,
                            {color: theme.textHighContrast},
                          ]}>
                          item empty!
                        </Text>
                      </View>
                    )}
                  </ScrollView>
                </Animatable.View>

                <View
                  style={{
                    borderWidth: 0.7,
                    borderColor: Colors.inputBorderColor,
                  }}
                />

                <View style={styles.invoiceTotalAndTaxWrapper}>
                  <View style={styles.invoiceTotalAndTaxRow}>
                    <Text
                      style={[
                        styles.invoiceTotalAndTaxLabel,
                        {color: theme.textLowContrast},
                      ]}>
                      Subtotal
                    </Text>
                    <Text
                      style={[
                        styles.invoiceTotalAndTaxValue,
                        {color: theme.textHighContrast},
                      ]}>
                      {orderId
                        ? orderInfo?.TotalAmount?.toFixed(2)
                        : userInfo?.productTotalAmount?.toFixed(2)}{' '}
                      AED
                    </Text>
                  </View>
                  <View
                    style={{
                      borderWidth: 0.4,
                      borderColor: Colors.inputBorderColor,
                    }}
                  />

                  {/* <View style={styles.invoiceTotalAndTaxRow}>
                <Text
                  style={[
                    styles.invoiceTotalAndTaxLabel,
                    {color: theme.textLowContrast},
                  ]}>
                  VAT(0.75 %)
                </Text>
                <Text
                  style={[
                    styles.invoiceTotalAndTaxValue,
                    {color: theme.textHighContrast},
                  ]}>
                  {((totalAmountPaid * 0.75) / 100).toFixed(2)}
                </Text>
              </View> */}

                  <View style={styles.invoiceTotalAndTaxRow}>
                    <Text
                      style={[
                        styles.invoiceTotalAndTaxLabel,
                        {color: theme.textLowContrast},
                      ]}>
                      Discount
                    </Text>
                    <Text
                      style={[
                        styles.invoiceTotalAndTaxValue,
                        {color: theme.textHighContrast},
                      ]}>
                      0.00
                    </Text>
                  </View>
                  <View
                    style={{
                      borderWidth: 0.4,
                      borderColor: Colors.inputBorderColor,
                    }}
                  />

                  <View style={styles.invoiceTotalAndTaxRow}>
                    <Text
                      style={[
                        styles.invoiceTotalAndTaxLabel,
                        {color: theme.textLowContrast},
                      ]}>
                      Delivery Charges
                    </Text>
                    <Text
                      style={[
                        styles.invoiceTotalAndTaxValue,
                        {color: theme.textHighContrast},
                      ]}>
                      {orderId
                        ? orderInfo?.DeliveryFee?.toFixed(2)
                          ? orderInfo?.DeliveryFee?.toFixed(2)
                          : '0.00'
                        : userInfo?.deliveryCharges?.toFixed(2)}
                      {/* {userInfo?.selectedStoreData?.FreeDeliveryAmount} */}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderWidth: 0.4,
                      borderColor: Colors.inputBorderColor,
                    }}
                  />

                  <View style={styles.invoiceTotalAndTaxRow}>
                    <Text
                      style={[
                        styles.invoiceTotalAndTaxLabel,
                        {color: theme.accent},
                      ]}>
                      Total Amount
                    </Text>
                    <Text
                      style={[
                        styles.invoiceTotalAndTaxValue,
                        {color: theme.accent},
                      ]}>
                      {totalAmount?.toFixed(2)}
                      AED
                    </Text>
                  </View>
                  <View
                    style={{
                      borderWidth: 0.4,
                      borderColor: Colors.inputBorderColor,
                    }}
                  />
                </View>

                <View style={styles.actionIconsWrapper}>
                  {orderId && orderStatusNotShowButton == false ? null : (
                    <Button
                      label={orderId ? orderStatusTxt : 'Cancle'}
                      onPress={() => {
                        if (orderId) {
                          checkOrderStatus(orderInfo?.Status);
                          // openAlertMsg()
                          // reOrderData();
                        } else {
                          // onClickNext();
                          navigation.goBack();
                        }
                      }}
                      // color="darkorange"
                      backgroundColor={
                        orderStatusTxt == 'Cancel Order' ? Colors.error : null
                      }
                    />
                  )}
                  <View style={mainStyles.width11} />
                  <Button
                    label={orderId ? 'OK' : 'Next'}
                    onPress={() => {
                      if (orderId) {
                        navigation.goBack();
                      } else {
                        onClickNext();
                      }
                      // navigation.navigate('DeliveryTime')
                    }}
                    // color="darkorange"
                  />
                </View>
                <View style={mainStyles.marginTop2} />
              </ScrollView>
            </View>
          </View>
          {/* {} */}
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isCancelOrderModalVisible}
        onRequestClose={() => toggleCancelOrderModal()}>
        <View style={styles.modalCenteredView}>
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent]}>
              {/* <TouchableOpacity onPress={()=>toggleCancelOrderModal()}> */}
              {/* <Image
                              source={require('../../assets/images/placeholder/circle.png')}
                              color={theme.accent}
                              style={[styles.avatarImage]}
                            /> */}
              <Icons
                style={[styles.avatarImage]}
                iconType={'AntDesign'}
                name={'closecircleo'}
                color={Colors.error}
                size={scale(55)}
              />
              {/* </TouchableOpacity> */}
              {/* <TouchableOpacity> */}
              <Text style={styles.modalTitles}>Cancel</Text>
              {/* </TouchableOpacity> */}
              <View style={styles.horizontalLine} />
              <View style={styles.dropdown1RowStyle}>
                <SelectDropdown
                  data={Product}
                  onSelect={selectedItem => handleDropdownSelect(selectedItem)}
                  buttonStyle={styles.btnCancelOption}
                  // dropdownStyle={{backgroundColor:'red'}}
                  defaultButtonText={'Select cancel reason'}
                  buttonTextStyle={styles.dropdown1BtnTxtStyle}
                  renderDropdownIcon={isOpened => {
                    return (
                      <Icons
                        iconType={'FontAwesome'}
                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                        color={Colors.primary}
                        size={scale(15)}
                      />
                    );
                  }}
                />
              </View>
              {errorSelectModel && (
                <Text style={styles.textError}>is Required</Text>
              )}
              {selectedReason === 'Other' && (
                <>
                  <TextInput
                    value={textCancelReason}
                    onChangeText={val => {
                      setTextCancelReason(val);
                      setErrorSelectText(false);
                    }}
                    placeholder="Enter your reason"
                  />
                  <View style={styles.horizontalLine} />
                  {errorSelectText && textCancelReason == '' && (
                    <Text style={styles.textError}>is Required</Text>
                  )}
                </>
              )}
              <View style={styles.modalButtonWrapper}>
                <Button
                  label="Cancel"
                  labelColor={theme.primary}
                  backgroundColor={theme.accent}
                  onPress={() => {
                    toggleCancelOrderModal();
                  }}
                />
                <Button
                  label="Send"
                  labelColor={theme.primary}
                  backgroundColor={theme.accent}
                  onPress={() => {
                    sendCancelOrderReason();
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

// Exporting
export default Invoice;
