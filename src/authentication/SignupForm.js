import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  NativeModules,
  Platform,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useContext, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticatedUserContext } from "../../App";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [job, setJob] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(
    "https://img.icons8.com/external-others-inmotus-design/256/external-Avatar-man-hair-avatars-others-inmotus-design-5.png"
  );
  const { setUser } = useContext(AuthenticatedUserContext);

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

  const SignUp = async () => {
    await axios
      .post(
        "http://192.168.8.100:3000/api/v1/register",
        {
          email: email,
          password: password,
          phonenumber: phoneNumber,
          fullname: {
            firstname: firstname,
            lastname: lastname,
          },
          dob: {
            day: day,
            month: month,
            year: year,
          },
          bio: {
            job: job,
            address: address,
            about: about,
          },
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
        uploadUserPhoto();
        console.log("data ---> " + res.data);
        setTimeout(() => setUser(res.data.idToken), 3000);
      })
      .catch((err) => {
        console.log("Something went wrong!" + err);
      });
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
  // select image from photo library
  const uploadUserPhoto = async () => {
    // const newImageUri = "file:///" + image.split("file:/").join("");
      const formData = new FormData();
      formData.append("photo", {
        uri: image,
        type: "image/jpeg",
        name: firstname + "_" + lastname,
      });

    await axios
      .post("http://192.168.8.100:3000/api/v1/add_photo", formData, {
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <View style={{ marginHorizontal: 20 }}>
          <Text style={styles.titleStyle}>SignUp</Text>
          <TouchableOpacity
            onPress={PickImage}
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 20,
            }}
          >
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100, borderRadius: 100 }}
            />
          </TouchableOpacity>
          <Text>Firstname</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Kelvin"
            onChangeText={(text) => setFirstname(text)}
          />
          <Text>Lastname</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Prempeh"
            onChangeText={(text) => setLastname(text)}
          />
          <Text>Email</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="kelvingprempeh10@mail.com"
            onChangeText={(text) => setEmail(text)}
          />
          <Text>Password</Text>
          <TextInput
            style={styles.inputStyle}
            secureTextEntry={true} 
            placeholder="8 or more characters eg. xxxxxxxx"
            onChangeText={(text) => setPassword(text)}
          />
          <Text>Date Of Birth</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: 10,
            }}
          >
            <TextInput
              style={styles.dobStyle}
              placeholder="DD"
              keyboardType={"numeric"}
              onChangeText={(text) => setDay(text)}
            />
            <TextInput
              style={styles.dobStyle}
              placeholder="MM"
              keyboardType={"numeric"}
              onChangeText={(text) => setMonth(text)}
            />
            <TextInput
              style={styles.dobStyle}
              placeholder="YYYY"
              keyboardType={"numeric"}
              onChangeText={(text) => setYear(text)}
            />
          </View>
          <Text>Phone Number</Text>
          <TextInput
            keyboardType={"numeric"}
            style={styles.inputStyle}
            placeholder="eg. 0547xxxxxx"
            onChangeText={(text) => setPhoneNumber(text)}
          />
          <Text>Address</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Fadama - New Market"
            onChangeText={(text) => setAddress(text)}
          />
          <Text>Occupation</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Software Engineer"
            onChangeText={(text) => setJob(text)}
          />
          <Text>Short Bio</Text>
          <TextInput
            style={styles.bioInputStyle}
            multiline={true}
            numberOfLines={4}
            placeholder="Software Engineer"
            onChangeText={(text) => setAbout(text)}
          />
          <TouchableOpacity style={styles.buttonStyle} onPress={SignUp}>
            <Text style={{ color: "#fff", fontSize: 17, fontWeight: "600" }}>
              Register
            </Text>
          </TouchableOpacity>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    borderColor: "grey",
    backgroundColor: "#E5E4E2",
    paddingVertical: 15,
    padding: 10,
    width: "100%",
    marginVertical: 5,
    fontSize: 17,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  bioInputStyle: {
    borderColor: "grey",
    backgroundColor: "#E5E4E2",
    height: 80,
    padding: 10,
    width: "100%",
    marginVertical: 5,
    fontSize: 17,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  dobStyle: {
    borderColor: "grey",
    backgroundColor: "#E5E4E2",
    paddingVertical: 15,
    padding: 10,
    width: "31%",
    marginVertical: 5,
    fontSize: 17,
    borderRadius: 10,
    marginTop: 5,
    textAlign: "center",
  },
  titleStyle: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "700",
  },
  buttonStyle: {
    backgroundColor: "#BF4F51",
    paddingHorizontal: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    marginBottom: 20,
    paddingBottom: 20,
    width: "100%",
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default SignUpForm;
