import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import GradientBGIcon from '../components/GradientBGIcon';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

const ProfileScreen = ({ navigation, route }) => {
  const { user } = route.params;
  const [id, setId] = useState(user.id);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [repass, setRepass] = useState('');
  const [passwordError, setPasswordError] = useState('');

  async function editUser(data) {
    let options = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
    await fetch(`http://10.0.2.2:3000/user/${data.id}`, options);
  }

  const handleUpdate = async () => {
    try {
      if (password !== repass) {
        setPasswordError('Passwords do not match.');
        return;
      }

      let data = {
        id: id,
        username: user.username,
        password: password,
        name: name,
        email: email,
        address: user?.address,
        phone: user?.phone,
      };
      await editUser(data);
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.ScreenContainer}>
      <View style={styles.HeaderContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <GradientBGIcon
            name="left"
            color={COLORS.primaryLightGreyHex}
            size={FONTSIZE.size_16}
          />
        </TouchableOpacity>
        <Text style={styles.HeaderText}>Profile</Text>
      </View>

      <View style={styles.ProfileContainer}>
        <Image
          source={require('../assets/app_images/avatar.png')}
          style={styles.ProfileImage}
        />
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
          placeholderTextColor={'gray'}
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor={'gray'}
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor={'gray'}
        />
        <TextInput
          style={styles.input}
          value={repass}
          onChangeText={text => {
            setRepass(text);
            setPasswordError('');
          }}
          placeholder="Re-type Password"
          secureTextEntry={true}
          placeholderTextColor={'gray'}
        />
        {passwordError !== '' && (
          <Text style={styles.errorText}>{passwordError}</Text>
        )}
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  HeaderContainer: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
    textAlign: 'center',
    flex: 1,
    marginRight: '12%'
  },
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ProfileContainer: {
    alignItems: 'center',
    paddingHorizontal: SPACING.space_30,
  },
  ProfileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: SPACING.space_20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 15,
    paddingHorizontal: 10,
    color: 'white',
    marginBottom: SPACING.space_20,
  },
  updateButton: {
    width: '100%',
    marginTop: SPACING.space_20,
  },
  updateText: {
    backgroundColor: '#d17742',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 15,
    lineHeight: 30,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
