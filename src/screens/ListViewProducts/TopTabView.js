import React, {memo, useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import { useDispatch } from 'react-redux';
import OrderItems from '../../components/cards/OrderagainitemCard/OrderItems';
import styles from './styles';


const TopTabView = ({route, data, navigation}) => {
    // const { userInfo} = route?.params;
    const [subcategoryData, setSubcategoryData] = useState([]);
    const [productData, setProductData] = useState(data);
    const [loading, setLoading] = useState(false);
    const [visibleData, setVisibleData] = useState(data.slice(0,30));
    const [isLoading, setIsLoading] = useState(false);
    const [selectedSubCategory, setSelectedSubCategory] = useState(0);
    const dispatch = useDispatch();
    const onPressLocation = () => {
      navigation.navigate('Cart');
    };
    const renderItem = ({item, index}) => {
        console.log('matchedObjectProductCard',index);
    
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
              discountedPrice={`${item.PricePerItem} AED`}
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
      };
    
      const handleEndReached = () => {
        setIsLoading(true);
    
        const nextBatch = productData?.slice(
          visibleData.length,
          visibleData.length + 90,
        );
        setVisibleData(prevVisibleData => [...prevVisibleData, ...nextBatch]);
        if (visibleData.length >= productData.length) {
          setIsLoading(false);
        }
      };
  return (
    // <DynamicTabView
    //     data={dataSource}
    //     renderTab={renderTab}
    //     onChangeTab={onChangeTab}
    //     defaultIndex={index}
    //     containerStyle={styles.container}
    //     headerTextStyle={styles.headerText}
    //     headerBackgroundColor={'red'}
    //     headerUnderlayColor={'blue'}
    //   />
//     <ScrollView>
// {data.map((item, index)=>{

//         return(
//           <View key={index} style={styles.OrderWrapper}>
//           <OrderItems
//             index={index}
//             item={item}
//             itemId={item.objectId}
//             favourite={item.favourite}
//             itemImage={item.productImageUrl}
//             itemName={item.Name}
//             weight={item.Quantity}
//             discountedPrice={`${item.Price} AED`}
//             itemQuantity={item.quantity}
//             productCartQuntity={item.isProductCardMatch}
//             // userInfo={userInfo}
//             onPress={() =>
//               navigation.navigate('Product', {
//                 product: item,
//                 productImage: item.productImageUrl,
//                 productName: item.Name,
//                 productQuantity: item.Quantity,
//                 // productOrignalPrice: item.Price,
//                 productDiscountPrice: item.Price,
//                 productAddCartQuntity: item.isProductCardMatch,
//                 productFavorite: item.favourite,
//                 productDiscription: item.Description
//                   ? item.Description
//                   : item.Name,
//                 isBackData: true,
//               })
//             }
//           />
//         </View>
//         )
//       })}
//     </ScrollView>

<>
<View style={styles.orderagainview}>
  <FlatList
    data={visibleData}
    numColumns={3}
    renderItem={renderItem}
    keyExtractor={(item, index) =>
      `${item.objectId}-${index}`
    }
    onEndReached={()=>handleEndReached()}
    onEndReachedThreshold={0.5}
    onScrollBeginDrag={()=>{
        stopfetch = false
    }}
    ListFooterComponent={() =>
      isLoading ? (
        <>
          <ActivityIndicator size="large" />
          <View style={{marginTop: 200}} />
        </>
      ) : null
    }
    initialNumToRender={30}
  />
 
  {/* <View  style={userInfo.sessionToken ? mainStyles.marginBottom22: mainStyles.marginTop15} /> */}

</View>
</>
  );
};


export default memo(TopTabView);

// export default TopTabView;
