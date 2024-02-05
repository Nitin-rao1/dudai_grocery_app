import React from 'react';
import {View, ActivityIndicator, FlatList} from 'react-native';
import styles from './styles';
import {scale} from 'react-native-size-matters';
import Colors from '../../constants/Colors';
import {memo, useEffect, useState} from 'react';
import {getProductPaginationList} from '../../api/categories/categoriesAndProduct';
import {useStore} from 'react-redux';
import OrderItems from '../../components/cards/OrderagainitemCard/OrderItems';
import Header from '../../components/Header';
import {Indicators} from '../../components/apploader';
import NotProductFound from '../../components/emptyCart/NotProductFound';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Functional component
const ProductPagination = ({route, navigation}) => {
  const store = useStore();
  const userInfo = store.getState().users.users;
  const routeData = route.params.routeData;
  const lable = routeData.lable;
  const endPoint = routeData?.endPoint;
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [visibleData, setVisibleData] = useState([]);

  const onPressLocation = () => {
    navigation.navigate('Cart');
  };

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      setTimeout(() => {
        setVisibleData(prevVisibleData => [...prevVisibleData]);
      }, 100);
    });
    return focusHandler;
  }, [navigation]);

  useEffect(() => {
    getProduct();
  }, [page]);

  const getProduct = async () => {
    const formData = {
      ...routeData.formData,
      ...{page: page},
    };

    await getProductPaginationList(formData, endPoint)
      .then(res => {
        const jsonData = res.result.data;
        setTotalCount(res.result.count);
        setVisibleData(prevVisibleData => [...prevVisibleData, ...jsonData]);
        setLoading(false);
        setIsLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setTotalCount(0);
        setVisibleData([]);
        setIsLoading(false);
      });
  };

  const renderItem = ({item, index}) => {
    // const favIS = followData.some(value => value == item.objectId);

    return (
      <View key={index} style={styles.OrderWrapper}>
        <OrderItems
          index={index}
          item={item}
          itemId={item.objectId}
          // favourite={favIS}
          itemImage={item.productImageUrl}
          itemName={item.Name}
          weight={item.Quantity}
          discountedPrice={`${item.Price} AED`}
          itemQuantity={item.quantity}
          productCartQuntity={item.isProductCardMatch}
          //   userInfo={userInfo}
          onPress={() =>
            navigation.navigate('Product', {
              product: item,
              productImage: item.productImageUrl,
              productName: item.Name,
              productQuantity: item.Quantity,
              // productOrignalPrice: item.Price,
              productDiscountPrice: item.Price,
              productAddCartQuntity: item.isProductCardMatch,
              // productFavorite: favIS,
              productDiscription: item.Description
                ? item.Description
                : item.Name,
              isBackData: true,
            })
          }
        />
      </View>
    );
  };
  const handleEndReached = () => {
    if (totalCount !== 0) {
      if (totalCount > visibleData.length) {
        setPage(pre => pre + 1);
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
    }
  };

  const myListEmpty = () => {
    return (
      <View
        style={{
          backgroundColor: Colors.white,
          height: hp('100'),
          width: wp('100'),
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          alignContent: 'center',
        }}>
        {loading == false && isLoading == false && (
          <>
            <NotProductFound />
            <View style={{marginBottom: hp('15')}} />
          </>
        )}
      </View>
    );
  };
  return (
    <>
      <View style={styles.mainWrapper}>
        <Header
          back
          onLeftPress={() => navigation.goBack()}
          onRightPress={() => onPressLocation()}
          rightIcon
          title={lable}
          RightIconName={'cart'}
          iconType={'MaterialCommunityIcons'}
          headerBg={Colors.primary}
          iconColor={Colors.white}
          titleAlight={'center'}
        />

        <FlatList
          data={visibleData}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.objectId}-${index}`}
          ListEmptyComponent={myListEmpty}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => (
            <>
              {isLoading ? (
                <>
                  <ActivityIndicator size="large" />
                </>
              ) : null}
              {userInfo?.sessionToken && (
                <View style={{marginBottom: scale(100)}} />
              )}
            </>
          )}
        />
        {loading && <Indicators />}
      </View>
    </>
  );
};

// Exporting
export default memo(ProductPagination);
