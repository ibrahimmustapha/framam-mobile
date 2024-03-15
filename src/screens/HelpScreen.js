import { Platform, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RewardModal from "./modals/RewardModal";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Divider, FAB, Image } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import ContentLoader from "react-native-easy-content-loader";
import axios from "axios";

const HelpScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const addQuestion = async () => {
    await axios
      .post(
        "https://framam-server.onrender.com/api/v1/add_question",
        {
          title: title,
          description: description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setTitle(null);
        setDescription(null);
      })
      .catch((err) => {
        console.log("Something went wrong!" + err);
      });
  };

  useEffect(() => {
    axios
      .get("https://framam-server.onrender.com/api/v1/questions", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        setQuestions(
          res.data.sort((a, b) =>
            a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
          )
        );
        setLoading(false);
      });
  }, [JSON.stringify(questions)]);

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const openModal = (item) => {
    setIsModalVisible(true);
  };

  const toggleAnsweredStatus = (questionId) => {
    // Check if the question is already in the answeredQuestions array
    if (answeredQuestions.includes(questionId)) {
      // Remove the question if it's already answered
      setAnsweredQuestions(answeredQuestions.filter((id) => id !== questionId));
    } else {
      // Add the question if it's not answered
      setAnsweredQuestions([...answeredQuestions, questionId]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RewardModal
        onClose={onModalClose}
        isVisible={isModalVisible}
        title={"Have any questions? 🤔"}
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
          <TextInput
            placeholder="Description"
            onChangeText={(text) => setDescription(text)}
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
          <TouchableOpacity
            style={{
              backgroundColor: "#BF4F51",
              padding: 13,
              borderRadius: 10,
              marginTop: 10,
            }}
            onPress={addQuestion}
          >
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
                fontWeight: "600",
                color: "#fff",
              }}
            >
              Ask Question
            </Text>
          </TouchableOpacity>
        </View>
      </RewardModal>
      <View>
        <View>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "800",
              marginTop: 10,
              marginBottom: 20,
              marginHorizontal: 20,
            }}
          >
            Help Center
          </Text>
        </View>
        <View>
          {loading ? (
            <View style={{ marginVertical: 20 }}>
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
            <ScrollView style={{ marginHorizontal: 20 }}>
              <View style={{ flex: 1 }}>
                <Divider
                  orientation="horizontal"
                  style={{ marginBottom: 20, marginTop: 0 }}
                />
                {questions.map((question) => (
                  <TouchableOpacity
                    key={question.id}
                    onPress={() => toggleAnsweredStatus(question.id)}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        source={{
                          uri: "https://img.icons8.com/?size=96&id=gxrstgs5aUhe&format=png",
                        }}
                        style={{ width: 45, height: 45, borderRadius: 5 }}
                      />
                      <View style={{ paddingTop: 4, paddingLeft: 10 }}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "700",
                            paddingVertical: 3,
                            color: "black",
                            paddingLeft: 5,
                          }}
                        >
                          {question.title}
                        </Text>
                        <View style={{ flexDirection: "row", paddingLeft: 3 }}>
                          <Text
                            style={{
                              color: "grey",
                              fontSize: 15,
                              marginTop: Platform.OS === "android" ? -2.5 : 0,
                              paddingLeft: 5
                            }}
                            numberOfLines={1}
                          >
                            {question.description}
                          </Text>
                        </View>
                        {answeredQuestions.includes(question.id) ? (
                          <View
                            style={{
                              flexDirection: "row",
                              paddingLeft: 3,
                              marginTop: 15,
                              width: "90%",
                            }}
                          >
                            <Text
                              style={{
                                color: "green",
                                fontWeight: "600",
                                fontSize: 15,
                                marginTop: Platform.OS === "android" ? -2.5 : 0,
                                paddingLeft: 5,
                              }}
                            >
                              {question.answer}
                            </Text>
                          </View>
                        ) : (
                          <View></View>
                        )}
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

export default HelpScreen;
