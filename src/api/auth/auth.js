import axios from 'axios';
import {showMessage, hideMessage} from 'react-native-flash-message';
// import {Application_ID, BASE_URL, REST_API_Key, API_URL} from '@env';
import {Application_ID, BASE_URL, REST_API_Key, API_URL} from '../../env';

export const userLogin = async data => {
  console.log('data', data);
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/login?username=${data.email}&password=${data.password}`,
      headers: {
        'X-Parse-Application-Id': Application_ID,
        'X-Parse-REST-API-Key': REST_API_Key,
        'Content-Type': 'application/json',
      },
    };
    console.log('configconfigconfigconfigconfig', config);

    axios
      .request(config)
      .then(function (response) {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          // Handle other success status codes here if needed
          reject(new Error('Login failed: Unexpected status code'));
        }
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 404) {
            // Handle the case when the user enters wrong credentials
            reject(new Error('Login failed: Invalid email or password'));
            showMessage({
              message: 'Login Failed',
              description: 'Invalid email or password. Please try again.',
              type: 'danger',
            });
          } else {
            // Handle other server errors here if needed
            reject(new Error('Login failed: Server error'));
            showMessage({
              message: 'Login Failed',
              description:
                'An error occurred while processing your request. Please try again later.',
              type: 'danger',
            });
          }
        } else {
          // Handle network errors or other unexpected errors here
          reject(new Error('Login failed: Network error'));
          showMessage({
            message: 'Network Error',
            description:
              'An error occurred. Please check your network connection and try again.',
            type: 'danger',
          });
        }
      });
  });
};

// export const userRegister = async data => {
//   return new Promise(async (resolve, reject) => {
//     let config = {
//       method: 'post',  // Use 'post' for registration
//       url: `${API_URL}/register`,
//       headers: {
//         'X-Parse-Application-Id': Application_ID,
//         'X-Parse-REST-API-Key': REST_API_Key,
//         'Content-Type': 'application/json', // Set content type for POST request
//       },
//       data: data,
//     };

//     axios
//       .request(config)
//       .then(function (response) {
//         console.log('response',response);
//         if (response.status === 200) {
//           console.log('response.data.result.status',response.data.result);
//           if (response.data && response.data.result && response.data.result.status === 'success') {
//             // Resolve the promise with a success message
//             showMessage({
//               message: 'Successfully registered!',
//               type: 'success',
//               icon: 'success',
//             });
//             resolve(response.data);
//           } else if (response.data && response.data.result && response.data.result.status === 'failed') {
//             showMessage({
//               message: response.data.result.message,
//               type: 'danger',
//               icon: 'danger',
//             });
//             // Reject the promise with an error message
//             reject(new Error(response.data.result.message));
//           } else {
//             // Handle other success status codes here if needed
//             reject(new Error('Registration failed: Unexpected status code'));
//           }
//         } else {
//           // Handle other server errors here if needed
//           reject(new Error('Registration failed: Server error'));
//         }
//       })
//       .catch(function (error) {
//         if (error.response) {
//           if (error.response.status === 404) {
//             // Handle the case when the user enters wrong credentials
//             reject(new Error('Registration failed: Invalid data'));
//           } else {
//             // Handle other server errors here if needed
//             reject(new Error('Registration failed: Server error'));
//           }
//         } else {
//           // Handle network errors or other unexpected errors here
//           reject(new Error('Registration failed: Network error'));
//         }
//       });
//   });
// };

//OTP TEST Purpuse
export const getMobileOTP = async data => {
  var config = {
    method: 'post',
    // url: `${API_URL}/SendOTPTest`, // development
    url: `${API_URL}/SendOTP`, // production
    headers: {
      'X-Parse-Application-Id': Application_ID,
      'X-Parse-REST-API-Key': REST_API_Key,
    },
    data: data,
  };
  return new Promise((resolve, reject) => {
    console.log('config', config);
    axios(config)
      .then(json => {
        console.log('json.Mobile Otp', json.data);
        resolve(json.data);
      })
      .catch(err => {
        console.log('err.message', err.message);
        reject(err.message);
      });
  });
};
export const verifyMobileOTP = async data => {
  var config = {
    method: 'post',
    // url: `${API_URL}/VerifyOtpTest`, //development
    url: `${API_URL}/VerifyOTP`, //production
    headers: {
      'X-Parse-Application-Id': Application_ID,
      'X-Parse-REST-API-Key': REST_API_Key,
      'Content-Type': 'application/json',
    },
    data: data,
  };
  return new Promise((resolve, reject) => {
    console.log('config', config);
    axios(config)
      .then(json => {
        console.log('json.Mobile Otp', json.data);
        resolve(json.data);
      })
      .catch(err => {
        console.log('err.message', err.message);
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        reject(err.message);
      });
  });
};

export const userRegister = async data => {
  var config = {
    method: 'post',
    url: `${API_URL}/register`,
    headers: {
      'X-Parse-Application-Id': Application_ID,
      'X-Parse-REST-API-Key': REST_API_Key,
      'Content-Type': 'application/json',
    },
    data: data,
  };
  return new Promise((resolve, reject) => {
    console.log('config', config);
    axios(config)
      .then(json => {
        console.log('json.Mobile Otp', json.data);
        resolve(json.data);
      })
      .catch(err => {
        console.log('err.message', err.message);
        reject(err.message);
      });
  });
};

export const userChangePassword = async data => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'post',
      url: `${API_URL}/changePassword`,
      headers: {
        'X-Parse-Application-Id': Application_ID,
        'X-Parse-REST-API-Key': REST_API_Key,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log('json.Mobile Otp', config);
    axios(config)
      .then(json => {
        resolve(json.data);
      })
      .catch(err => {
        console.log('err.message', err.message);
        reject(err.message);
      });
  });
};

export const userEditProfile = async data => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'post',
      url: `${API_URL}/editprofile`,
      headers: {
        'X-Parse-Application-Id': Application_ID,
        'X-Parse-REST-API-Key': REST_API_Key,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log('json.Mobile Otp', config);
    axios(config)
      .then(json => {
        console.log('json.Mobile Otp', config);
        resolve(json.data);
      })
      .catch(err => {
        console.log('err.message', err.message);
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        reject(err);
      });
  });
};

export const userUpdateEmail = async data => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'post',
      url: `${API_URL}/updateEmail`,
      headers: {
        'X-Parse-Application-Id': Application_ID,
        'X-Parse-REST-API-Key': REST_API_Key,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log('json.Mobile Otp', config);
    axios(config)
      .then(json => {
        resolve(json.data);
      })
      .catch(err => {
        console.log('err.message', err.message);
        reject(err.message);
      });
  });
};

export const forgotEmailPassword = async (email) => {
  var config = {
    method: 'post',
    url: `${API_URL}/resetPassword`,
    headers: {
      'X-Parse-Application-Id': Application_ID,
      'X-Parse-REST-API-Key': REST_API_Key,
    },
    data: {
      // email: 'indore123@gmail.com',
      // email: 'atm06699@gmail.com',
      email: email,
    },
  };
  return new Promise((resolve, reject) => {
    console.log('config', config);
    axios(config)
      .then(json => {
        console.log('json.Mobile Otp', json.data);
        resolve(json.data);
      })
      .catch(err => {
        console.log('err.message', err.message);
        reject(err.message);
      });
  });
};


export const userDeleteAccount = async (userID) => {
  var config = {
    method: 'post',
    url: `${API_URL}/deleteAccount`,
    headers: {
      'X-Parse-Application-Id': Application_ID,
      'X-Parse-REST-API-Key': REST_API_Key,
    },
    data: {
      userID: userID,
    },
  };
  return new Promise((resolve, reject) => {
    console.log('config', config);
    axios(config)
      .then(json => {
        console.log('json.Mobile Otp', json.data);
        resolve(json.data);
      })
      .catch(err => {
        console.log('err.message', err.message);
        reject(err.message);
      });
  });
};
