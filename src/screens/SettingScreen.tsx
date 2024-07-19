import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import HeaderBar from '../components/HeaderBar'
import { useNavigation } from '@react-navigation/native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import GradientBGIcon from '../components/GradientBGIcon';
import ProfilePic from '../components/ProfilePic';
import Icon from 'react-native-vector-icons/FontAwesome5';


const SettingScreen = ({navigation,route}) => {
  const user=route.params.user;
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(true);
  };

  const handleConfirmLogout = () => {
    navigation.navigate("Login")
  };

  const handleAboutScreen = () => {
    navigation.navigate("About")
  };

  return (
    <View style={styles.ScreenContainer}>
      <HeaderBar icon='left' title="Setting" navigation={navigation} user={user}></HeaderBar>
    
      <TouchableOpacity>
      <View style={styles.containerSetting}>
        <View style={styles.containerTextSetting}>
        <Icon name='history' size={24} color={'orange'}></Icon>
      <Text style={styles.textSetting}>History</Text>
      </View>
    <Icon name='arrow-right' size={24} color={'white'}></Icon>
</View>
</TouchableOpacity>

<TouchableOpacity>
<View style={styles.containerSetting}>
        <View style={styles.containerTextSetting}>
        <Icon name='user-circle' size={24} color={'orange'}></Icon>
      <Text style={styles.textSetting}>Personal Details</Text>
      </View>
    <Icon name='arrow-right' size={24} color={'white'}></Icon>
</View>
</TouchableOpacity>

<TouchableOpacity>
<View style={styles.containerSetting}>
        <View style={styles.containerTextSetting}>
        <Icon name='map-marker-alt' size={24} color={'orange'}></Icon>
      <Text style={styles.textSetting}>Address</Text>
      </View>
    <Icon name='arrow-right' size={24} color={'white'}></Icon>
</View>
</TouchableOpacity>

<TouchableOpacity>
<View style={styles.containerSetting}>
        <View style={styles.containerTextSetting}>
        <Icon name='credit-card' size={24} color={'orange'}></Icon>
      <Text style={styles.textSetting}>Payment Methods</Text>
      </View>
    <Icon name='arrow-right' size={24} color={'white'}></Icon>
</View>
</TouchableOpacity>

<TouchableOpacity onPress={handleAboutScreen}>
<View style={styles.containerSetting}>
        <View style={styles.containerTextSetting}>
        <Icon name='info-circle' size={24} color={'orange'}></Icon>
      <Text style={styles.textSetting}>About</Text>
      </View>
    <Icon name='arrow-right' size={24} color={'white'}></Icon>
</View>
</TouchableOpacity>

<TouchableOpacity>
<View style={styles.containerSetting}>
        <View style={styles.containerTextSetting}>
        <Icon name='question-circle' size={24} color={'orange'}></Icon>
      <Text style={styles.textSetting}>Help</Text>
      </View>
    <Icon name='arrow-right' size={24} color={'white'}></Icon>
</View>
</TouchableOpacity>

<TouchableOpacity onPress={handleLogout}>
<View style={styles.containerSetting}>
        <View style={styles.containerTextSetting}>
        <Icon name='sign-out-alt' size={24} color={'orange'}></Icon>
      <Text style={styles.textSetting}>Log out</Text>
      </View>
    <Icon name='arrow-right' size={24} color={'white'}></Icon>
</View>
</TouchableOpacity>
{/*  */}
<Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Bạn có muốn đăng xuất không?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}>
                <Text style={styles.modalButtonText}>Không</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleConfirmLogout}>
                <Text style={styles.modalButtonText}>Có</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  HeaderContainer: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  containerSetting:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:'13%',
    paddingVertical:'3%',
  },
  containerTextSetting:{
    flexDirection:'row',
    alignItems:'center',
  },
  textSetting:{
    textAlign:'center',
    flex:1,
    color:'white'
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.primaryWhiteHex,
    borderRadius: 10,
    padding: SPACING.space_20,
    alignItems: 'center',
  },
  modalText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryBlackHex,
    marginBottom: SPACING.space_20,
  },
  modalButtons: {
    flexDirection: 'row',
  },
  modalButton: {
    paddingHorizontal: SPACING.space_20,
    paddingVertical: SPACING.space_10,
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: 5,
    marginHorizontal: SPACING.space_10,
  },
  modalButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
});

