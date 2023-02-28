import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState, useEffect } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TipScreen from "./mini_components/TipScreen";
import WasteCatergories from "./mini_components/WasteCategories";

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    AsyncStorage.getItem("userId").then((uid) => {
      axios
        .get(`http://192.168.8.100:3000/api/v1/user/${uid}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingVertical: 30 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{}}>
          <View
            style={{
              paddingVertical: 16,
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "500", paddingTop: 7 }}>
              Hello, {user.fullname?.firstname}
            </Text>
            <Image
              source={{
                uri: user.image?.url,
              }}
              style={{ width: 35, height: 35, borderRadius: 100 }}
            />
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <View
              style={{
                width: "100%",
                padding: 45,
                flexDirection: "row",
                backgroundColor: "#588157",
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View>
                <Icon name="cash-100" size={30} color={"#C0FF00"} style={{textAlign: "center"}}/>
              <Text style={{ fontSize: 33, fontWeight: "600", color: "white", textAlign: "center", marginVertical: 10 }}>
                330
              </Text>
              <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "700", color: "#C0FF00"}}>EARNED</Text>
              </View>
              <Divider
                orientation="vertical"
                width={2}
                style={{ marginHorizontal: 20 }}
                color={"white"}
              />
              <View>
              <Icon name="trophy" size={30} color={"#C0FF00"} style={{textAlign: "center"}}/>
              <Text style={{ fontSize: 33, fontWeight: "600", color: "white", marginVertical: 10 }}>
              {user.points}
              </Text>
              <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "700", color: "#C0FF00"}}>POINTS</Text>
              </View>
              <Divider
                orientation="vertical"
                width={2}
                style={{ marginHorizontal: 20 }}
                color={"white"}
              />
              <View>
              <Icon name="recycle" size={30} color={"#C0FF00"} style={{textAlign: "center"}}/>
              <Text style={{ fontSize: 33, fontWeight: "600", color: "white", textAlign: "center", marginVertical: 10 }}>
                17
              </Text>
              <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "700", color: "#C0FF00"}}>RECYCLED</Text>
              </View>
            </View>
          </View>
          <WasteCatergories />
          <TipScreen />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
