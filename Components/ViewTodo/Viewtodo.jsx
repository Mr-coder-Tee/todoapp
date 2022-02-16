import React, { useEffect, useState } from "react";
import { icons, COLORS, FONTS } from "../../consts";

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Button,
} from "react-native";
import { Header } from "react-native-elements";
import Todo from "../../FireFuction";
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get("screen").width;

const Viewtodo = (props) => {
  const { navigation } = props;
  const { key } = props.route.params;

  const [_color, setColor] = useState();
  const [_title, seTitle] = useState();
  const [_desc, setDesc] = useState();
  const [isDone, setIsDone] = useState();
  const [_pri, setPri] = useState();
  const [_myDate, setMydate] = useState();

  useEffect(() => {
    Todo.getDataById(key).on("value", (snapshot) => {
      const data = snapshot.val();
      seTitle(data.title);
      setDesc(data.desc);
      setIsDone(data.isDone);
      setPri(data.priority);
      setMydate(data.date);
      // console.log("data from view todo->", data);

      const setValues = () => {
        if (data.priority == "High") {
          setColor(COLORS.red);
        } else if (data.priority == "Medium") {
          setColor(COLORS.orange);
        } else if (data.priority == "Low") {
          setColor(COLORS.green);
        } else {
          setColor(COLORS.primary);
        }
      };
      setValues();
    });
  }, []);

  const updateDone = () => {
    // setIsDone(true)
    const _data = {
      priority: _pri,
      title: _title,
      desc: _desc,
      date: _myDate,
      isDone: true,
    };

    console.log(_data);
    Todo.updateTodo(key, {
      priority: _pri,
      title: _title,
      desc: _desc,
      date: _myDate,
      isDone: true,
    })
      .then(() => console.log("updated"))
      .catch((err) => console.log("Update Done Error", err));
  };

  const LeftComp = () => (
    <View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Image
          source={icons.back}
          resizeMode="contain"
          style={{ width: 20, height: 20, tintColor: COLORS.white }}
        />
      </TouchableOpacity>
    </View>
  );
  const DoneBtn = () => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Button
        title="Completed"
        disabled={isDone}
        onPress={() => updateDone()}
      />
      {isDone && (
        <Image
          source={icons.done}
          resizeMode="contain"
          style={{
            width: 30,
            height: 30,
            marginLeft: 5,
            tintColor: COLORS.green,
          }}
        />
      )}
    </View>
  );
  const Edit = () => (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Edit",{'key':key})}
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          backgroundColor: COLORS.secondary,
          padding: 7,
          borderRadius: 10,
        }}
      >
        <Image
          source={icons.edit}
          resizeMode="contain"
          style={{ width: 20, height: 20 }}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeareaview}>
      <Header
        elevated={true}
        centerComponent={{
          text: "Today's Task",
          style: { color: COLORS.white, ...FONTS.h2, fontWeight: "bold" },
        }}
        containerStyle={{
          backgroundColor: COLORS.primary,
          alignItems: "center",
        }}
        leftComponent={<LeftComp />}
      />
      <ScrollView>
        <View style={styles.titlecontainer}>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              borderWidth: 3,
              borderColor: _color,
            }}
          />
          <Text
            style={{
              ...FONTS.h3,
              fontWeight: "bold",
              color: COLORS.darkgray,
              marginLeft: 5,
            }}
          >
            {_title}
          </Text>
        </View>
        <View style={{ padding: 10, marginTop: 20, color: COLORS.black }}>
          <Text style={{ ...FONTS.body3 }}>{_desc}</Text>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          position: "absolute",
          bottom: 0,
          backgroundColor: "rgba(255,255,255,.8)",
          width: width,
          borderTopWidth: 1,
          borderColor: COLORS.darkgray,
        }}
      >
        <Edit />
        <DoneBtn />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  titlecontainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
  },
});

export default Viewtodo;
