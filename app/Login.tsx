import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Link, router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';




const Login = () => {

    const params = useLocalSearchParams();
    console.log('Login Screen');

    console.log(params)

    params.token = '1234';
    console.log(params)

    const mapNavigation = useNavigation();

    useEffect(() => {

        mapNavigation.setOptions({
            Animation: 'slide_from_left',
            Title: 'ss',
            HeaderShown: true,
            HeaderStyle: {
                backgroundColor: '#1E5EF4',
            },
            HeaderTintColor: '#fff',
            HeaderTitleStyle: {
                fontWeight: 'bold',
            },
        });
    
    }, []);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Username:', username);
        console.log('Password:', password);
        loginSession();

        
    }
    const storeData = async (token: string) => {
        console.log("store token");
        console.log(token);
        try {
          await AsyncStorage.setItem('meetUpToken', token).then(() => {
          console.log("token stored");
          router.replace('./');
          });
        } catch (error) {
          // Error saving data
          console.log(error);
        }
      }

    const loginSession = () => {
        console.log("log in session");
        axios.post('https://backend-scne.onrender.com/token', {
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
          console.log("login success");
          console.log(response.data.access_token);
          storeData(response.data.access_token);

        })
        .catch(function (error) {
          console.log(error);
        });
        
  
      }
    return (
        <View style={styles.container}>
            <Text style={styles.headline}>Login</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Username or Email"
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
            </View>
            <TouchableOpacity onPress={handleLogin}>

                <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
            <Link href='/Registration'>
                <Text style={styles.link}>Create an account</Text>
            </Link>
            <TouchableOpacity>
                <Text style={styles.link}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
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

export default Login;


