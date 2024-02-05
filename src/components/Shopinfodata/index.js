import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { IndependentColors } from '../../config/Colors';
import Colors from '../../constants/Colors';

const Shopinfodata = () => {
  const flatlistRef = useRef();
  const screenWidth = Dimensions.get('window').width;

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === CarouselData.length - 1) {
        flatlistRef.current.scrollToIndex({
          index: 0,
          animated: true,
        });
      } else {
        flatlistRef.current.scrollToIndex({
          index: activeIndex + 1,
          animated: true,
        });
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  });

  const CarouselData = [
    {
      id: '01',
      Image: require('../../assets/images/placeholder/image1.png'),
    },
    {
      id: '02',
      Image: require('../../assets/images/placeholder/image2.png'),
    },
    {
      id: '03',
      Image: require('../../assets/images/placeholder/image1.png'),
    },
    {
      id: '04',
      Image: require('../../assets/images/placeholder/image2.png'),
    },
    {
      id: '05',
      Image: require('../../assets/images/placeholder/image1.png'),
    },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View style={[styles.carouselItem, { height:hp('40%'),width: screenWidth }]}>
        <Image
         style={[styles.image, ]} 
         source={item.Image} />
      </View>
    );
  };

  const renderDotIndicators = () => {
    return CarouselData.map((dot, index) => (
      <View
        key={index}
        style={[
          styles.dotIndicator,
          activeIndex === index ? styles.activeDot : styles.inactiveDot,
        ]}
      />
    ));
  };

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.floor(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={CarouselData}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        snapToAlignment="center"
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
      />
      <View style={styles.dotContainer}>{renderDotIndicators()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position:'absolute',
  //  marginVertical:20,
  //  backgroundColor:'pink'
  },
  carouselItem: {
    // height: hp('40%'),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  image: {
    // width: wp('100%'),
    // height: hp('40%'),
    resizeMode: 'contain',
    // borderRadius:wp('0'),
    // backgroundColor:'pink'
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp('-1.2'),
    // backgroundColor:'yellow'
  },
  dotIndicator: {
    width:wp('1.8'),
    height:hp('0.9'),
    borderRadius: hp('5'),
    marginHorizontal: wp('2'),
  },
  activeDot: {
    backgroundColor: Colors.primary ,
  },
  inactiveDot: {
    backgroundColor: IndependentColors.grey,
  },
});

export default Shopinfodata;
