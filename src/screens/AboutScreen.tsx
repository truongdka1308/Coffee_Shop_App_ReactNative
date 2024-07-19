import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import PopUpAnimation from '../components/PopUpAnimation';

const AboutScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState({});
  const [showAnimation, setShowAnimation] = useState(false);
  const handleSubmit = () => {
    let isValid = true;
    let errors = {};

    if (!name) {
      errors.name = 'Please provide your name.';
      isValid = false;
    }
    if (!email) {
      errors.email = 'Please provide your email.';
      isValid = false;
    }
    if (!phone) {
      errors.phone = 'Please provide your phone number.';
      isValid = false;
    }
    if (!message) {
      errors.message = 'Please provide a message.';
      isValid = false;
    }

    setError(errors);

    if (isValid) {
      // Xử lý gửi thông tin liên hệ
      setShowAnimation(true);
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setTimeout(() => {
        setShowAnimation(false);
        navigation.goBack();
      }, 2000);
    } else {
      Alert.alert('Error', 'Please fill out all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require('../lottie/download.json')}
        />
      ) : (
        <></>
      )}
      <TextInput
        style={[styles.input, error.name ? styles.inputError : null]}
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Name"
        placeholderTextColor="gray"
      />
      {error.name && <Text style={styles.errorText}>{error.name}</Text>}
      <TextInput
        style={[styles.input, error.email ? styles.inputError : null]}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Email"
        placeholderTextColor="gray"
        keyboardType="email-address"
      />
      {error.email && <Text style={styles.errorText}>{error.email}</Text>}
      <TextInput
        style={[styles.input, error.phone ? styles.inputError : null]}
        value={phone}
        onChangeText={text => setPhone(text)}
        placeholder="Phone Number"
        placeholderTextColor="gray"
        keyboardType="phone-pad"
      />
      {error.phone && <Text style={styles.errorText}>{error.phone}</Text>}
      <TextInput
        style={[styles.input, error.message ? styles.inputError : null, styles.textArea]}
        value={message}
        onChangeText={text => setMessage(text)}
        placeholder="Message"
        placeholderTextColor="gray"
        multiline={true}
        numberOfLines={4}
      />
      {error.message && <Text style={styles.errorText}>{error.message}</Text>}
      <Text style={styles.loginText} onPress={handleSubmit} color="#d17742">Send</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0f14',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white',
  },
  textArea: {
    height: 100,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  loginText: {
    backgroundColor: '#d17742',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 10,
    lineHeight: 30,
    fontWeight: 'bold',
  },
  LottieAnimation: {
    flex: 1,
  },
});

export default AboutScreen;
