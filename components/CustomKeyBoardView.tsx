import { View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React from 'react'

const ios = Platform.OS == 'ios';
const CustomKeyBoardView = ({children, inChat}) => {
  let kavConfig = {};
  let scrollViewConfig = {};
  if(inChat)
    {
      kavConfig = {keyboardVerticalOffset: 90};
      scrollViewConfig = {contentContainerStyle: {flex: 1}};
    }
  return (
    <KeyboardAvoidingView
        behavior = {ios? 'padding':'height'}
        style={{flex: 1}}
        {...kavConfig}
        >
         
        <ScrollView
            style ={{flex: 1}}
            bounces = {false}
            showsVerticalScrollIndicator= {false}
            {...scrollViewConfig}
        >
            {
                children
            }
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default CustomKeyBoardView