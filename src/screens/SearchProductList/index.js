import React, {useEffect, useState} from 'react';
import {
  View,
  Pressable,
  Text,
  TextInput,
  Keyboard,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Colors from '../../constants/Colors';
import Icons from '../../components/cards/Icons/Icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  OPEN_SANS_SEMIBOLD,
  STANDARD_VECTOR_ICON_SIZE,
} from '../../config/Constants';
import mainStyles from '../../constants/MainStyles';
import {FlatList} from 'react-native-gesture-handler';
import OrderItems from '../../components/cards/OrderagainitemCard/OrderItems';
import {userProductSearchByCategoriesIDText} from '../../api/categories/categoriesAndProduct';
import {useSelector} from 'react-redux';
import {Indicators} from '../../components/apploader';
import styles from './styles';
import SelectDropdown from 'react-native-select-dropdown';
import {cameraPermission} from '../../constants/helperFunction';
import Constants from '../../constants/Constants';
import {showMessage} from 'react-native-flash-message';
// Functional component

const all = [
  {
    ImageID: 'AYKN7cW92I',
    ImageName: 'c12',
    ImageUrl:
      'https://parsefiles.back4app.com/jxkQClUvfIzMYf4vct1cUPB684N6sfUYJDC9oDXp/26552e44f190879668e3808f2d3f6107_c12.jpg',
    LowercaseName: 'dips & chips',
    LoyaltyRatio: -1,
    Name: 'All Categories',
    ParentCategory: '',
    Priority: 14,
    Sub: [
      'C8f725R6HM',
      'EhvqHar4mA',
      'LLeFUxglW5',
      'UTic38Bd7g',
      'aLIMXjC7mM',
      'aRAO0AVb8Q',
      'kgUSFlOnYx',
      'o7uc7nIy1U',
    ],
    createdAt: {__type: 'Date', iso: '2018-03-07T08:47:35.722Z'},
    isInTheList: true,
    isSubCategory: false,
    objectId: 'allCategories',
    updatedAt: {__type: 'Date', iso: '2020-11-07T12:14:45.879Z'},
  },
];
const SearchProductList = ({navigation}) => {
  const categories = useSelector(state => state.categories.categories);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [productList, setProductList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [categoriesID, setCategoriesID] = useState('');
  const userInfo = useSelector(state => state.users.users);
console.log("isLoading",isLoading);
  const searchByText = async (pageID, id) => {
    setIsLoading(true);
    Keyboard.dismiss();
    const formData = {
      text: searchText,
      StoreId: userInfo?.selectedStoreData?.StoreId,
      page: pageID ? pageID : page,
      CategoryId: id == 'all' ? '' : id ? id : categoriesID,
    };

    await userProductSearchByCategoriesIDText(formData)
      .then(val => {
        console.log('val', val);
        setTotalCount(val.result.count);
        setProductList(pre => [...pre, ...val.result.data]);
        // if (val.result.count  > productList.length) {
          
        // }
        setTimeout(() => {
          setIsLoading(false);
          
        }, 1000);
      })
      .catch(err => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (searchText) {
      searchByText();
    }
  }, [page]);

  const openCamera = async () => {
    await cameraPermission()
      .then(async data => {
        if (data == 'granted') {
          navigation.navigate('CameraScreen');
        }
      })
      .catch(err => {
        alert('Please wait a moment and try again.');
      });
  };
  const handleEndReached = () => {
    if (totalCount > productList.length) {
      setPage(pre => pre + 1);
      setIsLoading(true);
    } 
    // else {
    //   setIsLoading(false);
    // }
  };

  const renderitem = ({item, index}) => {
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
          onPress={() =>
            navigation.navigate('Product', {
              product: item,
              productImage: item.productImageUrl,
              productName: item.Name,
              productQuantity: item.Quantity,

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
  const myListEmpty = () => {
    return (
      <>
        {isLoading == false && (
          <Text
            style={{
              marginTop: hp('1'),
              fontSize: scale(12),
              fontFamily: OPEN_SANS_SEMIBOLD,
              color: Colors.black,
              width: wp('98'),
              textAlign: 'center',
            }}>
            Not Found !!
          </Text>
        )}
      </>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <View
        style={{
          alignItems: 'center',
          borderRadius: scale(2),
          flexDirection: 'row',
          marginTop: hp('1'),
        }}>
        <Pressable
          hitSlop={{bottom: 15, top: 15, left: 15, right: 15}}
          onPress={() => {
            navigation.goBack();
          }}>
          <View style={{marginRight: wp('3')}}>
            <Icons
              iconType={'Feather'}
              name="arrow-left"
              size={scale(20)}
              color={Colors.black}
            />
          </View>
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            width: Platform.OS === 'ios' ? wp('80') : wp('90'),
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: Colors.inactive,

            borderRadius: wp('2.5'),
          }}>
          <TextInput
            placeholder="Search here"
            style={{
              width: wp('71'),
              fontSize: scale(14),
              fontFamily: OPEN_SANS_SEMIBOLD,
              marginLeft: wp('2'),
              padding: wp('1.5'),
            }}
            autoFocus={true}
            onChangeText={setSearchText}
            value={searchText}
            onSubmitEditing={() => {
              if (searchText == '') {
                showMessage({
                  message: Constants.appName,
                  description: 'Please enter a search term.',
                  type: Constants.msgTypeDanger,
                  icon: Constants.msgTypeDanger,
                });
              } else {
                setProductList([]);
                setPage(1);
                searchByText(1, categoriesID);
              }
            }}
          />
          <Pressable
            onPress={() => {
              if (searchText == '') {
                showMessage({
                  message: Constants.appName,
                  description: 'Please enter a search term.',
                  type: Constants.msgTypeDanger,
                  icon: Constants.msgTypeDanger,
                });
              } else {
                setProductList([]);
                setPage(1);
                searchByText(1, categoriesID);
              }
            }}>
            <Icons
              iconType={'Feather'}
              name="search"
              color={Colors.primary}
              size={scale(18)}
              style={{marginRight: wp('4')}}
            />
          </Pressable>
        </View>
        {Platform.OS === 'ios' && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: wp('1.5'),
            }}>
            <Pressable
              onPress={() => {
                openCamera();
              }}
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.inactive,
                padding: wp('1.2'),
                borderRadius: wp('2'),
                height: wp('8'),
                width: wp('8'),
              }}>
              <Icons
                iconType={'FontAwesome'}
                name="qrcode"
                color={Colors.primary}
                size={scale(18)}
              />
            </Pressable>
          </View>
        )}
      </View>

      <View>
        <Text
          style={{
            marginTop: hp('1'),
            fontSize: scale(12),
            fontFamily: OPEN_SANS_SEMIBOLD,
            color: Colors.black,
            width: wp('98'),
            alignSelf: 'center',
          }}>
          Select Categories
        </Text>
        <SelectDropdown
          defaultButtonText={'All Categories'}
          defaultValue={'All Categories'}
          data={[...all, ...categories]}
          onSelect={(item, index) => {
            if (item.objectId == 'allCategories') {
              console.log('null');
              setProductList([]);
              setCategoriesID('');
              setPage(1);
              searchByText(1, 'all');
            } else {
              if (searchText != '') {
                setProductList([]);
                setPage(1);
                setCategoriesID(item.objectId);
                searchByText(1, item.objectId);
              } else {
                setCategoriesID(item.objectId);
              }
            }
          }}
          buttonTextAfterSelection={(item, index) => {
            return item.Name;
          }}
          rowTextForSelection={(item, index) => {
            return item.Name;
          }}
          buttonStyle={{
            ...styles.dropdownBtnStyle,
            backgroundColor: Colors.inactive,
          }}
          buttonTextStyle={{
            ...styles.dropdownBtnTxtStyle,
            color: Colors.textHighContrast,
          }}
          renderDropdownIcon={isOpened => {
            return (
              <Icons
                iconType={'Ionicons'}
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={Colors.textLowContrast}
                size={STANDARD_VECTOR_ICON_SIZE * 0.8}
              />
            );
          }}
          dropdownIconPosition={'right'}
        />
      </View>
      <View style={mainStyles.marginTop1} />
      <FlatList
        data={productList}
        numColumns={3}
        renderItem={renderitem}
        keyExtractor={item => item.objectId}
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
              <View style={{marginBottom: scale(90)}} />
            )}
          </>
        )}
        ListEmptyComponent={myListEmpty}
      />
      {loading && <Indicators />}
    </View>
  );
};

// Exporting
export default SearchProductList;
