import { StatusBar } from "expo-status-bar";
import React from "react";
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

const Stack = createStackNavigator();
const user = firebase.auth().currentUser;

export default function App() {
  console.log("user:", user);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={"Todolist"}
      >
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
