import React,{useState} from "react";
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity
} from "react-native";
import { COLORS, SIZES, FONTS } from "../../consts/index";
import Langing from "./screens/Langing";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
// import { BlurView } from "@react-native-community/blur";
import { Button, Icon } from "react-native-elements";
const height = Dimensions.get("screen").height * 0.6;


const Authentication = ({navigation}) => {
  const img = {
    uri: "https://images.unsplash.com/photo-1518976024611-28bf4b48222e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80"
  };
  const [email,setEmail]=useState();
  const [screen,setScreen]=useState('landing');

  const changeScreenAndEmail=(_screen,_email)=>{
    setScreen(_screen)
    setEmail(_email)
  }
  const changeScreen=()=>{
    setScreen('landing')
  }

  return (
    <ImageBackground resizeMode="cover" style={styles.container} source={img}>
      {
        screen==='landing'?<Langing navigation={navigation} changeScreenAndEmail={changeScreenAndEmail}/>:
          <Signup email={email} navigation={navigation} changeScreen={changeScreen}/>
      }
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    justifyContent: "center",
    padding: 20
  },
  glass: {
    backgroundColor: "rgba(255,255,255,.7)",
    height: height,
    borderRadius: 20,
    padding: 20
  }
 
});

export default Authentication;
