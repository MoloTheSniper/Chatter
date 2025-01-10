import { View, Text } from 'react-native'
import React from 'react'

const ChatNotification = ({count}) => {
  return (
    <View>
      <Text>{count}</Text>
    </View>
  )
}

export default ChatNotification