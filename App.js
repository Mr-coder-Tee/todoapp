import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {Todolist,Viewtodo,Addtodo} from './Components/index'

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer
    >
      <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"Todolist"}>
          <Stack.Screen name="Todolist" component={Todolist} />
          <Stack.Screen name="Viewtodo" component={Viewtodo} />
          <Stack.Screen name="Addtodo" component={Addtodo} />

          </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
