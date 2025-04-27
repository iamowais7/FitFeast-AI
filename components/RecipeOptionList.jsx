import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from '../shared/Colors'
import { GenerateRecipeImage, GenerateRecipeOptionsAiModel } from '../services/AiModel'
import LoadingDialog from './LoadingDialog'
import { useMutation } from 'convex/react'
import {api} from './../convex/_generated/api'
import {UserContext} from './../context/UserContext'
import Prompt from '../shared/Prompt'
import { useRouter } from 'expo-router'

export default function RecipeOptionList({recipeOption}) {

    const [loading,setLoading] = useState()
    const createRecipe=useMutation(api.Recipes.CreateRecipe)
    const {user} = useContext(UserContext)
    const router = useRouter()

    const onRecipeOptionSelect= async(recipe)=>{
        setLoading(true)
        const PROMPT="RecipeName: "+recipe?.recipeName+"Description: "+recipe?.description + Prompt.GENERATE_COMPLETE_RECIPE_PROMPT

       try {
         const result = await GenerateRecipeOptionsAiModel(PROMPT)
        //  console.log("AI Model Result: ", result);  // 👈 Add this line
         const extractJson = (result.choices[0].message.content)
        const parsed_result=JSON.parse(extractJson)
         console.log("RESULT",parsed_result)
         
         //Generate recipe image
        const aiImageResp=await GenerateRecipeImage(parsed_result?.imagePrompt)
        console.log(aiImageResp?.data?.image)
        
        // save to DB
        const saveRecipeResult=await createRecipe({
          jsonData:parsed_result,
          imageUrl:aiImageResp?.data?.image,
          recipeName:parsed_result?.recipeName,
          uid:user?._id
        })
        console.log(saveRecipeResult)


         //redirect to recipe details screen
        router.push({
          pathname:'/recipe-detail',
          params: {
            recipeId: saveRecipeResult
          }
        })

         setLoading(false)

       } catch (error) {
         setLoading(false)
         console.log("Recipe option list error",error)
       }
    }
  return (
    <View style={{
        marginTop:20
    }}>
      <Text style={{
        fontSize:20,
        fontWeight:'bold'
      }}>Select Recipe</Text>

      <View>
        {recipeOption?.map((item,index)=>(
            <TouchableOpacity 
            onPress={()=>onRecipeOptionSelect(item)}
            key={index} style={{
                padding:15,
                borderWidth:0.2,
                borderRadius:15,
                marginTop:15
            }}>
                <Text style={{
                    fontSize:16,
                    fontWeight:'bold'
                }}>{item?.recipeName}</Text>
                <Text style={{
                    color:Colors.GRAY
                }}>{item?.description}</Text>
            </TouchableOpacity>
        ))}
      </View>
      <LoadingDialog loading={loading}/>
    </View>
  )
}