import {useContext, useRef, useCallback, useState, useEffect} from 'react';
import {View, Text, ScrollView, Image, Pressable} from 'react-native';
import {scale} from 'react-native-size-matters';
import {ThemeContext} from '../../theming/ThemeContext';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {IndependentColors} from '../../config/Colors';
import ButtonCircled from '../../components/buttons/ButtonCircled';
import ButtonSquared from '../../components/buttons/ButtonSquared';
import DoubleArrowLeft from '../../assets/icons/svg/DoubleArrowLeft.svg';
import DoubleArrowRight from '../../assets/icons/svg/DoubleArrowRight.svg';
import Plus from '../../assets/icons/svg/Plus.svg';
import Minus from '../../assets/icons/svg/Minus.svg';
import BadgePill from '../../components/badges/BadgePill';
import Button from '../../components/buttons/Button';
// import {ProductSliderData} from '../../data/ProductSliderData';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
  withSpring,
  log,
} from 'react-native-reanimated';
import {SCREEN_WIDTH, STANDARD_VECTOR_ICON_SIZE} from '../../config/Constants';
import styles from './styles';
import Header from '../../components/Header';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import Constants from '../../constants/Constants';
import mainStyles from '../../constants/MainStyles';
import Colors from '../../constants/Colors';
import {addToFavorite} from '../../redux/slices/WishlistSlice';
import {
  addToCart,
  decreaseQuantity,
  logoutToCart,
} from '../../redux/slices/ProductsCartSlice';
import {updateUser} from '../../redux/slices/SessionUser';
import {setSubCategoriesData} from '../../redux/slices/SubCategoriesSlice';

// Functional component
const Product = ({navigation, route}) => {
  const userInfo = useSelector(state => state.users.users);

  const {
    product,
    productImage,
    productName,
    productQuantity,
    productOrignalPrice,
    productDiscountPrice,
    productAddCartQuntity,
    productFavorite,
    productDiscription,
    promotion,
    promotionData,
  } = route?.params;

  // Log the data
  const dispatch = useDispatch();
  const [isFavourite, setIsFavourite] = useState(false);
  const [isQuantity, setIsQuantity] = useState(0);
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  const QTY = productQuantity ? productQuantity : '1';
  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  // Declaring shared value
  const scrollX = useSharedValue(0);

  // Declaring current index of the slide
  const currentIndex = useRef(0);

  // Defining reference for the Flatlist
  const flatListRef = useRef(null);

  const store = useStore();
  useEffect(() => {
    const wishList = store.getState().wishList.wishList;
    const productCart = store.getState().productCart.cartItems;
    const matchedObjectFavourite = wishList?.find(
      find => find.objectId == product.objectId,
    );
    const isFavouriteMatch = matchedObjectFavourite ? true : false;
    const matchedObjectProductCard = productCart?.find(
      find => find.item.objectId == product.objectId,
    );
    const isProductCardMatch = matchedObjectProductCard?.quantity
      ? matchedObjectProductCard?.quantity
      : 0;
    setIsFavourite(isFavouriteMatch);
    setIsQuantity(isProductCardMatch);
  }, []);
  // Handling scroll of the flat list
  const scrollHandler = useAnimatedScrollHandler(event => {
    // Storing scrolled offset value of the x direction
    scrollX.value = withSpring(event.contentOffset.x);
  });

  //
  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length === 0) {
      return;
    }

    currentIndex.current = viewableItems[0].index;
  }, []);

  // Declaring viewability config for the Flatlist
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 100,
  };

  // Declaring viewability config callback pairs for the Flatlist
  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig, onViewableItemsChanged},
  ]);

  // Retrieve the passed parameters

  const handleIncreaseButtonClick = (val, img) => {
    const myProductPrice = promotion ? val.newPrice : val?.Price ? val?.Price : 0
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
      Price: myProductPrice,
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

      PromotionId: promotion ? promotionData?.objectId : '',
      PromotionTitle: promotion ? promotionData?.Title : '',
      PromotionType: promotion ? promotionData?.PromotionType : '',
      PricePerItem: promotion ? val?.Price : '',
      DiscountedPricePerItem: promotion ? val?.newPrice : '',
      Vat: '',
      Plu: '',
    };
    const productImageUrl = img;
    const productTotalAmount = userInfo.productTotalAmount + myProductPrice;

    dispatch(addToCart({...isDatata, productImageUrl: productImageUrl}));
    dispatch(updateUser({productTotalAmount: productTotalAmount}));
    setIsQuantity(isQuantity + 1);

    dispatch(updateUser({refreshCategoriesPage: true}));
  };

  const handleDecreaseButtonClick = val => {
    const productTotalAmount = userInfo.productTotalAmount - val.Price;
    if (isQuantity != 0) {
      dispatch(decreaseQuantity(val.objectId));
      dispatch(updateUser({productTotalAmount: productTotalAmount}));
      setIsQuantity(isQuantity - 1);
      dispatch(updateUser({refreshCategoriesPage: true}));
    }
    if (productTotalAmount <= 0) {
      dispatch(updateUser({productTotalAmount: 0}));
      dispatch(logoutToCart());
    }
  };

  const handleFavourites = (val, img) => {
    const isData = {
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
      Price: promotion ? val.newPrice : val?.Price ? val?.Price : 0,
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

      PromotionId: promotion ? promotionData?.objectId : '',
      PromotionTitle: promotion ? promotionData?.Title : '',
      PromotionType: promotion ? promotionData?.PromotionType : '',
      PricePerItem: promotion ? val?.Price : '',
      DiscountedPricePerItem: promotion ? val?.newPrice : '',
      Vat: '',
      Plu: '',
    };
    const productImageUrl = img;

    dispatch(addToFavorite({...isData, productImageUrl: productImageUrl}));
    setIsFavourite(!isFavourite);
    dispatch(updateUser({refreshCategoriesPage: true}));
  };

  const onPressLocation = () => {
    navigation.navigate('Cart');
  };
  // Returning

  const onHandleBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.mainWrapper}>
      <Header
        back
        onLeftPress={() => onHandleBack()}
        onRightPress={onPressLocation}
        rightIcon
        // cartItemsLength={cartlength.length}
        title={route?.name}
        RightIconName={'cart'}
        iconType={'MaterialCommunityIcons'}
        headerBg={Colors.primary}
        iconColor={IndependentColors.white}
        titleAlight={'center'}
      />

      <View style={styles.carouselWrapper}>
        {/* Navigation controls */}

        {/* Animated flatlist */}
        <Animated.FlatList
          ref={flatListRef}
          data={[1]}
          renderItem={({item, index}) => (
            <ProductSliderItem
              index={index}
              scrollX={scrollX}
              image={productImage ? productImage : Constants.imageNotFound} //change to ? item.image : null
              slideBgColor={item.slide_bg_color}
              itemImageBgColor={item.item_bg_color}
            />
          )}
          keyExtractor={item => item.id}
          style={styles.flatlist}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          scrollEnabled={false}
        />
      </View>

      <View
        style={[styles.itemDetailsWrapper, {backgroundColor: theme.primary}]}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View style={styles.itemTitleRatingWrapper}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={[styles.itemTitle, {color: theme.textHighContrast}]}>
              {productName}
            </Text>

            <ButtonCircled
              height={scale(30)}
              icon={
                <IonIcons
                  name={isFavourite ? 'heart' : 'heart-outline'}
                  size={STANDARD_VECTOR_ICON_SIZE}
                  color={isFavourite ? Colors.error : Colors.textHighContrast}
                />
              }
              backgroundColor={theme.secondary}
              onPress={() => {
                handleFavourites(product, productImage);
              }}
            />
          </View>

          <View style={styles.badgePillComponentWrapper}>
            <BadgePill
              label={'Qty: ' + QTY}
              labelColor={IndependentColors.red}
              viewStyle={mainStyles.width30}
              // backgroundColor={IndependentColors.redLightest}
            />
          </View>

          <Text style={[styles.sectionTitle, {color: theme.textHighContrast}]}>
            Price
          </Text>

          <View style={styles.itemPriceAndQunatityWrapper}>
            <View style={styles.itemPriceWrapper}>
              {productOrignalPrice && (
                <Text style={[styles.itemOriginalPrice, {color: theme.accent}]}>
                  {productOrignalPrice} AED
                </Text>
              )}
              <Text
                style={[
                  styles.itemDiscountedPrice,
                  {color: theme.textHighContrast},
                ]}>
                {productDiscountPrice} AED
              </Text>
            </View>

            <View style={styles.itemQuantityWrapper}>
              {/* Decrease button */}
              <ButtonSquared
                height={32}
                icon={
                  <Minus
                    width={STANDARD_VECTOR_ICON_SIZE}
                    height={STANDARD_VECTOR_ICON_SIZE}
                  />
                }
                backgroundColor={theme.secondary}
                onPress={() => handleDecreaseButtonClick(product)}
              />
              {/* Quantity */}
              <Text
                style={[styles.itemQuantity, {color: theme.textHighContrast}]}>
                {isQuantity}
              </Text>
              {/* Increase button */}
              <ButtonSquared
                height={32}
                icon={
                  <Plus
                    width={STANDARD_VECTOR_ICON_SIZE}
                    height={STANDARD_VECTOR_ICON_SIZE}
                  />
                }
                backgroundColor={theme.secondary}
                onPress={() => {
                  handleIncreaseButtonClick(product, productImage);
                }}
              />
            </View>
          </View>

          <Text style={[styles.sectionTitle, {color: theme.textHighContrast}]}>
            Description
          </Text>

          <Text
            style={[styles.itemDescription, {color: theme.textLowContrast}]}>
            {productDiscription}
          </Text>

          {/* Submit button */}
          <View style={styles.submitButtonComponentWrapper}>
            <Button
              label={'Add To Cart'}
              labelColor={theme.primary}
              backgroundColor={theme.accent}
              onPress={() => {
                handleIncreaseButtonClick(product, productImage);
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

// Functional component
const ProductSliderItem = ({
  index,
  scrollX,
  image,
  slideBgColor,
  itemImageBgColor,
}) => {
  // Defining
  const itemImageWrapperSize = SCREEN_WIDTH * 0.45;
  const itemImageSize = itemImageWrapperSize / 1.5;

  // Declaring input range to avoid its duplication
  const inputRange = [
    (index - 1) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 1) * SCREEN_WIDTH,
  ];
  const scaleAndOpacityOutputRange = [0, 1, 0];

  // Defining item wrapper animated styles using useAnimatedStyle hook
  const itemImageWrapperAnimatedStyle = useAnimatedStyle(() => {
    // Scale
    const scale = interpolate(
      scrollX.value,
      inputRange,
      scaleAndOpacityOutputRange,
      Extrapolate.CLAMP,
    );

    // Opacity
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      scaleAndOpacityOutputRange,
      Extrapolate.CLAMP,
    );

    // Border radius
    const borderRadius = interpolate(
      scrollX.value,
      inputRange,
      [0, itemImageWrapperSize * 0.5, 0],
      Extrapolate.CLAMP,
    );

    // Returning animated styles
    return {
      transform: [
        {
          scale,
        },
      ],
      opacity,
      borderRadius,
    };
  });

  // Defining item image animated styles using useAnimatedStyle hook
  const itemImageAnimatedStyle = useAnimatedStyle(() => {
    // Translate Y
    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [SCREEN_WIDTH, 0, -SCREEN_WIDTH],
      Extrapolate.CLAMP,
    );

    // Opacity
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP,
    );

    // Returning animated styles
    return {
      transform: [
        {
          translateY,
        },
      ],
      opacity,
    };
  });

  // Returning
  return (
    <View
      style={[
        styles.carouselItemWrapper,
        {width: SCREEN_WIDTH, backgroundColor: slideBgColor},
      ]}>
      <Animated.View
        style={[
          styles.carouselItemImageWrapper,
          {
            width: itemImageWrapperSize,
            aspectRatio: 1,
            backgroundColor: itemImageBgColor,
          },
          itemImageWrapperAnimatedStyle,
        ]}>
        <Animated.Image
          style={[
            {
              flex: 1,
              width: itemImageSize,
              height: itemImageSize,
              resizeMode: 'contain',
            },
            itemImageAnimatedStyle,
          ]}
          source={{uri: image}}
        />
      </Animated.View>
    </View>
  );
};

// Exporting
export default Product;
