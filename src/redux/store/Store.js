
//first code
// import {combineReducers, configureStore, createStore} from '@reduxjs/toolkit';
// import {persistStore, persistReducer} from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import ProductsReduce from '../slices/ProductsSlice';
// import  {  wishLists } from '../slices/WishlistSlice';
// import CartReducer from '../slices/CartSlice';
// import  { deliveryAddress } from '../slices/AddressSlice';
// import HomeProductReducre from '../slices/HomeproductsSlice';
// import usersSlices from '../slices/SessionUser';
// import { categories } from '../slices/CategoriesSlice';
// import { allImages } from '../slices/AllImagesSlice';
// import {productCart} from '../slices/ProductsCartSlice';
// import { subCategories } from '../slices/SubCategoriesSlice';

// const rootReducer = combineReducers({
//   products: ProductsReduce,
//   Homeproduct: HomeProductReducre,
//   cart: CartReducer,
//   address: deliveryAddress,
//   users: usersSlices,
//   categories:categories,
//   images:allImages,
//   wishList:wishLists,
//   productCart:productCart,
//   subCategories:subCategories
//   // Add other reducers heres
// });

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage, // Use a storage solution of your choice
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(persistedReducer);

// export const persistor = persistStore(store);

// export default store;


//second code 
// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import ProductsReducer from '../slices/ProductsSlice';
// import { wishLists } from '../slices/WishlistSlice';
// import CartReducer from '../slices/CartSlice';
// import { deliveryAddress } from '../slices/AddressSlice';
// import HomeProductReducer from '../slices/HomeproductsSlice';
// import usersSlices from '../slices/SessionUser';
// import { categories } from '../slices/CategoriesSlice';
// import { allImages } from '../slices/AllImagesSlice';
// import { productCart } from '../slices/ProductsCartSlice';
// import { subCategories } from '../slices/SubCategoriesSlice';

// const rootReducer = combineReducers({
//   products: ProductsReducer,
//   Homeproduct: HomeProductReducer,
//   cart: CartReducer,
//   address: deliveryAddress,
//   users: usersSlices,
//   categories: categories,
//   images: allImages,
//   wishList: wishLists,
//   productCart: productCart,
//   subCategories: subCategories,
//   // Add other reducers here
// });

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   // Add other middleware or enhancers if needed
// });

// export const persistor = persistStore(store);

// export default store;


// 3rd code
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { wishLists } from '../slices/WishlistSlice';
import { deliveryAddress } from '../slices/AddressSlice';
import usersSlices from '../slices/SessionUser';
import { categories } from '../slices/CategoriesSlice';
import { productCart } from '../slices/ProductsCartSlice';
import { subCategories } from '../slices/SubCategoriesSlice';
import { promotionList } from '../slices/PromotionSlice';

const rootReducer = combineReducers({
  address: deliveryAddress,
  users: usersSlices,
  categories: categories,
  wishList: wishLists,
  productCart: productCart,
  subCategories: subCategories,
  promotionList: promotionList,
  // Add other reducers here
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: { ignore: ['users','wishList','productCart', 'subCategories'] }, // Add your reducer name here
    }),
  // Add other middleware or enhancers if needed
});

export const persistor = persistStore(store);

export default store;
