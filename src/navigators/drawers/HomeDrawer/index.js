import {ThemeContext} from '../../../theming/ThemeContext';
import {useContext, useState} from 'react';
import {
  View,
  Image,
  Text,
  ImageBackground,
  Modal,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Linking,
  ScrollView,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import HomeBottomTab from '../../tabs/HomeBottomTab';
import AuthStack from '../../stacks/AuthStack';
import SupportStack from '../../stacks/SupportStack';
import PoliciesStack from '../../stacks/PoliciesStack';
import {STANDARD_VECTOR_ICON_SIZE} from '../../../config/Constants';
import styles from './styles';
import Settings from '../../../screens/Settings';
import History from '../../../screens/History';
import Shopinfo from '../../../screens/Shopinfo';
import Branches from '../../../screens/Branches';
import Icons from '../../../components/cards/Icons/Icons';
import MyProfileStack from '../../stacks/MyProfileStack';
import WishlistStack from '../../stacks/WishlistStack';
import Promotions from '../../../screens/Promotions';
// import SuggestProduct from '../../../screens/SuggestProduct';
// import Feedback from '../../../screens/Feedback';
import Leaflet from '../../../screens/Leaflet';
import Button from '../../../components/buttons/Button';
import {useNavigation, useRoute} from '@react-navigation/native';
import StarRating from 'react-native-star-rating-widget';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../../../redux/slices/SessionUser';

// import BottomBar from '../../../screens/BottomBar';
import {logoutToAddress} from '../../../redux/slices/AddressSlice';
import {logoutToCategories} from '../../../redux/slices/CategoriesSlice';
import {logoutToCart} from '../../../redux/slices/ProductsCartSlice';
import {logoutToggleFavorite} from '../../../redux/slices/WishlistSlice';
import Colors from '../../../constants/Colors';
import {
  userFeedback,
  userSuggestproduct,
} from '../../../api/categories/categoriesAndProduct';
import {showMessage} from 'react-native-flash-message';
import Constants from '../../../constants/Constants';
import mainStyles from '../../../constants/MainStyles';
import { userDeleteAccount } from '../../../api/auth/auth';

// import StarRating from 'react-native-star-rating';
// Creating drawer navigator
const Drawer = createDrawerNavigator();
// Custom drawer content component
const CustomDrawerContent = props => {
  const route = useRoute();
  const navigation = useNavigation();
  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  const [isSuggestProductModalVisible, setIsSuggestProductModalVisible] =
    useState(false);
  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);

  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);

  const toggleModal = modalName => {
    if (modalName === 'suggestProduct') {
      setIsSuggestProductModalVisible(!isSuggestProductModalVisible);
    } else if (modalName === 'feedback') {
      setIsFeedbackModalVisible(!isFeedbackModalVisible);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.users.users);
  // const userInfo = usersdata.users;
  // const isUserLoggedIn = userInfo && userInfo.users;
  // console.log('usersdata=====================>', userInfo);
  // console.log('usersdata=====================>',userInfo);

  const sessionExpired = () => {
    dispatch(logoutToAddress());
    dispatch(logoutToCategories());
    dispatch(logoutToCart());
    dispatch(logoutToggleFavorite());
    dispatch(logoutUser());
    navigation.reset({
      index: 0,
      routes: [{name: 'AuthStack'}],
    });
  };

  const sendsuggestproduct = async () => {
    const suggestData = {
      Suggestion: name,
    };
    toggleModal('suggestProduct');
    await userSuggestproduct(suggestData)
      .then(res => {
        console.log('suggestproduct sent successfully:', res);
        setName('');

        showMessage({
          message: Constants.appName,
          description: 'Suggest Product sent successfully..',
          type: Constants.msgTypeSuccess,
          icon: Constants.msgTypeSuccess,
        });
      })
      .catch(err => {
        toggleModal('suggestProduct');
        setName('');
      });
  };

  // const userInfo = usersdata.users;

  const sendFeedback = async () => {
    const fbData = {
      objectId: userInfo.objectId,
      message: name,
      Rating: rating,
    };

    // console.log('Message:', message);
    // console.log('Rating:', rating);

    toggleModal('feedback');
    await userFeedback(fbData)
      .then(res => {
        console.log('Feedback sent successfully:', res.result);
        setName('');

        showMessage({
          message: Constants.appName,
          description: 'Feedback sent successfully',
          type: Constants.msgTypeSuccess,
          icon: Constants.msgTypeSuccess,
        });
      })
      .catch(err => {
        setName('');
        toggleModal('feedback');
      });
  };

  const callDeleteAPI =async()=>{
    await userDeleteAccount(userInfo.objectId)
    .then(val => {
      sessionExpired()
     
    })
    .catch(err => {
      setLoading(false);
      console.log('errr', err);
    });
  }
  return (
    <View style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
      {/* Header image background */}
      <ImageBackground
        source={require('../../../assets/images/backgrounds/liquid-cheese-background.png')}
        style={styles.drawerHeaderImageBackground}>
        <View style={[styles.logoWrapper, {backgroundColor: Colors.primary}]}>
          <Image
            source={
              userInfo.profilePic
                ? {uri: userInfo.profilePic}
                : require('../../../assets/images/profilePic.png')
            }
            style={styles.logo}
          />
        </View>
        <View>
          <Text style={[styles.brandName, {color: theme.textHighContrast}]}>
            {userInfo && userInfo.FirstName && userInfo.LastName
              ? `${userInfo.FirstName} ${userInfo.LastName}`
              : 'Hello Guest'}
          </Text>
          <Text style={[styles.brandSlogan, {color: theme.textHighContrast}]}>
            {userInfo && userInfo.username
              ? userInfo.username
              : 'guest@gmail.com'}
          </Text>
        </View>
      </ImageBackground>

      {/* Drawer item list */}
      <DrawerContentScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <DrawerItemList {...props} />

        <DrawerItem
          label="Suggest Product"
          labelStyle={[
            // styles.drawerItemLabel,
            props.focused
              ? {color: theme.accent}
              : {color: theme.textLowContrast},
          ]}
          icon={({focused}) => (
            <Image
              source={require('../../../assets/images/placeholder/product.png')}
              color={theme.accent}
              style={[styles.avatarImage, {tintColor: theme.accent}]}
            />
          )}
          onPress={() => {
            setName('');
            setIsSuggestProductModalVisible(!isSuggestProductModalVisible);
          }}
        />

        <DrawerItem
          label="Feedback"
          labelStyle={[
            // styles.drawerItemLabel,
            props.focused
              ? {color: theme.accent}
              : {color: theme.textLowContrast},
          ]}
          icon={({focused}) => (
            <Image
              source={require('../../../assets/images/placeholder/feedback.png')}
              color={theme.accent}
              style={[styles.avatarImage, {tintColor: theme.accent}]}
            />
          )}
          onPress={() => {
            setRating(0);
            setName('');
            setIsFeedbackModalVisible(!isFeedbackModalVisible);
          }}
        />
        <DrawerItem
          label="Return Policies"
          labelStyle={[
            // styles.drawerItemLabel,
            props.focused
              ? {color: theme.accent}
              : {color: theme.textLowContrast},
          ]}
          icon={({focused}) => (
            <FeatherIcon
              name="file-text"
              color={theme.accent}
              size={STANDARD_VECTOR_ICON_SIZE}
            />
          )}
          onPress={() => {
            Linking.openURL(Constants.policyURL);
          }}
        />
        {userInfo.username ? (
          <>
            <DrawerItem
              label="Logout"
              labelStyle={[styles.drawerItemLabel, {color: theme.accent}]}
              icon={() => (
                <FeatherIcon
                  name="log-out"
                  size={STANDARD_VECTOR_ICON_SIZE}
                  color={theme.accent}
                />
              )}
              onPress={() => {
                sessionExpired();
                // dispatch(logoutUser());
                // navigation.reset({
                //   index: 0,
                //   routes: [{name: 'AuthStack'}],
                // });
              }}
            />
            <DrawerItem
              label="Delete Account"
              labelStyle={[styles.drawerItemLabel, {color: Colors.error}]}
              icon={() => (
                <Icons
                  iconType={'MaterialIcons'}
                  name="delete-outline"
                  size={STANDARD_VECTOR_ICON_SIZE}
                  color={Colors.error}
                />
              )}
              onPress={() => {
                // alert('In Development');
                setDeleteAccountModal(true);
                // dispatch(logoutUser());
                // navigation.reset({
                //   index: 0,
                //   routes: [{name: 'AuthStack'}],
                // });
              }}
            />
          </>
        ) : (
          <DrawerItem
            label="Login"
            labelStyle={[styles.drawerItemLabel, {color: theme.accent}]}
            icon={() => (
              <FeatherIcon
                name="log-in"
                size={STANDARD_VECTOR_ICON_SIZE}
                color={theme.accent}
              />
            )}
            onPress={() => {
              // Navigate to the login screen
              // sessionExpired();
              navigation.reset({
                index: 0,
                routes: [{name: 'AuthStack'}],
              });
            }}
          />
        )}
      </DrawerContentScrollView>

      {/* <SuggestProduct /> */}

      {/* <Feedback/> */}
      {/* Custom drawer item */}

      <View style={styles.centeredView}>
        <Modal
          animationType="none"
          transparent={true}
          visible={isSuggestProductModalVisible}
          onRequestClose={() => toggleModal('suggestProduct')}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.modalContainer]}>
            {/* <View style={styles.modalContainer}> */}
            <View style={styles.modalContent}>
              <Text style={styles.SuggestTitle}>Suggest a Product</Text>
              <View style={styles.border} />
              <View>
                <Text
                  style={[styles.pointDetails, {color: theme.textLowContrast}]}>
                  You may suggest a product to be added to our inventory.
                  Depending on New W Mart's stock ability, we will add it.
                </Text>
              </View>
              <View style={styles.textInputView}>
                <TextInput
                  style={[
                    styles.textinput,
                    {borderBottomColor: isFocused ? 'orange' : 'gray'},
                  ]}
                  placeholder="Product name / description"
                  onChangeText={value => {
                    setName(value);
                    setError('');
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  value={name}
                />
              </View>
              {error && <Text style={styles.errTxt}>{error}</Text>}
              <View style={styles.modalSubmitButtonWrapper}>
                <Button
                  label="Cancel"
                  labelColor={theme.primary}
                  backgroundColor={theme.accent}
                  onPress={() => toggleModal('suggestProduct')}
                />
                <Button
                  label="Send"
                  labelColor={theme.primary}
                  backgroundColor={theme.accent}
                  onPress={() => {
                    // Implement your logic to send the suggestion here
                    if (name == '') {
                      setError('Please enter Your suggestion..');
                    } else {
                      sendsuggestproduct();
                    }
                  }}
                />
              </View>
            </View>
            {/* </View> */}
          </KeyboardAvoidingView>
        </Modal>
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="none"
          transparent={true}
          visible={isFeedbackModalVisible}
          onRequestClose={() => toggleModal('feedback')}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.modalContainer]}>
            {/* <View style={styles.modalContainer}> */}
            {/* <ScrollView bounces={false}> */}
            <View style={styles.modalContent}>
              <Text style={styles.FeedbackTitle}>FeedBack</Text>
              <View style={styles.border} />
              <View style={styles.ratingview}>
                <View style={styles.ratingContainer}>
                  <StarRating
                    rating={rating}
                    onChange={setRating}
                    // disabled={false}
                    // maxStars={5}

                    selectedStar={rating => setRating(rating)}
                    starSize={30}
                    fullStarColor="gold"
                  />
                </View>
              </View>
              <View style={[styles.textInputView, mainStyles.marginTop2]}>
                <TextInput
                  style={[
                    styles.textinput,
                    {borderBottomColor: isFocused ? 'orange' : 'gray'},
                  ]}
                  placeholder="Please leave your comments..."
                  onChangeText={value => {
                    setName(value);
                    setError('');
                  }}
                  keyboardType="default"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  // multiline={true} // Enable multiline input
                  numberOfLines={5}
                  // Number of lines to display
                  value={name}
                />
                {error && <Text style={styles.errTxt}>{error}</Text>}
              </View>
              <View style={styles.modalSubmitButtonWrapper}>
                <Button
                  label="Cancle"
                  labelColor={theme.primary}
                  backgroundColor={theme.accent}
                  onPress={() => toggleModal('feedback')}
                />
                <Button
                  label="Send"
                  labelColor={theme.primary}
                  backgroundColor={theme.accent}
                  onPress={() => {
                    // Implement your logic to send the suggestion here
                    if (name == '') {
                      setError('Please enter Your suggestion..');
                    } else {
                      sendFeedback();
                    }
                  }}
                />
              </View>
            </View>
            {/* </ScrollView> */}
            {/* </View> */}
          </KeyboardAvoidingView>
        </Modal>
      </View>

      {/* delete Account */}

      <View style={styles.centeredView}>
        <Modal
          animationType="none"
          transparent={true}
          visible={deleteAccountModal}
          onRequestClose={() => setDeleteAccountModal(false)}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.modalContainer]}>
            {/* <View style={styles.modalContainer}> */}
            <View style={styles.modalContent}>
              <Text style={styles.SuggestTitle}>Delete Account</Text>
              <View style={styles.border} />
              <View>
                <Text
                  style={[styles.pointDetails, {color: theme.textLowContrast}]}>
                  Is it really your intention to remove your account?{'\n\n'}
                  For additional help, please contact our administrator at {userInfo?.Mail} within the following seven days if you have started the account recovery process.
                </Text>
              </View>
              {/* <View style={mainStyles.marginTop2} /> */}
              <View style={styles.borderBottom} />
              <View style={styles.modalSubmitButtonWrapper}>
                <Button
                  label="No"
                  labelColor={theme.primary}
                  backgroundColor={theme.accent}
                  onPress={() => {
                    setDeleteAccountModal(false);
                  }}
                />
                <Button
                  label="Yes"
                  labelColor={theme.primary}
                  backgroundColor={Colors.error}
                  onPress={() => {
                    setDeleteAccountModal(false);
                    callDeleteAPI()
                  }}
                />
              </View>
            </View>
            {/* </View> */}
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </View>
  );
};

// Home drawer
const HomeDrawer = () => {
  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  // Screen options
  const screenOptions = {
    headerShown: false,
    drawerActiveTintColor: theme.accent,
    drawerInactiveTintColor: theme.textLowContrast,
    drawerInactiveBackgroundColor: theme.primary,
    drawerStyle: styles.drawer,
    drawerItemStyle: styles.drawerItem,
    swipeEdgeWidth: 0,
  };

  // Retuning
  return (
    <Drawer.Navigator
      screenOptions={screenOptions}
      initialRouteName={'HomeBottomTabs'}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="HomeBottomTabs"
        component={HomeBottomTab}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({focused}) => (
            <FeatherIcon
              name="home"
              color={theme.accent}
              size={STANDARD_VECTOR_ICON_SIZE}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Shopinfo"
        component={Shopinfo}
        options={{
          drawerLabel: 'Shop info',
          unmountOnBlur: true,
          drawerIcon: ({focused}) => (
            <FeatherIcon
              name="info"
              color={theme.accent}
              size={STANDARD_VECTOR_ICON_SIZE}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Branches"
        component={Branches}
        options={{
          drawerLabel: 'Branches',
          drawerIcon: ({focused}) => (
            <Icons
              name={'storefront'}
              iconType={'MaterialIcons'}
              color={theme.accent}
              size={STANDARD_VECTOR_ICON_SIZE}
            />
          ),
        }}
      />

      {/* <Drawer.Screen
        name="My ProfileStack"
        component={MyProfileStack}
        options={{
          drawerLabel: 'My Profile',
          drawerIcon: ({focused}) => (
            <Icons
              name={'user'}
              iconType={'Feather'}
              color={theme.accent}
              size={STANDARD_VECTOR_ICON_SIZE}
            />
          ),
        }}
      /> */}

      {/* <Drawer.Screen
        name="BottomBar"
        component={BottomBar}
        options={{
          drawerLabel: 'BottomBar',
          drawerIcon: ({focused}) => (
            <Icons
              name={'user'}
              iconType={'Feather'}
              color={theme.accent}
              size={STANDARD_VECTOR_ICON_SIZE}
            />
          ),
        }}
      /> */}

      <Drawer.Screen
        name="WishlistStack"
        component={WishlistStack}
        options={{
          drawerLabel: 'Favourite',
          drawerIcon: ({focused}) => (
            <Icons
              name={'heart'}
              iconType={'Feather'}
              color={theme.accent}
              size={STANDARD_VECTOR_ICON_SIZE}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="History"
        component={History}
        options={{
          drawerLabel: 'Track & History',
          unmountOnBlur: true,
          drawerIcon: ({focused}) => (
            <MaterialIcons
              name="location-searching"
              color={theme.accent}
              size={STANDARD_VECTOR_ICON_SIZE}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Promotions"
        component={Promotions}
        options={{
          drawerLabel: 'Promotions',
          drawerIcon: ({focused}) => (
            <Image
              source={require('../../../assets/images/placeholder/promotion.png')}
              color={theme.accent}
              style={[styles.avatarImage, {tintColor: theme.accent}]}
            />
            // <Icons
            //   name={'tag'}
            //   iconType={'EvilIcons'}
            //   color={theme.accent}
            //   size={STANDARD_VECTOR_ICON_SIZE}
            // />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Mcdolans"
        component={SuggestProduct}
        options={{
          drawerLabel: 'successfull',
          drawerIcon: ({focused}) => (
            <Image
              source={require('../../../assets/images/placeholder/product.png')}
              // source={require('../../../assets/images/placeholder/product.png')}
              color={theme.accent}
              style={[styles.avatarImage, {tintColor: theme.textLowContrast}]}
            />
          ),
        }}
      /> */}

      {/* <Drawer.Screen
        name="Update"
        component={Feedback}
        options={{
          drawerLabel: 'Change Password',
          drawerIcon: ({focused}) => (
            <Image
              source={require('../../../assets/images/placeholder/Empty-bag.png')}
              color={theme.accent}
              style={[styles.avatarImage, {tintColor: theme.textLowContrast}]}
            />
          ),
        }}
      /> */}

      {/* <Drawer.Screen
        name="SupportStack"
        component={SupportStack}
        options={{
          drawerLabel: 'Help & Support',
          drawerIcon: ({focused}) => (
            <FeatherIcon
              name="help-circle"
              color={theme.accent}
              size={STANDARD_VECTOR_ICON_SIZE}
            />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="PoliciesStack"
        component={PoliciesStack}
        options={{
          drawerLabel: 'Legal Policies',
          drawerIcon: ({focused}) => (
            <FeatherIcon
              name="file-text"
              color={theme.accent}
              size={STANDARD_VECTOR_ICON_SIZE}
            />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="Leaflet"
        component={Leaflet}
        options={{
          drawerLabel: 'Leaflet',
          unmountOnBlur: true,
          drawerIcon: ({focused}) => (
            <Image
              source={require('../../../assets/images/placeholder/propaganda.png')}
              color={theme.accent}
              style={[styles.avatarImage, {tintColor: theme.accent}]}
            />
          ),
        }}
      />

      {/* <Drawer.Screen
        name="AuthStack"
        component={AuthStack}
        options={{
          drawerLabel: 'Account Login',
          drawerIcon: ({focused}) => (
            <FeatherIcon
              name="log-in"
              color={theme.accent}
              size={STANDARD_VECTOR_ICON_SIZE}
            />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
};

// Exporting
export default HomeDrawer;
