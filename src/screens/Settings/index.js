import React, {useContext, useState, useCallback} from 'react';
import {View, Text, ScrollView, Pressable, Switch} from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {IndependentColors} from '../../config/Colors';
import NavigationData from '../../data/NavigationData';
import {ThemeContext} from '../../theming/ThemeContext';
import {STANDARD_VECTOR_ICON_SIZE} from '../../config/Constants';
import styles from './styles';

// Functional component
const Settings = ({navigation}) => {
  // Using context
  const {isLightTheme, lightTheme, darkTheme, _toggleTheme} =
    useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  const [isDarkThemeEnabled, setIsDarkThemeEnabled] = useState(false);

  // Toggling switches
  const toggleSwitch = useCallback(() => {
    // Updating local state value
    setIsDarkThemeEnabled(previousState => !previousState);
    // Calling function to toggling theme mode(Light & Dark)
    _toggleTheme();
  }, [isDarkThemeEnabled]);

  // Returning
  return (
    <View style={[styles.mainWrapper, {backgroundColor: theme.secondary}]}>
      {/* Header */}
      <Animatable.View
        style={[styles.header]}
        delay={100}
        animation="fadeInUp"
        easing="ease-in-out-back"
        useNativeDriver={true}>
        <Text style={[styles.appVersionTitle, {color: theme.textHighContrast}]}>
          App Version
        </Text>
        <Text style={[styles.appVersion, {color: theme.accent}]}>1.0.0</Text>
        <Text style={[styles.lastUpdatedDate, {color: theme.textLowContrast}]}>
          Last Updated On - 31-0-2022
        </Text>
      </Animatable.View>
      {/* Scrollview */}
      <Animatable.View
        style={[styles.scrollViewWrapper, {backgroundColor: theme.primary}]}
        delay={600}
        animation="fadeInUp"
        easing="ease-in-out-back"
        useNativeDriver={true}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          {/* Mapping data */}
          {NavigationData[1].settings.map((item, index) => (
            <View
              key={index}
              style={[
                styles.scrollViewItemWrapper,
                index === 0 && styles.scrollViewItemWrapperWithMarginTop,
              ]}>
              {/* Section title */}
              <Text
                style={[styles.sectionTitle, {color: theme.textHighContrast}]}>
                {item.section_title}
              </Text>
              {/* Mapping data */}
              {item.labels.map((item2, index2) =>
                item2.type === 'Link' ? (
                  <Pressable
                    key={index2}
                    style={styles.linkWrapper}
                    onPress={() =>
                      item2.has_route
                        ? navigation.navigate(item2.label)
                        : alert('No route found!')
                    }>
                    <Text
                      style={[
                        styles.linkTitle,
                        {color: theme.textLowContrast},
                      ]}>
                      {item2.label}
                    </Text>

                    <FeatherIcons
                      name="chevron-right"
                      size={STANDARD_VECTOR_ICON_SIZE}
                      color={theme.textLowContrast}
                    />
                  </Pressable>
                ) : (
                  <View key={index2} style={styles.linkWrapper}>
                    <Text
                      style={[
                        styles.linkTitle,
                        {color: theme.textLowContrast},
                      ]}>
                      {item2.label}
                    </Text>

                    <Switch
                      trackColor={{
                        false: IndependentColors.grey,
                        true: theme.accent,
                      }}
                      thumbColor={
                        isDarkThemeEnabled
                          ? IndependentColors.black
                          : theme.textLowContrast
                      }
                      onValueChange={toggleSwitch}
                      value={isDarkThemeEnabled}
                      ios_backgroundColor={IndependentColors.grey}
                      style={styles.switchSize}
                    />
                  </View>
                ),
              )}
            </View>
          ))}
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

// Exporting
export default Settings;
