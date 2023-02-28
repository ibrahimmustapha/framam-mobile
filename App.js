import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WalkthroughScreen from "./src/screens/WalkthroughScreen";
import BottomTabNavigation from "./src/navigation/BottomTabNavigation";
import Login from "./src/authentication/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, createContext } from "react";

const Stack = createNativeStackNavigator();
const AuthContext = createContext();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("idToken").then((value) => {
      console.log("here------------> " + value);
      setIsAuthenticated(value);
      setLoading(false);
    });
  }, [isAuthenticated]);

  if (loading === true) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={"green"} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen
              name="WalkthroughScreen"
              component={WalkthroughScreen}
            />
            <Stack.Screen name="Login" component={Login} />
          </>
        ) : (
            <Stack.Screen
              name="BottomTabNavigation"
              component={BottomTabNavigation}
            />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 70,
  },
});
