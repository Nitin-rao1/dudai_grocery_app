import React, {Component, useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {IndependentColors} from '../../config/Colors';
import {Image} from 'react-native-animatable';
import {ThemeContext} from '../../theming/ThemeContext';
import Shopinfodata from '../../components/Shopinfodata';
import Header from '../../components/Header';
import styles from './styles';
import {STANDARD_VECTOR_ICON_SIZE} from '../../config/Constants';
import Button from '../../components/buttons/Button';
import {scale} from 'react-native-size-matters';
import {Linking, ActivityIndicator} from 'react-native';
import {userGetbranchinfo} from '../../api/categories/categoriesAndProduct';
import {useSelector} from 'react-redux';
import StoreBranch from '../../components/storeBranch/StoreBranch';
import Colors from '../../constants/Colors';

const Shopinfo = ({navigation}) => {
  const userInfo = useSelector(state => state.users.users);

  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;
  const [currentBranchData, setCurrentBranchData] = useState([]);
  const [otherBranchData, setOtherBranchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const branchId = userInfo?.selectedStoreData?.BranchId || '';
    if (branchId) {
      userGetbranchinfo({
        BranchId: branchId,
      })
        .then(res => {

          const currentInfo = [res.result.brancheInfo];
          setOtherBranchData(res.result.branchData);
          console.log("resresres",res);
          setCurrentBranchData(currentInfo);
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
        });
    } else {
    }
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: theme.primary}]}>
      <Header
        back
        onLeftPress={() => navigation.goBack()}
        title={'Shopinfo'}
        headerBg={Colors.primary}
        iconColor={IndependentColors.white}
        titleAlight={'center'}
      />

      {/* image carusel */}

      <ScrollView bounces={false}>
        <View>
          <Shopinfodata />
        </View>
        {/* logo */}
        <View style={styles.Imagecontainer}>
          <Image
            style={styles.ImageStyle}
            source={require('../../assets/images/appstore.png')}
          />
        </View>
        <View style={styles.ViewContentCOntainerStyle}>
          <Text style={[styles.pointDetails, {color: theme.textLowContrast}]}>
            We provide state-of-the- art infrasture.when you shope we believe
            that it should be a fun experience and a relaxing one for you.
            {/* <Text style={{color: theme.accent}}> www.foodrush.com </Text>, its
            mobile application, and m-site (hereinafter referred to as the
            “Platform”). */}{' '}
            {'\n'}
            {'\n'}we are group of Supermarket and retail outlets. we are always
            on the hunt for the best quality of products. customers are a part
            of our extended family and we care and nurture them with the best of
            products. we are always keen to add a wide range of products to our
            existing line of products. The staff always welcomes the known and
            unknown with a smile on their face and help you willingly with your
            needs. The next time you visit us, experience what we say. Happy
            shopping...!!!. {'\n'}
            {'\n'}Your Grocery Shopping Destination -New W Mart.
          </Text>
        </View>

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={theme.accent}
            style={{marginTop: 20}}
          />
        ) : (
          <>
            <StoreBranch data={currentBranchData} title={'Current Branch'} />
            <View style={styles.borders} />
            <StoreBranch data={otherBranchData} title={`Other's Branch`} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Shopinfo;
