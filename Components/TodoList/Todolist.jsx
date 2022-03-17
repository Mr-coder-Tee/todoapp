import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  Alert
} from "react-native";
import { SIZES, FONTS, COLORS, icons } from "../../consts/index";
import Card from "./card";
import moment from "moment";
import LottieView from "lottie-react-native";

import Todo from "../../FireFuction";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Todolist = (props) => {
  const { navigation } = props;
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const [todo, SetTodo] = useState();
  const [data, SetData] = useState([]);

  const today = new Date().getTime();

  const daleteAll = () => {
    Todo.deleteAll()
      .then(() => {
        console.log("todo deleted");
        navigation.navigate("Todolist");
      })
      .catch((err) => {
        console.log("Delete Error:", err);
      });
  };
  const deleteAlert = () => {
    Alert.alert(
      "Delete All?",
      "Are you sure you want to delete the whole list?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => console.log("cancel delete")
        },
        {
          text: "YES",
          onPress: () => daleteAll()
        }
      ]
    );
  };
  const signoutAlert = () => {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => console.log("cancal log out")
      },
      {
        text: "Log out",
        onPress: () => Todo.signout(navigation)
      }
    ]);
  };

  useEffect(() => {
    const getList =async () => {
        const id=await AsyncStorage.getItem('todouser')

      Todo.getData(id).on("child_changed", (snapshot) => {
        const TodoList = [];
        snapshot.forEach((list) => {
          const key = list.key;
          const datas = list.val();

          // console.log(key,"recived datas--->", datas);
          TodoList.push({    key: key,
            time: datas.time,
            priority: datas.priority,
            title: datas.title,
            desc: datas.desc,
            date: datas.date,
            isDone: datas.isDone,
            todoID:datas.todoID})
         

          // var _today = new Date();
          // let todoDate = moment(_today).format("DD-MM-YYYY");
          // console.log("todoDate", todoDate);
          // let _sendDate = datas.date;

          // if (todoDate == _sendDate) {
          //   TodoList.push({
          
          //   });
          // }
        });
        SetTodo(TodoList);
        SetData(TodoList)
      });
    };

    const onAdd=async()=>{
      const id=await AsyncStorage.getItem('todouser')
      Todo.getData(id).on("child_changed", (snapshot) => {
        const TodoList = [];
        snapshot.forEach((list) => {
          const key = list.key;
          const datas = list.val();

          console.log(key,"recived datas--->", datas);
          TodoList.push({    key: key,
            time: datas.time,
            priority: datas.priority,
            title: datas.title,
            desc: datas.desc,
            date: datas.date,
            isDone: datas.isDone,
            todoID:datas.todoID})
         

          // var _today = new Date();
          // let todoDate = moment(_today).format("DD-MM-YYYY");
          // console.log("todoDate", todoDate);
          // let _sendDate = datas.date;

          // if (todoDate == _sendDate) {
          //   TodoList.push({
          
          //   });
          // }
        });
        // SetTodo(TodoList);
        // SetData(TodoList)
      });
    }
    getList();
  }, []);

  const Empty = () => (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <View style={{ width: 200, height: 200 }}>
        <LottieView
          source={require("../../assets/Lottie/emptyBox.json")}
          autoPlay
          loop
        />
      </View>

      <Text style={{ ...FONTS.h2 }}>No Task Today...</Text>
    </View>
  );

  const RenderFlatList = () => (
    <FlatList
      data={data}
      keyExtractor={(item) => `${item.key}`}
      renderItem={({ item, index }) => {
        return (
          <Card
            data={item}
            props={props}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    height: 1,
                    width: SCREEN,
                    backgroundColor: COLORS.black
                  }}
                ></View>
              );
            }}
          />
        );
      }}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => signoutAlert()}
          style={{ padding: 5 }}
        >
          <Text style={{ color: "#6DD5FA" }}>Sign out</Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", ...FONTS.h1 }}>To do list</Text>
        <View style={styles.flexRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Addtodo")}
            style={{
              width: 40,
              height: 40,
              backgroundColor: COLORS.primary,
              padding: 10,
              borderRadius: 10,
              marginRight: 10,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              source={icons.add}
              resizeMode="contain"
              style={{ width: 20, height: 20, tintColor: COLORS.white }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              backgroundColor: COLORS.white,
              padding: 10,
              borderRadius: 10,
              marginRight: 10,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "rgba(0,0,0,.3)"
            }}
            onPress={() => deleteAlert()}
          >
            <Image
              source={icons.deleteall}
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              textAlign: "center",
              ...FONTS.h5,
              fontWeight: "bold",
              color: COLORS.ligthGray
            }}
          >
            {day - 1 + "/" + month + "/" + year}
          </Text>

          <Image
            source={icons.dot}
            resizeMode="contain"
            style={{ width: 10, height: 10 }}
          />
        </View>
        <View style={{ marginLeft: 5, marginRight: 5 }}>
          <Text
            style={{ textAlign: "center", ...FONTS.h3, fontWeight: "bold" }}
          >
            Today
          </Text>
          <Text
            style={{ textAlign: "center", ...FONTS.h4, fontWeight: "bold" }}
          >
            {day + "/" + month + "/" + year}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            source={icons.dot}
            resizeMode="contain"
            style={{ width: 10, height: 10 }}
          />
          <Text
            style={{
              textAlign: "center",
              ...FONTS.h5,
              fontWeight: "bold",
              color: COLORS.ligthGray
            }}
          >
            {day + 1 + "/" + month + "/" + year}
          </Text>
        </View>
      </View>

      {!data ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <View style={{ width: 200, height: 200 }}>
            <LottieView
              source={require("../../assets/Lottie/loadinghand.json")}
              autoPlay
              loop
            />
          </View>
        </View>
      ) : data.length === 0 ? (
        <Empty />
      ) : (
        <RenderFlatList />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row"
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  safeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight + 10,
    paddingLeft: 10,
    paddingRight: 10
  }
});

export default Todolist;
