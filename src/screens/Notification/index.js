import React, {useContext, useEffect, useState} from 'react';
import {View, ScrollView, BackHandler, Text, Image} from 'react-native';
import WishlistItemCard from '../../components/cards/WishlistItemCard';
// import WishlistData from '../../data/WishlistData';
import {ThemeContext} from '../../theming/ThemeContext';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
import OrderagainitemCard from '../../components/cards/OrderagainitemCard';
import * as Animatable from 'react-native-animatable';

import Constants from '../../constants/Constants';
import EmptyCart from '../../components/emptyCart/EmptyCart';
import Header from '../../components/Header';
import {IndependentColors} from '../../config/Colors';
import {
  deleteOneNotification,
  getAlterProduct,
  updateAlterProduct,
  userProductSearch,
  userProductSearchByText,
} from '../../api/categories/categoriesAndProduct';
import {Indicators} from '../../components/apploader';
import Colors from '../../constants/Colors';
import {updateUser} from '../../redux/slices/SessionUser';
import Button from '../../components/buttons/Button';
import BadgePill from '../../components/badges/BadgePill';
import NotificationProduct from './NotificationProduct';
import {showMessage} from 'react-native-flash-message';
// Functional component

const Notification = ({navigation, route}) => {
  const goBack = route?.params?.goBack;
  const notificationDataBack = route?.params?.notificationData;
  const isNotiBack = route?.params?.isNotiBack;
  // Using context
  //   const imagesAllData = useSelector(state => state.images.images);
  const userInfo = useSelector(state => state.users.users);
  // const wishList = useSelector(state => state.wishList.wishList);
  // const productCart = useSelector(state => state.productCart.cartItems);
  // const isproduct = useSelector(state => state.productData?.productData);
  const [loading, setLoading] = useState(true);
  const [productTotalAmount, setProductTotalAmount] = useState(0);

  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
  const dispatch = useDispatch();
  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  // const {productData} = route.params;

  const [isproduct, setProduct] = useState([]);
  const [isOrderProduct, setOrderProduct] = useState([]);
  const [isproductOutStoke, setProductOutStoke] = useState([]);
  const [isproductOutStokeId, setProductOutStokeId] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  // const [temp, setTemp] = useState([]);
  useEffect(() => {
    let payload = {};
    let payloadDelete = {};
    if (isNotiBack) {
      payload = {
        // UserID: 'rmUuKCBrzP',
        // objectId: 'ZuYCneMHXV',
        UserID: userInfo.objectId,
        objectId: notificationDataBack.OrderId,
      };
      payloadDelete = {
        userId: userInfo?.objectId,
        objectIds: [notificationDataBack.OrderId],
        status:5
      };
    } else {
      payload = {
        // UserID: 'rmUuKCBrzP',
        // objectId: 'ZuYCneMHXV',
        UserID: userInfo.objectId,
        objectId: userInfo.notificationData.additionalData.orderId,
      };
      payloadDelete = {
        userId: userInfo?.objectId,
        objectIds: [userInfo.notificationData.additionalData.orderId],
        status:5
      };
    }
    
    deleteOneNotification(payloadDelete);
    dispatch(updateUser({isNotification: false, isForeground: false}));
    const outIdTemp = [];
    getAlterProduct(payload)
      .then(val => {
        console.log('ttttttttttttt:', val.result);
        if (val.result.suggestProduct.length > 0) {
          setOrderDetails(val.result.orderDetails);
          setProduct(val.result.suggestProduct);
          setProductOutStoke(val.result.outofstock);

          setProductTotalAmount(val.result.orderDetails.TotalAmount);
          val.result.outofstock.map(item => {
            outIdTemp.push(item.ProductId);
          });
          setProductOutStokeId(outIdTemp);
          setLoading(false);
        } else {
          setLoading(false);
          setProduct([]);
          setProductOutStoke([]);
        }
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  function handleBackButtonClick() {
    dispatch(updateUser({isNotification: false, isForeground: false}));
    if (route?.params?.goBack == true) {
      navigation.goBack();
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeBottomTab'}],
      });
      return true;
    }
  }

  const handleGOBack = () => {
    dispatch(updateUser({isNotification: false, isForeground: false}));
    if (route?.params?.goBack == true) {
      navigation.goBack();
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeBottomTab'}],
      });
    }
  };

  const confirmOrder = () => {
    setLoading(true);
    const orderTemp = [];

    isOrderProduct.map(val => {
      orderTemp.push({
        ProductId: val.product.objectId,
        ImageId: val.product.ImageID,
        Quantity: val.qty,
        qty: val.product.Quantity,
        Product: val.product.Name,
        Description: val.product.Description,
        Price: val.product.PricePerItem * val.qty,
        FormattedPrice: null,
        IsAvailable: true,
        Barcode: val.product.Barcode,
        PromotionId: val.product.PromotionId ? val.product.PromotionId : '',
        PromotionTitle: val.product.PromotionTitle
          ? val.product.PromotionTitle
          : '',
        PromotionType: val.product.PromotionType
          ? val.product.PromotionType
          : '',
        PricePerItem: val.product.PricePerItem,
        DiscountedPricePerItem: val.product.DiscountedPricePerItem
          ? val.product.DiscountedPricePerItem
          : 0,
        Vat: '',
        IsCanceled: false,
        Plu: '',
        ImageUrl: val.product.ImageUrl,
      });
    });
    submitOrder(orderTemp);
  };
  const submitOrder = async order => {
    setLoading(true);
    const formData = {
      Order: order,
      totalAmount: parseFloat(productTotalAmount.toFixed(2)),
      objectId: userInfo.notificationData.additionalData.orderId,
      UserID: userInfo.objectId,
      outofstockId: isproductOutStokeId,
    };
    // console.log(formData);
    //     return
    await updateAlterProduct(formData)
      .then(val => {
        console.log('repreprepreppppppp========:', val.result);

        setLoading(false);
        showMessage({
          message: Constants.appName,
          description: 'Order Update Successfull!!',
          type: Constants.msgTypeSuccess,
        });
        handleGOBack();
      })
      .catch(err => {
        setLoading(false);
        showMessage({
          message: Constants.appName,
          description: Constants.pleaseWait,
          type: Constants.msgTypeDanger,
        });
      });
    console.log('jhsbdhfshdf', formData);
  };
  const productIncreases = val => {
    const tempppp = [...isOrderProduct];
    const priceProduct = productTotalAmount + val.priceProduct;
    setProductTotalAmount(priceProduct);
    const existingItemIndex = tempppp.findIndex(
      cartItem => cartItem.product.objectId === val.product.objectId,
    );
    console.log(existingItemIndex);
    if (existingItemIndex !== -1) {
      tempppp[existingItemIndex] = {
        ...val,
      };
    } else {
      tempppp.push(val);
    }
    setOrderProduct(tempppp);
  };

  const productDecrease = val => {
    const tempp = [...isOrderProduct];
    const priceProduct = productTotalAmount - val.priceProduct;
    setProductTotalAmount(priceProduct);

    const existingItemIndex = tempp.findIndex(
      cartItem => cartItem.product.objectId === val.product.objectId,
    );
    console.log(existingItemIndex);
    if (existingItemIndex !== -1) {
      tempp[existingItemIndex] = {
        ...val,
      };
    }
    const filteredCartItems = tempp.filter(cartItem => cartItem.qty > 0);
    setOrderProduct(filteredCartItems);
  };
  return (
    <>
      {loading ? (
        <Indicators />
      ) : (
        <View style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
          {/* {/ Scrollview /} */}
          <Header
            back
            onLeftPress={() => handleGOBack()}
            title={'Notification'}
            headerBg={Colors.primary}
            iconColor={IndependentColors.white}
            titleAlight={'center'}
          />

          <>
            {loading == false && isproduct.length == 0 ? (
              <EmptyCart
                message={'Product not Found'}
                onPress={() => navigation.navigate('Home')}
              />
            ) : (
              <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <View style={[styles.topContentWrapper]}>
                  <View>
                    <Text style={[styles.payeeName, {color: theme.primary}]}>
                      {orderDetails?.userName} {orderDetails?.SurName}
                    </Text>
                    <Text style={[styles.totalAmount]}>
                      {orderDetails?.Phone}
                    </Text>

                    <View style={[styles.invoiceNumberAndStatusWrapper]}>
                      <View style={[styles.invoiceNumberWrapper]}>
                        <Text
                          ellipsizeMode="tail"
                          numberOfLines={4}
                          style={[
                            styles.invoiceNumberLabel,
                            {color: theme.primary},
                          ]}>
                          {orderDetails?.Address}
                        </Text>
                      </View>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={[styles.totalAmount]}>Total Amount</Text>
                        <BadgePill
                          label={productTotalAmount.toFixed(2) + ' AED'}
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
                  {/* <View style={[styles.invoiceIssueDetailsWrapper]}>
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
                 9090909
                </Text>
              </View>

              <View style={[styles.payeeDetailsWrapper]}>
               
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
                  887
                  km
                </Text>
              </View>
              
            </View> */}

                  <View style={styles.orderedItemsWrapper}>
                    <Text
                      style={[styles.orderedItemsLabel, {color: Colors.error}]}>
                      Out Of Stock items
                    </Text>

                    <View>
                      <Animatable.View>
                        <ScrollView
                          bounces={false}
                          showsVerticalScrollIndicator={false}>
                          {isproductOutStoke?.length > 0 ? (
                            isproductOutStoke?.map((item, index) => {
                              const imageUrl = item?.ImageUrl;
                              const productName = item.Product;
                              const productPrice = item.PricePerItem;
                              const productQuantity = item.Quantity;

                              const productTotalPrice =
                                item.PricePerItem * productQuantity;
                              return (
                                <View
                                  key={index + 'index'}
                                  style={[
                                    styles.orderedItemWrapper,
                                    {backgroundColor: theme.secondary},
                                  ]}>
                                  <View
                                    style={[
                                      styles.orderedItemNameAndPriceWrapper,
                                    ]}>
                                    <View style={styles.orderedItemNameWrapper}>
                                      <Image
                                        source={{uri: imageUrl}}
                                        style={
                                          styles.mainCarouselFlatListItemImage
                                        }
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
                                        {productPrice.toFixed(2)} x{' '}
                                        {productQuantity}
                                      </Text>
                                    </View>
                                    <View>
                                      <Text
                                        style={[
                                          styles.orderedItemCost,
                                          {color: theme.accent},
                                        ]}>
                                        {productTotalPrice?.toFixed(2)}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              );
                            })
                          ) : (
                            <View style={styles.emptyimagewrapper}>
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

                      {/* <View style={styles.invoiceTotalAndTaxWrapper}>
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
                </View> */}
                    </View>
                  </View>
                </View>
                <Text style={[styles.orderedItemsLabel, {color: theme.accent}]}>
                  Suggested items
                </Text>
                <View style={styles.orderagainview}>
                  {/* {/ {isproduct.length > 0 ? /} */}
                  {isproduct && isproduct.length > 0 ? (
                    <>
                      {isproduct?.map((item, index) => {
                        console.log('ttttttttttttttt', item);
                        const totalAmountZero = item.PricePerItem
                          ? item.PricePerItem
                          : 0;
                        return (
                          <>
                            {/* {totalAmountZero 
                      
                      &&  */}

                            <View key={index} style={styles.OrderWrapper}>
                              <NotificationProduct
                                index={index}
                                item={item}
                                itemId={item.objectId}
                                itemImage={item.ImageUrl}
                                itemName={item.Name}
                                weight={item.Quantity}
                                discountedPrice={`${totalAmountZero} AED`}
                                itemQuantity={item.quantity}
                                productIncreases={val => {
                                  productIncreases(val);
                                }}
                                productDecrease={val => {
                                  productDecrease(val);
                                }}
                              />
                            </View>
                            {/* } */}
                          </>
                        );
                      })}

                      {/* <View style={styles.modalButtonWrapper}>
                    <Button
                      label="Cancel"
                      labelColor={theme.primary}
                      backgroundColor={theme.accent}
                      onPress={() => {
                        toggleCancelOrderModal();
                      }}
                    />
                    <Button
                      label="Confirm"
                      labelColor={theme.primary}
                      backgroundColor={theme.accent}
                      onPress={() => {
                        sendCancelOrderReason();
                      }}
                    />
                  </View> */}
                    </>
                  ) : (
                    <EmptyCart
                      message={'Product not Found'}
                      onPress={() => navigation.navigate('Home')}
                    />
                  )}
                </View>
                {isproduct && (
                  <View style={styles.modalButtonWrapper}>
                    <Button
                      label="Cancel"
                      labelColor={theme.primary}
                      backgroundColor={Colors.gray}
                      onPress={() => {
                        handleGOBack();
                      }}
                    />
                    <Button
                      label="Confirm"
                      labelColor={theme.primary}
                      backgroundColor={theme.accent}
                      onPress={() => {
                        confirmOrder();
                      }}
                    />
                  </View>
                )}
              </ScrollView>
            )}
          </>
        </View>
      )}
      {/* {loading && <Indicators />} */}
    </>
  );
};

export default Notification;
