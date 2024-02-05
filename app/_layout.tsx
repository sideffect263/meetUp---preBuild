import { View, Text } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import index from './index'




const _layout = () => {
  return (
    <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      
    }}
    />
  )
}

export default _layout