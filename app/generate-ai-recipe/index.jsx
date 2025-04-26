import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Colors from './../../shared/Colors'
import Button from './../../components/shared/Button'
import { GenerateRecipeOptionsAiModel } from '../../services/AiModel'
import Prompt from '../../shared/Prompt'
import RecipeOptionList from '../../components/RecipeOptionList'

export default function GenerateAiRecipe() {
    const [input,setInput] = useState()
    const [loading,setLoading] = useState(false)
    const [recipeOption,setRecipeOption] = useState([])
    const GenerateRecipeOptions=async()=>{
        setLoading(true)
        ///make ai model to call recipe options
       try {
        const PROMPT =input + Prompt.GENERATE_RECIPE_OPTION_PROMPT
        const result =await GenerateRecipeOptionsAiModel(PROMPT)
        console.log(result.choices[0].message)
        const extractJson=(result.choices[0].message.content)
        const parsed_result=JSON.parse(extractJson)
        console.log("result", parsed_result)
        setRecipeOption(parsed_result)
        setLoading(false)
       } catch (e) {
        setLoading(false)
        console.log("generate ai recipe error",e)
       }
    }
  return (
    <View style={{
        padding:20,
        backgroundColor:Colors.WHITE,
        height:'100%' 
    }}>
      <Text style={{
        fontSize:30,
        fontWeight:'bold'
      }}>AI-Recipe Generator</Text>
      <Text style={{
        marginTop:5,
        color:Colors.GRAY,
        fontSize:16
      }}>Generate Personalised recipes using AI </Text>

      <TextInput style={styles.textArea}
                onChangeText={(value)=>setInput(value)}
                placeholder='Enter your ingredient or recipe name'/>

      <View style={{
        marginTop:25
      }}>
      <Button title={'Generate Recipe'} onPress={GenerateRecipeOptions} loading={loading}/>
      </View>

      {recipeOption?.length > 0 && <RecipeOptionList recipeOption={recipeOption}/>}
    </View>
  )
}

const styles = StyleSheet.create({
    textArea:{
        padding:15,
        borderWidth:1,
        borderRadius:10,
        fontSize:20,
        marginTop:15,
        height:150,
        textAlignVertical:'top',
        backgroundColor:Colors.WHITE
    }
})