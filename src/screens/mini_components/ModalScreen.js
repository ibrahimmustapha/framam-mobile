import { DefaultTheme } from "@react-navigation/native";
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Images from "../../images";

const ModalScreen = ({ isVisible, children, onClose, title, imageUrl }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Pressable onPress={onClose} style={{ backgroundColor: "#eee", borderRadius: 50, padding: 2}}>
            <Icon name="arrow-back" color="#000" size={26} />
          </Pressable>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Image
                source={{ url: imageUrl }}
                style={{ width: "50%", height: 250, resizeMode: "contain" }}
              />
            </View>
            <View style={styles.modalBodyContainer}>
              <View style={styles.indicatorContainer}>
                <View style={styles.indicator}></View>
              </View>
              <Text style={styles.title}>How to Recycle {title}</Text>
              {children}
            </View>
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
    backgroundColor: "#000",
    position: "absolute",
    bottom: 0,
  },
  modalBodyContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
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
    marginBottom: -50 
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
  indicatorContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
  },
});

export default ModalScreen;
