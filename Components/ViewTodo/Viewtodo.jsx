import React, { useEffect, useState } from "react";
import { icons, COLORS, FONTS } from "../../consts";
import {
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
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
  TextInput,
  Alert
} from "react-native";
import { Header, Icon } from "react-native-elements";
import Todo from "../../FireFuction";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("screen").width;
const option = [
  { label: "High", value: "High", icon: "local-fire-department" },
  { label: "Medium", value: "Medium", icon: "waterfall-chart" },
  { label: "Low", value: "Low", icon: "ac-unit" }
];
//
//
const Viewtodo = (props) => {
  const { navigation } = props;
  const { data } = props.route.params;
  // console.log("data.time----->", data);
  const [visibility, setVisibity] = useState(false);

  const [_color, setColor] = useState();
  const [_title, seTitle] = useState();
  const [_desc, setDesc] = useState();
  const [isDone, setIsDone] = useState();
  const [_pri, setPri] = useState();
  const [_myDate, setMydate] = useState();
  const [isDscEdit, setIsDscEdit] = useState(false);
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [isPriEdit, setIsPriEdit] = useState(false);
  const [icon,setIcon]=useState()
  const[oldData,setOldData]=useState()


  const editPri=(pri)=>{
    setPri(pri.value)
    setIsPriEdit(true)
  }
  const getColor = (opt) => {
    if (opt === "High") {
      // setIcon('local-fire-department')
      return COLORS.red;
    } else if (opt === "Medium") {
      // setIcon('waterfall-chart')
      return COLORS.orange;
    } else if (opt === "Low") {
      // setIcon('ac-unit')r
      return COLORS.green;
    }
  };
  
 const getIcon= (opt) => {
    if (opt === "High") {
      setIcon('local-fire-department')
    } else if (opt === "Medium") {
      setIcon('waterfall-chart')
    } else if (opt === "Low") {
      setIcon('ac-unit')
    }
  };
  
  const getUserTodos = async () => {
    const userid = await AsyncStorage.getItem("todouser");
    const key = data.key;
    Todo.getDataById(userid, key).on("value", (snapshot) => {
      // console.log(snapshot.val(), "<<<from fire");
      setOldData(snapshot.val())
      seTitle(snapshot.val().title);
      setDesc(snapshot.val().desc);
      setIsDone(snapshot.val().isDone);
      setPri(snapshot.val().priority);
      setMydate(snapshot.val().date);
      const c = getColor(snapshot.val().priority);
      getIcon(snapshot.val().priority)
      setColor(c);
    });
  };

  useEffect(() => {
    getUserTodos();
  }, []);

  const updateDone = async () => {
    // setIsDone(true)
    const _data = {
      priority: _pri,
      title: _title,
      desc: _desc,
      date: _myDate,
      isDone: true
    };
    const u = await AsyncStorage.getItem("todouser");
    console.log(_data);
    Todo.updateTodo(data.key, u, {
      priority: _pri,
      title: _title,
      desc: _desc,
      date: _myDate,
      isDone: true
    })
      .then(() => {
        setIsDone(true);
      })
      .catch((err) => console.log("Update Done Error", err));
  };

  const LeftComp = () => (
    <View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row"
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
            tintColor: COLORS.green
          }}
        />
      )}
    </View>
  );
  const Edit = () => (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Edit", { key: key })}
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          backgroundColor: COLORS.secondary,
          padding: 7,
          borderRadius: 10
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

  const backPress=()=>{
    if(isDscEdit||isTitleEdit||isPriEdit){

      Alert.alert("Update", "Discard new changes?", [
        {
          text: "Yes",
          style: "cancel",
          onPress: () => navigation.goBack()
        },
        {
          text: "No",
          style: "ok",
          onPress: () => {console.log('no')}
        }
      ]);
    }else{

      navigation.goBack()
    }

  }


  const cancelEditing=()=>{
    setIsDscEdit(false)
    setIsTitleEdit(false)
    setIsPriEdit(false)
    seTitle(oldData.title);
    setDesc(oldData.desc);
    setIsDone(oldData.isDone);
    setPri(oldData.priority);
    setMydate(oldData.date);
    const c = getColor(oldData.priority);
    getIcon(oldData.priority)
    setColor(c);
  }
  const updateHandler=async()=>{
    const _data = {
      priority: _pri,
      title: _title,
      desc: _desc,
      date: _myDate,
      isDone: isDone
    };
    const u = await AsyncStorage.getItem("todouser");
    console.log(_data);
    Todo.updateTodo(data.key, u, _data)
      .then(() => {
        setIsDscEdit(false)
        setIsTitleEdit(false)
        setIsPriEdit(false)
        getUserTodos();
        Alert.alert("Success", "update compelte", [
          {
            text: "OK",
            style: "OK",
            onPress: () => console.log("ok")
          }
        ]);
      })
      .catch((err) => console.log("Update Done Error", err));
  }
  const UpdateandCancelBtn=()=>(
    <View style={{flexDirection:'row',alignItems:'center'}}>
        <Button title="Cancel" color="red" onPress={()=>cancelEditing()}/>
        <View style={{marginLeft:5}}></View>
        <Button title="Update" onPress={()=>updateHandler()}/>
    </View>
  )


  return (
    <Provider>
    <SafeAreaView style={styles.safeareaview}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          marginHorizontal: 10,
          marginTop: 20,
          alignItems: "center",
          marginBottom: 20,
          marginTop: 50
        }}
      >
        <TouchableOpacity onPress={() => backPress()}>
          <Icon name="keyboard-backspace" type="material" />
        </TouchableOpacity>
        <Text style={{ ...FONTS.h4, fontWeight: "bold", marginHorizontal: 10 }}>
          View Todo
        </Text>
      </View>
      <ScrollView>
        <View style={styles.titlecontainer}>
          <TouchableOpacity
          disabled={isDone}
          activeOpacity={0.7}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              borderWidth: 3,
              borderColor: _color,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setVisibity(true)}
            >
              <Icon name={icon} type="material" size={20} color={_color}/>

            </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderColor: (!isTitleEdit||isDone) ? "transparent" : "rgba(0,0,0,.2)",
              borderWidth: 1,
              height: 50,
              borderRadius: 15,
              paddingHorizontal: 5,
              marginLeft: 10,
              flex: 1
            }}
            onPress={() => setIsTitleEdit(true)}
            disabled={isTitleEdit}
          >
            {(isTitleEdit&&!isDone) ? (
              <>
                <TextInput
                  style={{
                    height: 60,
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: COLORS.darkgray,
                    padding: 10,
                    ...FONTS.h3,
                    lineHeight: 23,
                    flex: 1,
                    borderRadius: 15,
                    fontWeight: "bold",
                    color: "black"
                  }}
                  value={_title}
                  onChangeText={(text) => seTitle(text)}
                />
              </>
            ) : (
              <>
                <Text
                  style={{
                    ...FONTS.h3,
                    fontWeight: "bold",
                    color: "black",
                    marginLeft: 5
                  }}
                  numberOfLines={1}
                >
                  {_title}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            flexDirection: "row",
            // alignItems: "center",           backgroundColor:'red',

            borderColor: (!isDscEdit||isDone) ? "transparent" : "rgba(0,0,0,.2)",
            borderWidth: 1,
            Minheight: 100,
            borderRadius: 15,
            paddingHorizontal: 5,
            marginVertical: 10
            // backgroundColor:'red',
          }}
          onPress={() => setIsDscEdit(true)}
          disabled={isDscEdit||isDone}
        >
          {(isDscEdit&&!isDone) ? (
            <>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 40,
                  height: 40,
                  borderRadius: 10
                }}
              >
                <Icon name="history-edu" type="material" />
              </View>
              <TextInput
                // editable={isDscEdit}
                value={_desc}
                style={{
                  margin: 10,
                  borderColor: COLORS.darkgray,
                  flex: 1,
                  textAlign: "auto",
                  ...FONTS.h4,
                  color: "black"
                }}
                multiline={true}
                numberOfLines={5}
                textAlignVertical={"top"}
                onChangeText={(text) => setDesc(text)}
              />
            </>
          ) : (
            <>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 40,
                  height: 40,
                  borderRadius: 10
                }}
              >
                <Icon name="history-edu" type="material" />
              </View>
              <Text
                style={{ ...FONTS.h4, margin: 10, flex: 1, color: "black" }}
              >
                {_desc}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          padding: 10,
          position: "absolute",
          bottom: 0,
          // backgroundColor: "red",
          width: width,
          borderTopWidth: 1,
          borderColor: COLORS.darkgray
        }}
      >
        {/* <Edit /> */}
        {
          (isDscEdit||isTitleEdit||isPriEdit)?(<UpdateandCancelBtn/>):( <DoneBtn />)
        }
       
      </View>
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
              onPress={() => editPri(priority)}
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
    padding: 10
    // marginTop: StatusBar.currentHeight,
  },
  titlecontainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3
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

export default Viewtodo;
