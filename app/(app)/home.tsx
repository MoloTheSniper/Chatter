import { View, Text, Button, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ChatList from '@/components/ChatList';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '@/firebaseConfig';

const home = () => {
  const {logout, user} = useAuth();
  const [users, setUsers] = useState([]);
  useEffect(()=>{
      if(user?.uid)
          getUsers();
  },[])
  const getUsers = async ()=>{
      // fetch users that are not yourself
      const q = query(usersRef, where('userId', '!=', user?.uid));

      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach(doc=>{
          data.push({...doc.data()});
      });

      setUsers(data);
  }
 // console.log("user data: ", user);
// console.log("my data!",users.length);
//console.log("My User ID in Home: "+ user.uid)
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      {
        users.length>0? (
            <ChatList currentUser ={user} users={users} />
        ):(
            <View className="flex items-center" style={{top: hp(30)}}>
                <ActivityIndicator size="large" />
                {/* <Loading size={hp(10)} /> */}
            </View>
        )
      }
      
    </View>
  )
}

export default home