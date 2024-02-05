import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  Pressable,
} from 'react-native';
// import Colors from '../../components/Colors/Colors';
import Icons from '../../components/cards/Icons/Icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {JsonData} from '../../data/HistoryData';
import {IndependentColors} from '../../config/Colors';
import {OPEN_SANS_REGULAR, OPEN_SANS_SEMIBOLD} from '../../config/Constants';
import mainStyles from '../../constants/MainStyles';
import Header from '../../components/Header';
import Colors from '../../constants/Colors';
import {getOrders} from '../../api/categories/categoriesAndProduct';
import {useSelector} from 'react-redux';
import {Indicators} from '../../components/apploader';
import EmptyCart from '../../components/emptyCart/EmptyCart';
import moment from 'moment';

const tabs = [
  {id: 0, title: 'TRACK'},
  {id: 1, title: 'HISTORY'},
];

const History = ({navigation, route}) => {
  const userInfo = useSelector(state => state.users.users);

  const historyPageRefresh  =  route?.params?.refreshPage;
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const [activeTab, setActiveTab] = useState(0);
  const [pastOrderData, setPastOrderData] = useState([]);
  const [currentOrderData, setCurrentOrderData] = useState([]);
  // const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    getPastOrderData();
    getCurrentOrderData()
  }, [!refresh]);


  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      getPastOrderData();
      getCurrentOrderData()
    });
    return focusHandler;
  }, [navigation, historyPageRefresh]);
  // useEffect(()=>{
// if (route?.params?.refreshPage == true) {
//   alert('ssssss')
// }
//   },[])

  const getPastOrderData = async () => {
    setLoading(true);
   await getOrders(userInfo.objectId, 'current')
      .then(val => {
        if (val.data.length > 0) {
          setLoading(false);

          setCurrentOrderData(val.data);
          // getCurrentOrderData();
        } else {
          setLoading(false);
          setCurrentOrderData([])
          // getCurrentOrderData();
        }
        console.log('valvalvalvalvalvalval', val);
      })
      .catch(err => {
        setLoading(false);
        setCurrentOrderData([])
        // getCurrentOrderData();
      });
  };

  const getCurrentOrderData = async () => {
    setLoading(true);
    await getOrders(userInfo.objectId, 'past')
    .then(val => {
      if (val.data.length > 0) {
        setLoading(false);

        setPastOrderData(val.data);
       
      } else {
        setLoading(false);
        setPastOrderData([])
       
      }
      console.log('valvalvalvalvalvalval', val);
    })
    .catch(err => {
      setLoading(false);
      setPastOrderData([])
     
    });
    
  };

  const handleTabPress = tabId => {
    setActiveTab(tabId);
  };

  const renderTrackTab = () => {
    const orderDatas = activeTab === 0 ? currentOrderData : pastOrderData;
    const orderHeading = activeTab === 0 ? 'UPCOMING ORDER' : 'PAST ORDERS';

    return (
      <ScrollView style={{flexGrow:1}}>
        {orderDatas.length > 0 ? (
          <>
            <View style={styles.upcomingodr}>
              <Text style={styles.headingtxt1}>{orderHeading}</Text>
              <Icons
                iconType={'Feather'}
                name={'refresh-cw'}
                color={Colors.primary}
                onPress={() => {
                  setRefresh(!refresh);
                }}
              />
            </View>
            <ScrollView style={{flexGrow:1 }}>
              {orderDatas.map((item, index) => {
                const imgName =
                  item.Status == 3
                    ? require('../../assets/images/success.png')
                    : item.Status == 4
                    ? require('../../assets/images/cancel.png')
                    : require('../../assets/images/pending.png');
                const totalAmount = item.TotalAmount+item.DeliveryFee;
                console.log('item?.ScheduledDeliveryDate?.iso', item?.ScheduledDeliveryDate?.iso);
                return (
                  <TouchableOpacity key={`index${index}`} onPress={() => {navigation.navigate('Invoice',{orderData: item})}}>
                    <View key={`indesx${index}`} style={styles.itemContainer}>
                      <View>
                        <Image
                          source={imgName}
                          style={styles.headerImage}
                          resizeMode="contain"
                        />
                      </View>

                      <View
                        style={{
                          marginLeft: wp('2'),
                          width: wp('68'),
                        }}>
                        <View style={{}}>
                          <Text
                            style={[
                              styles.txt,
                              {
                                color: Colors.black,
                                fontSize: hp('1.5'),
                                fontFamily: OPEN_SANS_SEMIBOLD,
                              },
                            ]}>
                            #{item.objectId}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text style={[styles.txt]}>Total Price:</Text>
                            <Text
                              style={[
                                styles.txt,
                                {
                                  color: Colors.black,
                                  width: wp('28'),
                                },
                              ]}>
                              {` ` + totalAmount.toFixed(2) + ' AED'}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text style={[styles.txt]}>Date:</Text>
                            <Text
                              style={[
                                styles.txt,
                                {
                                  color: Colors.black,
                                  width: wp('50'),
                                },
                              ]}>
                              {` ` +
                                moment.utc(item?.ScheduledDeliveryDate?.iso).format(
                                  'YYYY-MM-DD',
                                )}{' '}
                              -Time:
                              {` ` +
                                moment.utc(item?.ScheduledDeliveryDate?.iso).format('HH:mm:ss')}
                            </Text>
                          </View>

                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={[
                                styles.txt,
                                {
                                  // color: item.StoreTimeStatus
                                  //   ? Colors.success
                                  //   : Colors.error,
                                },
                              ]}>
                              Branch:
                            </Text>
                            <Text
                              style={[
                                styles.txt,
                                {
                                  color: Colors.black,
                                },
                              ]}>
                              {` ` + item.Region}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
              <View style={mainStyles.marginTop15}  />
            </ScrollView>
          </>
        ) : (
          <EmptyCart message={'Not Available'} showbutton={false} onPress={() => navigation.navigate('Home')} />
        )}
      </ScrollView>
    );
  };

  const renderTabContent = () => {
    if (activeTab === 0) {
      return renderTrackTab();
    } else if (activeTab === 1) {
      return renderTrackTab();
    }
    return null;
  };

  return (
    <SafeAreaView style={mainStyles.container}>
      <Header
        back
        onLeftPress={() => {
          navigation.goBack();
        }}
        title={'Track & History'}
      />
      <View style={styles.container}>
        <View style={styles.tabBar}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabItem,
                activeTab === tab.id && styles.activeTabItem,
              ]}
              onPress={() => handleTabPress(tab.id)}>
              <Text
                style={[
                  styles.tabTitle,
                  activeTab === tab.id && styles.activeTabTitle,
                ]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {renderTabContent()}
      </View>
      {loading && <Indicators />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: IndependentColors.white,
  },
  profileheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: hp('7%'),
  },
  headingtxt: {
    fontSize: wp('5'),
    // fontFamily: 'Poppins-SemiBold',
    color: IndependentColors.black,
    marginLeft: wp('2'),
    top: hp('0.5'),
  },
  headingtxt1: {
    fontSize: wp('4.5'),
    // fontFamily: 'Poppins-Regular',
    color: IndependentColors.gray + '90',
  },
  headingtxt2: {
    fontSize: wp('3.5'),
    // fontFamily: 'Poppins-Regular',
    color: IndependentColors.black + '80',
  },
  headingtxt3: {
    fontSize: wp('3'),
    // fontFamily: 'Poppins-Regular',
    color: IndependentColors.black + '80',
  },
  headingtxt4: {
    fontSize: wp('3.5'),
    // fontFamily: 'Poppins-Regular',
    color: IndependentColors.black + '80',
  },
  headingtxt5: {
    fontSize: wp('3.5'),
    // fontFamily: 'Poppins-Regular',
    color: IndependentColors.black + '99',
  },
  upcomingodr: {
    // borderWidth:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginHorizontal: wp('5'),
    alignSelf: 'center',
    width: wp('95'),
    marginTop: hp('2'),
  },
  allorders: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: wp('95'),
    marginTop: hp('1'),
    alignSelf: 'center',
    borderWidth: 1,
    padding: wp('2'),
    borderColor: Colors.inactive,
    borderRadius: wp('2'),
  },
  allorders2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2'),
    bottom: hp('1'),
    width: wp('61'),
  },
  squre: {
    width: wp('25'),
    height: wp('25'),
    borderRadius: wp('2'),
    backgroundColor: IndependentColors.red + '99',
  },
  allorderstxt1: {
    fontSize: wp('4.5'),
    fontFamily: OPEN_SANS_REGULAR,
    color: IndependentColors.black,
  },
  image: {
    width: wp('25'),
    height: wp('25'),
    alignSelf: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    paddingVertical: wp('2'),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderColor: Colors.primary,
  },
  tabTitle: {
    fontSize: 16,
    color: IndependentColors.black,
  },
  activeTabTitle: {
    color: Colors.primary,
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: wp('100'),
    // justifyContent: 'space-between',
    // marginRight: 150,
    // marginLeft: wp('3'),
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputBorderColor,
    padding: wp('2'),
  },

  txt: {
    // marginTop: 5,
    // marginLeft: 12,
    fontFamily: OPEN_SANS_REGULAR,
    fontSize: hp('1.3'),
    color: Colors.textLowContrast,
  },

  headerImage: {
    width: wp('18'),
    height: wp('18'),
    borderRadius: wp('2'),
    borderWidth: 0.5,
    borderColor: Colors.inputBorderColor,
  },
});

export default History;

//import liraries
// import React, { Component } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// // create a component
// const History = () => {
//     return (
//         <View style={styles.container}>
//             <Text>History</Text>
//         </View>
//     );
// };

// // define your styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         // backgroundColor: '#2c3e50',
//     },
// });

// //make this component available to the app
// export default History;
