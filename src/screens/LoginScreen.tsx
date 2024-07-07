import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';

const LoginScreen = ({navigation}: any) => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorUsername, setErrorUsername] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Lắng nghe sự kiện màn hình focus
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData(); // Gọi lại hàm fetchData mỗi khi màn hình focus
    });

    return unsubscribe; // Hủy lắng nghe khi component unmount
  }, [navigation]); // Dependency là navigation để cập nhật useEffect khi navigation thay đổi


  const fetchData = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/user');
      const json = await response.json();
      setUserData(json);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleLogin = async () => {
    try {
      if (!username) {
        throw new Error('Please provide username.');
      }
      if (!password) {
        throw new Error('Please provide password.');
      }
      const user = userData.find(u => u.username === username && u.password === password);
      if (!user) {
        throw new Error('Invalid username or password');
      }
      Alert.alert('Success', 'Logged in successfully!');
      console.log(user);
      
      navigation.navigate('Tab',{user:user});
    } catch (error) {
      if (error.message === 'Please provide username.') {
        setErrorUsername(error.message);
      } else if (error.message === 'Please provide password.') {
        setErrorPassword(error.message);
      } else {
        Alert.alert('Error', error.message || 'Something went wrong!');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./img/coffee.jpg')}
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>Welcome to Lungo</Text>
        <Text style={styles.textContent}>Login to continue</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={[styles.input, errorUsername ? styles.inputError : null]}
          value={username}
          onChangeText={text => {
            setUsername(text);
            setErrorUsername('');
          }}
          placeholder="Username"
          placeholderTextColor={'gray'}
        />
        <Text style={styles.errorText}>{errorUsername}</Text>
        <TextInput
          style={[styles.input, errorPassword ? styles.inputError : null]}
          value={password}
          onChangeText={text => {
            setPassword(text);
            setErrorPassword('');
          }}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor={'gray'}
        />
        <Text style={styles.errorText}>{errorPassword}</Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.registerButton}>
            <Image
              source={require('./img/google.png')}
              style={styles.googleLogo}
            />
            <Text style={styles.registerText}>Sign in with Google</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>Don't have an account? Click <Text style={styles.linkText} onPress={() => navigation.navigate('Register')}>Register</Text></Text>
          <Text style={styles.bottomText}>Forgot Password? Click <Text style={styles.linkText} onPress={() => console.log('Forgot Password pressed')}>Reset</Text></Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
       backgroundColor:'#0c0f14',
        alignItems: 'center',
        padding: 20,
      },
      header: {
        alignItems: 'center',
        paddingBottom:20,
      },
      logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
       
      },
      welcomeText: {
        fontSize: 24,
        marginVertical: 20,
        color:'white',
        fontWeight:'bold',
      },
      textContent:{
        color:'white',
      },
      form: {
        width: '100%',
      },
      input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 15,
        paddingHorizontal: 10,
       
        color: 'white'
      },
      loginText: {
        backgroundColor: '#d17742',
        color: '#fff',
        textAlign: 'center',
        paddingVertical: 10,
        borderRadius: 15,
        marginBottom: 10,
        lineHeight:30,
        fontWeight:'bold',
      },
      registerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        backgroundColor:'white',
        paddingRight:'32%',
        borderRadius: 15,
      },
      googleLogo: {
        width: 24,
        height: 24,
        marginLeft:'5%'
      },
      registerText: {
        color: '#0c0f14',
        textAlign: 'center',
        paddingVertical: 10,
        fontWeight:'bold',
        lineHeight:30,
        
      },
      bottomTextContainer: {
        alignItems: 'center',
        marginTop:'5%',
      },
      bottomText: {
        color:'white',
        marginBottom: '5%',
      },
      linkText: {
        color: '#d17742',
        fontWeight:'bold',
      },
      errorText: {
        color: 'red',
        marginBottom: 5,
    },
    inputError: {
        borderColor: 'red', // Đổi màu viền thành đỏ khi có lỗi
    },
  });
export default LoginScreen;
