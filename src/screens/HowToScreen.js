import { StatusBar } from "expo-status-bar";
import { View,Text, SafeAreaView } from "react-native";

const HowToScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor='transparent' />
      <View style={{ justifyContent: "center", alignItems: "center"}}>
        <Text>Learn more coming soon!</Text>
      </View>
    </SafeAreaView>
  );
};

export default HowToScreen;
