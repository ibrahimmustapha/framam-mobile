import { BlurView } from "expo-blur";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const RewardModal = ({ isVisible, onClose, children }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <BlurView
        intensity={15}
        tint="dark"
        style={[styles.nonBlurredContent, { height: "100%" }]}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <View style={styles.iconStyle}>
                <Text style={{ fontSize: 18, fontWeight: "700" }}>
                  🎉Add Task Here
                </Text>
                <TouchableOpacity onPress={onClose}>
                  <Icon name="close" color="#000" size={27} />
                </TouchableOpacity>
              </View>
              <ScrollView automaticallyAdjustKeyboardInsets={true}>
                {children}
                {/* <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                      paddingBottom: 5,
                    }}
                  >
                    Learn How to Redeem Points
                  </Text>
                  <View>
                    <Text style={styles.stepsTextStyle}>
                      1. Copy or type in the token into the input eg.
                      28sdkjshdy2.
                    </Text>
                    <Text style={styles.stepsTextStyle}>
                      2. Make sure the token is correct or not used (reedeemed).
                    </Text>
                    <Text style={styles.stepsTextStyle}>
                      3. Hit the Redeem button to reedeem points.
                    </Text>
                    <Text style={styles.stepsTextStyle}>
                      4. Close the modal and refresh home page for poinst to
                      reflect.
                    </Text>
                    <Text style={styles.noteTextStyle}>
                      Note: If the token have been used or incorrect, an
                      appropriate error message will be displayed.
                    </Text>
                  </View>
                </View> */}
              </ScrollView>
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
  },
  modalContent: {
    height: "57%",
    width: "100%",
    backgroundColor: "#fff",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    paddingHorizontal: 20,
    paddingVertical: 10,
    bottom: 0,
  },
  iconStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  stepsTextStyle: {
    fontSize: 16,
    paddingBottom: 7,
    fontWeight: "400"
  },
  noteTextStyle: {
    fontSize: 16,
    color: "red",
    fontWeight: "400"
  },
});

export default RewardModal;
