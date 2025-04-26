import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from './../../shared/Colors'
import Input from '../../components/Input'
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Dumbbell01Icon, FemaleSymbolIcon, MaleSymbolIcon, PlusSignSquareIcon, WeightScaleIcon } from '@hugeicons/core-free-icons';
import Button from './../../components/shared/Button'
import { useMutation } from 'convex/react';
import {api} from './../../convex/_generated/api'
import {UserContext} from './../../context/UserContext'
import { useRouter } from 'expo-router';
// import  CalculateCaloriesAI  from '../../services/AiModel';
import Prompt from '../../shared/Prompt'
import { CalculateCaloriesAI } from '../../services/AiModel';

export default function Preferance() {

  const[weight,setWeight] = useState()
  const[height,setHeight] = useState()
  const[gender,setGender] = useState()
  const[goal,setGoal] = useState()

  const router= useRouter()

  const {user, setUser} = useContext(UserContext)
  
  const updateUserPref=useMutation(api.Users.UpdateUserPref)

  const onContinue = async() => {
    if(!weight || !height || !gender){
      Alert.alert("Fill All Details","Enter all details to continue")
    }
    
    const data={
      uid:user?._id,
      weight:weight,
      height:height,
      goal:goal,
      gender:gender
    }

    //calculate calories using AI
    const PROMPT = JSON.stringify(data)+Prompt.CALORIES_PROMPT
    console.log(PROMPT)
    try {
      const AIResult = await CalculateCaloriesAI(PROMPT);
      console.log(AIResult.choices[0].message.content);
      const AiResp = AIResult.choices[0].message.content
      const JSONContent = JSON.parse(AiResp.replace('```json','').replace('```',''))
      console.log(JSONContent)
       const result = await updateUserPref({
      ...data,
      ...AiResp
    })
    setUser(prev=>({
      ...prev,
      ...data,
      
    }))

    router.replace('/(tabs)/Home')
    } catch (error) {
      console.error("Error getting AI response", error);
      Alert.alert("Error", "AI response could not be understood.");
    }
    
   
  }

  return (
    <View style={{
        padding:20,
        backgroundColor:Colors.WHITE,
        height:'100%'
    }}>
      <Text style={{
        textAlign:'center',
        fontSize:30,
        fontWeight:'bold',
        marginTop:30
      }}>Tell us about yourself</Text>
      <Text style={{
        fontSize:16,
        textAlign:'center',
        color:Colors.GRAY
      }}>This help us create your personalized meal</Text>

      <View style={{
        display:'flex',
        flexDirection:'row',
        gap:10
      }}>

        <View style={{
            flex:1
        }}>
        <Input placeholder={'e.g  70'} label='Weight (Kg)'
           onChangeText={setWeight}/>
        </View>
        <View style={{
            flex:1
        }}>
        <Input placeholder={'e.g  5.10'} label='Height (Ft)' 
           onChangeText={setHeight}/>
        </View>
      </View>

      <View style={{
        marginTop:20
      }}>
        <Text style={{
            fontWeight:'medium',
            fontSize:18
        }}>Gender</Text>

            <View style={{
              display:'flex',
              flexDirection:'row',
              gap:10
            }}>
                <TouchableOpacity 
                 onPress={()=>setGender('Male')}
                 style={{
                    borderWidth:1,
                    padding:15,
                    borderColor:gender=='Male'?Colors.PRIMARY:Colors.GRAY,
                    borderRadius:10,
                    flex:1,
                    alignItems:"center"
                }}>
                    <HugeiconsIcon icon={MaleSymbolIcon} 
                      color={Colors.BLUE} />
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={()=>setGender('Female')}
                style={{
                    borderWidth:1,
                    padding:15,
                    borderColor:gender=='Female'?Colors.PRIMARY:Colors.GRAY,
                    borderRadius:10,
                    flex:1,
                    alignItems:"center"
                }}>
                     <HugeiconsIcon icon={FemaleSymbolIcon} 
                        color={Colors.PINK}/>
                </TouchableOpacity>
            </View>

      </View>

      <View style={{
        marginTop:15
      }}>
        <Text style={{
          fontWeight:'medium',
          fontSize:18
        }}>What's Your Goal?</Text>
        <TouchableOpacity 
          style={[styles.goalContainer,{
            borderColor:goal=='Weight Loss'?Colors.PRIMARY:Colors.GRAY
          }]}>
          onPress={()=>setGoal('Weight Loss')}
        <HugeiconsIcon icon={WeightScaleIcon} />
          <View>
          <Text style={styles.goalText}>Weight Loss</Text>
          <Text style={styles.goalSubText}>Reduce body fat & get leaner</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
        onPress={()=>setGoal('Muscle Gain')}
        style={[styles.goalContainer,{
          borderColor:goal=='Muscle Gain'?Colors.PRIMARY:Colors.GRAY
        }]}>
          <HugeiconsIcon icon={Dumbbell01Icon}/>
          <View>
            <Text style={styles.goalText}>Muscle Gain</Text>
            <Text>Build Muscle & get Stronger</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={()=>setGoal('Weight Gain')}
        style={[styles.goalContainer,{
          borderColor:goal=='Weight Gain'?Colors.PRIMARY:Colors.GRAY
        }]}>
          <HugeiconsIcon icon={PlusSignSquareIcon}/>
          <View>
            <Text style={styles.goalText}>Weight Gain</Text>
            <Text>Increase healthy body mass</Text>
          </View>
        </TouchableOpacity>

      </View>

        <View style={{
          marginTop:25
        }}>
        <Button title={'Continue'} onPress={onContinue} />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
      goalText:{
        fontSize:20,
        fontWeight:'bold'
      },
      goalSubText:{
        Colors:Colors.GRAY
      },
      goalContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:"center",
        gap:20,
        padding:15,
        borderWidth:1,
        borderColor:Colors.GRAY,
        borderRadius:15,
        marginTop:15
      }
})
