import axios from 'axios';
import {showMessage, hideMessage} from 'react-native-flash-message';
// import {Application_ID, BASE_URL, REST_API_Key, API_URL} from '@env';
import {Application_ID, BASE_URL, REST_API_Key, API_URL} from '../../env';

export const getCategories = async () => {
  var config = {
    method: 'post',
    // url: `${API_URL}/NewCategories`,
    url: `${API_URL}/categories`,
    headers: {
      'X-Parse-Application-Id': Application_ID,
      'X-Parse-REST-API-Key': REST_API_Key,
    },
  };
  return new Promise((resolve, reject) => {
    axios(config)
      .then(json => {
        resolve(json.data);
        console.log('0000000000000000000000000000000000000000000000000000000000000', json.data.result.data[0]);
      })
      .catch(err => {
        console.log('err.message', err.message);
        reject(err.message);
      });
  });
};
export const getSubCategories = async data => {
  var config = {
    method: 'post',
    // url: `${API_URL}/getProductBySub`,
    url: `${API_URL}/subCategories`,
    headers: {
      'X-Parse-Application-Id': Application_ID,
      'X-Parse-REST-API-Key': REST_API_Key,
      'Content-Type': 'application/json',
    },
    data: data,
  };
  console.log(data, 'getSubCategories', config);
  return new Promise((resolve, reject) => {
    console.log('config', config);
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

export const getAllImages = async () => {
  var config = {
    method: 'post',
    url: `${API_URL}/getAllImage`,
    headers: {
      // 'X-Parse-Application-Id': Application_ID,
      // 'X-Parse-REST-API-Key':REST_API_Key
      'X-Parse-Application-Id': '4G4bdIqfovJisnN5NLpjYiZI3ho5Ra0RfAj5S8q9',
      'X-Parse-REST-API-Key': 'vzcd4xmzYwILECXJ5mDIddR4nto3pdGzxHhBBY9S',
    },
  };
  return new Promise((resolve, reject) => {
    console.log('config', config);
    axios(config)
      .then(json => {
        // console.log('json.getAllImages getAllImages', json.data);
        resolve(json.data);
      })
      .catch(err => {
        console.log('err.message', err.message);
        reject(err.message);
      });
  });
};

export const createDeliveryAddress = async data => {
  var config = {
    method: 'post',
    url: `${API_URL}/createAddress`,
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
        console.log('jsonjsonjsonjsonjsonjson', json.data);
        resolve(json.data);
      })
      .catch(err => {
        console.log('err.message', err.message);
        reject(err.message);
      });
  });
};

export const putDeliveryAddress = async data => {
  var config = {
    method: 'post',
    url: `${API_URL}/updateAddress`,
    headers: {
      'X-Parse-Application-Id': Application_ID,
      'X-Parse-REST-API-Key': REST_API_Key,
      'Content-Type': 'application/json',
    },
    data: data,
  };
  return new Promise((resolve, reject) => {
    axios(config)
      .then(json => {
        console.log('config', json);
        resolve(json.data);
      })
      .catch(err => {
        console.log('err.message', err.message);
        reject(err.message);
      });
  });
};

export const getDeliveryAddress = async objectId => {
  var config = {
    method: 'post',
    url: `${API_URL}/GetAllAddress`,
    headers: {
      'X-Parse-Application-Id': Application_ID,
      'X-Parse-REST-API-Key': REST_API_Key,
      'Content-Type': 'application/json',
    },
    data: {
      UserID: objectId,
    },
  };
  return new Promise((resolve, reject) => {
    console.log('config', config);
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

export const deleteDeliveryAddress = async objectId => {
  var config = {
    method: 'post',
    url: `${API_URL}/destroyAddress`,
    headers: {
      'X-Parse-Application-Id': Application_ID,
      'X-Parse-REST-API-Key': REST_API_Key,
      'Content-Type': 'application/json',
    },
    data: {
      objectId: objectId,
    },
  };
  return new Promise((resolve, reject) => {
    console.log('confignnnnnnnnnnnnnnnnnnnnnn', config);
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

export const nearByStore = async (lat, lng) => {
  var config = {
    method: 'post',
    url: `${API_URL}/polygonListByLatLong`,
    headers: {
      'X-Parse-Application-Id': Application_ID,
      'X-Parse-REST-API-Key': REST_API_Key,
      'Content-Type': 'application/json',
    },
    data: {
      Lat: 25.19108,
      Lng: 55.26078,
      // Lat: lat,
      // Lng:lng,
    },
  };
  return new Promise((resolve, reject) => {
    console.log('config', config);
    axios(config)
      .then(json => {
        console.log('json.data', json.data);
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

export const selectedStoreData = async (userId, selectedStoreId) => {
  var config = {
    method: 'post',
    url: `${API_URL}/activeAddress`,
    headers: {
      'X-Parse-Application-Id': Application_ID,
      'X-Parse-REST-API-Key': REST_API_Key,
      'Content-Type': 'application/json',
    },
    data: {
      UserID: userId,
      objectId: selectedStoreId,
      Status: true,
    },
  };
  return new Promise((resolve, reject) => {
    console.log('config', config);
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
export const getSelectedStoreData = async userId => {
  var config = {
    method: 'post',
    url: `${API_URL}/getActiveAddress`,
    headers: {
      'X-Parse-Application-Id': Application_ID,
      'X-Parse-REST-API-Key': REST_API_Key,
      'Content-Type': 'application/json',
    },
    data: {
      UserID: userId,
    },
  };
  return new Promise((resolve, reject) => {
    console.log('config', config);
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

export const getOrders = async (userId, type) => {
  // type use past and current
  const endpoint = type == 'past' ? 'GetAllPastOrder' : 'GetAllCurrentOrder';
  var config = {
    method: 'post',
    url: `${API_URL}/${endpoint}`,
    headers: {
      'X-Parse-Application-Id': Application_ID,
      'X-Parse-REST-API-Key': REST_API_Key,
      'Content-Type': 'application/json',
    },
    data: {
      UserID: userId,
    },
  };
  console.log('configconfig', config);
  return new Promise((resolve, reject) => {
    axios(config)
      .then(json => {
        console.log('configconfig============', json.data.result);
        resolve(json.data.result);
      })
      .catch(err => {
        console.log('err.message', err.message);
        reject(err.message);
      });
  });
};

export const userGetbranchinfo = async data => {
  let config = {
    method: 'post',
    url: `${API_URL}/getBranchInfo`,
    headers: {
      'X-Parse-Application-Id': Application_ID,
      'X-Parse-REST-API-Key': REST_API_Key,
    },
    data: data,
  };
  return new Promise(async (resolve, reject) => {
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

export const getAllBranch = async data => {
  let config = {
    method: 'post',
    url: `${API_URL}/getbranch`,
    headers: {
      'X-Parse-Application-Id': Application_ID,
      'X-Parse-REST-API-Key': REST_API_Key,
    },
    data: data,
  };
  return new Promise(async (resolve, reject) => {
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

export const userPromotion = async data => {
  let config = {
    method: 'post',
    url: `${API_URL}/getPromotionList`,
    headers: {
      'X-Parse-Application-Id': Application_ID,
      'X-Parse-REST-API-Key': REST_API_Key,
    },
    data: data,
  };
  return new Promise(async (resolve, reject) => {
    axios(config)
      .then(json => {
        console.log("userPromotion",json.data);
        resolve(json.data);
      })
      .catch(err => {
        console.log('err.message', err.message);
        reject(err.message);
      });
  });
};

export const userPromotioncontent = async data => {
  let config = {
    method: 'post',
    url: `${API_URL}/GetPromotion`,
    headers: {
      'X-Parse-Application-Id': Application_ID,
      'X-Parse-REST-API-Key': REST_API_Key,
      'Content-Type': 'text/plain',
    },
    data: data,
  };
  return new Promise(async (resolve, reject) => {
    axios(config)
      .then(json => {
        resolve(json.data);
        console.log('userPromotioncontent',json.data);
      })
      .catch(err => {
        console.log('err.message', err.message);
        reject(err.message);
      });
  });
};

export const userSuggestproduct = async data => {
  let config = {
    method: 'post',
    url: `${API_URL}/suggestproduct`,
    headers: {
      'X-Parse-Application-Id': Application_ID,
      'X-Parse-REST-API-Key': REST_API_Key,
    },
    data: data,
  };
  return new Promise(async (resolve, reject) => {
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

export const userFeedback = async data => {
  let config = {
    method: 'post',
    url: `${API_URL}/feedback`,
    headers: {
      'X-Parse-Application-Id': Application_ID,
      'X-Parse-REST-API-Key': REST_API_Key,
    },
    data: data,
  };
  return new Promise(async (resolve, reject) => {
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

export const getOrederDetails = async (userId, orderId) => {
  let config = {
    method: 'post',
    url: `${API_URL}/GetOrderDetail`,
    headers: {
      'X-Parse-Application-Id': Application_ID,
      'X-Parse-REST-API-Key': REST_API_Key,
    },
    //   data: {
    //     "UserID": "5veHpkYx7l",
    //     "objectId": "000wmftzKB"
    // },
    data: {
      UserID: userId,
      objectId: orderId,
    },
  };
  console.log('configconfigconfigconfigconfigconfigconfigconfig', config);
  return new Promise(async (resolve, reject) => {
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

export const getLastOrederDetails = async userId => {
  let config = {
    method: 'post',
    url: `${API_URL}/GetLastOrderDetail`,
    headers: {
      'X-Parse-Application-Id': Application_ID,
      'X-Parse-REST-API-Key': REST_API_Key,
    },
    data: {
      UserID: userId,
    },
  };
  return new Promise(async (resolve, reject) => {
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

export const userProductSearch = async data => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API_URL}/productSearchByBarcode`,
      headers: {
        'X-Parse-Application-Id': Application_ID,
        'X-Parse-REST-API-Key': REST_API_Key,
        'Content-Type': 'application/json',
      },
      data: data,
    };
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

export const userProductSearchByText = async data => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'post',
      url: `${API_URL}/productSearchByText`,
      headers: {
        'X-Parse-Application-Id': Application_ID,
        'X-Parse-REST-API-Key': REST_API_Key,
        'Content-Type': 'application/json',
      },
      data: data,
    };
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

export const userProductSearchByCategoriesIDText = async data => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'post',
      url: `${API_URL}/searchProductByTextWithFilter`,
      headers: {
        'X-Parse-Application-Id': Application_ID,
        'X-Parse-REST-API-Key': REST_API_Key,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log('configconfigconfig', config);
    axios(config)
      .then(json => {
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

export const userCreateOrderData = async data => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'post',
      url: `${API_URL}/orderSave`,
      headers: {
        'X-Parse-Application-Id': Application_ID,
        'X-Parse-REST-API-Key': REST_API_Key,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    console.log("configconfigconfigconfig",config);
    console.log("datatataattaatat",data.Order);
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

export const userLeaflet = async data => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'post',
      url: `${API_URL}/leaflet`,
      headers: {
        'X-Parse-Application-Id': Application_ID,
        'X-Parse-REST-API-Key': REST_API_Key,
        'Content-Type': 'application/json',
      },
    };
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

export const cancelOrders = async data => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'post',
      url: `${API_URL}/orderUpdate`,
      headers: {
        'X-Parse-Application-Id': Application_ID,
        'X-Parse-REST-API-Key': REST_API_Key,
        'Content-Type': 'application/json',
      },
      data: data,
    };
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

export const addFavouriteData = async data => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'post',
      url: `${API_URL}/addfavproducts`,
      headers: {
        'X-Parse-Application-Id': Application_ID,
        'X-Parse-REST-API-Key': REST_API_Key,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log('config', config);
    axios(config)
      .then(json => {
        resolve(json.data);
      })
      .catch(err => {
        console.log('err', err);

        reject(err.message);
      });
  });
};

export const getFavouriteData = async data => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'post',
      url: `${API_URL}/favproduct`,
      headers: {
        'X-Parse-Application-Id': Application_ID,
        'X-Parse-REST-API-Key': REST_API_Key,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    axios(config)
      .then(res => {
        console.log('resresresresres', res.data.result.data);

        resolve(res.data);
      })
      .catch(err => {
        console.log('err.message', err.message);
        reject(err.message);
      });
  });
};

export const getAlterProduct = async data => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'post',
      url: `${API_URL}/GetAlternativeProduct`,
      headers: {
        'X-Parse-Application-Id': Application_ID,
        'X-Parse-REST-API-Key': REST_API_Key,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log('configconfig', config);
    axios(config)
      .then(res => {
        console.log('resresresresres', res.data.result.data);

        resolve(res.data);
      })
      .catch(err => {
        console.log('err.message', err.message);
        reject(err.message);
      });
  });
};

export const updateAlterProduct = async data => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'post',
      url: `${API_URL}/alternateProductOrderSave`,
      headers: {
        'X-Parse-Application-Id': Application_ID,
        'X-Parse-REST-API-Key': REST_API_Key,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log(data, 'configconfig', config);
    axios(config)
      .then(res => {
        console.log('resresresresres', res.data);

        resolve(res.data);
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

export const getSubCategoriesList = async data => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'post',
      url: `${API_URL}/getProductBySubCategory`,
      headers: {
        'X-Parse-Application-Id': Application_ID,
        'X-Parse-REST-API-Key': REST_API_Key,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log('configconfig', config);
    axios(config)
      .then(res => {
        console.log('resresresresres', res.data);

        resolve(res.data);
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

export const getTopSellingList = async data => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'post',
      url: `${API_URL}/getTopSellingProduct`,
      headers: {
        'X-Parse-Application-Id': Application_ID,
        'X-Parse-REST-API-Key': REST_API_Key,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log(data, 'configconfig', config);
    axios(config)
      .then(res => {
        console.log('resresresresres', res.data);

        resolve(res.data);
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

export const getProductPaginationList = async (data, endPoint) => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'post',
      url: `${API_URL}/${endPoint}`,
      headers: {
        'X-Parse-Application-Id': Application_ID,
        'X-Parse-REST-API-Key': REST_API_Key,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log('configconfig', config);
    // return
    await axios(config)
      .then(res => {
        console.log('resresresresres', res.data);
        if (res?.data?.result?.data?.length > 0) {
          resolve(res.data);
        } else {
          resolve({result: {count: 0, data: [], page: 0, status: 'success'}});
        }
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

export const subCategoriesList = async (data) => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'post',
      url: `${API_URL}/getCategories`,
      headers: {
        'X-Parse-Application-Id': Application_ID,
        'X-Parse-REST-API-Key': REST_API_Key,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log('configconfig', config);
    // return
    await axios(config)
      .then(res => {
        console.log('resresresresres', res.data);

        resolve(res.data);
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


export const promotionProduct = async storeId => {
  let config = {
    method: 'post',
    url: `${API_URL}/promotionDataSend`,
    headers: {
      'X-Parse-Application-Id': Application_ID,
      'X-Parse-REST-API-Key': REST_API_Key,
    },
    data: {
      StoreId: storeId,
    },
  };
  return new Promise(async (resolve, reject) => {
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

export const getNotification = async userId => {
  var config = {
    method: 'post',
    url: `${API_URL}/getNotifications`,
    headers: {
      'X-Parse-Application-Id': Application_ID,
      'X-Parse-REST-API-Key': REST_API_Key,
      'Content-Type': 'application/json',
    },
    data: {
      userId: userId,
    },
  };
  return new Promise((resolve, reject) => {
    console.log('config', config);
    axios(config)
      .then(json => {
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

export const deleteOneNotification = async (data) => {
  var config = {
    method: 'post',
    url: `${API_URL}/deleteNotifications`,
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
        console.log("jsssssssssssss",json.data);
        resolve(json.data);
      })
      .catch(err => {
        console.log('err.message', err.message);
        reject(err.message);
      });
  });
};