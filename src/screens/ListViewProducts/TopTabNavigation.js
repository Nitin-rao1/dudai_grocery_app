import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ScrollView} from 'react-native';
import {memo, useEffect, useState} from 'react';
import {Indicators} from '../../components/apploader';
import {useDispatch, useStore} from 'react-redux';
import {getSubCategories} from '../../api/categories/categoriesAndProduct';
import {setSubCategoriesData} from '../../redux/slices/SubCategoriesSlice';
import TopTabView from './TopTabView';
import Header from '../../components/Header';
import { updateUser } from '../../redux/slices/SessionUser';
const Tab = createMaterialTopTabNavigator();
function TopTabNavigation({navigation}) {
  const store = useStore();
  const [subcategoryData, setSubcategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleData, setVisibleData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    callApiForGetData();
  }, []);

  const callApiForGetData = () => {
    const data = {
      parentCategory: '91EhhzjORo',
      StoreId: 10,
    };
    setLoading(true);
    getSubCategories(data)
      .then(item => {
        const jsonData = item.result.SubCategories;
        const wishLists = store.getState().wishList.wishList;
        const productCarts = store.getState().productCart.cartItems;
        jsonData.forEach(subcategory => {
          subcategory.product.forEach(product => {
            const matchedObjectFavourite = wishLists?.find(
              find => find.objectId == product.objectId,
            );
            const isFavouriteMatch = matchedObjectFavourite ? true : false;
            const matchedObjectProductCard = productCarts?.find(
              find => find.item.objectId == product.objectId,
            );
            const isProductCardMatch = matchedObjectProductCard?.quantity
              ? matchedObjectProductCard?.quantity
              : 0;

            product.favourite = isFavouriteMatch;
            product.isProductCardMatch = isProductCardMatch;
          });
        });

        dispatch(setSubCategoriesData(jsonData));
        setSubcategoryData(jsonData);
        setSelectedSubCategory(0);
        setProductData(jsonData[0]?.product);
        setVisibleData(jsonData[0].product.slice(0, 30));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      const userInfos = store.getState().users.users.refreshCategoriesPage;
      // alert(userInfos)
      // callApiForGetData()
      if (userInfos == true) {
        // alert(categoryId)
        subCategoriesRefreshData()
       
      }
      // console.log("eeeeeeeeeeeeeeeeeeee",categoryId);
    });
    return focusHandler;
  }, [navigation]);

  const subCategoriesRefreshData =()=>{
    const subCategoriess = store.getState().subCategories.subCategories
    const wishLists = store.getState().wishList.wishList;
    const productCarts = store.getState().productCart.cartItems;
    const jsonData = subCategoriess;
    console.log("eeeeeeeeeeeeeeeeeeee",jsonData);
    jsonData.forEach(subcategory => {
      subcategory.product.forEach(product => {
        const matchedObjectFavourite = wishLists?.find(
          find => find.objectId == product.objectId,
        );
        const isFavouriteMatch = matchedObjectFavourite ? true : false;
        const matchedObjectProductCard = productCarts?.find(
          find => find.item.objectId == product.objectId,
        );
        const isProductCardMatch = matchedObjectProductCard?.quantity
          ? matchedObjectProductCard?.quantity
          : 0;

       
          product.favourite = isFavouriteMatch;
          product.isProductCardMatch = isProductCardMatch;
       
      });
    });
    dispatch(setSubCategoriesData(jsonData));
    setSubcategoryData(jsonData);
    setSelectedSubCategory(selectedSubCategory);
    setProductData(jsonData[0]?.product);
    setVisibleData(jsonData[0]?.product?.slice(0, 30));
     dispatch(updateUser({refreshCategoriesPage: false}));
  }
  const renderTabBarButton = props => {
    return (
        <TouchableOpacity {...props}>
            <Text style={{color: 'red'}}>{props.to}</Text>
        </TouchableOpacity>
    )
}
  const TAB_OPTIONS = {
    tabBarButton: renderTabBarButton
}
  return (
    <>
      {loading ? (
        <Indicators />
      ) : (
          <>
 <Header
        back
        onLeftPress={() => navigation.goBack()}
        onRightPress={()=>onPressLocation()}
        rightIcon
        title={'oute?.params?.lable'}
        RightIconName={'cart'}
        iconType={'MaterialCommunityIcons'}
        // headerBg={Colors.primary}
        // iconColor={IndependentColors.white}
        titleAlight={'center'}
      />
        <Tab.Navigator
          screenOptions={{
            tabBarScrollEnabled: true,
            lazy: true  ,
tabBarPressOpacity:1,
            swipeEnabled:false,
            tabBarIndicatorStyle: {
              backgroundColor: 'blue',
              height: 3,
            },
          }}>
          {subcategoryData.map((val, index) => (
            <Tab.Screen options={TAB_OPTIONS} key={index + 'topTab'} name={val.Name}>
              {props => <TopTabView {...props} data={val.product} />}
            </Tab.Screen>
          ))}

          {/* <Tab.Screen name="Settings" component={SubCategories} /> */}
        </Tab.Navigator>
        </>
      )}
    </>
  );
}
export default TopTabNavigation;

