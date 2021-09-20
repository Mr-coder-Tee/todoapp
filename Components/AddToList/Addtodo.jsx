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
} from "react-native";
import { Header } from "react-native-elements";
import { icons, COLORS, FONTS } from "../../consts";
import SwitchSelector from "react-native-switch-selector";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import * as Yup from "yup";
import Todo from "../../FireFuction";

//import DatePicker from 'react-native-datepicker' https://www.npmjs.com/package/react-native-datepicker

const width = Dimensions.get("screen").width / 2 - 50;

const option = [
  { label: "High", value: "High" },
  { label: "Medium", value: "Medium" },
  { label: "Low", value: "Low" },
];

const Addtodo = ({ navigation, route }) => {
  const [optionpicker, setOption] = useState();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [dateIsSet, setDateIsSet] = useState(false);//change this back to false
  const [color, setColor] = useState(COLORS.primary);



  const[day,setDay]=useState('01');
  const[year,setYear]=useState('2021')
  const[month,setMonth]=useState('02')
  const[time,setTime]=useState('22:00')

  // useEffect(() => {
  //   const setValues = () => {
  //     if (optionpicker == "High") {
  //       setColor(COLORS.red);
  //     } else if (optionpicker == "Medium") {
  //       setColor(COLORS.orange);
  //     } else if (optionpicker == "Low") {
  //       setColor(COLORS.green);
  //     } else {
  //       setColor(COLORS.primary);
  //     }
  //   };
  //   setValues();
  // }, [optionpicker]);


  const doneAlert=()=>{
    Alert.alert(
        "Done",
        "New Todo added!",[
            {
                text:'Ok',
                onPress:()=>navigation.navigate('Todolist'),
            }
        ]
    )
}


  const setValues = (opt) => {
    if (opt == "High") {
      setColor(COLORS.red);
    } else if (opt == "Medium") {
      setColor(COLORS.orange);
    } else if (opt == "Low") {
      setColor(COLORS.green);
    } else {
      setColor(COLORS.primary);
    }
    setOption(opt)
  };

  const createTodo = (_title, _desc) => {
    const _myDate=date.toString();
    // const today=new Date().getTime();
    let _sendDate=_myDate.substring(0,24)

    console.log('_sendDate---->',_sendDate)
    const todo = {
      priority: optionpicker,
      title: _title,
      desc: _desc,
      // date: 'Sun Sep 19 2021 09:58:31 GMT+0200 (SAST)',
      // date: _myDate,
      date: _sendDate,
      isDone: false,
    };
    Todo.createTodo(todo)
      .then(() => {
        console.log("submited");
        navigation.navigate('Todolist')
      })
      .then((err) => console.log("Adding Error:", err));
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setDateIsSet(true);

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

  const LeftComp = () => (
    <View>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={icons.back}
          resizeMode="contain"
          style={{ width: 20, height: 20, tintColor: COLORS.white }}
        />
      </TouchableOpacity>
    </View>
  );

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
    desc: Yup.string().required("enter valid description"),
  });

  return (
    <SafeAreaView style={styles.safeareaview}>
      <Header
        elevated={true}
        centerComponent={{
          text: "Add task",
          style: { color: COLORS.white, ...FONTS.h2, fontWeight: "bold" },
        }}
        containerStyle={{
          backgroundColor: COLORS.primary,
          alignItems: "center",
        }}
        leftComponent={<LeftComp />}
      />
      <ScrollView>
        <View style={styles.container}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...FONTS.h4, fontWeight: "bold" }}>Priority</Text>
            {!optionpicker && (
              <Text
                style={{
                  paddingLeft: 10,
                  color: COLORS.danger,
                  ...FONTS.body4,
                }}
              >
                select a priority level
              </Text>
            )}
          </View>
          <SwitchSelector
            options={option}
            initial={0}
            selectedColor={COLORS.white}
            buttonColor={color}
            borderColor={COLORS.secondary}
            hasPadding
            onPress={(value) => setValues(value)}
          />

          <View style={{ marginTop: 10 }}>
            {!dateIsSet && (
              <Text
                style={{
                  paddingLeft: 10,
                  color: COLORS.danger,
                  ...FONTS.body4,
                }}
              >
                select todo date
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={showDatepicker}
                style={{
                  width: width,
                  height: 40,
                  borderWidth: 1,
                  borderColor: COLORS.darkgray,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  marginRight: 5,
                }}
              >
                <Image source={icons.date} style={{ width: 30, height: 30 }} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => showTimepicker()}
                style={{
                  width: width,
                  height: 40,
                  borderWidth: 1,
                  borderColor: COLORS.darkgray,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  marginLeft: 5,
                }}
              >
                <Image source={icons.clock} style={{ width: 30, height: 30 }} />
              </TouchableOpacity>
              <View>{show && <DateShow />}</View>
            </View>
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
                isValid,
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
                          ...FONTS.body4,
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
                        ...FONTS.h2,
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
                          ...FONTS.body4,
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
  );
};

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  container: {
    padding: 10,
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
    lineHeight: 23,
  },
  btn: {
    position: "absolute",
    bottom: 0,
    marginTop: 30,
    backgroundColor: "red",
  },
});

export default Addtodo;
