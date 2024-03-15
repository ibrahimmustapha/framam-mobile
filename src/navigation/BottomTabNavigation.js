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
import TasksScreen from "../screens/TasksScreen";
import { Text } from "react-native";
import MessageScreen from "../screens/MessageScreen";
import HelpScreen from "../screens/HelpScreen";
import TaskHomeScreen from "../screens/TaskHomeScreen";

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
        component={TaskHomeScreen}
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
        name="Help"
        component={HelpScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="help-circle-outline"
              color={focused ? "#BF4F51" : "grey"}
              size={30}
            />
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{color: focused ? '#BF4F51' : color}}>Help</Text>
          ),
          tabBarLabelStyle: { fontSize: 13, color: "grey" },
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="medkit-outline"
              color={focused ? "#BF4F51" : "grey"}
              size={26}
            />
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{color: focused ? '#BF4F51' : color}}>Tasks</Text>
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
