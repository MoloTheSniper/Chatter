import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const ChatRoom = () => {
    const item = useLocalSearchParams();
    console.log('got item data: ',item)
  return (
    <View>
      <Text>ChatRoom</Text>
    </View>
  )
}

export default ChatRoom