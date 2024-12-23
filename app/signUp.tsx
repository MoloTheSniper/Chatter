import { View, Text, StatusBar, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Feather, Octicons} from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '@/components/Loading';
import CustomKeyBoardView from '@/components/CustomKeyBoardView';
const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");

  const handleRegister = async () =>{
    if(!emailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current)
      {
        Alert.alert("Sign Up","Please fill in all the fields!");
        return;
      }

      //------ Register Process--------
  }
  return (
    <CustomKeyBoardView>
        <View className = "flex-1">
        <StatusBar style="dark"/>
        <View style= {{paddingTop: hp(7), paddingHorizontal: wp(5)}} className ="flex-1 gap-12">
          {/*SignUp Image */}
          <View className="items-center">
            <Image style ={{height: hp(20)}} resizeMode ="contain"
            source ={require('../assets/images/register.png')}/>
          </View>
          <View className="gap-10">
            <Text style ={{fontSize: hp(4)}} className="font-bold tracking-wider text-center text-neutral-800">Sign Up</Text>
            {/*----------Username-------------*/}
            <View className="gap-4">
                <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                  <Octicons name ="person" size={hp(2.7)} color ="gray" />
                  <TextInput
                        onChangeText={value => usernameRef.current = value}
                        style={{fontSize: hp(2)}}
                        className="flex-1 font-semibold text-neutral-700"
                        placeholder="Username"
                        placeholderTextColor={"gray"}
                        />

                </View>
              {/*----------Email Address-------------*/}
                <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                    <Octicons name ="mail" size={hp(2.7)} color ="gray" />
                    <TextInput
                          onChangeText={value => emailRef.current = value}
                          style={{fontSize: hp(2)}}
                          className="flex-1 font-semibold text-neutral-700"
                          placeholder="Email Address"
                          placeholderTextColor={"gray"}
                          />
                </View> 
                        {/*----------Password-------------*/}
            <View className="gap-4">
                <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                  <Octicons name ="key" size={hp(2.7)} color ="gray" />
                  <TextInput
                        onChangeText={value => passwordRef.current = value}
                        style={{fontSize: hp(2)}}
                        className="flex-1 font-semibold text-neutral-700"
                        placeholder="Password"
                        secureTextEntry
                        placeholderTextColor={"gray"}
                        />

                </View>
              {/*----------Profile Url-------------*/}
                <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                    <Feather name ="image" size={hp(2.7)} color ="gray" />
                    <TextInput
                          onChangeText={value => profileRef.current = value}
                          style={{fontSize: hp(2)}}
                          className="flex-1 font-semibold text-neutral-700"
                          placeholder="Profile URL"
                          placeholderTextColor={"gray"}
                          />
                </View> 
                </View>
              {/*----------------Submit Button------------*/}
              <View>
                {
                  loading?(
                      <View className="flex-row justify-content">
                        <Loading size ={hp(6.5)}/>
                      </View>
                  ):(
                      <TouchableOpacity onPress ={handleRegister} style = {{height:hp(6.5)}}className='bg-indigo-500 rounded-xl justify-center items-center'>
                        <Text style={{fontSize:hp(2.7)}} className="text-white font-bold tracking-wider">
                          Sign Up
                        </Text>
                      </TouchableOpacity>
                  )
                }
              </View>

              {/* -----------------Sign Up Text--------------- */}
              <View className="flex-row justify-center">
                <Text style= {{fontSize: hp(1.8)}} className="font-semibold text-neutral-500">Already have an account? </Text>
                <Pressable onPress={()=> router.push('/signIn')}>
                  <Text style= {{fontSize: hp(1.8)}} className="font-semibold text-indigo-500">Sign In</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        </View>
    </CustomKeyBoardView>
  )
}

export default SignUp