import {memo, useCallback, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useSharedValue,
  interpolate,
  Extrapolate,
  interpolateColor,
  withTiming,
} from 'react-native-reanimated';
import {scale} from 'react-native-size-matters';
import {
  SCREEN_WIDTH,
  STANDARD_HOME_MAIN_CAROUSEL_PAGINATION_INDICATOR_WIDTH,
} from '../../config/Constants';
import Colors from '../../constants/Colors';
import styles from './styles';

// Functional component
const OfferSlider = ({data, label, labelColor, onPress}) => {
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);
  const translationX = useSharedValue(0);
  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig, onViewableItemsChanged},
  ]);

  // const autoScroll = () => {
  //   if (currentIndex.current < data.length - 1) {
  //     currentIndex.current += 1;
  //   } else {
  //     currentIndex.current = 0;
  //   }

  //   // Scroll to the next item
  //   flatListRef.current.scrollToIndex({
  //     index: currentIndex.current,
  //     animated: true,
  //   });
  // };

  // useEffect(() => {
  //   // Set an interval for auto-scrolling every 5 seconds
  //   const intervalId = setInterval(autoScroll, 5000);

  //   // Clear the interval when the component unmounts
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);
  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length === 0) {
      return;
    }

    currentIndex.current = viewableItems[0].index;
  }, []);
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 100,
  };
  const scrollHandler = useAnimatedScrollHandler(event => {
    // Storing scrolled offset value of the x direction
    translationX.value = withTiming(event.contentOffset.x);
  });
  return (
    <>
      <View style={[styles.mainCarouselFlatListWrapper]}>
        <Animated.FlatList
          ref={flatListRef}
          data={data}
          renderItem={({item, index}) => (
            <View key={index}>
              <Pressable onPress={()=>
                onPress(item)}>
                 {/* <Pressable> */}
                <View style={[styles.mainCarouselFlatListItemWrapper]}>
                  <Image
                    source={{uri:item.ImageUrl}}
                    style={styles.mainCarouselFlatListItemImage}
                  />
                </View>
              </Pressable>
            </View>
          )}
          // decelerationRate={0}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          style={styles.mainCarouselFlatList}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
        />
      </View>
      <View style={[styles.paginationIndicatorsWrapper]}>
        {data && data?.map((_, index) => (
          <Pagination
            key={index}
            translationX={translationX}
            index={index}
            currentIndex={currentIndex}
            paginationIndicatorSize={
              STANDARD_HOME_MAIN_CAROUSEL_PAGINATION_INDICATOR_WIDTH
            }
          />
        ))}
      </View>
    </>
  );
};
const Pagination = ({translationX, index, paginationIndicatorSize}) => {
  // Declaring input range to avoid its duplication
  const inputRange = [
    (index - 1) * (SCREEN_WIDTH - scale(30)),
    index * (SCREEN_WIDTH - scale(30)),
    (index + 1) * (SCREEN_WIDTH - scale(30)),
  ];

  // Defining pagination indicator animated styles using useAnimatedStyle hook
  const paginationIndicatorAnimatedStyles = useAnimatedStyle(() => {
    // Background color
    const backgroundColor = interpolateColor(translationX.value, inputRange, [
      '#F6F5F6',
      Colors.primary,
      '#F6F5F6',
    ]);

    // Width
    const width = interpolate(
      translationX.value,
      inputRange,
      [
        paginationIndicatorSize,
        paginationIndicatorSize * 2,
        paginationIndicatorSize,
      ],
      Extrapolate.CLAMP,
    );

    // Returning
    return {
      backgroundColor,
      width,
    };
  });

  // Returning
  return (
    <Animated.View
      style={[styles.paginationIndicator, paginationIndicatorAnimatedStyles]}
    />
  );
};
// Exporting
export default memo(OfferSlider);
