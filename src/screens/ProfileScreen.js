import AsyncStorage from "@react-native-async-storage/async-storage";
import { DefaultTheme } from "@react-navigation/native";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { InstagramLoader } from "react-native-easy-content-loader";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";

const ProfileScreen = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

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
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);

  const removeToken = async () => {
    const idToken = await AsyncStorage.removeItem("idToken");
    if (!idToken) {
      console.log("idToken removed successfully: " + idToken);
    } else {
      console.log("idToken not found or removed");
    }
  };

  const Logout = async () => {
    await axios
      .get(`http://192.168.8.100:3000/api/v1/logout`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        console.log(res.data);
        removeToken();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#3B3C36", flex: 1 }}>
      <ScrollView
        style={{
          backgroundColor: DefaultTheme.colors.background,
          height: "100%",
        }}
      >
        {loading ? (
          <View style={{ marginTop: 80 }}>
            <InstagramLoader active avatar />
          </View>
        ) : (
          <View>
            <View
              style={{ backgroundColor: "#3B3C36", width: "100%", height: 150 }}
            ></View>
            <View
              style={{
                flex: 1,
                paddingHorizontal: 20,
                marginBottom: 20,
                marginVertical: -40,
              }}
            >
              <Image
                source={{ uri: user.image?.url }}
                style={{ width: 120, height: 120, borderRadius: 10 }}
              />
              <Text
                style={{ fontWeight: "800", fontSize: 38, marginVertical: 5 }} numberOfLines={1}
              >
                {user.fullname?.firstname} {user.fullname?.lastname}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Icon name="mail" size={20} color="grey" />
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 10,
                    fontWeight: "400",
                    color: "grey",
                    marginHorizontal: 5,
                  }}
                >
                  {user.email}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Icon name="work" size={20} color="grey" />
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 10,
                    fontWeight: "400",
                    color: "grey",
                    marginHorizontal: 5,
                  }}
                >
                  {user.bio?.job}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Icon name="event" size={20} color="grey" />
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 10,
                    fontWeight: "400",
                    color: "grey",
                    marginHorizontal: 5,
                  }}
                >
                  {user.bio?.age} years
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Icon name="stars" size={20} color="grey" />
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 10,
                    fontWeight: "400",
                    color: "grey",
                    marginHorizontal: 5,
                  }}
                >
                  {user.points} points
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Icon name="location-on" size={20} color="grey" />
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 10,
                    fontWeight: "400",
                    color: "grey",
                    marginHorizontal: 5,
                  }}
                >
                  {user.bio?.address}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Icon name="notes" size={20} color="grey" />
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 20,
                    fontWeight: "400",
                    color: "grey",
                    marginHorizontal: 5,
                  }}
                >
                  {user.bio?.about}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#B3446C",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 15,
                }}
                onPress={Logout}
              >
                <Text
                  style={{ fontSize: 18, color: "white", fontWeight: "500" }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
