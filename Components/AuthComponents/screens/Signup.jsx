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
import { BlurView } from "@react-native-community/blur";
import { Button, Icon } from "react-native-elements";
const height = Dimensions.get("screen").height * 0.6;

const Signup = () => {
  return (
    <View>
      <Text style={{ ...FONTS.h1, fontWeight: "bold", color: COLORS.primary }}>
        Sign up
      </Text>
      <View style={styles.glass}>
        <Text>
          Looks like you don't have an account. Let's create a new account for
          Tebastsoterrence.manaka@gmail.com
        </Text>
        <TextInput
          placeholder="Names"
          keyboardType="text"
          style={{
            backgroundColor: COLORS.white,
            padding: 10,
            marginBottom: 10,
            marginTop: 10
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
            backgroundColor: COLORS.primary
          }}
        />
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
