import { View, Text } from 'react-native'
import React from 'react'
import RecipeIntro from '../../components/RecipeIntro'
import { useLocalSearchParams } from 'expo-router'
import { useQuery } from 'convex/react'
import api from './../../'


export default function RecipeDetail() {
    const {recipeId}=useLocalSearchParams()
        console.log(recipeId) //jh78eg36rnztpz8qpzgp00wdfd7eskxm
        const recipeDetail = useQuery(api.Recipes.GetRecipeById,{
            id:recipeId == undefined && 'jh78eg36rnztpz8qpzgp00wdfd7eskxm'
        })
        console.log("recipe Details",recipeDetail)

  return (
    <View>
      {/* Recipe Intro */}
            <RecipeIntro />
      {/* Recipe Ingredients */}

      {/* Cooking steps */}
    </View>
  )
}