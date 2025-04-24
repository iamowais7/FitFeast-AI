import { Dimensions, Image, Text, View } from "react-native";
import Button from '../components/shared/Button'
import { useRouter } from "expo-router";
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from './../services/FirebaseConfig'
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { useConvex } from "convex/react";

export default function Index() {
  
  const router=useRouter()
  const {user,setUser}=useContext(UserContext)
  const convex = useConvex()

  useEffect(()=>{
        const unsubscribe=  onAuthStateChanged(auth,async(userInfo)=>{
          console.log(userInfo?.email)
          const userData = await convex.query(api.Users.GetUser,{
            email:userInfo?.email
          })
          console.log("userData",userData)
          setUser(userData)
          router.replace('/(tabs)/Home')
      })
      return ()=>unsubscribe()
  },[])
 

  return (
    <View
      style={{
        flex: 1,
        
      }}
    >
      <Image source={require('./../assets/images/landing4.jpg')}
              style={{
                  width:'100%',
                  height:Dimensions.get('screen').height
              }} />
       <View style={{
         position:"absolute",
         height:Dimensions.get('screen').height,
         backgroundColor:'#0707075e',
         width:'100%',
         display:"flex",
         alignItems:"center",
         padding:20
       }}>
        <Image source={require('./../assets/images/logo-f2.png')}
          style={{
            width:150,
            height:150,
            marginTop:100
          }}/>

          <Text style={{
            fontSize:30,
            fontWeight:'bold',
            //  color:'white'
          }}>FitFeast-AI</Text>

          <Text style={{
            textAlign:"center",
            marginHorizontal:20,
            fontSize:20,
            marginTop:15,
            opacity:0.8
          }}>Craft delicious , Healthy ,mean plans tailored just for you.Achieve your goal with ease!</Text>
          
        </View> 

        <View style={{
          position:"absolute",
          width:'100%',
          bottom:25,
          padding:20
        }}>
           <Button title={'Get Started'}
                   onPress={()=>router.push("/auth/SignIn")}/>
          </View>      
    </View>
  );
}
