import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import Colors from '../shared/Colors'
import { UserContext } from '../context/UserContext'
import { RefreshDataContext } from '../context/RefreshDataContext'
import { useConvex } from 'convex/react'
import { api } from './../convex/_generated/api'

export default function TodayProgress() {
  const [totalCaloriesConsumed, setTotalCaloriesConsumed] = useState(0)
  const { refreshData ,setRefreshData} = useContext(RefreshDataContext)
  const { user } = useContext(UserContext)
  const convex = useConvex()

  useEffect(() => {
    user && GetTotalCaloriesConsumed()
  }, [user, refreshData])

  const GetTotalCaloriesConsumed = async () => {
    const result = await convex.query(api.MealPlan.GetTotalCaloriesConsumed, {
      date: moment().format('DD/MM/YYYY'),
      uid: user?._id
    })
    console.log("calories result", result)
    setTotalCaloriesConsumed(result)
  }

  // Calculate progress percentage
  const progressPercentage = user?.calories
    ? Math.min((totalCaloriesConsumed / user.calories) * 100, 100)
    : 0;

  return (
    <View style={{
      marginTop: 15,
      padding: 15,
      backgroundColor: Colors.WHITE,
      borderRadius: 10
    }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold'
        }}>Today's Goal</Text>
        <Text style={{
          fontSize: 18
        }}>{moment().format('MMM DD, yyyy')}</Text>
      </View>

      <Text style={{
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        color: Colors.PRIMARY
      }}>{totalCaloriesConsumed}/{user?.calories} Kcal</Text>

      <Text style={{
        textAlign: 'center',
        marginTop: 2,
        fontSize: 16
      }}>You're doing great!</Text>

      {/* Progress Bar */}
      <View style={{
        backgroundColor: Colors.GRAY,
        height: 10,
        borderRadius: 99,
        marginTop: 15,
        opacity: 0.7,
        overflow: 'hidden'
      }}>
        <View style={{
          backgroundColor: Colors.PRIMARY,
          width: `${progressPercentage}%`,
          height: 10,
          borderRadius: 99,
          transition: 'width 0.5s ease' // optional for smooth animation
        }}>
        </View>
      </View>

      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
      }}>
        <Text>Calories Consumed</Text>
        <Text>Keep it up! 🔥</Text>
      </View>
    </View>
  )
}
