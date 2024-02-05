import {View, Text, Pressable, ScrollView, FlatList} from 'react-native';
import styles from './styles';
import Link from '../../components/links/Link';
import Colors from '../../constants/Colors';
import {memo, useContext, useEffect, useRef, useState} from 'react';
import {getSubCategoriesList} from '../../api/categories/categoriesAndProduct';
import HomeCategoriesItemCard from '../../components/cards/HomeCategoriesItemCard';
import {ThemeContext} from '../../theming/ThemeContext';
import OrderItems from '../../components/cards/OrderagainitemCard/OrderItems';
import Icons from '../../components/cards/Icons/Icons';
import mainStyles from '../../constants/MainStyles';
import { useSelector } from 'react-redux';

// Functional component
const SubCategories = ({navigation, userInfo, refresh}) => {
  const wishList = useSelector(state => state.wishList.wishListID);
  const productCart = useSelector(state => state.productCart.cartItems);
  const scrollViewRef = useRef();
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
  const [active, setActive] = useState(0);
  const [parentID, setParentID] = useState('');
  const [lable, setLable] = useState('');
  const [productList, setProductList] = useState([]);
  const [subList, setSubList] = useState([]);

  // Storing theme config according to the theme modet
  const theme = isLightTheme ? lightTheme : darkTheme;

  const getSubCatProduct = async () => {
    const formData = {
      StoreId: userInfo?.selectedStoreData?.StoreId,
      page: 1,
    };
    await getSubCategoriesList(formData)
      .then(res => {
        setSubList(res.result.data);
        const productDatass =
          res.result.data[0].product?.length <= 10
            ? res.result.data[0].product
            : res.result.data[0]?.product.slice(0, 10);

        setProductList(productDatass);
        setLable(res.result.data[0].Name);
        setParentID(res.result.data[0]?.ParentCategory); //objectId is a ParentID
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    getSubCatProduct();
  }, [refresh]);

  const renderitem = ({item, index}) => {
    const isFav = wishList.some(value => value == item.objectId)
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
          itemImage={item.productImageUrl}
          itemName={item.Name}
          weight={item.Quantity}
          discountedPrice={`${item.Price} AED`}
          itemQuantity={item.quantity}
          productCartQuntity={isProductCardMatch}
          onPress={() =>
            navigation.navigate('Product', {
              product: item,
              productImage: item.productImageUrl,
              productName: item.Name,
              productQuantity: item.Quantity,
              productDiscountPrice: item.Price,
              productAddCartQuntity: isProductCardMatch,
              productFavorite: isFav,
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

  return (
    <>
      {subList.length > 0 && (
        <>
          <View style={styles.sectionTitleAndLinkWrapper}>
            <Text
              style={[styles.sectionTitle, {color: theme.textHighContrast}]}>
              Most Popular Categories
            </Text>
            <Link
              label="See all"
              labelColor={theme.accent}
              onPress={() => navigation.navigate('PopularSubCategoriesList')}
            />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.horizontalScrollView}>
            {/* Mapping categories data */}
            {subList.map((item, index) => (
              <HomeCategoriesItemCard
                key={index}
                item={item}
                index={index}
                cardBorderColor={
                  index === active ? theme.accent : theme.secondary
                }
                cardBackgroundColor={
                  index === active ? theme.accent : theme.primary
                }
                onPress={() => {
                  scrollViewRef.current.scrollToIndex({
                    index: 0,
                    animated: false,
                  });
                  setActive(index);
                  setProductList(item.product.slice(0, 10));
                  setLable(item.Name);
                  setParentID(item?.ParentCategory);
                }}
                imageBackgroundColor={
                  index === active ? theme.primary : theme.secondary
                }
                categoryImage={item.ImageUrl}
                categoryLabel={item.Name}
                categoryLabelColor={
                  index === active ? theme.primary : theme.textHighContrast
                }
              />
            ))}
            <View style={mainStyles.margin1} />
          </ScrollView>
          {productList?.length > 0 ? (
            <FlatList
              ref={scrollViewRef}
              data={productList}
              renderItem={renderitem}
              showsHorizontalScrollIndicator={false}
              horizontal
              contentOffset={{x: 0, y: 0}}
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              // onScroll={handleScroll}
              keyExtractor={item => item.objectId}
              ListFooterComponent={() => {
                return (
                  <View style={styles.footerContainer}>
                    {productList.length > 8 && (
                      <>
                        <View style={styles.card}>
                          <Pressable
                            onPress={() => {
                              const isData = {
                                endPoint: 'getProductBySub',
                                lable: lable,
                                formData: {
                                  ParentCategory: parentID,
                                  subCategory: 'All', // All
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
          ) : (
            <Text>Not Data found</Text>
          )}
        </>
      )}
    </>
  );
};

// Exporting
export default memo(SubCategories);
