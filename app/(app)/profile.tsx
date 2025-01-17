import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAuth } from '../context/authContext';
import { doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { usersRef } from '@/firebaseConfig';
import { blurhash } from '../utils/common';
import { Octicons } from '@expo/vector-icons';
import { getAuth, updateEmail } from "firebase/auth";

const Profile = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  
  // Local states for input fields to update
  const [username, setUsername] = useState(user?.username || '');
  const [profileUrl, setProfileUrl] = useState(user?.profileUrl || '');
  const [email, setEmail] = useState(user?.email || '');
  
  useEffect(() => {
    if (user?.userId) getUsers();
  }, []);

  const getUsers = async () => {
    const q = query(usersRef, where('userId', '!=', user?.userId));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach(doc => {
      data.push({ ...doc.data() });
    });
    setUsers(data);
  };

  const handleUpdate = async () => {
    if (!user?.userId) {
      Alert.alert("Error", "User ID is missing. Please try again.");
      return;
    } 
    try {
      const userRef = doc(usersRef, user.userId);
  
      //*********Updating Firestore with the new data********
      await updateDoc(userRef, {
        username,
        profileUrl,
      });
      //***********Updating Authentication Email */
      //************End of updating Authentication Email */
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
  };

  return (
    <ScrollView>  
      <View style={{ alignItems: 'center', marginBottom: 20, marginTop: 20 }}>
        <Image
          style={{ height: hp(15), aspectRatio: 1, borderRadius: 100 }}
          source={user?.profileUrl}
          placeholder={blurhash}
          transition={500}
        />
      </View>

      <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
        <View className="gap-10">
          <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-neutral-800">
            Update Profile
          </Text>
          
          {/* Inputs */}

            <View className="gap-3">
              <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                <Octicons name="pencil" size={hp(2.7)} color="gray" />
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-neutral-700"
                  placeholder={user?.username}
                  placeholderTextColor={'gray'}
                />
              </View>
            </View>

            <View className="gap-3">
              <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                <Octicons name="pencil" size={hp(2.7)} color="gray" />
                <TextInput
                  value={profileUrl}
                  onChangeText={setProfileUrl}
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-neutral-700"
                  placeholder={user?.profileUrl}
                  placeholderTextColor={'gray'}
                />
              </View>
            </View>

            {/* Submit Button */}
            <View>
              <TouchableOpacity onPress={handleUpdate} style={{ height: hp(6.5) }} className="bg-indigo-500 rounded-xl justify-center items-center">
                <Text style={{ fontSize: hp(2.7) }} className="text-white font-bold tracking-wider">
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    </ScrollView>
  );
};

export default Profile;
