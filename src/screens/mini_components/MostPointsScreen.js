import { DefaultTheme } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const MostPointsScreen = () => {
  const [user, setUser] = useState({});

  // get user with most points
  useEffect(() => {
    axios
      .get("http://192.168.8.100:3000/api/v1/most-points", {
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
  }, []);

  return (
    <View style={{ marginHorizontal: 20, marginTop: 15 }}>
      <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 3}}>
        Top recycler of the week
      </Text>
      <View
        style={{
          flex: 1,
          backgroundColor: "#588157",
          paddingHorizontal: 15,
          marginVertical: 10,
          flexDirection: "row",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              borderWidth: 1.5,
              borderColor: "#fff",
              borderRadius: 100,
              width: 26,
              height: 26,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 20,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 17 }}>1</Text>
          </View>
        </View>
        <Image
          source={{
            uri: user.image?.url,
          }}
          style={{ width: 60, height: 60, borderRadius: 30, marginRight: 15 }}
        />
        <View style={{ paddingVertical: 8, paddingLeft: 8, width: "50%" }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              color: "#fff",
              paddingBottom: 7,
            }}
            numberOfLines={1}
          >
            {user.fullname?.firstname} {user.fullname?.lastname}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Icon name="star-circle" size={16} color={"yellow"} />
            <Text style={{ color: "#fff", fontSize: 15, paddingLeft: 3, marginTop: Platform.OS === "android" ? -3 : 0 }}>
              {user.points} points
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#ee9b00",
            width: 33,
            height: 33,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 40,
            marginTop: -37,
            marginLeft: 0,
            borderWidth: 2,
            borderColor: DefaultTheme.colors.background,
          }}
        >
          <Icon name="crown" size={26} color={"#fff"} />
        </View>
      </View>
    </View>
  );
};

export default MostPointsScreen;
