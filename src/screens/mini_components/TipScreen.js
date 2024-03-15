import { DefaultTheme, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TipScreen = () => {
  const [tips, setTips] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(`https://framam-server.onrender.com/api/v1/first-four-tips`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setTips(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUserPress = (user) => {
    navigation.navigate("TipDetailScreen", { user });
  };

  return (
    <View style={{ marginHorizontal: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 30,
          marginBottom: 5,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "600" }}>
          Eco-friendly tips
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("AllTipsScreen")}>
          <Text style={{ fontSize: 17, fontWeight: "500", color: "green" }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={tips}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleUserPress(item)}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#fff",
                  paddingHorizontal: 7,
                  marginVertical: 10,
                  flexDirection: "row",
                  padding: 20,
                  borderRadius: 10,
                  shadowColor: DefaultTheme.colors.background,
                  shadowOffset: { width: 3, height: 20 },
                  shadowOpacity: 0.8,
                  shadowRadius: 15,
                  elevation: 2
                }}
              >
                <Image
                  source={{
                    uri: "https://img.icons8.com/color/256/keep-clean.png",
                  }}
                  style={{ width: 50, height: 50 }}
                />
                <View
                  style={{ width: "80%", paddingVertical: 4, paddingLeft: 8 }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "500",
                      color: "#000",
                      paddingBottom: 4,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ color: "grey", fontSize: 14 }}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(tips) => tips.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default TipScreen;
