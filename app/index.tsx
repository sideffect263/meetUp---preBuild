import React, {useRef, useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import { useNavigation } from 'expo-router';
import UserProfile from './UserProfile';
import { Link } from 'expo-router';
import {StatusBar} from 'react-native'
import * as Location from 'expo-location';
import NewActModal from './components/NewActModal';



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

    const deviceHeight = Dimensions.get('window').height;


export default function Index(navigation: any) {

  const deviceWidth = Dimensions.get('window').width;
  
  const [location, setLocation] = useState<any>({
    latitude: 31.0461,
    longitude: 34.8516,
    });
  const [errorMsg, setErrorMsg] = useState<string>();


  useEffect(() => {//get user location
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let miniLocation ={
        latitude: location["coords"]["latitude"],
        longitude: location["coords"]["longitude"],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
      setLocation(location["coords"]);
      console.log(location["coords"]["latitude"]);
      console.log(deviceHeight)
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);


  }


    const mapRef = useRef<any>();
    const mapNavigation = useNavigation();

    const findeMeClicked = () => () => {
      mapRef.current.animateToRegion(location, 1000);
    };

    useEffect(() => {

      

      mapNavigation.setOptions({

        header : () => (
          <View style={styles.profileButtons}> 
           <Link href="/UserProfile" style={styles.profileButton}>
            <View style={styles.profileButtonImg}>
            <Image source={require('../assets/icons/profile_image.png')} style={styles.highButtonImg}/>
            </View>
            </Link>
            <Link href="/UserProfile" style={styles.profileButton}>
            
            </Link>
            <Link href="/UserProfile" style={styles.profileButton}>
            
            </Link>
            <Link href="/UserProfile" style={styles.profileButton}>
            
            </Link>
           
           <Link href="/UserProfile" style={styles.profileButton}>
            <View style={styles.profileButtonImg}>
            <Image source={require('../assets/icons/conversation_icon.png')} style={styles.highButtonImg}/>
            </View>
            </Link>
          </View>
        ),
        
      });
    }
    , []);

        

    const [modalVisible, setModalVisible] = useState(false);
    console.log(typeof setModalVisible);

    const modalPress = () => {
      console.log("modal pressed");
      console.log(modalVisible);
      setModalVisible(false);
      console.log(modalVisible);
    }

    const closeModal = () => {
      console.log("close");
      setModalVisible(false); 
    }

    const props = {
      isVisible: modalVisible,
      setIsVisible: setModalVisible,
    }


  return (
    <View style={styles.container}>
      <MapView 
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={location}
      ref={mapRef}
      
      customMapStyle={custom_map_style}
      
      >
        <Marker coordinate={location}>
          <Image source={require('../assets/icons/man_icon.png')} style={styles.markerImg}/>
        </Marker>
      </MapView>


      <View style={styles.sideButtons}>
        <TouchableOpacity onPress={findeMeClicked()} style={styles.sideButtonsButton}>
          <View style={styles.sideButtonsButtonImg}>
            <Image source={require('../assets/icons/location_icon.png')} style={styles.sideButtonImg}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={findeMeClicked()} style={styles.sideButtonsButton}>
          <View style={styles.sideButtonsButtonImg}>
            <Image source={require('../assets/icons/info_icon.png')} style={styles.sideButtonImg}/>
          </View>
        </TouchableOpacity>

        </View>
      
      <View style={styles.lowerButtons}>
        <TouchableOpacity style={styles.lowerButton}>
        <View style={styles.lowerButtonImg}>
            <Image source={require('../assets/icons/activity_icon.png')} style={styles.imgContainer}/>
          </View>
          
          </TouchableOpacity>
        <TouchableOpacity onPress={modalPress} style={[styles.lowerButton, styles.lowerButtonMid]}>
        <View style={styles.lowerButtonImg}>
            <Image source={require('../assets/icons/plus_icon.png')} style={styles.imgContainer}/>
          </View>
       
        </TouchableOpacity>
        <TouchableOpacity style={styles.lowerButton}>
        <View style={styles.lowerButtonImg}>
            <Image source={require('../assets/icons/activity_icon.png')} style={styles.imgContainer}/>
          </View>
          
        </TouchableOpacity>

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
    backgroundColor:'lightgreen',
    position: 'absolute',
    width: 65,
    height: 150,
    top: 844-300,
    right: 15,
    borderRadius: 40,
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
    position: 'absolute',
    width: '90%',
    left: '5%',
    opacity: 0.9,
    height: 80,
    top: deviceHeight-130,
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
    resizeMode: 'contain',
    height: 50,
    width: 50,
    borderWidth: 2,
    borderColor: "transparent",
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'white',

  },

  profileButtonImg:{
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    
  },


});
