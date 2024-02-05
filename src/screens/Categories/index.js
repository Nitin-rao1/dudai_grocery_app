import React, {useContext} from 'react';
import {View, ScrollView} from 'react-native';
// import CategoriesData from '../../data/CategoriesData';
import CategoryItemCard from '../../components/cards/CategoryItemCard';
import {ThemeContext} from '../../theming/ThemeContext';
import styles from './styles';
import {IndependentColors} from '../../config/Colors';
import { useSelector } from 'react-redux';
import mainStyles from '../../constants/MainStyles';

// Functional component
const Categories = ({navigation}) => {
  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
  const categories = useSelector(state => state.categories.categories);
  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;
  const productCart = useSelector(state => state.productCart.cartItems);
  const wishList = useSelector(state => state.wishList.wishList);
  const userInfo = useSelector(state => state.users.users);
  // Returning
  return (
    <View style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
      {/* Scrollview */}
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.categoryItemsWrapper}>
          {/* Mapping categories */}
          {categories?.map(
            (category, i) =>{
            //  console.log("category",category);
             return (
                <View
                  key={i}
                  >
                  <CategoryItemCard
                    label={category.Name}
                    // labelColor={IndependentColors.white}
                    image={category.ImageUrl}
                    // backgroundColor={theme.secondary}
                    onPress={() => {
                      // console.log('ccheck dassssss', CategoriesData);
                      navigation.navigate('ListViewProducts', {
                        lable: category?.Name,
                        categoryId: category.objectId,
                        productCart:productCart,
                        wishList:wishList,
                        userInfo:userInfo,
                        subCategoriesList:category?.Sub
                      });
                    }}
                  />
                </View>
              )
                  }
          )}
        </View>
      <View style={mainStyles.marginTop20}  />
      </ScrollView>

    </View>
  );
};

// Exporting
export default Categories;
