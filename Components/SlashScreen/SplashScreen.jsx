import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native";
import { FONTS } from '../../consts';
import AsyncStorage from '@react-native-async-storage/async-storage';




const SplashScreen = ({navigation}) => {
    
    setTimeout(async()=>{
        const value = await AsyncStorage.getItem('todouser')
        console.log(value,"value")
        if(value === null){
            
            navigation.navigate('Authentication')
        }else{
            navigation.navigate('Todolist')
        }
    },5000)
  return (
    <View style={styles.constainer}>
      <View style={styles.lottieconatiner}>
      <LottieView
          source={require("../../assets/Lottie/manWithTaskList.json")}
          autoPlay
          loop
        />
      </View>
      <Text style={{fontSize:24,fontWeight:'bold'}}>TO-DO APP</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    constainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    lottieconatiner:{
        width:200,
        height:200
    }
})