import { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/slices/ProductsCartSlice";
import { updateUser } from "../../../redux/slices/SessionUser";

const useSurveyAnswers = () => {
    const userInfo = useSelector(state => state.users.users, shallowEqual);
    const dispatch = useDispatch();
    
    const updateReduxCart = (newValue) => {
        dispatch(addToCart(newValue));
    };
    
    const updateProductAmounts = useCallback((newValue) => {
    const productTotalAmount = userInfo.productTotalAmount + newValue;
    dispatch(updateUser({ productTotalAmount }));
}, [dispatch, userInfo.productTotalAmount]);
  const updatedUserInfo = useSelector(state => state.users.users, shallowEqual);

  return { updateProductAmounts, updateReduxCart, updatedUserInfo };
};

export default useSurveyAnswers;

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { addToCart } from "../../../redux/slices/ProductsCartSlice";
// import { updateUser } from "../../../redux/slices/SessionUser";

// class SurveyAnswersComponent extends Component {
//   componentDidMount() {
//     // Fetch userInfo or any other initialization logic here if needed

//     // Example usage:
//     const { dispatch } = this.props;

//     // Update Redux Cart
//     this.updateReduxCart(someValue);

//     // Update Product Amounts
//     this.updateProductAmounts(someValue);
//   }

//   updateReduxCart = (newValue) => {
//     const { dispatch } = this.props;
//     dispatch(addToCart(newValue));
//   };

//   updateProductAmounts = (newValue) => {
//     const { dispatch, userInfo } = this.props;
//     const productTotalAmount = userInfo.productTotalAmount + newValue;
//     dispatch(updateUser({ productTotalAmount }));
//   };

 
// }

// const mapStateToProps = (state) => ({
//   userInfo: state.users.users,
// });

// export default connect(mapStateToProps)(SurveyAnswersComponent);
