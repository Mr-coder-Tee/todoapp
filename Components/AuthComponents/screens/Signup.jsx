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
import { COLORS, SIZES, FONTS } from "../../../consts/index";
// import { BlurView } from "@react-native-community/blur";
import { Button, Icon } from "react-native-elements";
const height = Dimensions.get("screen").height * 0.4;
import Todo from '../../../FireFuction'

const Signup = ({email,navigation,changeScreen}) => {
  const [name,setName]=useState();
  const [password,setPassword]=useState();

  const createUser=()=>{
    Todo.signupuser(email,password,name,navigation)
    console.log("email,password,name",email,password,name)
  }


  return (
    <View>
      <Text style={{ ...FONTS.h1, fontWeight: "bold", color: COLORS.primary }}>
        Sign up
      </Text>
      <View style={styles.glass}>
        <View >
          <Text>
            Looks like you don't have an account. Let's create a new account for
          </Text>
          <Text style={{fontWeight:'700',color:COLORS.primary}}>{email}</Text>
        </View>
        <TextInput
          placeholder="Names"
          style={{
            backgroundColor: COLORS.white,
            padding: 10,
            marginBottom: 10,
            marginTop: 10
          }}
          value={name}
          onChangeText={text=>setName(text)}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={{
            backgroundColor: COLORS.white,
            padding: 10,
            marginBottom: 10
          }}
          value={password}
          onChangeText={text=>setPassword(text)}
        />
        <Button
          title="Sign up"
          containerStyle={{ marginTop: 10, backgroundColor: COLORS.primary }}
          buttonStyle={{
            backgroundColor: COLORS.primary
          }}
          onPress={()=>createUser()}
        />
        <TouchableOpacity activeOpacity={0.7} style={{marginTop:10,padding:5}} onPress={()=>changeScreen()}>
          <Text
            style={{ color: COLORS.secondary, fontWeight: "bold" }}
          >
            Already Registered?
          </Text>
        </TouchableOpacity>
        <View style={{marginTop:5,padding:5}}>
        <TouchableOpacity activeOpacity={0.7}>
          <Text
            style={{ ...FONTS.h4, color: COLORS.primary, fontWeight: "bold" }}
          >
            Forgot your Password?
          </Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  glass: {
    backgroundColor: "rgba(255,255,255,.7)",
    height: height,
    borderRadius: 20,
    padding: 20
  }
});
