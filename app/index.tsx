import { Dimensions, Image, Text, View } from "react-native";
import Button from './../components/shared/Button'
export default function Index() {
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
                   onPress={()=>console.log("Button Clicked")}/>
          </View>      
    </View>
  );
}
