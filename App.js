import { StatusBar } from "expo-status-bar";
import React,{useState,useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  Todolist,
  Viewtodo,
  Addtodo,
  Edit,
  Authentication
} from "./Components/index";

import firebase from "./Firebase/Firebase";
import SplashScreen from "./Components/SlashScreen/SplashScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();
// const user = true;

export default function App() {
  // console.log("user:", user);

  const[user,setuser]=useState()
  useEffect(()=>{
      const tryLogin= async()=>{
        const u=await AsyncStorage.getItem('todouser')
        setuser(u)
      }
      tryLogin()
  },[])
  console.log(user)
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={"SplashScreen"}
      >
         <Stack.Screen name="SplashScreen" component={SplashScreen} />
        {user ? (
          <>
           
            <Stack.Screen name="Todolist" component={Todolist} />
            <Stack.Screen name="Viewtodo" component={Viewtodo} />
            <Stack.Screen name="Addtodo" component={Addtodo} />
            <Stack.Screen name="Edit" component={Edit} />
          </>
        ) : (
          <>
            <Stack.Screen name="Authentication" component={Authentication} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
