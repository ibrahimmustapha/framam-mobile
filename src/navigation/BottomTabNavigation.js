import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CommunityScreen from "../screens/CommunityScreen";
import DirectionScreen from "../screens/DirectionScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import MessageScreen from "../screens/MessageScreen";
import { Text } from "react-native";

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const getImageUrl = async () => {
      await AsyncStorage.getItem("url").then((value) => {
        console.log(value);
        setUrl(value);
      });
    };
    getImageUrl();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: { backgroundColor: "#fff" },
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name="home-outline" color={focused ? "#BF4F51" : "grey"} size={30} />
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{color: focused ? '#BF4F51' : color}}>Home</Text>
          ),
          tabBarLabelStyle: { fontSize: 13, color: "grey" },
        }}
      />
      <Tab.Screen
        name="Directions"
        component={DirectionScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="compass-outline"
              color={focused ? "#BF4F51" : "grey"}
              size={30}
            />
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{color: focused ? '#BF4F51' : color}}>Directions</Text>
          ),
          tabBarLabelStyle: { fontSize: 13, color: "grey" },
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessageScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              color={focused ? "#BF4F51" : "grey"}
              size={26}
            />
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{color: focused ? '#BF4F51' : color}}>Chats</Text>
          ),
          tabBarLabelStyle: { fontSize: 13, color: "grey" },
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="people-outline"
              color={focused ? "#BF4F51" : "grey"}
              size={33}
            />
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{color: focused ? '#BF4F51' : color}}>Community</Text>
          ),
          tabBarLabelStyle: { fontSize: 13, color: "grey" },
        }}
      />
      <Tab.Screen
        name="Account"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="person-outline"
              color={focused ? "#BF4F51" : "grey"}
              size={28}
            />
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{color: focused ? '#BF4F51' : color}}>Me</Text>
          ),
          tabBarLabelStyle: { fontSize: 13, color: "grey" },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
