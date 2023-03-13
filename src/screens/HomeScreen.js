import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Divider, FAB } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import RewardModal from "./mini_components/RewardModal";
import TipScreen from "./mini_components/TipScreen";
import WasteCatergories from "./mini_components/WasteCategories";

const HomeScreen = () => {
  const [user, setUser] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [token, setToken] = useState("");
  const [congrats, setCongrats] = useState("");
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const setImageUrl = async (url) => {
    try {
      await AsyncStorage.setItem("url", url);
      console.log("Data saved successfully - idToken");
    } catch (error) {
      console.log("Error saving data:", error);
    }
  };

  const redeemPoints = async () => {
    await AsyncStorage.getItem("userId").then((uid) => {
      axios
        .put(`http://192.168.8.100:3000/api/v1/get_reward/${uid}/${token}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          console.log(response.data);
          setCongrats(response.data);
        })
        .catch((error) => {
          setError(error.response.data);
          console.log(error);
        });
    });
  };

  const getUser = () => {
    AsyncStorage.getItem("userId").then((uid) => {
      axios
        .get(`http://192.168.8.100:3000/api/v1/user/${uid}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          setImageUrl(res.data.image?.url);
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  useEffect(() => getUser(), []);

  const onModalClose = () => {
    setIsModalVisible(false);
    setCongrats("");
    setError("");
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const refreshData = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getUser();
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingVertical: 30 }}>
      <RewardModal onClose={onModalClose} isVisible={isModalVisible}>
        <View
          style={{ marginVertical: 10 }}
        >
          <TextInput
            placeholder="Enter token"
            onChangeText={(text) => setToken(text)}
            style={{
              padding: 10,
              backgroundColor: "#F2F3F4",
              padding: 13,
              fontSize: 16,
              marginBottom: 10,
            }}
            placeholderTextColor="grey"
          />
          <TouchableOpacity
            style={{ backgroundColor: "#BF4F51", padding: 13 }}
            onPress={redeemPoints}
          >
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
                fontWeight: "600",
                color: "#fff",
              }}
            >
              Redeem
            </Text>
          </TouchableOpacity>
          {congrats === "Hurray! You have gained 100 points!" ? (
            <Text
              style={{ fontSize: 17, fontWeight: "600", marginVertical: 10 }}
            >
              🎉Congratulations on +10
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                marginVertical: 10,
                textAlign: "center",
              }}
            >
              {error}
            </Text>
          )}
        </View>
      </RewardModal>
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
          }
        >
          <View style={{ marginHorizontal: 20 }}>
            <View
              style={{
                width: "100%",
                padding: 45,
                flexDirection: "row",
                backgroundColor: "#446A46",
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View>
                <Icon
                  name="cash-100"
                  size={30}
                  color={"#C0FF00"}
                  style={{ textAlign: "center" }}
                />
                <Text
                  style={{
                    fontSize: 33,
                    fontWeight: "600",
                    color: "white",
                    textAlign: "center",
                    marginVertical: 10,
                  }}
                >
                  330
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: "700",
                    color: "#C0FF00",
                  }}
                >
                  EARNED
                </Text>
              </View>
              <Divider
                orientation="vertical"
                width={2}
                style={{ marginHorizontal: 20 }}
                color={"white"}
              />
              <View>
                <Icon
                  name="trophy"
                  size={30}
                  color={"#C0FF00"}
                  style={{ textAlign: "center" }}
                />
                <Text
                  style={{
                    fontSize: 33,
                    fontWeight: "600",
                    color: "white",
                    marginVertical: 10,
                    textAlign: "center",
                  }}
                >
                  {user.points}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: "700",
                    color: "#C0FF00",
                    textAlign: "center",
                  }}
                >
                  POINTS
                </Text>
              </View>
              <Divider
                orientation="vertical"
                width={2}
                style={{ marginHorizontal: 20 }}
                color={"white"}
              />
              <View>
                <Icon
                  name="recycle"
                  size={30}
                  color={"#C0FF00"}
                  style={{ textAlign: "center" }}
                />
                <Text
                  style={{
                    fontSize: 33,
                    fontWeight: "600",
                    color: "white",
                    textAlign: "center",
                    marginVertical: 10,
                  }}
                >
                  {user.recycles}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: "700",
                    color: "#C0FF00",
                  }}
                >
                  RECYCLED
                </Text>
              </View>
            </View>
          </View>
          <WasteCatergories />
          <TipScreen />
        </ScrollView>
      </View>
      <FAB
        size={"large"}
        placement="right"
        style={{ marginBottom: 20, marginRight: 20 }}
        color="#446A46"
        onPress={() => openModal()}
        icon={<Icon name="plus" color="#fff" size={25} />}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
