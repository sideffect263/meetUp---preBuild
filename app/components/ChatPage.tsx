import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { Link,useLocalSearchParams, useGlobalSearchParams, router, useNavigation } from 'expo-router';




const ChatPage = () => {

    console.log("ChatPage")
    const [messages, setMessages] = useState<any>([])

    useEffect(() => {
        console.log("useEffect")
        console.log(messages)
      setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: "2021-08-01T00:00:00Z",
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    }, [])
  
    const onSend = useCallback((messages:IMessage[] = []) => {
        console.log("onSend")
        console.log(messages)
      setMessages((previousMessages: any | any) =>
        GiftedChat.append(previousMessages, messages),
      )
    }, [])


    const params = useLocalSearchParams();
    console.log(params)

  


  return (
    <View style={styles.mainConti}>
    <Text>Chat Page</Text>
     <View style={styles.chatConti}>
        
      <GiftedChat
      
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />


    </View>
    </View>
  )

}

const styles = StyleSheet.create({
  mainConti: {
    top: -200,
    height: '100%',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  chatConti:{
    flex: 1,
    height: '70%',
    width: '70%',
    backgroundColor: 'white',
  },
})



export default ChatPage