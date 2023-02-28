import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const RewardScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1}}>
      <Text style={{ marginHorizontal: 20, fontSize: 40, fontWeight: "800" }}>
        Directions
      </Text>
      <View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            marginVertical: 10,
            marginBottom: 30,
          }}
        >
          <View
            style={{
              marginRight: 7,
              backgroundColor: "#E5E4E2",
              borderRadius: 5,
              width: "72%",
            }}
          >
            <TextInput
              placeholder={"Type Here..."}
              style={{ padding: 15, fontSize: 15, marginRight: 20 }}
            />
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#B3446C",
              padding: 15,
              borderRadius: 5,
            }}
          >
            <Text style={{ fontWeight: "700", color: "white", fontSize: 16 }}>
              Redeem
            </Text>
          </TouchableOpacity>
        </View>
        <MapView
          style={{ width: "100%", height: "100%", borderRadius: 20 }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          minZoomLevel={13}
          region={{ latitude: 5.559642, longitude: -0.195583 }}
        ></MapView>
      </View>
    </SafeAreaView>
  );
};

export default RewardScreen;
