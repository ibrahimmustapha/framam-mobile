import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  // StatusBar,
} from "react-native";
import Swiper from "react-native-swiper";
import Images from "../images";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-gesture-handler";

export default function WalkthroughScreen({ navigation }) {
  const walkthroughData = [
    {
      id: 1,
      title: "Let Us All Come Together.",
      details:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
      image: Images.clean1,
    },
    {
      id: 2,
      title: "As One People, As a Nation.",
      details:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
      image: Images.clean2,
    },
    {
      id: 3,
      title: "And Help Keep Our Environment Safe.",
      image: Images.clean3,
      details:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
    },
  ];

  return (
    <ScrollView style={{ flex: 1 }}>
      <StatusBar backgroundColor="blue" translucent={true} style="light" />
      <Swiper
        paginationStyle={{
          marginTop: 0,
        }}
        activeDotColor="#0B60B0"
        activeDotStyle={{ width: 20, height: 8 }}
      >
        {walkthroughData.map((data) => {
          return (
            <View key={data.id} style={styles.walkthroughListStyle}>
              <ImageBackground
                source={data.image}
                style={styles.walkthroughImage}
              />
              <Text style={styles.titleStyle}>{data.title}</Text>
              <Text style={styles.detailStyle}>{data.details}</Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: 40,
                }}
              >
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text
                    style={{ fontWeight: "700", fontSize: 17, color: "white" }}
                  >
                    Get Started
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                  <Text style={{ fontWeight: "500", fontSize: 17 }}>
                    Don't have an account?{" "}
                    <Text style={{ color: "#0B60B0" }}>Sign up</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </Swiper>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  walkthroughListStyle: {
    height: "100%",
  },
  walkthroughImage: {
    height: 450,
    overflow: "hidden",
    borderBottomRightRadius: 50
  },
  titleStyle: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 15,
    paddingHorizontal: 10,
  },
  buttonStyle: {
    backgroundColor: "#0B60B0",
    paddingHorizontal: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    marginVertical: 17,
    borderRadius: 20,
    paddingBottom: 20,
    width: "90%",
  },
  detailStyle: {
    fontSize: 16,
    paddingHorizontal: 20,
    marginVertical: 10,
    textAlign: "center",
    color: "grey",
    lineHeight: 25,
    fontWeight: "400",
  },
});
