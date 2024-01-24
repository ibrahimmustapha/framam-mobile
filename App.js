import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, Appearance, StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WalkthroughScreen from "./src/screens/WalkthroughScreen";
import BottomTabNavigation from "./src/navigation/BottomTabNavigation";
import Login from "./src/authentication/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, createContext, useContext } from "react";
import SignUpForm from "./src/authentication/SignupForm";
import EditUserScreen from "./src/screens/mini_screens/EditUserScreen";
import AllTipsScreen from "./src/screens/mini_screens/AllTipsScreen";
import TipDetailScreen from "./src/screens/mini_screens/TipDetailScreen";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();
export const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function AuthenticatedUserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
      />
      <Stack.Screen name="EditUserScreen" component={EditUserScreen} />
      <Stack.Screen name="AllTipsScreen" component={AllTipsScreen} />
      <Stack.Screen name="TipDetailScreen" component={TipDetailScreen} />
    </Stack.Navigator>
  );
}

function UnAuthenticatedUserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WalkthroughScreen" component={WalkthroughScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUpForm} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const userAuth = async () => {
        await AsyncStorage.getItem("idToken").then((token) => {
          console.log(token);
          setUser(token);
          setIsLoading(false);
        });
      };
      userAuth();
    } catch (e) {
      console.log("Somthing went wrong: " + e);
    }
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={"purple"} />
      </View>
    );
  }

  console.log("value of user here: " + user);

  return (
    <NavigationContainer>
      {user != null ? <AuthenticatedUserStack /> : <UnAuthenticatedUserStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
    </GestureHandlerRootView>
  );
}
