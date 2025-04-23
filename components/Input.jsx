import { View, Text, TextInput } from 'react-native'
import React from 'react'

export default function Input({placeholder,password=false,onChangeText}) {
  return (
    <TextInput placeholder={placeholder} 
        onChangeText={(value)=>onChangeText(value)}
        secureTextEntry={password}
        style={{
        padding:20,
        borderWidth:1,
        borderRadius:10,
        fontSize:18,
        paddingVertical:20,
        width:'100%',
        marginTop:15
    }}/>
  )
}