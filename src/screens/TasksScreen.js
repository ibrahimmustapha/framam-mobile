import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ContentLoader from "react-native-easy-content-loader";
import { Divider, FAB } from "react-native-elements";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import RewardModal from "./modals/RewardModal";
import UserDetailsModal from "./modals/UserDetailsModal";
import ImageTextContainer from "../ui/ImageTextContainer";

const TasksScreen = () => {
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [image, setImage] = useState(
    "https://img.icons8.com/?size=256&id=53386&format=png"
  );
  const [selectedImages, setSelectedImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const addTask = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("image", { uri: image, type: "image/jpeg", name: title });

    await axios
      .post("http://192.168.8.100:3000/api/v1/add_task", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        console.log("data ---> " + res.data);
        setTitle(null);
        setStatus(null);
        setDescription(null);
        setImage(null);
      })
      .catch((err) => {
        console.log("Something went wrong!" + err);
      });
  };

  // const getTasks = () => {
  useEffect(() => {
    axios
      .get("http://192.168.8.100:3000/api/v1/all_task", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        setTasks(
          res.data.sort((a, b) =>
            a.status.toLowerCase() > b.status.toLowerCase() ? 1 : -1
          )
        );
        setLoading(false);
      });
  }, [JSON.stringify(tasks)]);
  // };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const address = data.results[0].formatted_address;
        return address;
      } else {
        throw new Error("Address not found");
      }
    } catch (error) {
      throw new Error(`Error fetching address: ${error.message}`);
    }
  };

  const onModalClose = () => {
    setIsModalVisible(false);
    setImage(null);
  };

  const openModal = (item) => {
    setIsModalVisible(true);
  };

  const openTaskModal = (item) => {
    setIsTaskModalVisible(true);
    setTask(item);
  };

  const onTaskModalClose = () => {
    setTask({});
    setIsTaskModalVisible(false);
  };

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    // if image selected != canceled set the image uri to image
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const refreshData = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getTasks;
      setRefreshing(false);
    }, 1000);
  }, []);

  const date = new Date(); // Replace this with your date

  // Format the date without the time
  const options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RewardModal onClose={onModalClose} isVisible={isModalVisible}>
        <View style={{ marginVertical: 10 }}>
          <TextInput
            placeholder="Title"
            onChangeText={(text) => setTitle(text)}
            style={{
              padding: 10,
              backgroundColor: "#F2F3F4",
              padding: 13,
              fontSize: 16,
              marginBottom: 10,
              borderRadius: 10,
            }}
            placeholderTextColor="grey"
          />
          <TextInput
            placeholder="Status"
            onChangeText={(text) => setStatus(text)}
            style={{
              padding: 10,
              backgroundColor: "#F2F3F4",
              paddingHorizontal: 13,
              fontSize: 16,
              marginBottom: 10,
              borderRadius: 10,
            }}
            placeholderTextColor="grey"
          />
          <TextInput
            placeholder="Description"
            multiline
            onChangeText={(text) => setDescription(text)}
            style={{
              padding: 10,
              backgroundColor: "#F2F3F4",
              height: 100,
              paddingHorizontal: 13,
              fontSize: 16,
              marginBottom: 10,
              borderRadius: 10,
            }}
            placeholderTextColor="grey"
          />
          <View>
            <TouchableOpacity onPress={PickImage}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginVertical: 15,
                }}
              >
                <Text style={{ fontSize: 16 }}>
                  Click here to upload image for task
                </Text>
                {/* <Ionicons name="add-circle-outline" color={"blue"} size={19} /> */}
                <FontAwesome
                  name="plus-circle"
                  color={"#40A2E3"}
                  size={19}
                  style={{ marginLeft: 10 }}
                />
              </View>
            </TouchableOpacity>
            {image != null ? (
              <Image
                source={{ uri: image }}
                style={{
                  width: "auto",
                  height: 200,
                  borderRadius: 15,
                  marginVertical: 20,
                }}
              />
            ) : null}
            <TouchableOpacity
              style={{
                backgroundColor: "#BF4F51",
                padding: 13,
                borderRadius: 10,
                marginTop: 10,
              }}
              onPress={addTask}
            >
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  fontWeight: "600",
                  color: "#fff",
                }}
              >
                Create Task
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RewardModal>
      <UserDetailsModal
        onClose={onTaskModalClose}
        isVisible={isTaskModalVisible}
      >
        <View>
          <View
            style={{ backgroundColor: "#2b2d42", width: "100%", height: 130 }}
          ></View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              marginBottom: 20,
              marginVertical: -40,
            }}
          >
            <Image
              source={{ uri: task.image?.url }}
              style={{
                height: 200,
                borderWidth: 5,
                borderColor: "#fff",
              }}
            />
            <Text
              selectable={true}
              style={{ fontSize: 20, marginVertical: 5 }}
              numberOfLines={1}
            >
              {task.title}
            </Text>
            <Text>{task.location}</Text>
            <Text>{task.description}</Text>
            <Text>{date.toLocaleDateString(task.createdAt, options)}</Text>
          </View>
        </View>
      </UserDetailsModal>
      <View>
        <View style={{ paddingVertical: 20 }}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "800",
              marginTop: 0,
              marginBottom: 0,
              marginHorizontal: 20,
            }}
          >
            Tasks
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            borderRadius: 5,
            marginVertical: 10,
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
          }}
        >
          {loading ? (
            <View style={{ marginVertical: 20 }}>
              <ContentLoader
                active
                avatar
                pRows={2}
                pWidth={["80%", "75%", 45]}
                listSize={9}
                animationDuration="1000ms"
              />
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ marginBottom: 80 }}
              // refreshControl={
              //   <RefreshControl
              //     refreshing={refreshing}
              //     onRefresh={refreshData}
              //   />
              // }
            >
              <View style={{ flex: 1 }}>
                <Divider
                  orientation="horizontal"
                  style={{ marginBottom: 20, marginTop: 0 }}
                />
                {tasks.map((task) => (
                  <TouchableOpacity
                    key={task.id}
                    onPress={() => openTaskModal(task)}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        source={{
                          uri: task.status.split(" ").includes("Done")
                            ? "https://img.icons8.com/?size=100&id=vHdHqyap1DU2&format=png&color=40C057"
                            : task.status.split(" ").includes("In")
                            ? "https://img.icons8.com/?size=100&id=vHdHqyap1DU2&format=png&color=228BE6"
                            : "https://img.icons8.com/?size=100&id=vHdHqyap1DU2&format=png&color=FA5252",
                        }}
                        style={{ width: 45, height: 45, borderRadius: 5 }}
                      />
                      <View style={{ paddingTop: 4, paddingLeft: 10 }}>
                        <Text
                          style={{
                            fontSize: 14,
                            paddingVertical: 3,
                            color: "grey",
                            paddingLeft: 5,
                          }}
                        >
                          {task.title}
                        </Text>
                        <View style={{ flexDirection: "row", paddingLeft: 3 }}>
                          <Text
                            style={{
                              color: "grey",
                              fontSize: 15,
                              marginTop: Platform.OS === "android" ? -2.5 : 0,
                              paddingLeft: 5,
                            }}
                          >
                            {task.status}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Divider
                      orientation="horizontal"
                      style={{ marginVertical: 10, marginLeft: 90 }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      </View>
      <FAB
        size={"large"}
        placement="right"
        style={{ marginBottom: 20, marginRight: 20 }}
        color="#3a5a40"
        onPress={() => openModal()}
        icon={<Ionicons name="add-outline" color={"#fff"} size={26} />}
      />
    </SafeAreaView>
  );
};

export default TasksScreen;
