import {View, Text, Pressable, FlatList} from 'react-native';
import styles from './styles';
import Link from '../../components/links/Link';
import {memo, useContext, useEffect, useState} from 'react';
import {getTopSellingList} from '../../api/categories/categoriesAndProduct';
import {useSelector} from 'react-redux';

import {ThemeContext} from '../../theming/ThemeContext';
import OrderItems from '../../components/cards/OrderagainitemCard/OrderItems';
import Icons from '../../components/cards/Icons/Icons';
import Colors from '../../constants/Colors';
import mainStyles from '../../constants/MainStyles';

// Functional component
const TopDiscountProduct = ({navigation, userInfo}) => {
  const wishList = useSelector(state => state.wishList.wishListID);
  const productCart = useSelector(state => state.productCart.cartItems);

  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  const [page, setPage] = useState(1);

  const [productList, setProductList] = useState([]);
  const [subList, setSubList] = useState([]);
  // Storing theme config according to the theme modet
  const theme = isLightTheme ? lightTheme : darkTheme;

  const getTopProduct = async () => {
    const formData = {
      StoreId: userInfo?.selectedStoreData?.StoreId,
      page: 1,
    };
    await getTopSellingList(formData)
      .then(res => {
        const jsonData = res.result.data;

        setSubList(jsonData.slice(0, 10));
        setPage(res.result.count);
        setProductList(jsonData);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    getTopProduct();
  }, []);

  const renderitem = ({item, index}) => {
    const isFav = wishList.some(value => value == item.objectId);
    const matchedObjectProductCard = productCart?.find(
      find => find.item.objectId == item.objectId,
    );
    const isProductCardMatch = matchedObjectProductCard?.quantity
      ? matchedObjectProductCard?.quantity
      : 0;

    return (
      <View key={index} style={styles.OrderWrapper}>
        <OrderItems
          index={index}
          item={item}
          itemId={item.objectId}
          favourite={isFav}
          itemQuantity={item.Quantity}
          itemImage={item.productImageUrl}
          itemName={item.Name}
          weight={item.Quantity}
          discountedPrice={`${item.Price} AED`}
          productCartQuntity={isProductCardMatch}
          onPress={() =>
            navigation.navigate('Product', {
              product: item,
              productImage: item.productImageUrl,
              productName: item.Name,
              productQuantity: item.Quantity,
              productDiscountPrice: item.Price,
              productAddCartQuntity: isProductCardMatch,
              productFavorite: item.favourite,
              productDiscription: item.Description
                ? item.Description
                : item.Name,
            })
          }
        />
      </View>
    );
  };

  return (
    <>
      {subList?.length > 0 && (
        <>
          <View style={styles.sectionTitleAndLinkWrapper}>
            <Text
              style={[styles.sectionTitle, {color: theme.textHighContrast}]}>
              Top Discount Product
            </Text>
            <Link
              label="See all"
              labelColor={theme.accent}
              onPress={() => {
                const isData = {
                  endPoint: 'getTopDiscountedProducts',
                  lable: 'Top Discount Product',
                  formData: {
                    // ParentCategory: parentID,
                    // subCategory: 'All', // All
                    page: 1,
                    StoreId: userInfo?.selectedStoreData?.StoreId,
                  },
                };

                navigation.navigate('ProductPagination', {
                  routeData: isData,
                });
              }}
            />
          </View>

          <FlatList
            data={subList?.slice(0, 10)}
            renderItem={renderitem}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentOffset={{x: 0, y: 0}}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            keyExtractor={item => item.objectId}
            ListFooterComponent={() => {
              return (
                <View style={styles.footerContainer}>
                  {subList.length > 8 && (
                    <>
                      <View style={styles.card}>
                        <Pressable
                          onPress={() => {
                            const isData = {
                              endPoint: 'getTopDiscountedProducts',
                              lable: 'Top Discount Product',
                              formData: {
                                // ParentCategory: parentID,
                                // subCategory: 'All', // All
                                page: 1,
                                StoreId: userInfo?.selectedStoreData?.StoreId,
                              },
                            };

                            navigation.navigate('ProductPagination', {
                              routeData: isData,
                            });
                          }}>
                          <Icons
                            iconType={'AntDesign'}
                            name={'rightcircleo'}
                            size={50}
                            color={Colors.primary}
                          />
                        </Pressable>
                      </View>
                    </>
                  )}
                  <View style={mainStyles.margin1} />
                </View>
              );
            }}
          />
        </>
      )}
    </>
  );
};

// Exporting
export default memo(TopDiscountProduct);
