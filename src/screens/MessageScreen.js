import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import * as ImagePicker from "expo-image-picker";
import { database } from "../../firebase";
import {
  uploadBytes,
  ref,
  getStorage,
  getDownloadURL,
} from "firebase/storage";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { Image, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const MessageScreen = () => {
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentId] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

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
      setImageUrl(result.assets[0].uri);
    }
  };

  const renderActions = () => {
    return (
      <TouchableOpacity
        onPress={PickImage}
        style={{
          alignSelf: "center",
          marginTop: -5,
        }}
      >
        <Icon name="add" size={27} color={"#3a86ff"} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("querySnapshot unsubscribe");
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: {
            _id: doc.data().user._id,
            name: doc.data().user.name,
            avatar: doc.data().user.avatar,
          },
          image: doc.data().image,
        }))
      );
    });
    return unsubscribe;
  }, []);

  AsyncStorage.getItem("userId").then((uid) => {
    setCurrentId(uid);
  });

  const onSend = useCallback(
    async (messages = []) => {
      if (imageUrl !== null) {
        const response = await fetch(imageUrl);
        const blobImage = await response.blob();
        const metadata = { contentType: "image/jpeg" };
        const storage = getStorage();
        const imageRef = ref(storage, "images/" + new Date().getTime());
        const userRef = collection(database, "user");
        const users = await getDocs(userRef);
        const {
          _id,
          createdAt,
          text,
          user: { _id: any, name, avatar },
          image,
        } = messages[0];
        users.forEach(async (user) => {
          if (user.data().uid === currentUserId) {
            setCurrentUserEmail(user.data().email);
            await uploadBytes(imageRef, blobImage, metadata).then(
              async (snapshot) => {
                const downloadURL = await getDownloadURL(snapshot.ref);
                await addDoc(collection(database, "chats"), {
                  _id,
                  createdAt,
                  text,
                  user: {
                    _id: user.data().email,
                    name: user.data().fullname?.firstname,
                    avatar: user.data().image?.url,
                  },
                  image: downloadURL.toString(),
                });
              }
            );
            setMessages((previousMessages) => previousMessages);
            setImageUrl(null);
          }
        });
      } else {
        const userRef = collection(database, "user");
        const users = await getDocs(userRef);
        const {
          _id,
          createdAt,
          text,
          user: { _id: any, name, avatar },
        } = messages[0];
        users.forEach((user) => {
          if (user.data().uid === currentUserId) {
            setCurrentUserEmail(user.data().email);
            addDoc(collection(database, "chats"), {
              _id,
              createdAt,
              text,
              user: {
                _id: user.data().email,
                name: user.data().fullname?.firstname,
                avatar: user.data().image?.url,
              },
            });
            setMessages((previousMessages) =>
              GiftedChat.append(previousMessages, messages)
            );
          }
        });
      }
    },
    [currentUserId, imageUrl]
  );

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: currentUserEmail,
      }}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      loadEarlier={true}
      messagesContainerStyle={{
        backgroundColor: "#fff",
      }}
      alwaysShowSend
      renderActions={renderActions}
      renderMessageImage={({ currentMessage }) => {
        return currentMessage.image ? (
          <Image
            source={{ uri: currentMessage.image }}
            style={{ width: 270, height: 200, borderRadius: 10, margin: 10 }}
          />
        ) : null;
      }}
    />
  );
};

export default MessageScreen;
