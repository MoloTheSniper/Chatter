import { View, Text, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '../context/authContext'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const home = () => {
  const {logout, user} = useAuth();
  const handleLogout = async () =>{
    await logout();
  }
  console.log("user data: ", user);
  return (
    <View>
      <Text>home</Text>
      <TouchableOpacity onPress ={handleLogout} style = {{height:hp(6.5)}}className='bg-indigo-500 rounded-xl justify-center items-center'>
          <Text style={{fontSize:hp(2.7)}} className="text-white font-bold tracking-wider">
            Log Out
          </Text>
      </TouchableOpacity>
    </View>
  )
}

export default home