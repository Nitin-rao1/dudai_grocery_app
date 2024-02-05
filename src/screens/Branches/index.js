import React, {useContext, useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {IndependentColors} from '../../config/Colors';
import {ThemeContext} from '../../theming/ThemeContext';
import Header from '../../components/Header';
import styles from './styles';
import StoreBranch from '../../components/storeBranch/StoreBranch';
import {getAllBranch} from '../../api/categories/categoriesAndProduct';
import {Indicators} from '../../components/apploader';
import Colors from '../../constants/Colors';

const Branches = ({navigation}) => {
  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);
  const [otherBranchData, setOtherBranchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  useEffect(() => {
    getAllBranch()
      .then(res => {
        setOtherBranchData(res.result);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
  }, []);
  return (
    <View style={[styles.container, {backgroundColor: theme.primary}]}>
      <Header
        back
        onLeftPress={() => navigation.goBack()}
        title={'Branches'}
        headerBg={Colors.primary}
        iconColor={IndependentColors.white}
        titleAlight={'center'}
      />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <StoreBranch data={otherBranchData} />
      </ScrollView>
      {isLoading && <Indicators />}
    </View>
  );
};

export default Branches;
