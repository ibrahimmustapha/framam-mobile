import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const EditUserScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.editContainerStyle}>
        <TouchableOpacity
          style={styles.backStyle}
          onPress={() => navigation.goBack()}
        >
          <Icon name={"arrow-back-ios"} size={22} color={"#3a86ff"} />
        </TouchableOpacity>
        <Text style={styles.editStyle}>Edit Profile</Text>
        <TouchableOpacity>
          <Text style={styles.saveStyle}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  editContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  backStyle: {
    flexDirection: "row",
  },
  editStyle: {
    fontSize: 18,
    fontWeight: "600",
  },
  saveStyle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3a86ff",
  },
});

export default EditUserScreen;
