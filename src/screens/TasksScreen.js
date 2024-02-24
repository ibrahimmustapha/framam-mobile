import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ContentLoader from "react-native-easy-content-loader";
import { Divider, FAB } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import RewardModal from "./modals/RewardModal";
import Images from "../images/index";

const TasksScreen = () => {
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState({});
  const [image, setImage] = useState(
    "https://img.icons8.com/?size=256&id=53386&format=png"
  );
  const [selectedImages, setSelectedImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [tasks, setTasks] = useState([]);
  // const address = getAddressFromCoordinates(location.latitude, location.longitude);

  const addTask = async () => {
    await axios
      .post(
        "http://192.168.8.100:3000/api/v1/add_task",
        {
          title: title,
          description: description,
          status: status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        console.log("data ---> " + res.data);
        uploadTaskPhoto();
      })
      .catch((err) => {
        console.log("Something went wrong!" + err);
      });
  };

  const uploadTaskPhoto = async () => {
    const formData = new FormData();
    formData.append("photo", {
      uri: image,
      type: "image/jpeg",
      name: title,
    });

    await axios
    .post("http://192.168.8.100:3000/api/v1/add_task_photos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
  };

  useEffect(() => {
    axios
      .get("http://192.168.8.100:3000/api/v1/all_tasks", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      });
  }, []);

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
    setUser({});
    setIsModalVisible(false);
    setImage(null);
  };

  const openModal = (item) => {
    setIsModalVisible(true);
    setUser(item);
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
          marginHorizontal: 20,
          //   backgroundColor: "#E5E4E2",
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
          >
            <View style={{ flex: 1 }}>
              <Divider
                orientation="horizontal"
                style={{ marginBottom: 20, marginTop: 10 }}
              />
              {tasks.map((task) => (
                <TouchableOpacity
                  key={task.uid}
                  onPress={() => openModal(task)}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      marginHorizontal: 20,
                    }}
                  >
                    <Image
                      source={{
                        uri: "https://img.icons8.com/?size=256&id=t5LSVwaomF6K&format=png",
                      }}
                      style={{ width: 60, height: 60, borderRadius: 5 }}
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
                        {task.description}
                      </Text>
                      <View style={{ flexDirection: "row", paddingLeft: 3 }}>
                        <Icon name="stars" size={16} color={"grey"} />
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
