import { View, Text, StyleSheet } from 'react-native'
import React, {createContext, useEffect, useState} from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';





const UserContextComponent = ({props}: {props: any}) => {

const token = props.userToken;
const setToken = props.setUserToken;



console.log("user context")
console.log(token)

    useEffect(() => {
        console.log("UserContextComponent")
        console.log(token)

        const fetchUser = async () => {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            };
            const response = await fetch('userByID', requestOptions);

            if(response.status === 200){
                const data = await response.json();
                console.log(data)
            }
            else{
                console.log("eror")
            }
        }
        fetchUser();
    }, [token])

    return (
        <Text style={styles.text}></Text>

    )
}

const styles = StyleSheet.create({
    text:{
        display:'none'
    }
})

export default UserContextComponent
