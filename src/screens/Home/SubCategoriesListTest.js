import {View, Text, Image, Pressable, ScrollView} from 'react-native';
import styles from './styles';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {scale} from 'react-native-size-matters';
import Link from '../../components/links/Link';
import Colors from '../../constants/Colors';
import {memo, useContext, useEffect, useState} from 'react';
import {
  getAllImages,
  getCategories,
} from '../../api/categories/categoriesAndProduct';
import {useDispatch, useSelector} from 'react-redux';
import {
  UpdateCategoriesData,
  setCategoriesData,
} from '../../redux/slices/CategoriesSlice';
// import {UpdateAllImages, setAllImages} from '../../redux/slices/AllImagesSlice';
import CategoriesData, {SubCategoriesListData} from '../../data/CategoriesData';
import HomeCategoriesItemCard from '../../components/cards/HomeCategoriesItemCard';
import {ThemeContext} from '../../theming/ThemeContext';
import {IndependentColors} from '../../config/Colors';
import OrderItems from '../../components/cards/OrderagainitemCard/OrderItems';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';

// Functional component
const SubCategoriesList = ({navigation}) => {
  const categories = useSelector(state => state.categories.categories);
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme modet
  const theme = isLightTheme ? lightTheme : darkTheme;
  // console.log("categories",categories);
  const [subcategoryData, setSubcategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleData, setVisibleData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(0);
  const dispatch = useDispatch();
  //   useEffect(() => {
  //     getCategories()
  //       .then(item => {
  //         dispatch(setCategoriesData(item.result.data));
  //       })
  //       .catch(() => {});
  //   }, []);

  const [index, setIndex] = useState(0);
  const [routes] = useState(
    SubCategoriesListData.map((subcategory, index) => ({
      key: `${index}`,
      title: subcategory.Name,
    })),
  );

  const renderScene = ({route}) => {
    const subcategory = SubCategoriesListData.find(s => s.Name === route.title);
    // console.log('subcategory.product', subcategory.product);

    const productList = subcategory.product.slice(0, 10);
    return (
      <ScrollView horizontal>
        {/* <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>{route.title}</Text> */}

        {productList.map((item, index) => {
          return (
            <View key={index} style={styles.OrderWrapper}>
              <OrderItems
                index={index}
                item={item}
                itemId={item.objectId}
                favourite={item.favourite}
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
                    productFavorite: item.favourite,
                    productDiscription: item.Description
                      ? item.Description
                      : item.Name,
                    isBackData: true,
                  })
                }
              />
            </View>
          );
        })}
      </ScrollView>
    );
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      //   indicatorStyle={{ backgroundColor: 'red' }}
      //   style={{ backgroundColor: 'white',}}
      //   labelStyle={{ color: 'black' }}
      scrollEnabled={true}
      {...props}
      indicatorStyle={{backgroundColor: Colors.primary, height: 2}} // Customize the indicator style
      style={{backgroundColor: 'white', elevation: 0, shadowOpacity: 0}} // Customize the background style
      labelStyle={{color: 'black', fontSize: 16, fontWeight: 'bold'}} // Customize the label style
      renderLabel={({route, focused, color}) => (
        <Text
          style={{
            color: focused ? Colors.primary : Colors.black,
            textAlign: 'center',
          }}>
          {route.title}
        </Text>
      )} // Customize the label rendering
    />
  );

  return (
    <>
      <View style={styles.sectionTitleAndLinkWrapper}>
        <Text style={[styles.sectionTitle, {color: theme.textHighContrast}]}>
        Most Popular Categories
        </Text>
        <Link
          label="See all"
          labelColor={theme.accent}
          onPress={() => navigation.navigate('Categories')}
        />
      </View>
      {/* <ScrollView horizontal>
      {SubCategoriesListData.map((subcategory) => (
        <View key={subcategory.objectId} style={{ marginRight: 20, flexDirection: 'column' }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>{subcategory.Name}</Text>
          <ScrollView horizontal>
            {subcategory.product.map((product) => (
              <View key={product.objectId} style={{ marginRight: 10 }}>
                <Text>{product.Name}</Text>
                <Image source={{ uri: product.productImageUrl }} style={{ width: 100, height: 100 }} />
              </View>
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView> */}
      <View style={{flex: 1}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          swipeEnabled={false}
        />
      </View>
      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.categoriesContainer}>
    
        {SubCategoriesListData.map((subCategory, index) => {
             const productList = subCategory.product.slice(0, 10);
          return (

              <>
               <View key={subCategory.objectId} style={{ marginRight: 20, flexDirection: 'row' }}>
            <Pressable
            key={index}
            onPress={() => {
              
            }}
            style={[
              styles.categoryButton,
              {
                backgroundColor:
                  index == selectedSubCategory
                    ? Colors.primary
                    : IndependentColors.white,
              },
            ]}>
            <Text
              style={[
                styles.categoryButtonText,
                {
                  color:
                    index == selectedSubCategory
                      ? IndependentColors.white
                      : IndependentColors.black,
                },
              ]}>
              {subCategory.Name}
            </Text>
          </Pressable>
          <ScrollView vertical style={{  }}>
              {productList.map((item, index)=>{
                  return(
                    <View key={index} style={styles.OrderWrapper}>
                    <OrderItems
                      index={index}
                      item={item}
                      itemId={item.objectId}
                      favourite={item.favourite}
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
                          productFavorite: item.favourite,
                          productDiscription: item.Description
                            ? item.Description
                            : item.Name,
                          isBackData: true,
                        })
                      }
                    />
                  </View>
                  )
              })}
              </ScrollView>
              </View>
              </>
          );
        })}
      </ScrollView> */}
    </>
  );
};

// Exporting
export default memo(SubCategoriesList);
