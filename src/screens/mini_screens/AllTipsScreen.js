import { useNavigation } from "@react-navigation/native";
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
import { SafeAreaView } from "react-native-safe-area-context";

const AllTipsScreen = () => {
  const [tips, setTips] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(`http://192.168.8.100:3000/api/v1/tips`, {
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 20 }}>
        <View
          style={{
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "700" }}>
            Eco-Friendly Tips
          </Text>
        </View>
        <View>
          <FlatList
            data={tips}
            renderItem={({ item }) => (
              <TouchableOpacity key={item.id} onPress={() => handleUserPress(item)}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#dee2e6",
                    paddingHorizontal: 7,
                    marginVertical: 10,
                    flexDirection: "row",
                    padding: 20,
                    borderRadius: 10,
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
                        fontWeight: "600",
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
    </SafeAreaView>
  );
};

export default AllTipsScreen;
