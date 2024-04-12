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
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ContentLoader from "react-native-easy-content-loader";
import { Button, Divider, FAB } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import RewardModal from "./modals/RewardModal";
import UserDetailsModal from "./modals/UserDetailsModal";
import Icon from "react-native-vector-icons/MaterialIcons";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TasksScreen = () => {
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [image, setImage] = useState(
    "https://img.icons8.com/?size=256&id=53386&format=png"
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({});
  const [dueDate, setDueDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [createdBy, setCreatedBy] = useState(null);

  const addTask = async () => {
    await AsyncStorage.getItem("username").then((username) => {
      setCreatedBy(username);
    });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("startDate", startDate);
    formData.append("dueDate", dueDate);
    formData.append("createdBy", createdBy);
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

  useEffect(() => {
    axios
      .get("https://framam-server.onrender.com/api/v1/all_task", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        setTasks(
          res.data.sort((a, b) =>
            a.status.toLowerCase() > b.status.toLowerCase() ? -1 : 1
          )
        );
        setLoading(false);
      });
  }, [JSON.stringify(tasks)]);

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

  const [open, setOpen] = useState(false);
  const [statusSelectorMargin, setStatusSelectorMargin] = useState(10);
  const [items, setItems] = useState([
    { label: "Todo", value: "Todo" },
    { label: "In progress", value: "In progress" },
    { label: "Done", value: "Done" },
  ]);

  const onOpenChange = (newOpen) => {
    setOpen(newOpen);
    setStatusSelectorMargin(newOpen ? 150 : 10);
  };

  const [isDueDatePickerVisible, setDueDatePickerVisibility] = useState(false);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);

  // Separate handlers for Due Date and Start Date
  const showDueDatePicker = () => {
    setDueDatePickerVisibility(true);
  };

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideDueDatePicker = () => {
    setDueDatePickerVisibility(false);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const handleDueDate = (date) => {
    // Handle the selected due date
    setDueDate(date.toString());
    hideDueDatePicker();
  };

  const handleStartDate = (date) => {
    // Handle the selected start date
    setStartDate(date.toString());
    hideStartDatePicker();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RewardModal
        onClose={onModalClose}
        isVisible={isModalVisible}
        title={"🎉Add Task Here"}
      >
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
          <View style={{ marginBottom: statusSelectorMargin }}>
            <DropDownPicker
              open={open}
              value={status}
              items={items}
              setOpen={onOpenChange}
              setValue={setStatus}
              setItems={setItems}
              // onPress={setStatusSelectorMargin(statusSelectorMargin ? statusSelectorMargin === 150 : statusSelectorMargin === 10)}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{ marginBottom: 10, textAlign: "center", fontSize: 16 }}
            >
              Selected Time:
              {startDate ? startDate.toString() : "Not selected"}
            </Text>
            <Button
              title="Select Start Date & Time"
              onPress={showStartDatePicker}
            />
            <DateTimePickerModal
              isVisible={isStartDatePickerVisible}
              mode="datetime"
              onConfirm={handleStartDate}
              onCancel={hideStartDatePicker}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{ marginBottom: 10, textAlign: "center", fontSize: 16 }}
            >
              Selected Time:
              {dueDate ? dueDate.toString() : "Not selected"}
            </Text>
            <Button
              title="Select Due Date & Time"
              onPress={showDueDatePicker}
            />
            <DateTimePickerModal
              isVisible={isDueDatePickerVisible}
              mode="datetime"
              onConfirm={handleDueDate}
              onCancel={hideDueDatePicker}
            />
          </View>
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
            style={{
              backgroundColor: "#2b2d42",
              width: "100%",
              height: 150,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
              paddingHorizontal: 20,
            }}
          >
            <View style={{ marginBottom: 30 }}>
              <Text style={{ color: "#e5e5e5" }}>Task title</Text>
              <Text
                selectable={true}
                style={{
                  fontSize: 20,
                  marginVertical: 5,
                  fontWeight: "500",
                  color: "#ffffff",
                }}
                numberOfLines={1}
              >
                {task.title}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "flex-end", gap: 20 }}
            >
              <View>
                <Text style={{ color: "#e5e5e5", marginBottom: 10 }}>
                  Due Date
                </Text>
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                  <Icon
                    name={"alarm"}
                    size={20}
                    color="#ffffff"
                    style={{ marginRight: 5 }}
                  />
                  <Text style={{ color: "#e5e5e5" }}>
                    {new Date(task.dueDate).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                    {" - "}{" "}
                    {new Date(task.startDate).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </Text>
                </View>
              </View>
              <View>
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                  <Icon
                    name={"calendar-today"}
                    size={18}
                    color="#ffffff"
                    style={{ marginRight: 5 }}
                  />
                  <Text style={{ color: "#e5e5e5" }}>
                    {new Date(task.startDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              marginBottom: 20,
            }}
          >
            <View>
              <Text
                style={{ fontSize: 20, fontWeight: "700", marginVertical: 12 }}
              >
                Descriptions
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 10,
                  borderColor: "#e5e5e5",
                  marginBottom: 10,
                }}
              >
                <Text>{task.description}</Text>
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  Status
                </Text>
                <View
                  style={{
                    padding: 10,
                    paddingVertical: 15,
                    borderRadius: 10,
                    backgroundColor: "#F5F5F5",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  {task.status && (
                    <Image
                      source={{
                        uri: task.status.split(" ").includes("Done")
                          ? "https://img.icons8.com/?size=128&id=a4l6bA9mSmBh&format=png&color=40C057"
                          : task.status.split(" ").includes("progress")
                          ? "https://img.icons8.com/?size=128&id=a4l6bA9mSmBh&format=png&color=7950F2"
                          : "https://img.icons8.com/?size=128&id=a4l6bA9mSmBh&format=png&color=FA5252",
                      }}
                      style={{ width: 25, height: 25 }}
                    />
                  )}
                  <Text>{task.status}</Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    marginBottom: 3,
                  }}
                >
                  Image
                </Text>
                <Image
                  source={{ uri: task.image?.url }}
                  style={{
                    height: 200,
                    borderWidth: 5,
                    borderColor: "#fff",
                    borderRadius: 15,
                  }}
                />
              </View>
              <View
                style={{
                  padding: 10,
                  paddingVertical: 12,
                  borderRadius: 10,
                  backgroundColor: "#F5F5F5",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <Text style={{ fontWeight: "500" }}>Files & Link:</Text>
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    name={"file-present"}
                    size={30}
                    color="grey"
                    style={{ marginRight: 5 }}
                  />
                  <Icon
                    name={"upload-file"}
                    size={30}
                    color="grey"
                    style={{ marginRight: 5 }}
                  />
                </View>
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  marginTop: 10,
                  marginBottom: 5,
                }}
              >
                Location
              </Text>
              <Text>{task.location}</Text>
            </View>
            <Button title="Delete task" style={{ marginTop: 15 }} />
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
            padding: 10,
          }}
        >
          {loading ? (
            <View style={{ marginVertical: 0 }}>
              <ContentLoader
                active
                avatar
                pRows={2}
                pWidth={["80%", "75%", 45]}
                listSize={7}
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
                        alignItems: "center",
                      }}
                    >
                      <View style={{ width: 70 }}>
                        <Text>
                          {new Date(task.dueDate).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor: "#ffffff",
                          marginLeft: 10,
                          paddingHorizontal: 15,
                          paddingVertical: 10,
                          width: "75%",
                          borderRadius: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "700",
                            paddingVertical: 3,
                            color: "black",
                          }}
                          numberOfLines={1}
                        >
                          {task.title}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: 5,
                            gap: 5,
                            alignItems: "center",
                          }}
                        >
                          <Image
                            source={{
                              uri: task.status.split(" ").includes("Done")
                                ? "https://img.icons8.com/?size=128&id=a4l6bA9mSmBh&format=png&color=40C057"
                                : task.status.split(" ").includes("progress")
                                ? "https://img.icons8.com/?size=128&id=a4l6bA9mSmBh&format=png&color=7950F2"
                                : "https://img.icons8.com/?size=128&id=a4l6bA9mSmBh&format=png&color=FA5252",
                            }}
                            style={{ width: 20, height: 20 }}
                          />
                          <Text
                            style={{
                              color: "grey",
                              fontSize: 15,
                              marginTop: Platform.OS === "android" ? -2.5 : 0,
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
        color="#40A2E3"
        onPress={() => openModal()}
        icon={<Ionicons name="add-outline" color={"#fff"} size={26} />}
      />
    </SafeAreaView>
  );
};

export default TasksScreen;
