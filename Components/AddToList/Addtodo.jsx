import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Header, Icon } from "react-native-elements";
import { icons, COLORS, FONTS } from "../../consts";
import SwitchSelector from "react-native-switch-selector";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import Todo from "../../FireFuction";
import firebase from "../../Firebase/Firebase";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Paragraph, Dialog, Portal, Provider } from "react-native-paper";
//https://dribbble.com/shots/17022467-Task-manager-Mobile-App
//import DatePicker from 'react-native-datepicker' https://www.npmjs.com/package/react-native-datepicker

const width = Dimensions.get("screen").width / 2 - 50;
const card = Dimensions.get("screen").width / 2 - 50;
const option = [
  { label: "High", value: "High", icon: "local-fire-department" },
  { label: "Medium", value: "Medium", icon: "waterfall-chart" },
  { label: "Low", value: "Low", icon: "ac-unit" }
];

const Addtodo = ({ navigation, route }) => {
  const [optionpicker, setOption] = useState("Low");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [dateIsSet, setDateIsSet] = useState(false); //change this back to false
  const [color, setColor] = useState(COLORS.green);
  const [visibility, setVisibity] = useState(false);
  const [icon, setIcon] = useState("ac-unit");
  const [loading, setLoading] = useState(false);

  const [day, setDay] = useState("01");
  const [year, setYear] = useState("2021");
  const [month, setMonth] = useState("02");
  const [time, setTime] = useState("22:00");

  //93D9A3

  // const doneAlert = () => {
  //   Alert.alert("Done", "New Todo added!", [
  //     {
  //       text: "Ok",
  //       onPress: () => navigation.navigate("Todolist")
  //     }
  //   ]);
  // };

  const getColor = (opt) => {
    if (opt == "High") {
      return COLORS.red;
    } else if (opt == "Medium") {
      return COLORS.orange;
    } else if (opt == "Low") {
      return COLORS.green;
    }
  };

  const getPriority = (pri) => {
    const _color = getColor(pri.value);
    setColor(_color);
    setOption(pri.value);
    setVisibity(false);
    setIcon(pri.icon);
  };

  // const setValues = (opt) => {
  //   if (opt == "High") {
  //     setColor(COLORS.red);
  //   } else if (opt == "Medium") {
  //     setColor(COLORS.orange);
  //   } else if (opt == "Low") {
  //     setColor(COLORS.green);
  //   } else {
  //     setColor(COLORS.primary);
  //   }
  //   setOption(opt);
  // };

  const createTodo = (_title, _desc) => {
    const _myDate = date.toString();
    // const today=new Date().getTime();
    let _sendDate = _myDate.substring(0, 24);

    let todoDate = moment(_myDate).format("DD-MM-YYYY");
    let todoTime = moment(_myDate).format("HH:MM");

    const todo = {
      priority: optionpicker,
      title: _title,
      desc: _desc,
      date: todoDate,
      isDone: false,
      time: todoTime
    };
    Todo.createTodo(todo)
      .then(() => {
        console.log("submited");
        navigation.navigate("Todolist");
      })
      .then((err) => console.log("Adding Error:", err));
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setDateIsSet(true);
    console.log(currentDate,'-------')
    if(mode==="date"){
      showMode("time");
    }
    // const today=new Date().getTime();
    //   const times=new Date(currentDate).getTime()
    //   const dis=times-today;
    //   const daysleft=Math.floor(dis/(1000*60*60*24));
    //   console.log("======>", daysleft);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
    
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const DateShow = () => (
    <DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode={mode}
      is24Hour={true}
      display="default"
      onChange={onChange}
    />
  );

  const validate = Yup.object({
    title: Yup.string().required("enter valid title"),
    desc: Yup.string().required("enter valid description")
  });

  return (
    <Provider>
      <SafeAreaView style={styles.safeareaview}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingHorizontal: 25,
            marginTop: StatusBar.currentHeight
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="keyboard-backspace" type="material" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly"
              }}
            >
              <TouchableOpacity style={styles.somestyle} onPress={()=>showDatepicker()}>
                <View
                  style={[styles.iconcontainer, { backgroundColor: "#DEEDF0" }]}
                >
                  <Icon name="calendar-today" type="material" />
                </View>
                <View>
                  <Text style={{ ...FONTS.body4, fontWeight: "bold" }}>
                    Due date
                  </Text>
                  <Text style={{ ...FONTS.h4, fontWeight: "bold" }}>
                    1 June
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.somestyle, { backgroundColor: color }]}
                onPress={() => setVisibity(true)}
              >
                <View
                  style={[styles.iconcontainer, { backgroundColor: "white" }]}
                >
                  <Icon name={icon} type="material" color={color} />
                </View>
                <View>
                  <Text
                    style={{
                      ...FONTS.body4,
                      fontWeight: "bold",
                      color: "white"
                    }}
                  >
                    Priority
                  </Text>
                  <Text
                    style={{ ...FONTS.h4, fontWeight: "bold", color: "white" }}
                  >
                    {optionpicker}
                  </Text>
                </View>
                <Icon
                  name="arrow-drop-down"
                  type="material"
                  color="white"
                />
              </TouchableOpacity>
            </View>

          

            <View>
              <Formik
                initialValues={{ title: "", desc: "" }}
                validateOnMount={true}
                validationSchema={validate}
                onSubmit={(value) => createTodo(value.title, value.desc)}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  touched,
                  errors,
                  isValid
                }) => (
                  <View>
                    <View>
                      <TextInput
                        style={styles.input}
                        autoCorrect={false}
                        placeholder="Title"
                        onChangeText={handleChange("title")}
                        onBlur={handleBlur("title")}
                        value={values.title}
                      />
                      {errors.title && touched.title && (
                        <Text
                          style={{
                            paddingLeft: 10,
                            color: COLORS.danger,
                            ...FONTS.body4
                          }}
                        >
                          {errors.title}
                        </Text>
                      )}
                    </View>

                    <View>
                      <TextInput
                        style={{
                          padding: 10,
                          margin: 10,
                          borderColor: COLORS.darkgray,
                          borderWidth: 1,
                          textAlign: "auto",
                          ...FONTS.h2
                        }}
                        placeholder="Desc"
                        multiline={true}
                        numberOfLines={5}
                        textAlignVertical={"top"}
                        onChangeText={handleChange("desc")}
                        onBlur={handleBlur("desc")}
                        value={values.desc}
                      />
                      {errors.desc && touched.desc && (
                        <Text
                          style={{
                            paddingLeft: 10,
                            marginBottom: 20,
                            color: COLORS.danger,
                            ...FONTS.body4
                          }}
                        >
                          {errors.desc}
                        </Text>
                      )}
                    </View>

                    <Button
                      onPress={handleSubmit}
                      disabled={!isValid || !dateIsSet || !optionpicker}
                      color={
                        isValid && dateIsSet && optionpicker
                          ? COLORS.primary
                          : "#cacfd2"
                      }
                      title="+Add to list "
                      style={styles.btn}
                    />
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Portal>
        <Dialog
          style={{ padding: 10, borderRadius: 15 }}
          visible={visibility}
          onDismiss={() => setVisibity(false)}
        >
          <Dialog.Title>Select priority</Dialog.Title>
          {option.map((priority) => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5
              }}
              onPress={() => getPriority(priority)}
            >
              <View
                style={[
                  styles.iconcontainer,
                  {
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: COLORS.green
                  }
                ]}
              >
                <Icon
                  name={priority.icon} //ac-unit
                  type="material"
                  color={getColor(priority.value)}
                />
              </View>
              <Text style={{ ...FONTS.h4, fontWeight: "bold" }}>
                {priority.value}
              </Text>
            </TouchableOpacity>
          ))}
        </Dialog>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    // marginTop: StatusBar.currentHeight,
    backgroundColor: "white"
  },
  container: {
    padding: 10,
    marginTop: 50
  },
  input: {
    width: Dimensions.get("screen").width - 50,
    height: 60,
    margin: 12,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.darkgray,
    padding: 10,
    ...FONTS.h2,
    lineHeight: 23
  },
  btn: {
    position: "absolute",
    bottom: 0,
    marginTop: 30,
    backgroundColor: "red"
  },
  somestyle: {
    flexDirection: "row",
    alignItems: "center",
    width: card,
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
    height: 60,
    borderColor: "rgba(0,0,0,.2)"
  },
  iconcontainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 10,
    overflow: "hidden"
  }
});

export default Addtodo;
//rgba(127,0,0,4)
