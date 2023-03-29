import AsyncStorage from "@react-native-async-storage/async-storage";
import { DefaultTheme } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useCallback, useContext } from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  NativeModules,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { InstagramLoader } from "react-native-easy-content-loader";
import { ScrollView } from "react-native-gesture-handler";
import { AuthenticatedUserContext } from "../../App";
import ImageTextContainer from "../ui/ImageTextContainer";

const ProfileScreen = () => {
  const [user, setUserr] = useState({});
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { setUser } = useContext(AuthenticatedUserContext);

  const getUser = async () => {
    await AsyncStorage.getItem("userId").then((uid) => {
      axios
        .get(`http://192.168.8.100:3000/api/v1/user/${uid}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          setUserr(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const removeToken = async () => {
    const idToken = await AsyncStorage.clear();
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
        setIsLoading(true);
        console.log(res.data);
        removeToken();
        setTimeout(() => setUser(null), 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const refreshData = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getUser();
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
        }
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
              style={{ backgroundColor: "#3a5a40", width: "100%", height: 200 }}
            ></View>
            <View
              style={{
                flex: 1,
                paddingHorizontal: 20,
                marginBottom: 20,
                marginVertical: -40,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  source={{ uri: user.image?.url }}
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 15,
                    borderWidth: 5,
                    borderColor: DefaultTheme.colors.background,
                  }}
                />
                <TouchableOpacity style={{ paddingTop: 50 }}>
                  <View
                    style={{
                      padding: 8,
                      borderRadius: 7,
                      backgroundColor: "#161a1d",
                      borderWidth: 2,
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "500", color: "#fff" }}>
                      Edit Profile
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Text
                selectable={true}
                style={{ fontWeight: "800", fontSize: 38, marginVertical: 5 }}
                numberOfLines={1}
              >
                {user.fullname?.firstname} {user.fullname?.lastname}
              </Text>
              <ImageTextContainer data={user.email} icon={"mail"} />
              <ImageTextContainer data={user.bio?.job} icon={"work"} />
              <ImageTextContainer
                data={`${user.dob?.day} / ${user.dob?.month} / ${user.dob?.year}`}
                icon={"cake"}
              />
              <ImageTextContainer data={`${user.points} points`} icon={"stars"} />
              <ImageTextContainer
                data={user.bio?.address}
                icon={"location-on"}
              />
              <ImageTextContainer data={user.phonenumber} icon={"phone"} />
              <ImageTextContainer data={user.bio?.about} icon={"notes"} />
              <TouchableOpacity
                style={{
                  backgroundColor: "#B3446C",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 15,
                  borderRadius: 15,
                  marginTop: 15
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
        {isLoading && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#BF4F51" />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
