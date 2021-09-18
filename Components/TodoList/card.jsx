import React, { useEffect, useState,useRef } from "react";
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

const Card = ({ data, props }) => {
  const [color, setColor] = useState();
  const [backgroundcolor, setBackgroundcolor] = useState();
  const [hour, setHour] = useState("20");
  const [minute, setMinute] = useState("05");


  const today=new Date().getTime();

  const distance=data.date-0;
  const _hours=Math.floor((distance%(1000*60*60*24)/(1000*60*60)));
  const _minutes=Math.floor((distance%(1000*60*60))/(1000*60));

  console.log('hours--->',_hours)
  console.log('hours--->',_minutes)


  useEffect(() => {
    const setValues = () => {
      if (data.priority == "High") {
        setColor(COLORS.red);
        setBackgroundcolor(COLORS.TransparentRed);
      } else if (data.priority == "Medium") {
        setColor(COLORS.orange);
        setBackgroundcolor(COLORS.TransparentOrange);
      } else if (data.priority == "Low") {
        setColor(COLORS.green);
        setBackgroundcolor(COLORS.TransparentGreen);
      } else {
        setColor(COLORS.primary);
        setBackgroundcolor(COLORS.primary);
      }
    };
    setValues();
  }, []);

  console.log("====>", data);

  return (
    <Swipeable renderRightActions={Rightswipe}>
      <TouchableOpacity
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <View style={[styles.container, { backgroundColor: backgroundcolor }]}>
          <View style={[styles.line, { backgroundColor: color }]} />
          <View style={styles.display}>
            <View style={[styles.row1, { padding: 5 }]}>
              <Text style={{ color: color }}>
                {data.priority + " Priority"}{" "}
              </Text>
              <View style={styles.inline}>
                <Image
                  source={icons.clock}
                  resizeMode="contain"
                  style={{ width: 20, height: 20, tintColor: COLORS.darkgray }}
                />
                <Text style={{ color: COLORS.darkgray, marginLeft: 1 }}>
                  {hour + ":" + minute}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ ...FONTS.h3 }}>{data.title}</Text>
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
    marginTop: 20,
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
    width: width - 40,
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