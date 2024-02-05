import {showMessage} from 'react-native-flash-message';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import Constants from './Constants';

export const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const cords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          heading: position?.coords?.heading,
        };
        console;
        resolve(cords);
      },
      error => {
        reject(error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });

export const locationPermission = () =>
  new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
      try {
        const permissionStatus = await Geolocation.requestAuthorization(
          'whenInUse',
        );
        if (permissionStatus === 'granted') {
          return resolve('granted');
        } else {
          resolve('denied');
        }
        // reject('Permission not granted');
      } catch (error) {
        return reject(error);
      }
    }
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )
      .then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          resolve('granted');
        } else {
          resolve('denied');
        }
        // return reject('Location Permission denied');
      })
      .catch(error => {
        console.log('Ask Location permission error: ', error);
        return reject(error);
      });
  });

const showError = message => {
  showMessage({
    message,
    type: 'danger',
    icon: 'danger',
  });
};

const showSuccess = message => {
  showMessage({
    message,
    type: 'success',
    icon: 'success',
  });
};

export {showError, showSuccess};

export const cameraPermission = async () => {
  const openCamera = () => {
    openSettings()
      .then(val => {
        console.warn(' open settings', val);
        return;
      })
      .catch(err => console.warn('cannot open settings', err));
  };
  return new Promise(async (resolve, reject) => {
    await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    )
      .then(result => {
        if (RESULTS.BLOCKED == result) {
          Alert.alert(
            Constants.appName,
            'Would like to use your camera. you turn on your camera.',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => openCamera()},
            ],
          );
        }
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};

// export const deliveryCharges = async (storeData) => {
//     const chargeData = JSON.parse(storeData?.DeliveryCharge);
//     const userKM = parseInt(storeData?.UserDistance);
//     return new Promise(async (resolve, reject) => {
//       const deliveryChargeData = chargeData.find((item) => {
//         const deliveryKM = parseInt(item.DeliveryKM);
//         return userKM >= deliveryKM && userKM < deliveryKM + 5;
//       });
//       console.log("deliveryChargeData", deliveryChargeData);
//       resolve(deliveryChargeData ? deliveryChargeData.DeliveryCharge : null);
//     });
//   };

export const deliveryCharges = async storeData => {
  try {
    const deliveryInfoArray = JSON.parse(storeData?.DeliveryCharge);
    // if userKM > DeliveryCharegKM then send 0
    console.log("ssssssssssssssssssssssssss",storeData?.DeliveryCharge);
    // const deliveryInfoArray = JSON.parse(
    //   '[{"DeliveryChareg": 3, "DeliveryKM": 5}, {"DeliveryChareg": 5, "DeliveryKM": 10}, {"DeliveryChareg": 5, "DeliveryKM": 15}, {"DeliveryChareg": 5, "DeliveryKM": 30}]'
    // );
    //  console.log("ssssssssssssssssssssssssss",deliveryInfoArray);
    const userKM =  parseInt(storeData?.UserDistance);

    for (const entry of deliveryInfoArray) {
      if (userKM <= entry.DeliveryKM) {
        return entry.DeliveryChareg;
      }
    }

    // If userDistance is greater than the maximum distance in the last entry, return the charge of the last entry
    // return deliveryInfoArray[deliveryInfoArray.length - 1].DeliveryChareg;
    return 0;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};


// export const getTimeAgo = (dateAndTime) => {
//   const currentTime = new Date();
//   const notificationTime = new Date(dateAndTime);
//   const diffInMilliseconds = currentTime - notificationTime;
//   const diffInMinutes = Math.floor(diffInMilliseconds / 60000);

//   if (diffInMinutes === 0) {
//     return "Just now";
//   } else if (diffInMinutes === 1) {
//     return "1 minute ago";
//   } else {
//     return `${diffInMinutes} minutes ago`;
//   }
// };

export const getTimeAgo = (dateAndTime) => {
  const currentTime = new Date();
  const notificationTime = new Date(dateAndTime);
  const diffInMilliseconds = currentTime - notificationTime;
  const diffInMinutes = Math.floor(diffInMilliseconds / 60000);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const days = Math.floor(diffInDays);
  const hours = diffInHours - days * 24;
  const minutes = diffInMinutes - hours * 60;

  if (days === 0) {
    if (hours === 0) {
      return `${minutes} m`;
    } else if (hours === 1) {
      return `${hours} h ${minutes} m`;
    } else {
      return `${hours} h ${minutes} m`;
    }
  } else if (days === 1) {
    return `${days} day`;
  } else {
    const date = new Date(notificationTime);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
};