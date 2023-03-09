import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import Swiper from "react-native-swiper";
import Images from "../images";

export default function WalkthroughScreen({ navigation }) {
  const walkthroughData = [
    {
      id: 1,
      title: "Recycling just got super exciting",
      details:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
      image: Images.image1,
    },
    {
      id: 2,
      title: "Redeem Points from Recycling ", 
      details:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
      image: Images.image2,
    },
    {
      id: 3,
      title: "Make some cash while recycling materials",
      image: Images.image3,
      details:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Swiper
        paginationStyle={{
          marginTop: 0
        }}
        activeDotColor="#fc7be0"
        activeDotStyle={{ width: 20, height: 8 }}
      >
        {walkthroughData.map((data) => {
          return (
            <View key={data.id} style={styles.walkthroughListStyle}>
              <Image source={data.image} style={styles.walkthroughImage} />
              <Text style={styles.titleStyle}>{data.title}</Text>
              <Text style={styles.detailStyle}>{data.details}</Text>
            </View>
          );
        })}
      </Swiper>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 40,
        }}
      >
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() =>
            navigation.navigate("Login")
          }
        >
          <Text style={{ fontWeight: "700", fontSize: 17, color: "white" }}>
            Get Started
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ fontWeight: "500", fontSize: 17 }}>
            Don't have an account? <Text style={{ color: "purple" }}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  walkthroughListStyle: {
    height: "100%",
  },
  walkthroughImage: {
    width: "95%",
    height: "70%",
    resizeMode: "contain",
    marginHorizontal: 15,
    marginBottom: -20,
  },
  titleStyle: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  buttonStyle: {
    backgroundColor: "#BF4F51",
    paddingHorizontal: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 20,
    borderRadius: 20,
    paddingBottom: 20,
    width: "90%",
    marginTop: -10
  },
  detailStyle: {
    fontSize: 16,
    paddingVertical: 13,
    paddingHorizontal: 20,
    textAlign: "center",
    color: "grey",
    lineHeight: 25,
    fontWeight: "400",
  },
});
