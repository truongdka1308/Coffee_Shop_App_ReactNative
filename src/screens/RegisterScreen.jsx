import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Button, Alert, StyleSheet } from 'react-native';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [repass, setRepass] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorRepass, setErrorRepass] = useState('');

    
    const handleRegister = async () => {
        try {
            if (!username || !email || !password || !repass) {
                throw new Error('Please fill in all fields.');
            }
            if (password !== repass) {
                throw new Error('Password does not match.');
            }
    
            const response = await fetch('http://10.0.2.2:3000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                Alert.alert('Success', 'Registered successfully!');
                navigation.navigate('Login');
            } else {
                throw new Error(data.message || 'Something went wrong!');
            }
        } catch (error) {
            Alert.alert('Error', error.message || 'Something went wrong!');
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
                <Text style={styles.textContent}>Register to continue</Text>
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
                    style={[styles.input, errorEmail ? styles.inputError : null]}
                    value={email}
                    onChangeText={text => {
                        setEmail(text);
                        setErrorEmail('');
                    }}
                    placeholder="Email"
                    placeholderTextColor={'gray'}
                />
                <Text style={styles.errorText}>{errorEmail}</Text>
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
                <TextInput
                    style={[styles.input, errorRepass ? styles.inputError : null]}
                    value={repass}
                    onChangeText={text => {
                        setRepass(text);
                        setErrorRepass('');
                    }}
                    placeholder="Re-type Password"
                    secureTextEntry={true}
                    placeholderTextColor={'gray'}
                />
                <Text style={styles.errorText}>{errorRepass}</Text>
                <TouchableOpacity onPress={handleRegister}>
                    <Text style={styles.loginText}>Register</Text>
                </TouchableOpacity>
                <View style={styles.bottomTextContainer}>
                    <Text style={styles.bottomText}>You have an account? Click <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>Sign in</Text></Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0c0f14',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    welcomeText: {
        fontSize: 24,
        marginVertical: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    textContent: {
        color: 'white',
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
        color: 'white',

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
    bottomTextContainer: {
        alignItems: 'center',
        marginTop: '5%',
    },
    bottomText: {
        marginBottom: '5%',
        color:'white',
    },
    linkText: {
        color: '#d17742',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginBottom: 5,
    },
    inputError: {
        borderColor: 'red', // Đổi màu viền thành đỏ khi có lỗi
    },
    
});

export default RegisterScreen;
