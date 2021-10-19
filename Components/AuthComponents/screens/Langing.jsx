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
import { COLORS, SIZES, FONTS } from "../../../consts/index";
import { BlurView } from "@react-native-community/blur";
import { Button, Icon } from "react-native-elements";
const height = Dimensions.get("screen").height * 0.6;

const Langing = () => {
    return (
        <View>
        <Text
          style={{ ...FONTS.h1, fontWeight: "bold", color: COLORS.primary }}
        >
          Hi!
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
          />
          <Button
            title="Continue"
            containerStyle={{ marginTop: 10, backgroundColor: COLORS.primary }}
            buttonStyle={{
              backgroundColor: COLORS.primary,
            }}
          />
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
    )
}

export default Langing

const styles = StyleSheet.create({
    glass: {
        backgroundColor: "rgba(255,255,255,.7)",
        height: height,
        borderRadius: 20,
        padding: 20
      }
})
