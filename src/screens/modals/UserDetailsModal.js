import { DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const UserDetailsModal = ({ isVisible, children, onClose }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <StatusBar translucent backgroundColor="#000" style="light" />
        <View style={styles.titleContainer}>
          <Pressable
            onPress={onClose}
            style={{ backgroundColor: "#161a1d", borderRadius: 50, padding: 3 }}
          >
            <Icon name="arrow-back" color="#fff" size={26} />
          </Pressable>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={styles.modalBodyContainer}>{children}</View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
  },
  modalBodyContainer: {
    backgroundColor: "#fff",
    height: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginBottom: 20,
  },
  titleContainer: {
    height: "16%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: -30,
    backgroundColor: "#2b2d42"
  },
  title: {
    color: "#000",
    fontSize: 30,
    fontWeight: "700",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  indicator: {
    width: 150,
    padding: 3,
    backgroundColor: "lightgrey",
    borderRadius: 10,
  },
});

export default UserDetailsModal;
