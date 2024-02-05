import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
// i want to present the user data on this page
const UserProfile = () => {
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
                    <Text style={styles.text}>Share profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>Setting</Text>
                </TouchableOpacity>
            </View>


        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
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

    
    });



export default UserProfile