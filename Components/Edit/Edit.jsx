import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Button,
  Alert,
} from "react-native";
import SwitchSelector from "react-native-switch-selector";
import { icons, COLORS, FONTS } from "../../consts";
import moment from "moment";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Header } from "react-native-elements";
import Todo from "../../FireFuction";

const width = Dimensions.get("screen").width / 2 - 50;

const option = [
  { label: "High", value: "High" },
  { label: "Medium", value: "Medium" },
  { label: "Low", value: "Low" },
];

const Edit = ({ navigation, route }) => {
  const { key } = route.params;
  const [heading, setHeading] = useState();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [pri, setPri] = useState();
  const [isDone, setIsDone] = useState();
  const [startPriAte, setStartPriAte] = useState(0);
  const [clockdate, setclockdate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [dateIsSet, setDateIsSet] = useState(true); //change this back to false
  const [datechanged,setDateIsChanged]=useState(false)
  const [color, setColor] = useState(COLORS.primary);
  //   const[descIsSet,setdescIsSet]=useState(true)
  //   const[titleIsSet,settitleIsSet]=useState(true)

  //components-----------------------------------------
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
      value={clockdate}
      mode={mode}
      is24Hour={true}
      display="default"
      onChange={onChange}
    />
  );
  //!components-----------------------------------------

  //functions------------------------------------------
  const doneAlert = () => {
    Alert.alert("Done", "Update complete!", [
      {
        text: "Ok",
        onPress: () => navigation.navigate("Todolist"),
      },
    ]);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || clockdate;
    setShow(Platform.OS === "ios");
    setclockdate(currentDate);
    setDateIsSet(true);
    setDateIsChanged(true)
  };

  const handleUpdate = () => {
    let todoDate=''
    let todoTime=''
    if(datechanged){
      const _myDate = clockdate.toString();
       todoDate=moment(_myDate).format('DD-MM-YYYY')
       todoTime=moment(_myDate).format('HH:MM')

    }else{
      todoDate=date
      todoTime=time
    }
    console.log('Date changed',date,'todoDate:',todoDate)
    console.log('Time changed',time,'todoTime:',todoTime)

    Todo.updateTodo(key, {
      priority: pri,
      title: title,
      desc: desc,
      date: todoDate,
      time: todoTime,
      isDone: false,
    })
      .then(() => console.log("updated"))
      .catch((err) => console.log("Update Error", err));
    doneAlert();
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
  //functions!-----------------------------------------

  useEffect(() => {
    Todo.getDataById(key).on("value", (snapshot) => {
      const data = snapshot.val();
      setHeading(data.title);
      setTitle(data.title);
      setDesc(data.desc);
      setIsDone(data.isDone);
      setPri(data.priority);
      setDate(data.date);
      setTime(data.time);

      const setValues = () => {
        if (data.priority == "High") {

          setStartPriAte(0);
        } else if (data.priority == "Medium") {

          setStartPriAte(1);
        } else if (data.priority == "Low") {

          setStartPriAte(2);
        }
      };
      setValues();
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeareaview}>
      <Header
        elevated={true}
        centerComponent={{
          text: "Update Task: " + heading,
          style: { color: COLORS.white, ...FONTS.h2, fontWeight: "bold" },
        }}
        containerStyle={{
          backgroundColor: COLORS.primary,
          alignItems: "center",
        }}
        leftComponent={<LeftComp />}
      />
      <View style={styles.container}>
        <View>
          <Text
            style={{
              paddingLeft: 10,
              color: COLORS.danger,
              ...FONTS.body4,
            }}
          >
            Priority:
          </Text>
          <SwitchSelector
            options={option}
            initial={startPriAte}
            selectedColor={COLORS.white}
            buttonColor={COLORS.primary}
            borderColor={COLORS.secondary}
            hasPadding
            onPress={(value) => setPri(value)}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              paddingLeft: 10,
              color: COLORS.danger,
              ...FONTS.body4,
            }}
          >
            Date:
          </Text>
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
          <TextInput
            style={styles.input}
            placeholder="Title"
            onChangeText={(text) => setTitle(text)}
            value={title}
          />
          {!title && (
            <Text
              style={{
                paddingLeft: 10,
                color: COLORS.danger,
                ...FONTS.body3,
              }}
            >
              Enter title
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
            onChangeText={(text) => setDesc(text)}
            value={desc}
          />
          {!desc && (
            <Text
              style={{
                paddingLeft: 10,
                color: COLORS.danger,
                ...FONTS.body3,
              }}
            >
              Enter a description
            </Text>
          )}
        </View>
        <Button
          onPress={handleUpdate}
          disabled={!title || !dateIsSet || !pri || !desc}
          color={title && dateIsSet && pri && desc ? COLORS.primary : "#cacfd2"}
          title="Update "
          style={styles.btn}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
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

export default Edit;
