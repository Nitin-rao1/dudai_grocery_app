import {View, Text, Image, Pressable} from 'react-native';
import Link from '../../components/links/Link';
import Colors from '../../constants/Colors';
import {useEffect} from 'react';
import {getCategories} from '../../api/categories/categoriesAndProduct';
import {useDispatch, useSelector} from 'react-redux';
import {setCategoriesData} from '../../redux/slices/CategoriesSlice';
import styles from './styles';

// Functional component
const Categories = ({
  navigation,
  length,
  wishList,
  productCart,
  userInfo,
  refresh,
}) => {
  const categories = useSelector(state => state.categories.categories);

  const isData = length ? categories?.slice(0, length) : categories;
  const dispatch = useDispatch();
  useEffect(() => {
    getCategories()
      .then(item => {
        dispatch(setCategoriesData(item.result.data));
      })
      .catch(() => {});
  }, [refresh]);
  return (
    <>
      <View style={styles.sectionTitleAndLinkWrapper}>
        <Text style={[styles.sectionTitle, {color: Colors.textHighContrast}]}>
          Categories
        </Text>
        <Link
          label="See all"
          labelColor={Colors.primary}
          onPress={() => navigation.navigate('Categories')}
        />
      </View>
      <View style={styles.categoryview}>
        {isData?.map((item, index) => {
          return (
            <Pressable
              key={index}
              onPress={() =>
                navigation.navigate('ListViewProducts', {
                  lable: item?.Name,
                  categoryId: item.objectId,
                  productCart: productCart,
                  wishList: wishList,
                  userInfo: userInfo,
                })
              }>
              <View style={styles.restaurantWrapper}>
                <View style={styles.restaurantImageWrapper}>
                  <Image
                    source={{uri: item?.ImageUrl}}
                    style={styles.restaurantImage}
                  />
                </View>
                <View style={styles.restaurantDistanceWrapper}>
                  <Text
                    style={[styles.restaurantDistance, {color: Colors.white}]}>
                    {item?.Name}
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </>
  );
};

// Exporting
export default Categories;
