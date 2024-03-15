import { DefaultTheme } from "@react-navigation/native";
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
import ContentLoader from "react-native-easy-content-loader";
import { Divider } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import ImageTextContainer from "../ui/ImageTextContainer";
import UserDetailsModal from "./modals/UserDetailsModal";

const CommunityScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clearSearch, setClearSearch] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get("https://framam-server.onrender.com/api/v1/users", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      });
  }, []);

  const onModalClose = () => {
    setUser({});
    setIsModalVisible(false);
  };

  const openModal = (item) => {
    setIsModalVisible(true);
    setUser(item);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <UserDetailsModal onClose={onModalClose} isVisible={isModalVisible}>
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
              source={{ uri: user.image?.url }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 15,
                borderWidth: 5,
                borderColor: "#fff",
              }}
            />
            <Text
              selectable={true}
              style={{ fontWeight: "800", fontSize: 38, marginVertical: 5 }}
              numberOfLines={1}
            >
              {user.fullname?.firstname} {user.fullname?.lastname}
            </Text>
            <ImageTextContainer data={user.email} icon={"mail"} />
            <ImageTextContainer data={user.bio?.job} icon={"work"} />
            <ImageTextContainer
              data={`${user.dob?.day} / ${user.dob?.month} / ${user.dob?.year}`}
              icon={"cake"}
            />
            <ImageTextContainer data={`${user.points} points`} icon={"stars"} />
            <ImageTextContainer data={user.bio?.address} icon={"location-on"} />
            <ImageTextContainer data={user.phonenumber} icon={"phone"} />
            <ImageTextContainer data={user.bio?.about} icon={"notes"} />
          </View>
        </View>
      </UserDetailsModal>
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
          Community
        </Text>
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: "#E5E4E2",
            borderRadius: 5,
            marginVertical: 10,
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Icon name="search" size={21} color="grey" />
            <TextInput
              placeholder={"Type Here..."}
              style={{ fontSize: 16 }}
              value={clearSearch}
              onChangeText={(text) => setClearSearch(text)}
            />
          </View>
          {clearSearch != "" ? (
            <TouchableOpacity onPress={() => setClearSearch("")}>
              <Icon name="close" size={20} color="grey" />
            </TouchableOpacity>
          ) : null}
        </View>
        {loading ? (
          <View style={{ marginVertical: 20}}>
            <ContentLoader
              active
              avatar
              pRows={2}
              pWidth={["80%", "75%", 45]}
              listSize={9}
              animationDuration="2000ms"
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
              {users.map((user) => (
                <TouchableOpacity
                  key={user.uid}
                  onPress={() => openModal(user)}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      marginHorizontal: 20,
                    }}
                  >
                    <Image
                      source={{ uri: user.image?.url }}
                      style={{ width: 60, height: 60, borderRadius: 5 }}
                    />
                    <View style={{ paddingTop: 4, paddingLeft: 10 }}>
                      <Text
                        style={{
                          fontWeight: "700",
                          fontSize: 16,
                          paddingLeft: 3,
                        }}
                      >
                        {user.fullname?.firstname} {user.fullname?.lastname}{" "}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          paddingVertical: 3,
                          color: "grey",
                          paddingLeft: 5,
                        }}
                      >
                        {user.bio?.address}
                      </Text>
                      <View style={{ flexDirection: "row", paddingLeft: 3 }}>
                        <Icon name="stars" size={16} color={"grey"} />
                        <Text style={{ color: "grey", fontSize: 15, marginTop: Platform.OS === "android" ? -2.5 : 0, paddingLeft: 5 }}>
                          {user.points}
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
    </SafeAreaView>
  );
};

export default CommunityScreen;
