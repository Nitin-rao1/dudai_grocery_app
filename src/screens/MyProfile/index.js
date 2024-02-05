import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Modal,
} from 'react-native';
import Camera from '../../assets/icons/svg/Camera.svg';
import {scale} from 'react-native-size-matters';
import NavigationLink from '../../components/links/NavigationLink';
import NavigationData from '../../data/NavigationData';
import {ThemeContext} from '../../theming/ThemeContext';
import * as Animatable from 'react-native-animatable';
import {STANDARD_VECTOR_ICON_SIZE} from '../../config/Constants';
import styles from './styles';
import {useSelector} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useIsFocused} from '@react-navigation/native';
import Button from '../../components/buttons/Button';

// Functional component
const MyProfile = ({navigation}) => {
  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  const userInfo = useSelector(state => state.users.users);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [cameraPhoto, setCameraPhoto] = useState();
  console.log('iiiiiii', cameraPhoto);
  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
    includeBase64: true,
  };
  const isFocused = useIsFocused();

  // const [image , setImage] = useState();
  // console.log('adadafadaadaafaf',image)
  useEffect(() => {
    // getPhoto(setImage)
    console.log('Component is focused');
    console.log(cameraPhoto, 'nitin');
  }, [isFocused, cameraPhoto]);

  const openCamera = async () => {
    const cameraPermission = PermissionsAndroid.PERMISSIONS.CAMERA;
    const storagePermission =
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const granted = await PermissionsAndroid.requestMultiple([
      cameraPermission,
      storagePermission,
    ]);

    if (
      granted[cameraPermission] === PermissionsAndroid.RESULTS.GRANTED &&
      granted[storagePermission] === PermissionsAndroid.RESULTS.GRANTED
    ) {
      // Camera and storage permissions are granted
      const result = await launchCamera(options);
      const base64 = `image/jpeg;base64,${result.assets[0].base64}`;
      const uri = result.assets[0].uri;

      const userID = userInfo.objectId;
      const data = {userID: userID, photo: base64};

      savePhoto(JSON.stringify(data))
        .then(val => {
          console.log('Photo saved successfully:', val);
          setCameraPhoto(val?.result?.Image?.url);
          setUserProfilePic(val?.result?.Image?.url);
          var data = {profilePic: val?.result?.Image?.url};
          updateUserDatels(userID, token, data);
          dispatch(UpdateUserData({profilePic: val?.result?.Image?.url}));
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err.response);
        });
    } else {
      // Camera or storage permission is not granted
      console.log('Camera or storage permission is not granted');
    }
  };

  const openImageLibrary = async () => {
    const imageLibraryPermission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    const granted = await PermissionsAndroid.request(imageLibraryPermission);

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const options = {
        mediaType: 'photo',
      };

      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          // User canceled the image selection
        } else if (response.error) {
          // Handle errors
        } else {
          // You can access the selected image using response.assets[0].uri
          const selectedImageUri = response.assets[0].uri;
          // Do something with the selected image URI, like displaying it in your UI
          // You may also want to close the modal if needed
          setModalVisible(false);
        }
      });
    } else {
      // Permission not granted
      console.log('Image library permission not granted');
    }
  };

  // Returning
  return (
    <View style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
      {/* Profile details */}
      <Animatable.View
        delay={100}
        animation="fadeInUp"
        easing="ease-in-out-back"
        useNativeDriver={true}>
        <ImageBackground
          source={require('../../assets/images/backgrounds/liquid-cheese-background.png')}
          style={styles.headerImageBackground}>
          {/* Profile photo */}
          <View>
            <View
              style={[
                styles.profilePhotoWrapper,
                {
                  backgroundColor: theme.primary,
                },
              ]}>
              <Image
                style={[styles.profileImage]}
                source={
                  userInfo.profilePic
                    ? {uri: userInfo.profilePic}
                    : require('../../assets/illustrations/person.png')
                }
              />
            </View>

            {/* Camera icon */}
            {/* <View
              style={[
                styles.cameraIconWrapper,
                {
                  backgroundColor: theme.primary,
                },
              ]}>
              <TouchableOpacity onPress={toggleModal}>
                <Camera
                  width={STANDARD_VECTOR_ICON_SIZE}
                  height={STANDARD_VECTOR_ICON_SIZE}
                />
              </TouchableOpacity>
            </View> */}
          </View>

          {/* Profile name & email */}
          <View style={styles.profileNameAndEmailWrapper}>
            <Text style={[styles.profileName, {color: theme.textHighContrast}]}>
              {userInfo && userInfo.FirstName && userInfo.LastName
                ? `${userInfo.FirstName} ${userInfo.LastName}`
                : 'Hello Guest'}
            </Text>
            <Text
              style={[styles.profileEmail, {color: theme.textHighContrast}]}>
              {userInfo && userInfo.username ? userInfo.username : 'guest@gmail.com'}
            </Text>
          </View>
        </ImageBackground>
      </Animatable.View>

      {/* Navigation links */}
      <Animatable.View
        style={styles.navigationLinksScrollviewWrapper}
        delay={600}
        animation="fadeInUp"
        easing="ease-in-out-back"
        useNativeDriver={true}>
        {/* Scrollview */}
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          {/* Mapping data */}
          {NavigationData[0].my_profile.map((item, index) => (
            <View
              key={index}
              style={[
                styles.navigationLinkWrapper,
                {marginTop: index === 0 ? scale(45) : null},
              ]}>
              <NavigationLink
                linkBackgroundColor={theme.secondary}
                leftIconName={item.left_icon_name}
                iconType={item.icon_type}
                leftIconColor={theme.textHighContrast}
                leftIconWrapperBackgroundColor={theme.primary}
                iconSize={STANDARD_VECTOR_ICON_SIZE}
                label={item.label}
                labelColor={theme.textLowContrast}
                chevronColor={theme.textHighContrast}
                onPress={() => {
                  console.log('hhhhhhhhh', item);
                  if (item.navigation == 'Notification') {
                    navigation.navigate(item.navigation,{goBack:true});
                    
                  } else {
                    navigation.navigate(item.navigation);
                    
                  }
                }}
              />
            </View>
          ))}
        </ScrollView>
      </Animatable.View>
      <Animatable.View 
      delay={600}
      animation="fadeInUp"
      easing="ease-in-out-back"
      useNativeDriver={true}
      >
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}>
        <TouchableOpacity
          onPress={() => {setModalVisible(!isModalVisible);}}
          style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <View style={[styles.modalContent, {backgroundColor: theme.primary}]}>
            <View style={{alignItems: 'center'}}>
              <View style={styles.header} />
              <View style={{alignItems: 'center', marginVertical: 8}}>
                <Text
                  style={[styles.panelTitle, {color: theme.textLowContrast}]}>
                  Upload Photo
                </Text>
                <Text
                  style={[
                    styles.panelSubtitle,
                    {color: theme.textLowContrast},
                  ]}>
                  Choose Your Profile Picture
                </Text>
              </View>
            </View>
            <View style={styles.modalbtnview}>
              <Button
                label={'Take Photo'}
                labelColor={theme.primary}
                backgroundColor={theme.accent}
                onPress={() => {
                  openCamera();
                }}
              />
              <Button
                label={'Choose From Library'}
                labelColor={theme.primary}
                backgroundColor={theme.accent}
                onPress={() => {
                  openImageLibrary();
                }}
              />
              <Button
                label={'Cancel'}
                labelColor={theme.primary}
                backgroundColor={theme.accent}
                onPress={toggleModal}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      </Animatable.View>
    </View>
  );
};

// Exporting
export default MyProfile;
