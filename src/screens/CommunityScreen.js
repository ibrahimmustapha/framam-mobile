import { DefaultTheme } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import ContentLoader from "react-native-easy-content-loader";
import { Divider } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";

const CommunityScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://192.168.8.100:3000/api/v1/users", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      });
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text
        style={{
          fontSize: 40,
          fontWeight: "800",
          marginTop: 55,
          marginBottom: 0,
          marginHorizontal: 20,
        }}
      >
        Community
      </Text>
      <View
        style={{
          marginHorizontal: 20,
          backgroundColor: "#E5E4E2",
          borderRadius: 5,
          marginVertical: 10,
        }}
      >
        <TextInput
          placeholder={"Type Here..."}
          style={{ padding: 15, fontSize: 15 }}
        />
      </View>
      {loading ? (
        <View>
          <ContentLoader
            active
            avatar
            pRows={2}
            pWidth={["80%", "75%", 45]}
            listSize={9}
            animationDuration="2000ms"
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Divider
            orientation="horizontal"
            style={{ marginBottom: 20, marginTop: 10 }}
          />
          {users.map((user) => (
            <View key={user.uid}>
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 20,
                }}
              >
                <Image
                  source={{ uri: user.image?.url }}
                  style={{ width: 60, height: 60, borderRadius: 100 }}
                />
                <View style={{ paddingTop: 4, paddingLeft: 10 }}>
                  <Text style={{ fontWeight: "700", fontSize: 16 }}>
                    {user.fullname?.firstname} {user.fullname?.lastname}{" "}
                  </Text>
                  <Text style={{ fontSize: 15, paddingVertical: 3 }}>
                    {" "}
                    {user.bio?.address}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Icon name="stars" size={15} color={"grey"} />
                    <Text> {user.points}</Text>
                  </View>
                </View>
              </View>
              <Divider
                orientation="horizontal"
                style={{ marginVertical: 10, marginLeft: 90 }}
              />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default CommunityScreen;
