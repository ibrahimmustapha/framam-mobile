import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CommunityScreen from "../screens/CommunityScreen";
import DirectionScreen from "../screens/DirectionScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import MessageScreen from "../screens/MessageScreen";

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
        tabBarStyle: { backgroundColor: "white" },
        tabBarShowLabel: true,
        tabBarLabelStyle: { color: "green" },
        tabBarActiveTintColor: "yellow",
        tabBarHideOnKeyboard: true
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="home" color={focused ? "#BF4F51" : "grey"} size={33} />
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
            <Icon
              name="directions-car"
              color={focused ? "#BF4F51" : "grey"}
              size={33}
            />
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
            <Icon
              name="chat"
              color={focused ? "#BF4F51" : "grey"}
              size={33}
            />
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
            <Icon
              name="groups"
              color={focused ? "#BF4F51" : "grey"}
              size={33}
            />
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
            <Icon
              name="person"
              color={focused ? "#BF4F51" : "grey"}
              size={33}
            />
          ),
          tabBarLabelStyle: { fontSize: 13, color: "grey" },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
