import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import styles from './styles';
import {scale} from 'react-native-size-matters';
import Colors from '../../constants/Colors';
import {memo, useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {subCategoriesList} from '../../api/categories/categoriesAndProduct';
import {useStore} from 'react-redux';
import Header from '../../components/Header';
import {Indicators} from '../../components/apploader';
import NotProductFound from '../../components/emptyCart/NotProductFound';

// Functional component
const PopularSubCategoriesList = ({route, navigation}) => {
  const store = useStore();
  const userInfo = store.getState().users.users;

  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [visibleData, setVisibleData] = useState([]);

  const onPressLocation = () => {
    navigation.navigate('Cart');
  };

  useEffect(() => {
    getProduct();
  }, [page]);

  const getProduct = async () => {
    const formData = {
      page: page,
    };
    await subCategoriesList(formData)
      .then(res => {
        const jsonData = res.result.data;
        setTotalCount(res.result.count);
        setVisibleData(pre => [...pre, ...jsonData]);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const renderItem = ({item, index}) => {
    // const favIS = followData.some(value => value == item.objectId);

    return (
      <Pressable
        key={index}
        onPress={() => {
          const isData = {
            endPoint: 'getProductBySub',
            lable: item.Name,
            formData: {
              ParentCategory: item.ParentCategory,
              // subCategory: item.objectId,
              subCategory: 'All',
              page: 1,
              StoreId: userInfo?.selectedStoreData?.StoreId,
            },
          };

          navigation.navigate('ProductPagination', {
            routeData: isData,
          });
        }}>
        <View style={styles.restaurantWrapper}>
          <View style={styles.restaurantImageWrapper}>
            <Image
              source={{uri: item?.ImageUrl}}
              style={styles.restaurantImage}
            />
          </View>
          <View style={styles.restaurantDistanceWrapper}>
            <Text style={[styles.restaurantDistance, {color: Colors.white}]}>
              {item?.Name}
            </Text>
          </View>
        </View>
      </Pressable>
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
      {loading ? (
        <Indicators />
      ) : (
        <View style={styles.mainWrapper}>
          <Header
            back
            onLeftPress={() => navigation.goBack()}
            onRightPress={() => onPressLocation()}
            rightIcon
            title={'Most Popular Categories'}
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
            contentContainerStyle={{alignSelf: 'center'}}
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
      )}
    </>
  );
};

// Exporting
export default memo(PopularSubCategoriesList);
