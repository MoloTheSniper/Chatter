import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { useAuth } from '../context/authContext'
import { getDocs, query, where } from 'firebase/firestore'
import { usersRef } from '@/firebaseConfig'
import { blurhash } from '../utils/common'

const profile = () => {
    const {user} = useAuth();
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
  return (
    <ScrollView>  
    <View         style={{
        alignItems: 'center', 
        marginBottom: 20, 
        marginTop: 20,
      }}>
        <Image
        style={{height: hp(15), aspectRatio: 1, borderRadius: 100}}
        source={user?.profileUrl}
        placeholder={blurhash}
        transition={500}
    />
    </View>
    </ScrollView>
  )
}

export default profile