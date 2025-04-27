import { View, Text, Platform, FlatList } from 'react-native'
import React, { useRef } from 'react'
import RecipeIntro from '../../components/RecipeIntro'
import { useLocalSearchParams } from 'expo-router'
import { useQuery } from 'convex/react'
import {api} from './../../convex/_generated/api'
import Colors from '../../shared/Colors'
import RecipeIngredients from '../../components/RecipeIngredients'
import RecipeSteps from '../../components/RecipeSteps'
import Button from './../../components/shared/Button'
import ActionSheet from 'react-native-actions-sheet'
import AddToMealActionSheet from '../../components/AddToMealActionSheet'


export default function RecipeDetail() {
    const {recipeId}=useLocalSearchParams()
        console.log("index.jsx inside recipe detail",recipeId) //jh78eg36rnztpz8qpzgp00wdfd7eskxm

        const actionSheetRef= useRef(null)

        const recipeDetail = useQuery(api.Recipes.GetRecipeById,{
             id: recipeId || 'jh78eg36rnztpz8qpzgp00wdfd7eskxm'
        })
        console.log("recipe Details",recipeDetail)
        if (!recipeDetail) {
          return (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>Loading recipe...</Text>
              </View>
          );
      }
        

  return (
    <FlatList 
        data={[]}
        renderItem={() =>null}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
    <View  style={{
          padding:20,
          paddingTop:Platform.OS==='ios' ? 40: 30,
          backgroundColor:Colors.WHITE,
          height:'100%'
        }}>
      {/* Recipe Intro */}
            <RecipeIntro recipeDetail={recipeDetail}/>
      {/* Recipe Ingredients */}
            <RecipeIngredients  recipeDetail={recipeDetail}/>
      {/* Cooking steps */}
            <RecipeSteps recipeDetail={recipeDetail}/>

        <View style={{
          marginTop:15
        }}>
        <Button title={'Add to Meal Plan'}
          onPress={()=>actionSheetRef.current.show()}/>
        </View>

        <ActionSheet ref={actionSheetRef}>
            <AddToMealActionSheet recipeDetail={recipeDetail}
               hideActionSheet={()=>actionSheetRef.current.hide()}/>
        </ActionSheet>
    </View>}>
    </FlatList>
  )
}