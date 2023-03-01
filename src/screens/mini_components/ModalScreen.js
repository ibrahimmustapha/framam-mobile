import { DefaultTheme } from "@react-navigation/native";
import { Modal, Pressable, StyleSheet, View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Images from "../../images";

const ModalScreen = ({ isVisible, children, onClose }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Pressable onPress={onClose}>
            <Icon name="arrow-back" color="#000" size={30} />
          </Pressable>
        </View>
        <View>
          <View
            style={{ justifyContent: "center", alignItems: "center", marginVertical: 0 }}
          >
            <Image source={Images.modalrec} style={{ width: "90%", height: 300, resizeMode: "contain"}}/>
          </View>
          <View style={styles.modalBodyContainer}>
            <Text style={styles.title}>How to Recycle Plastic</Text>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    height: "100%",
    width: "100%",
    backgroundColor: DefaultTheme.colors.background,
    position: "absolute",
    bottom: 0,
  },
  modalBodyContainer: {
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    height: "100%",
    paddingTop: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titleContainer: {
    height: "16%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: -50,
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
});

export default ModalScreen;
