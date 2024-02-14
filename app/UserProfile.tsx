import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, {useRef, useEffect, useState} from 'react';
import { Link, useNavigation, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// i want to present the user data on this page
const UserProfile = () => {
    const mapNavigation = useNavigation();


    const logout = () => {
        console.log("logout");


    }


    const deleteToken = async () => {
        console.log("delete token");
        
        try {
            await AsyncStorage.removeItem('meetUpToken');
            router.replace('./Login');
        } catch (error) {
            // Error saving data
            console.log(error);
        }
    }




    useEffect(() => {
      

        mapNavigation.setOptions({
  
          header : () => (
            <View style={styles.headerButtons}> 
             <Link href="/UserProfile" style={[styles.profileButton, styles.highlightedButton]}>
              <View style={styles.profileButtonImg}>
              <Image source={require('../assets/icons/profile_image.png')} style={styles.highButtonImg}/>
              </View>
              </Link>
           
              <Link href="/" style={[styles.profileButton]}>
              <Image source={require('../assets/icons/map_icon.png')} style={styles.highButtonImg}/>
              </Link>
             
             <Link  href={{
                pathname: "/components/ContactsPage",
                params: {data: "sms"}
             }} style={styles.profileButton}>
              <View style={styles.profileButtonImg}>
              <Image source={require('../assets/icons/conversation_icon.png')} style={styles.highButtonImg}/>
              </View>
              </Link>
            </View>
          ),

          
        Animation: 'slide_from_left',

        });
      }
      , []);
  

      
  return (
    <View style={styles.container}>
        <View style={styles.profileImage}>
            <Image source={require('../assets/icons/profile_image.png')} style={styles.image}></Image>
        </View>

        <View style={styles.infoContainer}>
            <View style={styles.userName}>
                <Text style={styles.UserProfileText}>ariel biton</Text>
                <Text style={styles.textAge}>25</Text>
                </View>

            <View style={styles.descreption}>
                <Text style={styles.text}>descreption</Text>
                </View>
        </View>

        <View style={styles.footer}>
            <View style={styles.profileButtons}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>Edit profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>Setting</Text>
                </TouchableOpacity>
            
                <TouchableOpacity onPress={deleteToken} style={styles.button}>
                    <Text style={styles.text}>log out</Text>
                </TouchableOpacity>
                          </View>


        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 140,
        flex: 1,
        backgroundColor: '#fff',
        margin:'3%',
        borderRadius:20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 9,
        elevation: 10,  
        
    },
    profileImage: {
        flex: 1,
        marginTop: '5%',
        flexDirection: 'column',
    },
    userName: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '40%',
    },
    textAge: {
        color: 'gray',
        fontSize: 24,
    },

    descreption: {
        width: '100%',
        flex: 3,
        alignItems: 'flex-start',
        justifyContent: 'center',
       },

    profileButtons: {
        marginVertical: '5%',
        flex: 1,
        width: '90%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: '#fff',

        
        
    },

    button: {
        flex: 1,
        width: '80%',
        marginBottom: '5%',
        maxHeight: '18%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor:'#f5f3f4'
    },

    footer:{
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        
    },

    image: {
        margin:'1%',
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: "contain",

    },

    infoContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        color: '#000',
        fontSize: 20,
        marginLeft: '5%',
    },
    UserProfileText: {
        color: '#000',
        fontSize: 24,
    },
    highButtonImg:{
        padding: 10,
        
        resizeMode: 'contain',
        height: 50,
        width: 50,
        borderWidth: 2,
        borderColor: "transparent",
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: 'white',
    
      },
    
      highlightedButton:{
        borderWidth: 2,
        borderColor: "lightgreen",
        shadowColor: 'gray',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.9,
        shadowRadius: 7,
    
      },
      
  profileButton:{
    flex: 1,
    height: 50,
    maxWidth: 50,
    marginHorizontal: 0,
    width: '100%',
    borderWidth: 0,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    
    
  },

  profileButtonImg:{
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    
  },

  
  headerButtons:{
    backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
    height: 80,
    top: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',

  },


    

    
    });



export default UserProfile