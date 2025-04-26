import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react-native'
import { Calendar01Icon } from '@hugeicons/core-free-icons';
import Colors from '../shared/Colors';
import Button from './../components/shared/Button'

export default function TodaysMealPlan() {
    const[mealPlan,setMealPlan] = useState()
  return (
    <View style={{
        marginTop:15
    }}>
      <Text style={{
        fontSize:20,
        fontWeight:'bold'
      }}>Today's Meal Plan</Text>

      {!mealPlan &&
            <View style={{
                display:'flex',
                alignItems:'center',
                padding:20,
                backgroundColor:Colors.WHITE,
                marginTop:15,
                borderRadius:15
            }}>
                <HugeiconsIcon icon={Calendar01Icon} size={40} color={Colors.PRIMARY}/>
                <Text style={{
                    fontSize:18,
                    color:Colors.GRAY,
                    marginBottom:20
                }}>You Don't have any meal plan for Today</Text>

                <Button  title={'Create New Meal Plan'}/>
            </View>
      }


    </View>
  )
}