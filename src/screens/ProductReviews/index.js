import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {useContext, useState} from 'react';
import BuyerReviewCard from '../../components/cards/BuyerReviewCard';
import {scale} from 'react-native-size-matters';
import OverallRatingCard from '../../components/cards/OverallRatingCard';
import OverallRatingData from '../../data/OverallRatingData';
import {ThemeContext} from '../../theming/ThemeContext';
import FeatherIcons from 'react-native-vector-icons/Feather';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Button from '../../components/buttons/Button';
import Modal from 'react-native-modal';
import RNTextArea from '@freakycoder/react-native-text-area';
import StarRating from 'react-native-star-rating-widget';
import {IndependentColors} from '../../config/Colors';
import styles from './styles';

// Functional component
const ProductReviews = () => {
  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  // Local states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rating, setRating] = useState(0);

  // Toggling call request modal
  const toggleModal = () => {
    setIsModalVisible(prevState => !prevState);
  };

  // Returning
  return (
    <View
      style={[
        styles.mainWrapper,
        {
          backgroundColor: theme.primary,
        },
      ]}>
      {/* Overall rating */}
      <OverallRatingCard
        cardBackgroundColor={theme.secondary}
        earnedRatingValue={4.9}
        earnedRatingValueColor={theme.textHighContrast}
        earnedRatingCount={2002}
        earnedRatingCountColor={theme.textLowContrast}
        earnedRatingStarsStatsData={OverallRatingData}
        progressBarBackgroundColor={theme.primary}
      />

      {/* Give rating & review */}
      <TouchableOpacity
        style={[
          styles.giveRatingAndReviewLink,
          {
            borderTopColor: theme.secondary,
            borderBottomColor: theme.secondary,
          },
        ]}
        onPress={toggleModal}>
        <FeatherIcons
          name="message-circle"
          size={scale(20)}
          color={theme.textLowContrast}
        />
        <Text
          style={[
            styles.giveRatingAndReviewLinkTitle,
            {color: theme.textLowContrast},
          ]}>
          Give a rating and review
        </Text>
      </TouchableOpacity>

      {/* Title */}
      <Text
        style={[styles.buyersReviewsTitle, {color: theme.textHighContrast}]}>
        Buyers reviews
      </Text>

      {/* Scrollview */}
      <View style={styles.scrollViewWrapper}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={styles.buyerReviewCardComponentWrapper}>
            {[...Array(10)].map((item, index) => (
              <View
                key={index}
                style={{
                  marginBottom:
                    index !== [...Array(10)].length - 1 ? scale(15) : 0,
                }}>
                <BuyerReviewCard
                  buyerImage={item.buyer_image}
                  buyerName={item.buyer_name}
                  buyerNameTextColor={theme.textHighContrast}
                  reviewAge={item.review_age}
                  reviewAgeTextColor={theme.textLowContrast}
                  rating={item.rating}
                  review={item.review_message}
                  reviewTextColor={theme.textLowContrast}
                  reviewCardBackgroundColor={theme.secondary}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Rating & review modal */}
      {isModalVisible ? (
        <Modal
          isVisible={isModalVisible}
          animationIn="slideInDown"
          animationOut="slideOutDown"
          backdropColor={IndependentColors.black}
          backdropOpacity={0.9}
          style={styles.modal}>
          <View style={[styles.modalBody, {backgroundColor: theme.primary}]}>
            {/* Text area */}
            <View style={styles.textAreaComponentWrapper}>
              <Text
                style={[styles.textAreaLabel, {color: theme.textHighContrast}]}>
                Honest Review
              </Text>
              <RNTextArea
                maxCharLimit={100}
                placeholderTextColor={theme.textLowContrast}
                color={theme.textHighContrast}
                exceedCharCountColor="#F00"
                placeholder={'Write your honest review...'}
                style={[styles.textArea, {backgroundColor: theme.secondary}]}
              />
            </View>

            {/* Rating stars */}
            <StarRating
              rating={rating}
              maxStars={5}
              starSize={scale(30)}
              color={IndependentColors.yellow}
              onChange={rating => setRating(rating)}
            />

            {/* Button */}
            <View style={styles.modalSubmitButtonWrapper}>
              <Button
                label="Submit Review"
                labelColor={theme.primary}
                backgroundColor={theme.accent}
              />
            </View>
            {/* Modal close icon */}
            <View
              style={[
                styles.modalCloseIconWrapper,
                {backgroundColor: theme.secondary},
              ]}>
              <TouchableOpacity activeOpacity={1} onPress={toggleModal}>
                <IonIcons name="close" size={scale(20)} color={theme.accent} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
};

// Exporting
export default ProductReviews;
