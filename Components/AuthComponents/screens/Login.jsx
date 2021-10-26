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
import { Button, Icon, Avatar } from "react-native-elements";
import Todo from '../../../FireFuction'
const height = Dimensions.get("screen").height * 0.3;

const Login = ({ email }) => {
    const [password,setPassword]=useState();
  return (
    <View>
      <Text style={{ ...FONTS.h1, fontWeight: "bold", color: COLORS.primary }}>
        Log in
      </Text>
      <View style={styles.glass}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            size="medium"
            icon={{ name: "user", type: "font-awesome", color: "black" }}
            overlayContainerStyle={{ borderColor: "black", borderWidth: 1 }}
          />
          <View style={{ marginLeft: 5 }}>
            <Text style={{  fontWeight: "bold" }}>{email}</Text>
          </View>
        </View>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={{
            backgroundColor: COLORS.white,
            padding: 10,
            marginBottom: 10,
            marginTop: 10
          }}
          value={value}
          onChangeText={text=>setPassword(Text)}
        />
        <Button
          title="Continue"
          buttonStyle={{
            backgroundColor: COLORS.primary,
            borderRadius: 10,
            marginTop: 5,
            marginBottom: 15
          }}
        />
        <TouchableOpacity activeOpacity={0.7}>
          <Text
            style={{ ...FONTS.h4, color: COLORS.primary, fontWeight: "bold" }}
          >
            Forgot your Password?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  glass: {
    backgroundColor: "rgba(255,255,255,.7)",
    height: height,
    borderRadius: 20,
    padding: 20
  }
});
