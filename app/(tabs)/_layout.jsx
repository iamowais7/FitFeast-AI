import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

export default function Tablayout() {
  return (
    <Tabs>
        <Tabs.Screen  name='Home'/>
        <Tabs.Screen  name='Meals'/>
        <Tabs.Screen  name='Progress'/>
        <Tabs.Screen  name='Profile'/>
        
    </Tabs>
  )
}