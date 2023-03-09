import { DefaultTheme } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, View, SafeAreaView } from "react-native";
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
    <SafeAreaView>
      <View style={{ paddingVertical: 20 }}>
      <Text
        style={{
          fontSize: 40,
          fontWeight: "800",
          marginTop: 0,
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
          style={{ padding: 10, fontSize: 15 }}
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
        <ScrollView showsVerticalScrollIndicator={false}>
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
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                />
                <View style={{ paddingTop: 4, paddingLeft: 10 }}>
                  <Text style={{ fontWeight: "700", fontSize: 18, paddingLeft: 3 }}>
                    {user.fullname?.firstname} {user.fullname?.lastname}{" "}
                  </Text>
                  <Text style={{ fontSize: 15, paddingVertical: 3, color: "grey" }}>
                    {" "}
                    {user.bio?.address}
                  </Text>
                  <View style={{ flexDirection: "row", paddingLeft: 3 }}>
                    <Icon name="stars" size={16} color={"grey"} />
                    <Text style={{color: "grey", fontSize: 15}}> {user.points}</Text>
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
        </ScrollView>
      )}
      </View>
      </SafeAreaView>
  );
};

export default CommunityScreen;
