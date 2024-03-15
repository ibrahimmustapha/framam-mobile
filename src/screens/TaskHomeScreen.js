import { View, Text, TextInput, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ProgressCircle from "react-native-progress-circle";
import { LineChart } from "react-native-chart-kit";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const MainIcons = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
      }}
    >
      <MaterialIcons name="dashboard" color={"#000000"} size={30} />
      <MaterialIcons name="notifications-none" color={"#000000"} size={30} />
    </View>
  );
};

const WelcomeText = ({ firstName }) => {
  return (
    <View>
      <Text>Hi, {firstName}</Text>
      <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 20 }}>
        Be productive today
      </Text>
    </View>
  );
};

const SearchUI = () => {
  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        width: "100%",
        borderRadius: 15,
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <TextInput
        style={{ width: "100%" }}
        placeholder="Search task"
        placeholderTextColor={"grey"}
      />
      {/* <MaterialIcons name="search" color={"#000000"} size={30} /> */}
    </View>
  );
};

const TaskProgress = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        width: "100%",
        borderRadius: 15,
        padding: 15,
        marginVertical: 15,
      }}
    >
      <View>
        <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 5 }}>
          Task Progress
        </Text>
        <Text style={{ color: "grey", marginLeft: 3 }}>30/40 task done</Text>
        <View
          style={{
            borderRadius: 25,
            backgroundColor: "#39A7FF",
            marginTop: 15,
            padding: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#ffffff",
            }}
          >
            March 22
          </Text>
        </View>
      </View>
      <View>
        <ProgressCircle
          percent={70}
          radius={30}
          borderWidth={7}
          color="#39A7FF"
          shadowColor="#999"
          bgColor="#fff"
        >
          <Text style={{ fontSize: 16, fontWeight: "600" }}>70%</Text>
        </ProgressCircle>
      </View>
    </View>
  );
};

const data = {
  labels: ["January", "February", "March", "April"],
  datasets: [
    {
      data: [20, 45, 28, 80],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // line color
      strokeWidth: 2, // optional, default is 3
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

const LineChartExample = () => {
  return (
    <View>
      <LineChart
        data={data}
        width={330}
        height={310}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const TasksScreen = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    AsyncStorage.getItem("userId").then((uid) => {
      axios
        .get(`https://framam-server.onrender.com/api/v1/user/${uid}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ marginHorizontal: 20 }}>
          <MainIcons />
          <WelcomeText firstName={user.fullname?.firstname} />
          <SearchUI />
          <TaskProgress />
          <LineChartExample />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TasksScreen;
