import React, { useEffect, useState } from "react";
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
import { BlurView } from "@react-native-community/blur";
import { Button, Icon } from "react-native-elements";
const height = Dimensions.get("screen").height * 0.6;
import Todo from "../../../FireFuction";

const Langing = ({ navigation, changeScreenAndEmail }) => {
  const [email, SetEmail] = useState();
  const [password, setPassword] = useState();

  const singIn=()=>{
    Todo.signInWithemailPassword(email,password,navigation)
  }

  // console.log("email:",email)
  return (
    <View>
      <Text style={{ ...FONTS.h3, fontWeight: "bold", color: COLORS.primary }}>
        Hi!welcome to our Todo App
      </Text>
      <View style={styles.glass}>
        {/* <BlurView> */}
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={{
            backgroundColor: COLORS.white,
            padding: 10,
            marginBottom: 10
          }}
          value={email}
          onChangeText={(text) => SetEmail(text)}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={{
            backgroundColor: COLORS.white,
            padding: 10,
            marginBottom: 10,
            marginTop: 10
          }}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          title="Sign In"
          containerStyle={{ marginTop: 10, backgroundColor: COLORS.primary }}
          buttonStyle={{
            backgroundColor: COLORS.primary
          }}
          onPress={() => singIn()}
        />
        <TouchableOpacity activeOpacity={0.7} style={{marginTop:10,padding:5}}  onPress={()=>changeScreenAndEmail('signup',email)}>
          <Text
            style={{ color: COLORS.secondary, fontWeight: "bold" ,textAlign:'center'}}
          >
            Sign up with Email
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            marginBottom: 10,
            marginTop: 10,
            fontWeight: "600",
            ...FONTS.h4
          }}
        >
          or
        </Text>
        <Button
          title=" Continue with Facebook"
          buttonStyle={{
            backgroundColor: "#1778F2",
            borderWidth: 0,
            borderRadius: 10
          }}
          containerStyle={{ marginBottom: 10 }}
          icon={{
            name: "facebook",
            type: "font-awesome",
            size: 20,
            color: "white"
          }}
          iconContainerStyle={{ marginRight: 10 }}
          iconPosition="left"
        />
        <Button
          buttonStyle={{
            backgroundColor: "#0F9D58",
            borderWidth: 0,
            borderRadius: 10
          }}
          title=" Continue with Google"
          titleStyle={{ color: "#fff", marginHorizontal: 20 }}
          containerStyle={{ marginBottom: 10 }}
          icon={{
            name: "google",
            type: "font-awesome",
            size: 20,
            color: "white"
          }}
          iconContainerStyle={{ marginRight: 10 }}
          iconPosition="left"
        />
        <Button
          buttonStyle={{
            backgroundColor: "#a4c6",
            borderWidth: 0,
            borderRadius: 10
          }}
          title=" Continue with Phone"
          titleStyle={{ color: "#fff", marginHorizontal: 20 }}
          containerStyle={{ marginBottom: 10 }}
          icon={{
            name: "mobile",
            type: "font-awesome",
            size: 20,
            color: "white"
          }}
          iconContainerStyle={{ marginRight: 10 }}
          iconPosition="left"
        />
        {/* </BlurView> */}
      </View>
    </View>
  );
};

export default Langing;

const styles = StyleSheet.create({
  glass: {
    backgroundColor: "rgba(255,255,255,.7)",
    height: height,
    borderRadius: 20,
    padding: 20
  }
});
