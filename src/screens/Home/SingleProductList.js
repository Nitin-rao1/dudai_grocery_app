import React from 'react';
import {View, ActivityIndicator, FlatList} from 'react-native';
import styles from './styles';
import {scale} from 'react-native-size-matters';
import Colors from '../../constants/Colors';
import {memo, useEffect, useState} from 'react';
import {getTopSellingList} from '../../api/categories/categoriesAndProduct';
import {useStore} from 'react-redux';
import OrderItems from '../../components/cards/OrderagainitemCard/OrderItems';
import Header from '../../components/Header';
import NotProductFound from '../../components/emptyCart/NotProductFound';

// Functional component
const SingleProductList = ({route, navigation}) => {
  const store = useStore();

  const [page, setPage] = useState(2);
  const [visibleData, setVisibleData] = useState(route?.params?.data || []);
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = store.getState().users.users;

  const onPressLocation = () => {
    navigation.navigate('Cart');
  };

  useEffect(() => {
    getTopProduct();
  }, [page]);

  const getTopProduct = async () => {
    const formData = {
      StoreId: userInfo?.selectedStoreData?.StoreId,
      page: page,
    };

    await getTopSellingList(formData)
      .then(res => {
        const jsonData = res.result.data;

        setVisibleData(prevVisibleData => [...prevVisibleData, ...jsonData]);

        setIsLoading(false);
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      setTimeout(() => {
        setVisibleData(prevVisibleData => [...prevVisibleData]);
      }, 100);
    });
    return focusHandler;
  }, [navigation]);

  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.OrderWrapper}>
        <OrderItems
          index={index}
          item={item}
          itemId={item.objectId}
          itemImage={item.productImageUrl}
          itemName={item.Name}
          weight={item.Quantity}
          discountedPrice={`${item.Price} AED`}
          itemQuantity={item.quantity}
          productCartQuntity={item.isProductCardMatch}
          onPress={() =>
            navigation.navigate('Product', {
              product: item,
              productImage: item.productImageUrl,
              productName: item.Name,
              productQuantity: item.Quantity,
              productDiscountPrice: item.Price,
              productAddCartQuntity: item.isProductCardMatch,
              productDiscription: item.Description
                ? item.Description
                : item.Name,
            })
          }
        />
      </View>
    );
  };
  const handleEndReached = () => {
    if (route.params.totalItems > visibleData.length) {
      setPage(pre => pre + 1);
      setIsLoading(true);
    } else {
      setIsLoading(false);
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
        {isLoading == false && (
          <>
            <NotProductFound />
            <View style={{marginBottom: hp('15')}} />
          </>
        )}
      </View>
    );
  };
  return (
    <View style={styles.mainWrapper}>
      <Header
        back
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => onPressLocation()}
        rightIcon
        title={route?.params?.lable}
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
    </View>
  );
};

// Exporting
export default memo(SingleProductList);
