import { StatusBar } from "expo-status-bar";
import { View,Text, SafeAreaView } from "react-native";

const HowToScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1}}>
      <StatusBar translucent backgroundColor='transparent' />
      <View style={{ justifyContent: "center", alignItems: "center", paddingTop: 50}}>
        <Text style={{ fontSize: 15 }}>Learn more coming soon!</Text>
      </View>
    </SafeAreaView>
  );
};

export default HowToScreen;
