import {useContext, useEffect, useRef} from 'react';
import {View, ScrollView, SafeAreaView} from 'react-native';
import CartItemCard from '../../components/cards/CartItemCard';
import {ThemeContext} from '../../theming/ThemeContext';
import Button from '../../components/buttons/Button';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header';
import mainStyles from '../../constants/MainStyles';
import Constants from '../../constants/Constants';
import {
  addToCart,
  decreaseQuantity,
  logoutToCart,
  removeFromCart,
} from '../../redux/slices/ProductsCartSlice';
import EmptyCart from '../../components/emptyCart/EmptyCart';
import {updateUser} from '../../redux/slices/SessionUser';
import {deliveryCharges} from '../../constants/helperFunction';

// Functional component
const Cart = ({navigation}) => {
  const productCart = useSelector(state => state.productCart.cartItems);
  const userInfo = useSelector(state => state.users.users);

  const dispatch = useDispatch();

  const ref = useRef();

  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  const handleIncreaseButtonClick = val => {
    const isDatata = {
      Barcode: val?.Barcode ? val?.Barcode : '',
      BranchIndex: val?.BranchIndex ? val?.BranchIndex : '',
      Category: val?.Category ? val?.Category : '',
      ImageID: val?.ImageID ? val?.ImageID : '',
      ImageName: val?.ImageName ? val?.ImageName : 'null',

      IsInStock: val?.IsInStock ? val?.IsInStock : true,
      IsInStore: val?.IsInStore ? val?.IsInStore : true,
      IsSelectedByBrand: val?.IsSelectedByBrand ? val?.IsSelectedByBrand : true,
      LowercaseName: val?.LowercaseName
        ? val?.LowercaseName
        : val?.Product
        ? val?.Product
        : '',
      Name: val?.Name ? val?.Name : val?.Product,
      ParentCategory: val?.ParentCategory ? val?.ParentCategory : 'null',
      Price: val?.Price ? val?.Price : 0,
      Priority: val?.Priority ? val?.Priority : '',
      Quantity: val?.Quantity ? val?.Quantity : '',
      createdAt: val?.createdAt
        ? val?.createdAt
        : {__type: 'Date', iso: new Date()},
      isGramBased: val?.isGramBased ? val?.isGramBased : false,
      objectId: val?.objectId ? val?.objectId : val?.ProductId,
      updatedAt: val?.updatedAt
        ? val?.updatedAt
        : {__type: 'Date', iso: new Date()},

      // PromotionId: promotion ? promotionData?.objectId : '',
      // PromotionTitle: promotion ? promotionData?.Title : '',
      // PromotionType: promotion ? promotionData?.PromotionType : '',
      // PricePerItem: promotion ? val?.Price : '',
      // DiscountedPricePerItem: promotion ? val?.newPrice : '',
      Vat: '',
      Plu: '',
    };

    const productTotalAmount = userInfo.productTotalAmount + val.Price;
    dispatch(addToCart(isDatata));
    dispatch(updateUser({productTotalAmount: productTotalAmount}));
  };

  const handleDecreasebuttonClick = val => {
    const productTotalAmount = userInfo.productTotalAmount - val.Price;
    dispatch(decreaseQuantity(val.objectId));
    dispatch(updateUser({productTotalAmount: productTotalAmount}));

    if (productTotalAmount <= 0) {
      dispatch(updateUser({productTotalAmount: 0}));
      dispatch(logoutToCart());
    }
  };
  const handleDeleteItem = ({item, quantity}) => {
    const totalPrice = item.Price * quantity;
    const productTotalAmount = userInfo.productTotalAmount - totalPrice;

    dispatch(removeFromCart(item.objectId));
    dispatch(updateUser({productTotalAmount: productTotalAmount}));
    if (productTotalAmount <= 0) {
      dispatch(updateUser({productTotalAmount: 0}));
      dispatch(logoutToCart());
      // }
    } else {
    }
  };
  useEffect(() => {
    if (ref.current) {
      ref.current?.play();
    }
  }, [ref.current]);

  const handleCheckOut = async () => {
    console.log("userInfo?.selectedStoreData",userInfo?.selectedStoreData?.minOrderAmount > userInfo.productTotalAmount);
    if (userInfo?.selectedStoreData?.minOrderAmount <= userInfo.productTotalAmount) {
     
      await deliveryCharges(userInfo?.selectedStoreData)
        .then(val => {
          dispatch(updateUser({deliveryCharges: val}));
          navigation.navigate('Invoice');
        })
        .catch(err => {
          console.log('catch', err);
        });
    }else{
      alert('Minimum Order amount is AED '+userInfo?.selectedStoreData?.minOrderAmount+'.')
    }
  };
  // Returning
  return (
    <SafeAreaView style={mainStyles.container}>
      <Header
        back
        onLeftPress={() => navigation.navigate('Home')}
        title={'Cart'}
      />

      {/* Scrollview */}
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {productCart.length > 0 ? (
          productCart.map((item, index) => {
            const imageUrl = item?.item?.productImageUrl
              ? item?.item?.productImageUrl
              : Constants.imageNotFound;
            return (
              <View
                key={'item.id' + index}
                style={[
                  index === 0 &&
                    styles.cartItemCardComponentWrapperWithTopMargin,
                  styles.cartItemCardComponentWrapper,
                ]}>
                <CartItemCard
                  cardBackgroundColor={theme.secondary}
                  trashButtonBackgroundColor={theme.secondary}
                  itemImageBackgroundColor={theme.primary}
                  item={item}
                  itemImage={imageUrl}
                  itemName={item.item.Name}
                  itemNameColor={theme.textHighContrast}
                  itemPrice={`${item.item.Price} AED`}
                  itemPriceColor={theme.textHighContrast}
                  itemQuantity={item.quantity}
                  itemQuantityColor={theme.textLowContrast}
                  IncreaseButton={() => handleIncreaseButtonClick(item.item)}
                  Decreasebutton={() => handleDecreasebuttonClick(item.item)}
                  actionButtonBackgroundColor={theme.primary}
                  quantity={item.item.Quantity}
                  deleteItem={() =>
                    handleDeleteItem({item: item.item, quantity: item.quantity})
                  }
                />
              </View>
            );
          })
        ) : (
          <EmptyCart onPress={() => navigation.navigate('Home')} />
        )}
        {/* Checkout button */}
        {productCart.length > 0 ? (
          <View
            style={[styles.checkoutButtonComponentWrapper, {marginBottom: 10}]}>
            <Button
              label={'Checkout'}
              labelColor={theme.primary}
              backgroundColor={theme.accent}
              onPress={() => {
                if (userInfo.sessionToken) {
                  handleCheckOut();
                } else {
                  navigation.navigate('AuthStack');
                }
              }}
            />
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

// Exporting
export default Cart;
