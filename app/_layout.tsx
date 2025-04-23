import { Stack } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react"
import {UserContext} from '../context/UserContext'
import { useState } from "react";


export default function RootLayout() {

  const[user,setUser] = useState()

  const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
    unsavedChangesWarning: false,
  });
  return  <ConvexProvider client={convex}> <UserContext.Provider value={{user,setUser}} ><Stack screenOptions={{headerShown:false}}>
    <Stack.Screen name="index"/>
  </Stack>;
  </UserContext.Provider> 
  </ConvexProvider>
}
