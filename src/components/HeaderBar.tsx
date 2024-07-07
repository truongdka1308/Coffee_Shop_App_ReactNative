import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import GradientBGIcon from './GradientBGIcon';
import ProfilePic from './ProfilePic';
import { useNavigation } from '@react-navigation/native';

interface HeaderBarProps {
  icon?: string; // Thêm prop icon
  title?: string;
  navigation: any; // Thêm navigation vào props
  route?: any;
  user: any;
  avatarSource?: any;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title, navigation, route, user, avatarSource, icon }) => {
  
  const goToSettingScreen = () => {
    if (icon == 'left') {
      navigation.goBack();
    } else {
      navigation.navigate('Setting', { user });
    }
  };
  const goToProfileScreen = () => {
    navigation.navigate('Profile', { user });
  };
  
  return (
    <View style={styles.HeaderContainer}>
      <TouchableOpacity onPress={goToSettingScreen}>
        <GradientBGIcon
          name={icon ? icon : "menu"} // Sử dụng prop icon để truyền tên icon
          color={COLORS.primaryLightGreyHex}
          size={FONTSIZE.size_16}
        />
      </TouchableOpacity>
      <Text style={styles.HeaderText}>{title}</Text>
      <TouchableOpacity onPress={goToProfileScreen}>
        <View style={styles.ImageContainer}>
          <Image
            source={avatarSource ? avatarSource : require('../assets/app_images/avatar.png')}
            style={styles.Image}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  ImageContainer: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    borderRadius: SPACING.space_12,
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  Image: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
});

export default HeaderBar;
