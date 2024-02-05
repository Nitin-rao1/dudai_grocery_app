import {View, Text, Pressable, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';

// Functional component
const HomeCategoriesItemCard = ({
  cardBorderColor,
  cardBackgroundColor,
  onPress,
  imageBackgroundColor,
  categoryImage,
  categoryLabelColor,
  categoryLabel,
  item
}) => {

  // console.log(item);
  return (
    <Pressable
      style={[
        styles.categoryWrapper,
        {
          borderColor: cardBorderColor,
          backgroundColor: cardBackgroundColor,
        },
      ]}
      onPress={onPress}>
      <View
        style={[
          styles.categoryImageWrapper,
          {backgroundColor: imageBackgroundColor},
        ]}>
           <FastImage
            style={styles.categoryImage}
            source={{
              uri: categoryImage,
              priority: FastImage.priority.high,
            }}
          />
        {/* <Image style={styles.categoryImage} source={{uri:categoryImage}} /> */}
      </View>

      <Text
        // numberOfLines={1}
        style={[styles.categoryLabel, {color: categoryLabelColor}]}>
        {categoryLabel}
      </Text>
    </Pressable>
  );
};

// Exporting
export default HomeCategoriesItemCard;
