import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Badge, Surface, Title} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
// import Colors from '../constants/Colors';
import {IndependentColors} from '../../config/Colors';
import {FONT_SIZE_MD, OPEN_SANS_SEMIBOLD, STANDARD_USER_AVATAR_WRAPPER_SIZE} from '../../config/Constants';
import {scale} from 'react-native-size-matters';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../constants/Colors';
import { useSelector } from 'react-redux';

const IconSize = scale(20);

const Header = ({
  style,
  menu,
  back,
  title,
  right,
  rightIcon,
  onRightPress,
  onLeftPress,
  optionalBtn,
  optionalBtnPress,
  rightComponent,
  headerBg,
  iconColor,
  titleAlight,
  optionalBadge,
  cartItemsLength,
}) => {
  const productCart = useSelector(state => state.productCart.cartItems);

  const LeftView = () => (
    <View style={styles.view}>
      {menu && (
        <TouchableOpacity onPress={() => {}}>
          <Feather name="menu" size={IconSize} color={iconColor} />
        </TouchableOpacity>
      )}
      {back ? (
        <TouchableOpacity hitSlop={{bottom:15, top:15, left:15, right:15}} onPress={onLeftPress}>
          <Feather name="arrow-left" size={IconSize} color={Colors.white} />
        </TouchableOpacity>
      ) : <TouchableOpacity>
      <Feather name="arrow-left" size={IconSize} color={Colors.primary} />
    </TouchableOpacity>}
    </View>
  );
  const RightView = () =>
    rightComponent ? (
      rightComponent
    ) : (
      <View style={[ styles.rightView]}>
        {optionalBtn && (
          <TouchableOpacity style={styles.rowView} onPress={optionalBtnPress}>
            <Feather name={optionalBtn} size={IconSize} color={iconColor} />
            {optionalBadge && (
              <Badge style={{position: 'absolute', top: -5, right: -10}}>
                {optionalBadge}
              </Badge>
            )}
          </TouchableOpacity>
        )}
        {/*vector icon add on right side */}

        {right && (
          <TouchableOpacity onPress={onRightPress}>
            <Feather name={right} size={IconSize} color={iconColor} />
          </TouchableOpacity>
        )}
        {/*cart icon */}
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress}>
            <Image
              source={require('../../assets/illustrations/bags-shopping.png')}
              style={[
                styles.avatarImage,
                {tintColor: IndependentColors.white},
              ]}
            />
            {productCart.length > 0 && ( 
              <Badge restStyle={{backgroundColor:Colors.error}} style={{ position: 'absolute', top: wp('-2'), left: wp('4') }}>
                {productCart.length}
              </Badge>
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  const TitleView = () => (
    <View style={styles.titleView}>
      <Title
        style={{
          color: Colors.white,
          textAlign: 'center',
          alignSelf:'center',
          fontFamily: OPEN_SANS_SEMIBOLD,
          fontSize: FONT_SIZE_MD,
        }}>
        {title}
      </Title>
    </View>
  );
  return (
    <Surface style={[styles.header, style]}>
      <LeftView />
      <TitleView />
      <RightView />
    </Surface>
  );
};

export default Header;

export const SimpleHeader = ({
  style,
  menu,
  back,
  title,
  right,
  rightIcon,
  onRightPress,
  onLeftPress,
  optionalBtn,
  optionalBtnPress,
  rightComponent,
  headerBg,
  iconColor,
  titleAlight,
  optionalBadge,
  cartItemsLength,
}) => {
  const productCart = useSelector(state => state.productCart.cartItems);

  const LeftView = () => (
    <View style={styles.view}>
      {menu && (
        <TouchableOpacity onPress={() => {}}>
          <Feather name="menu" size={IconSize} color={iconColor} />
        </TouchableOpacity>
      )}
      {back && (
        <TouchableOpacity onPress={onLeftPress}>
          <Feather name="arrow-left" size={IconSize} color={Colors.white} />
        </TouchableOpacity>
      )}
    </View>
  );
  const RightView = () =>
    rightComponent ? (
      rightComponent
    ) : (
      <View style={[ styles.rightView]}>
        {optionalBtn && (
          <TouchableOpacity style={styles.rowView} onPress={optionalBtnPress}>
            <Feather name={optionalBtn} size={IconSize} color={iconColor} />
            {optionalBadge && (
              <Badge style={{position: 'absolute', top: -5, right: -10}}>
                {optionalBadge}
              </Badge>
            )}
          </TouchableOpacity>
        )}
        {/*vector icon add on right side */}

        {right && (
          <TouchableOpacity onPress={onRightPress}>
            <Feather name={right} size={IconSize} color={iconColor} />
          </TouchableOpacity>
        )}
        {/*cart icon */}
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress}>
            <Image
              source={require('../../assets/illustrations/bags-shopping.png')}
              style={[
                styles.avatarImage,
                {tintColor: IndependentColors.white},
              ]}
            />
            {productCart.length > 0 && ( 
              <Badge restStyle={{backgroundColor:Colors.error}} style={{ position: 'absolute', top: wp('-2'), left: wp('4') }}>
                {productCart.length}
              </Badge>
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  const TitleView = () => (
    <View style={styles.titleView}>
      <Text
        style={{
          color: Colors.white,
          textAlign: 'center',
          alignSelf:'center',
          fontFamily: OPEN_SANS_SEMIBOLD,
          fontSize: FONT_SIZE_MD,
        }}>
        {title}
      </Text>
    </View>
  );
  return (
    <View style={[styles.header, style, {elevation:0}]}>
      <LeftView />
      <TitleView />
      <RightView />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    // height: 50,
    height: hp('6.2'),
    // width:wp('100'),
    // borderWidth:2,
    elevation: 8,

    // justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor:Colors.primary,
  },
  view: {
    marginHorizontal: wp('2'),
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleView: {
    // flex: 1,
    // borderWidth:2,

    width:wp('80')
  },
  rightView: {
    justifyContent: 'flex-end',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarImage: {
    width: STANDARD_USER_AVATAR_WRAPPER_SIZE * 0.7,
    height: STANDARD_USER_AVATAR_WRAPPER_SIZE * 0.7,
  },
});
