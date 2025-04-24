import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { HugeiconsIcon } from '@hugeicons/react-native';
import { AnalyticsUpIcon, Home01Icon, SpoonAndForkFreeIcons, UserSquareIcon } from '@hugeicons/core-free-icons';
import Colors from './../../shared/Colors'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor:Colors.PRIMARY
    }}>
        <Tabs.Screen name='Home' options={{
            tabBarIcon:({color,size} )=> <HugeiconsIcon
                icon={Home01Icon}
                size={size}
                color={color}
                strokeWidth={1.5}
              />
        }} />
        <Tabs.Screen name='Meals'  options={{
            tabBarIcon:({color,size} )=> <HugeiconsIcon
                icon={SpoonAndForkFreeIcons}
                size={size}
                color={color}
                strokeWidth={1.5}
              />
        }} />
        <Tabs.Screen name='Progress'  options={{
            tabBarIcon:({color,size} )=> <HugeiconsIcon
                icon={AnalyticsUpIcon}
                size={size}
                color={color}
                strokeWidth={1.5}
              />
        }} />
        <Tabs.Screen name='Profile'  options={{
            tabBarIcon:({color,size} )=> <HugeiconsIcon
                icon={UserSquareIcon}
                size={size}
                color={color}
                strokeWidth={1.5}
              />
        }} />
    </Tabs>
  )
}