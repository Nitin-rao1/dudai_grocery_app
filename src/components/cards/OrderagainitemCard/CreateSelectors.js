import { createSelector } from '@reduxjs/toolkit'


const wishLists = (state) => state.wishList;
const selectIsLoggedIn = createSelector(
 [wishLists],
 (user) => user.wishListID
);

export { selectIsLoggedIn };