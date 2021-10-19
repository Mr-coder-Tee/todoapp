import React from "react";
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
import { BlurView } from "@react-native-community/blur";
import { Button, Icon } from "react-native-elements";
const height = Dimensions.get("screen").height * 0.6;

const Authentication = () => {
  const img = {
    uri: "https://images.unsplash.com/photo-1518976024611-28bf4b48222e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80"
  };
  return (
    <ImageBackground resizeMode="cover" style={styles.container} source={img}>
     <View>
     <Text
          style={{ ...FONTS.h1, fontWeight: "bold", color: COLORS.primary }}
        >
       Sign up
        </Text>
         <View style={styles.glass}>
             <Text>Looks like you don't have an account. Let's create a new account for Tebastsoterrence.manaka@gmail.com</Text>
             <TextInput
            placeholder="Names"
            keyboardType="text"
            style={{
              backgroundColor: COLORS.white,
              padding: 10,
              marginBottom: 10,
              marginTop:10,
            }}
          />
          <TextInput
            placeholder="Password"
            keyboardType="default"
            secureTextEntry={true}
            style={{
              backgroundColor: COLORS.white,
              padding: 10,
              marginBottom: 10
            }}
          />
          <Button
            title="Sign up"
            containerStyle={{ marginTop: 10, backgroundColor: COLORS.primary }}
            buttonStyle={{
              backgroundColor: COLORS.primary,
            }}
          />
         </View>
     </View>
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
