import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RewardScreen from "../screens/RewardScreen";
import CommunityScreen from "../screens/CommunityScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    // <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: { backgroundColor: "white" },
          tabBarShowLabel: true,
          tabBarLabelStyle: { color: "green" }, tabBarActiveTintColor: "yellow"
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name="home"
                color={focused ? "#BF4F51" : "grey"}
                size={33}
              />
            ),
            tabBarLabelStyle: { fontSize: 13, color: "grey" },
          }}
        />
        <Tab.Screen
          name="Directions"
          component={RewardScreen}
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
          name="How to"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name="psychology"
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
                name="account-circle"
                color={focused ? "#BF4F51" : "grey"}
                size={33}
              />
            ),
            tabBarLabelStyle: { fontSize: 13, color: "grey" },
          }}
        />
      </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default BottomTabNavigation;
