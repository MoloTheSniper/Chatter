import { View, Text } from 'react-native'
import React, { useEffect} from 'react'
import { Slot, useRouter, useSegments } from "expo-router";
// Import your global CSS file
import "../global.css";
import { AuthContextProvider, useAuth } from './context/authContext';

const MainLayout = () =>{
    const {isAuthenticated} = useAuth();
    const segments = useSegments(); //useSegments returns the current navigation path as an array of segments.
    const router = useRouter();

    useEffect(()=>{
        //check if user is authenticated or not
        if(typeof isAuthenticated == 'undefined') return;
        const inApp = segments[0] == '(app)';
        if(isAuthenticated && !inApp)
        {
            //redirect to home
            router.replace('home');
        }else if(isAuthenticated == false)
        {
            //redirect to sign in
            router.replace('signIn');
        }
    },[isAuthenticated])
    return <Slot/>
}
const RootLayout = () => {
  return (
    <AuthContextProvider>
        <MainLayout/>
    </AuthContextProvider>
  )
}

export default RootLayout