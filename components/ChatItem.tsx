import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { Image } from 'expo-image'
import { blurhash, formatDate, getRoomId } from '@/app/utils/common'
import { collection, count, doc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db, usersRef } from '@/firebaseConfig'
import ChatNotification from './ChatNotification'
const ChatItem = ({item, router, noBorder, currentUser}) => {

  const [lastMessage, setLastMessage] = useState(undefined);
  useEffect(() =>{
    let roomId = getRoomId(currentUser?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy('createdAt','desc'))

    let unsub = onSnapshot(q, (snapshot)=>{
        let allMessages = snapshot.docs.map(doc =>{
            return doc.data(); 
        })
        setLastMessage(allMessages[0]? allMessages[0]: null);
    })
    return unsub;
},[]);
 
  //console.log('last message:',lastMessage);

  //**************************Message Notification Count*********************//
  let [count,setCount] = useState();

  useEffect(() => {
    let roomId = getRoomId(currentUser?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
  
    // Query to get messages from the specific user (not the current user)
    const q = query(
      messagesRef,
      where('userId', '==', item?.userId) // Filter messages from the specific user
    );
  
    let unsub = onSnapshot(q, (snapshot) => {
      let messageCount = snapshot.size; // Get the number of messages
      setCount(messageCount); // Update state to reflect the count
    });
  
    return unsub; 
  }, []);

  //*********************End of Notification Messages**********************//
  const openChatRoom = () =>
    {
      router.push({pathname: '/chatRoom', params: item})
    }
    const renderTime = () =>{
      if(lastMessage){
        let date = lastMessage?.createdAt;
        return formatDate(new Date(date?.seconds * 1000));
      }
    }
    const renderLastMessage = () =>
    {
      if(typeof lastMessage == 'undefined') return 'Loading...';
      if(lastMessage)
        {
          if(currentUser.userId == lastMessage?.userId) return "You: "+lastMessage?.text;
          return lastMessage?.text;
        }else{
          return 'Start conversation 👋';
        }
    }
  return (
    <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder? '':'border-b border-b-neutral-200'}`}>
        {/* <Image 
            source={{uri: item?.profileUrl}}
            style ={{height: hp(6), width: hp(6)}}
            className="rounded-full"
         /> */}
         <Image   
            style ={{height: hp(6), width: hp(6), borderRadius: 100}}
            source={{uri: item?.profileUrl}}
            placeholder={blurhash}
            transition={500}
         />

         {/* name and last message */}
         <View className='flex-1 gap-1'>
            <View className='flex-row justify-between'>
                <Text style ={{fontSize: hp(1.8)}} className='font-semibold text-neutral-800'>{item?.username}</Text>
                <Text style ={{fontSize: hp(1.6)}} className='font-medium text-neutral-500'>
                  {renderTime()}
                  <View><ChatNotification count = {count}/></View>
                </Text>
            </View>
            <Text style ={{fontSize: hp(1.6)}} className='font-medium text-neutral-500'>
              {renderLastMessage()}
              </Text>
         </View>
    </TouchableOpacity>
  )
}

export default ChatItem
