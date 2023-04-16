import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";

const TipDetailScreen = ({ route }) => {
  const { user } = route.params;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View style={styles.editContainerStyle}>
          <TouchableOpacity
            style={styles.backStyle}
            onPress={() => navigation.goBack()}
          >
            <Icon name={"arrow-back-ios"} size={22} color={"#3a86ff"} />
            <Text style={styles.saveStyle}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.editStyle}>Detail</Text>
          <TouchableOpacity>
            <Text style={styles.saveStyle}>Copy</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 30,
            backgroundColor: "#dee2e6",
            borderRadius: 10,
            padding: 10,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "600",
                color: "#000",
                paddingBottom: 10
              }}
            >
              {user.title}
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={{ color: "grey", fontSize: 16 }}>
              {user.description}
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={{ color: "grey", fontSize: 16 }}>
              {user.details?.item1}
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={{ color: "grey", fontSize: 16 }}>
              {user.details?.item2}
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={{ color: "grey", fontSize: 16 }}>
              {user.details?.item3}
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={{ color: "grey", fontSize: 16 }}>
              {user.details?.item4}
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={{ color: "grey", fontSize: 16 }}>
              {user.details?.item5}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  editContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  backStyle: {
    flexDirection: "row",
  },
  editStyle: {
    fontSize: 18,
    fontWeight: "600",
    marginRight: 15,
  },
  saveStyle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3a86ff",
  },
  itemContainer: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 7,
    marginBottom: 10,
  },
});

export default TipDetailScreen;
