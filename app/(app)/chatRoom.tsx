import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ChatRoomHeader from '@/components/ChatRoomHeader';
import { StatusBar } from 'expo-status-bar';
import MessagesList from '@/components/MessagesList';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { Feather } from '@expo/vector-icons';
import CustomKeyBoardView from '@/components/CustomKeyBoardView';
const ChatRoom = () => {
    const item = useLocalSearchParams();
    const router = useRouter();
    const [messages, setMessages] = useState([]);
  return (
    <CustomKeyBoardView inChat={true}>
        <View className='flex-1 bg-white'>
        <StatusBar style="dark"/>  
        <ChatRoomHeader user = {item} router = {router}/>
        <View className='h-3 border-b border-neutral-200'/>
        <View className='flex-1 justifyBetween bg-neutral-100 overflow-visible'>
            <View className='flex-1'>
                <MessagesList messages ={messages}/>
            </View>
            <View style = {{marginBottom: hp(2.7)}} className='pt-2'>
                    <View className='flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5'>
                        <TextInput
                            placeholder='Type message...'
                            style ={{fontSize: hp(2)}}
                            className='flex-1 mr-2'
                        />
                        <TouchableOpacity className='bg-neutral-200 p-2 mr-[1px] rounded-full'>
                        <Feather name='send' size={hp(2.7)} color={'#737373'}  />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
      </CustomKeyBoardView>
  )
}

export default ChatRoom