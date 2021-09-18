import React from "react";
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
  Dimensions
} from "react-native";
import { Header } from "react-native-elements";
const width=Dimensions.get('screen').width

const Viewtodo = ({ navigation, route }) => {





  const LeftComp = () => (
    <View>
      <TouchableOpacity
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
  const Done = () => (
    <View>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          backgroundColor: "rgba(0,150,0,.8)",
          padding: 5,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h4,
            fontWeight: "bold",
            marginRight: 5,
          }}
        >
          Completed
        </Text>
        <Image
          source={icons.done}
          resizeMode="contain"
          style={{ width: 20, height: 20,tintColor:COLORS.white }}
        />
      </TouchableOpacity>
    </View>
  );
  const Edit = () => (
    <View>
      <TouchableOpacity
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
        <View style={styles.circle} />
        <Text style={{ ...FONTS.h3, fontWeight: "bold",color:COLORS.darkgray ,marginLeft:5}}>Task name</Text>
      </View>
      <View style={{ padding: 10,marginTop:20,color:COLORS.black }}>
        <Text style={{ ...FONTS.body3 }}>
         Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam vero voluptatibus consequuntur perspiciatis consectetur accusantium reiciendis nam ducimus, maxime ipsum saepe? Dolorum, itaque voluptatibus iure et labore voluptates molestiae tempore necessitatibus aperiam ipsa autem repellendus. Sunt ad quos quia rem nulla, illo aut! Veniam, eius labore. Exercitationem et nostrum doloremque voluptatibus provident distinctio, veniam hic delectus facere culpa quaerat nemo saepe voluptate nihil suscipit impedit, fugit laudantium a. Voluptate ducimus aperiam neque. Sequi, aliquid illum amet accusamus consequuntur praesentium alias, eligendi asperiores ipsum ipsam fugit harum ex, et odio numquam sit expedita recusandae vel rem optio possimus officiis repellat! Officia, modi, mollitia nulla perspiciatis culpa, asperiores architecto dignissimos obcaecati eum maxime assumenda fugit consequatur! At, rem asperiores! Minus, neque nisi et repellendus impedit dolore labore officia? Beatae vel, repudiandae quas ratione obcaecati, aliquam, nobis ipsum vero officiis laboriosam repellendus! Voluptatem iste autem placeat beatae, maxime sed pariatur deleniti maiores ipsa? Deserunt iure excepturi commodi recusandae aperiam, voluptas quibusdam veritatis dolores numquam. Aut quidem dicta sequi animi velit ratione illo amet laborum inventore. At quia beatae quod sequi explicabo suscipit modi itaque eaque, vel odit nemo officia, iure ratione commodi ullam maiores atque laboriosam maxime totam adipisci repellendus libero ea. Nemo error suscipit similique cum dolore, expedita minus in ullam sed minima illum eum possimus. Veritatis non ipsum, deleniti excepturi ratione incidunt similique velit quos sit atque ea quia saepe laboriosam cum nulla vitae recusandae commodi soluta corrupti suscipit ullam itaque rem quam aliquid? Dolorem nemo sint repellendus eveniet laboriosam fuga dignissimos labore sunt provident, numquam enim similique rerum sed, saepe tempora magnam ad ipsum perspiciatis beatae recusandae dolor eaque commodi error possimus! Culpa rem, quis similique dignissimos ullam illo ut placeat exercitationem adipisci maiores obcaecati voluptatum accusantium sit dolor quam unde distinctio magnam mollitia deserunt ipsam quo! Et, asperiores non!
         
        </Text>
      </View>
      </ScrollView>
      <View style={{flexDirection:'row',justifyContent:'space-between',padding:10,position:'absolute',bottom:0,backgroundColor:'rgba(255,255,255,.8)',width:width,borderTopWidth:1,borderColor:COLORS.darkgray}}>
        <Edit/>
      <Done/>
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
    borderColor: COLORS.green,
  },
});

export default Viewtodo;
