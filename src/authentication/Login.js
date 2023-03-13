import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  NativeModules,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import image from "../images/index";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const setIdToken = async (idToken) => {
    try {
      await AsyncStorage.setItem("idToken", idToken);
      console.log("Data saved successfully - idToken");
    } catch (error) {
      console.log("Error saving data:", error);
    }
  };

  const setUid = async (userId) => {
    try {
      await AsyncStorage.setItem("userId", userId);
      console.log("Data saved successfully - userId");
    } catch (error) {
      console.log("Error saving data:", error);
    }
  };

  const SignIn = async () => {
    await axios
      .post(
        "http://192.168.8.100:3000/api/v1/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        setLoading(true);
        setIdToken(res.data.idToken);
        setUid(res.data.userId);
        console.log("data ---> " + res.data);
        setTimeout(() => NativeModules.DevSettings.reload(), 4000);
      })
      .catch((err) => {
        console.log("Something went wrong!" + err);
      });
  };

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image source={image.login} style={styles.imageStyle} />
        <Text style={styles.loginTitle}>Login</Text>
        <View style={styles.authContainer}>
          <Text style={{ fontSize: 15 }}>Email</Text>
          <TextInput
            style={styles.emailStyle}
            placeholder="example@mail.com"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <Text style={{ fontSize: 15, marginTop: 7 }}>Password</Text>
          <TextInput
            style={styles.emailStyle}
            placeholder="8 or more characters"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.loginBtn} onPress={SignIn}>
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text
              style={{ fontSize: 16, fontWeight: "500", textAlign: "center" }}
            >
              Don't have an account?{" "}
              <Text style={{ color: "purple" }}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
        {loading && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#BF4F51" />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "white",
  },
  authContainer: {
    marginHorizontal: 25,
  },
  emailStyle: {
    borderColor: "grey",
    backgroundColor: "#E5E4E2",
    paddingVertical: 15,
    padding: 10,
    width: "100%",
    marginVertical: 5,
    fontSize: 17,
    borderRadius: 10,
  },
  emailContainer: {
    flexDirection: "row",
  },
  loginTitle: {
    fontSize: 35,
    fontWeight: "700",
    textAlign: "center",
  },
  loginBtn: {
    backgroundColor: "#BF4F51",
    paddingHorizontal: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 20,
    paddingBottom: 20,
    width: "100%",
    marginVertical: 10,
    borderRadius: 10,
  },
  loginBtnText: {
    fontSize: 17,
    fontWeight: "700",
    color: "white",
  },
  imageStyle: {
    width: "100%",
    height: "70%",
    resizeMode: "contain",
  },
});

export default Login;
