import { View, Text, Image, ScrollView, SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { Link,useLocalSearchParams, useGlobalSearchParams, router, useNavigation } from 'expo-router';



const msgs = [
    {
        _id: 1,
        text: 'Hello developer',
        createdAt: "2021-08-01T00:00:00Z",
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        }
    },]

const userData:any=[
    {
        name: "John Doe",
        msgs:msgs
    },
    {
        name: "John Doe",
        msgs:msgs
    },
    {
        name: "John Doe",
        msgs:msgs
    },
    {
        name: "John Doe",
        msgs:msgs
    },
    {
        name: "John Doe",
        msgs:msgs
    },
    {
        name: "John Doe",
        msgs:msgs
    },
]


const ContactsPage = () => {


    
    const params = useLocalSearchParams();
    console.log(params)
    console.log("ContactsPage")

    const mapNavigation = useNavigation();

  
    useEffect(() => {

      

        mapNavigation.setOptions({
  
          header : () => (
            <View style={styles.profileButtons}> 
             <Link href="/UserProfile" style={styles.profileButton}>
              <View style={styles.profileButtonImg}>
              <Image source={require('../../assets/icons/profile_image.png')} style={styles.highButtonImg}/>
              </View>
              </Link>
           
              <Link href="/" style={[styles.profileButton]}>
              <Image source={require('../../assets/icons/map_icon.png')} style={styles.highButtonImg}/>
              </Link>
             
             <Link href={{
                pathname: "/components/ContactsPage",
                params: {data: "sms"}
             }} style={styles.profileButton}>
              <View style={styles.profileButtonImg}>
              <Image source={require('../../assets/icons/conversation_icon.png')} style={[styles.highButtonImg, styles.highlightedButton]}/>
              </View>
              </Link>
            </View>
          ),
          
        });
      }
      , []);
  
  




    
    
    

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>

        {
            userData.map((user:any)=>{
                return (
                    <Link
                    key={user._id}
                      href ={{
                        pathname: '/components/ChatPage',
                        params: params
                    }} 
                     style={styles.contactContilink}>

                        <View style={styles.contactConti}>

                        <Text style={styles.text}>{user.name}</Text>

                        </View>
                    </Link>
                )
            })
        }
    </ScrollView>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
  },
  scrollView: {
    borderWidth: 1,
    backgroundColor: 'lightpink',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    top: StatusBar.currentHeight,  
  },
  text: {
    fontSize: 22,
    margin: 10,
    textAlign: 'left',
  },
  contactContilink:{
    height: 50,
    display: 'flex',
    margin: 10,
    flex: 1,
    },
  contactConti:{
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
 
    },
    
  profileButton:{
    flex: 1,
    height: 50,
    maxWidth: 50,
    marginHorizontal: 10,
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
  
  profileButtons:{
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
    
})

export default ContactsPage