import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react-native'
import { Clock01FreeIcons, Clock02FreeIcons, Fire02FreeIcons, Fire02Icon } from '@hugeicons/core-free-icons'
import Colors from '../shared/Colors'
import { Link } from 'expo-router'

export default function RecipeCard({recipe}) {
    const recipeJson = recipe?.jsonData
  return (
    <Link href={'/recipe-detail?recipeId=' + recipe?._id} 
    style={{
        flex:1,
        margin:5
    }}>
    <View >
      <Image source={{uri:recipe?.imageUrl}}
             style={{
                width:'100%',
                height:100,
                borderBottomLeftRadius:15,
                borderBottomRightRadius:15
             }}/>
        <View style={{
            padding:10,
            backgroundColor:Colors.WHITE,
            borderBottomLeftRadius:15,
            borderBottomRightRadius:15
        }}>
            <Text style={{
                fontSize:15,
                fontWeight:'bold'
            }}>{recipe?.recipeName}</Text>
           <View style={[styles.infoContiner,{gap:15,marginTop:6}]}>
                 <View style={styles.infoContiner}>
                       <HugeiconsIcon icon={Fire02FreeIcons} color={Colors.RED} size={18}/>
                       <Text style={{
                        fontSize:12,
                        color:Colors.GRAY
                       }}>{recipeJson?.calories} Kcal</Text>
                 </View>
                 <View style={styles.infoContiner}>
                       <HugeiconsIcon icon={Clock01FreeIcons} color={Colors.RED} size={18}/>
                       <Text style={{
                        fontSize:12,
                        color:Colors.GRAY
                       }}>{recipeJson?.cookTime} Min</Text>
                 </View>
            </View> 
        </View>     
    </View>
    </Link>
  )
}

const styles = StyleSheet.create({
  infoContiner:{
        display:'flex',
        flexDirection:'row',
        gap:2,
        alignItems:'center'
  }
})
