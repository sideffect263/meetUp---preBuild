import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const Registration = () => {



  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const storeData = async (token: string) => {
    console.log("store token");
    
    console.log(token);
    try {
      await AsyncStorage.setItem('meetUpToken', token);
      router.replace('./');
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  }


  const loginSession = () => {
    console.log("registraion session");
    axios.post('https://backend-scne.onrender.com/register', {
      username: encodeURIComponent(username),
      password:encodeURIComponent(password),
      
    },
    {
        headers: {
            'Content-Type': ' application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
        
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    

  }
  const handleRegistration = () => {
    console.log('Register');
    console.log('Username:', username);
    console.log('Password:', password);

    loginSession();

    


  }
    return (
        <ImageBackground source={require('../assets/images/tel-aviv1-img.jpg')} resizeMode='cover' style={styles.container}>
            <Text style={styles.headline}>Register</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#888"
                    onChangeText={(text) => setUsername(text)}

                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#888"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    placeholderTextColor="#888"
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity onPress={handleRegistration}>
                <Text style={styles.link}>Create an account</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.link}>Already have an account? Login</Text>
            </TouchableOpacity>
       
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: '100%',
        backgroundColor: '#fff',
        
    },
    headline: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    link: {
        color: '#007BFF',
        fontSize: 16,
    },
});

export default Registration;
