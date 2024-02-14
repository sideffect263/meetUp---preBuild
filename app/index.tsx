import React, {useRef, useEffect, useState, useContext} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import { useNavigation } from 'expo-router';
import UserProfile from './UserProfile';
import { Link } from 'expo-router';
import {StatusBar} from 'react-native'
import * as Location from 'expo-location';
import NewActModal from './components/NewActModal';
import ActivitiesModal from './components/ActivitiesModal';
import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserSignModal from './components/UserSignModal';
import UserContextComponent  from './context/UserContextComponent';





const storeData = async (token: string) => {
  console.log("store token");
  
  console.log(token);
  try {
    await AsyncStorage.setItem('meetUpToken', token);
  } catch (error) {
    // Error saving data
    console.log(error);
  }
}


const deleteData = async(tokenName: string)=>{
  console.log("delete")
  try{
    await AsyncStorage.removeItem(tokenName)
  } catch(error){
    console.log(error);
  }
}






const statusBarHeight =StatusBar.currentHeight




const custom_map_style =[
  {
    "featureType": "landscape",
    "stylers": [
      {
        "color": "#f9ddc5"
      },
      {
        "lightness": -7
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.government",
    "stylers": [
      {
        "color": "#9e5916"
      },
      {
        "lightness": 46
      }
    ]
  },
  {
    "featureType": "poi.medical",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#813033"
      },
      {
        "lightness": 38
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "stylers": [
      {
        "color": "#645c20"
      },
      {
        "lightness": 39
      }
    ]
  },
  {
    "featureType": "poi.school",
    "stylers": [
      {
        "color": "#a95521"
      },
      {
        "lightness": 35
      }
    ]
  },
  {
    "featureType": "poi.sports_complex",
    "stylers": [
      {
        "color": "#9e5916"
      },
      {
        "lightness": 32
      }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      {
        "color": "#813033"
      },
      {
        "lightness": 43
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#f19f53"
      },
      {
        "lightness": 16
      },
      {
        "visibility": "on"
      },
      {
        "weight": 1.3
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#f19f53"
      },
      {
        "lightness": -10
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "lightness": 38
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "stylers": [
      {
        "color": "#813033"
      },
      {
        "lightness": 22
      }
    ]
  },
  {
    "featureType": "transit.station",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "stylers": [
      {
        "color": "#1994bf"
      },
      {
        "saturation": -69
      },
      {
        "lightness": 43
      },
      {
        "gamma": 0.99
      }
    ]
  }
]

//region of israel

let initialRegion = {
    latitude: 31.0461,
    longitude: 34.8516,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    };


    const deviceWidth = Dimensions.get('window').width;

    const deviceHeight = Dimensions.get('window').height;


 
    const miniLocationsStart = [
      {
        Index:1,
        latlng: {
          latitude: 32.0489241225874,
          longitude: 34.75486787299215,
        },
        title: "title1",
        description: "description",
      },
  
      {
        Index:2,
        latlng: {
          latitude: 32.02893207647942,
          longitude: 34.754867902254205,
        },
        title: "title2",
        description: "description",
      },
    ]
    


export default function Index(this: any, navigation: any) {

  const [token, setToken] = useState<any>(null)
  const [miniLocations, setMiniLocations] = useState<Array<any>>([miniLocationsStart]);


  const [activitiesModalIsVisible, setActivitiesModalIsVisible] = useState(false);
  const [newActModalIsVisible, setNewActModalVisible] = useState(false);
  const [userSignModalIsVisible, setUserSignModalVisible] = useState(false);

  const mapRef = useRef<any>();

  const mapNavigation = useNavigation();

  const [errorMsg, setErrorMsg] = useState<string>();
  const [location, setLocation] = useState<any>({
    latitude: 31.0461,
    longitude: 34.8516,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    });
  
  

  const props = {
    activitiesModalIsVisible: activitiesModalIsVisible,
    setActivitiesModal: setActivitiesModalIsVisible,
    newActModalIsVisible: newActModalIsVisible,
    setNewActModalVisible: setNewActModalVisible,
    userSignModalIsVisible:userSignModalIsVisible,
    setUserSignModalVisible:setUserSignModalVisible,
    userToken:token,
    setUserToken: setToken,
  }


  
  const testC = () => {
    console.log("testC pressed");

   }

   console.log("1token1");

  

  

  const headers = {
    "Accept":"application/json, text/plain, /","Content-Type": "multipart/form-data",
  };



  const fetchEvents = async () => {
    console.log("get events")

    const response = await axios.get('https://backend-scne.onrender.com/events', { headers }).catch((err) => {
      console.log("err")
      console.log(err)
    }) as AxiosResponse<any, any>;

    console.log("get events res")
    console.log(response.data[response.data.length-1])
    setMiniLocations(response.data);
    console.log(miniLocations[0])
    console.log("end res")
  }



   useEffect(() => {
    console.log("end res")
  }
  , []);


  
  

  

  useEffect(() => {//get user location
    
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      });
    

    
    })();
  }, [location]);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);


  }

    const addNewEvent = () => {
      console.log("add new event");
      axios.post('https://backend-scne.onrender.com/events', {
        title: "event 1",
        date:'date 1',
        user_id:1,
        description: "this is event 1",
        lata: '32.060930',
        longa: '34.767084',
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    }

    const findeMeClicked = () => () => {
      console.log("set location");


      console.log(token);
      mapRef.current.animateToRegion(location, 1000);      
   
      
    };


    const [userProfileNav, setUserProfileNav] = useState("/UserProfile");

    let tokenString=token

    useEffect(() => {

      
       //if user is not logged in show sighin modal
     if(token==null){
      console.log(token)
      console.log("user has no token saved and is not a loggedin user")


      console.log("use3");

      setUserSignModalVisible(true)
      setUserProfileNav("/Login")
    }

    
      mapNavigation.setOptions({



        header : () => (
          <View style={styles.profileButtons}> 
          {!token &&
            <Link 
            href={{
              pathname: "/Login",
              params: {token}
           }} style={styles.profileButton}>
            <View style={styles.profileButtonImg}>
            <Image source={require('../assets/icons/profile_image.png')} style={styles.highButtonImg}/>
            </View>
            </Link>
          }
          {token &&
            <Link href="/UserProfile" style={styles.profileButton}>
            <View style={styles.profileButtonImg}>
            <Image source={require('../assets/icons/profile_image.png')} style={styles.highButtonImg}/>
            </View>
            </Link>
          }
            <Link href="/" style={[styles.profileButton, styles.highlightedButton]}>
            <Image source={require('../assets/icons/map_icon.png')} style={styles.highButtonImg}/>
            </Link>
           
           <Link href={{
              pathname: "/components/ContactsPage",
              params: {data: "sms"}
           }} style={styles.profileButton}>
            <View style={styles.profileButtonImg}>
            <Image source={require('../assets/icons/conversation_icon.png')} style={styles.highButtonImg}/>
            </View>
            </Link>
          </View>
        ),
        
      });
    }
    , [token]);

        

    const modalPress = () => {
      console.log("modal pressed1");
      console.log(token)
      setNewActModalVisible(true);

    }

    const activitiesPressed = () => {
      console.log("activities pressed");
      setActivitiesModalIsVisible(true);

    }

    const markerPressed = () => {
      console.log("marker pressed");
    }

    const testB = () => {
      console.log("testB pressed");
    }


  
    console.log("props");
    console.log(props);


    

    

  return (
      
      
    <View style={styles.container}>
       <UserContextComponent props={props}/>

      <NewActModal props={props}/>
      <ActivitiesModal props={props}/>
      <UserSignModal props={props}/>


      <MapView 
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={location}
      ref={mapRef}
      
      customMapStyle={custom_map_style}
      
      >

        <Marker
        coordinate={location}
        title={"title"}
        description={"description"}
        onPress={markerPressed}
        >

        <Image source={require('../assets/icons/man_icon.png')} style={styles.markerImg}/>

        </Marker>


    

        {
          miniLocations.map((marker:any, index:any) => (
            console.log("marker"),
            console.log(marker[5]),
            console.log(marker[6]),
            console.log("end marker"),

            

            <Marker
              key={index}
              coordinate={{ latitude: marker[5]? marker[5]:0, longitude: marker[6]? marker[6]:0}}
              title={marker.title}
              description={marker.description}
              onPress={markerPressed}
            />
          )
          )
        }


      </MapView>

      {/* end of the map elemnt
      start of the buttons and app functionality
      
      */}
      <View style={styles.appFunctionality}>
      <View style={styles.sideButtons}>
        <TouchableOpacity onPress={findeMeClicked()} style={styles.sideButtonsButton}>
          <View style={styles.sideButtonsButtonImg}>
            <Image source={require('../assets/icons/location_icon.png')} style={styles.sideButtonImg}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={testC} style={styles.sideButtonsButton}>
          <View style={styles.sideButtonsButtonImg}>
            <Image source={require('../assets/icons/info_icon.png')} style={styles.sideButtonImg}/>
          </View>
        </TouchableOpacity>


        </View>
      
      <View style={styles.lowerButtons}>
        <TouchableOpacity  onPress={testB}style={styles.lowerButton}>
        <View style={styles.lowerButtonImg}>
            <Image source={require('../assets/icons/activity_icon.png')} style={styles.imgContainer}/>
          </View>
          
          </TouchableOpacity>
        <TouchableOpacity onPress={modalPress} style={[styles.lowerButton, styles.lowerButtonMid]}>
        <View style={styles.lowerButtonImg}>
            <Image source={require('../assets/icons/plus_icon.png')} style={styles.imgContainer}/>
          </View>
       
        </TouchableOpacity>
        <TouchableOpacity onPress={activitiesPressed} style={styles.lowerButton}>
        <View style={styles.lowerButtonImg}>
            <Image source={require('../assets/icons/activity_icon.png')} style={styles.imgContainer}/>
          </View>
          
        </TouchableOpacity>

        </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },

  markerImg:{
    resizeMode: 'contain',
    height: 40,
    width: 40,
    
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

  sideButtons:{
    width: 65,
    height: 150,
  
    borderRadius: 40,
    display: 'flex',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },

  appFunctionality:{
    position: 'absolute',
    width: '100%',
    height: '50%',
    bottom: 0,
    display: 'flex',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
  },

  sideButtonsButton:{
    flex: 1,
    height: '100%',
    width: '80%',
    marginVertical: 15,
    borderRadius: 30,
  },

  sideButtonsButtonImg:{
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },

  lowerButtons:{
    backgroundColor: 'white',
    width: '90%',
    opacity: 0.9,
    height: 80,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  
  },
  lowerButton:{
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  sideButtonImg:{
    resizeMode: 'contain',
    height: 50,
    width: 50,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: 'white',
  },

  imgContainer:{
    resizeMode: 'contain',
    height: 50,
    width: 50,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lowerButtonImg:{ 
    borderWidth: 1,
    flex: 1,
    maxWidth:60,
    minWidth: 60,
    maxHeight: 60,
    minHeight: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    opacity: 1,
    //make some shadow
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.9,
    shadowRadius: 7,
  },

  lowerButtonMid:{
    top: -30,
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
    padding: 0,
    resizeMode: 'contain',
    height: 50,
    width: 50,
    borderWidth: 20,
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

  profileButtonImg:{
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    
  },


});
