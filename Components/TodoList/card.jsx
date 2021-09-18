import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { SIZES, FONTS, COLORS, icons } from "../../consts/index";
import Swipeable from "react-native-gesture-handler/Swipeable";

const width = Dimensions.get("screen").width - 30;

const Rightswipe = () => (
  <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }}>
    <View style={styles.delete}>
      <Image source={icons.del} />
    </View>
  </TouchableOpacity>
);

const Card = () => {
  return (
    <Swipeable renderRightActions={Rightswipe}>
      <TouchableOpacity
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <View
          style={[
            styles.container,
            { backgroundColor: COLORS.TransparentGreen },
          ]}
        >
          <View style={[styles.line, { backgroundColor: COLORS.green }]} />
          <View style={styles.display}>
            <View style={[styles.row1, { padding: 5 }]}>
              <Text style={{ color: COLORS.green }}>Low Priority</Text>
              <View style={styles.inline}>
                <Image
                  source={icons.clock}
                  resizeMode="contain"
                  style={{ width: 20, height: 20, tintColor: COLORS.darkgray }}
                />
                <Text style={{ color: COLORS.darkgray, marginLeft: 1 }}>
                  10:30 AM
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ ...FONTS.h3 }}>
                Guitar lesson with jacob in ther city center
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    width: width,
    height: 120,
    borderRadius: 10,
    marginTop:20,
  },
  line: {
    height: "100%",
    width: 10,
    borderRadius: 10,
  },
  display: {
    marginLeft: 10,
  },
  row1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inline: {
    flexDirection: "row",
    alignContent: "center",
  },
  delete: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "80%",
    backgroundColor: COLORS.danger,
  },
});

export default Card;
