import { BlurView } from "expo-blur";
import { Modal, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const RewardModal = ({ isVisible, onClose, children }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <BlurView
        intensity={15} tint="dark"
        style={[styles.nonBlurredContent, { height: "100%" }]}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <View style={styles.iconStyle}>
                <Text style={{ fontSize: 18, fontWeight: "600" }}>
                  🎉Redeem Reward
                </Text>
                <TouchableOpacity onPress={onClose}>
                  <Icon name="close" color="#000" size={28} />
                </TouchableOpacity>
              </View>
              {children}
            </View>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    width: "75%",
    borderRadius: 10,
  },
  iconStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default RewardModal;
