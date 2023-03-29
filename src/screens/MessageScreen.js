import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { database } from "../../firebase";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

const MessageScreen = () => {
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentId] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");

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
    },
    [currentUserId]
  );

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: currentUserEmail
      }}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      loadEarlier={true}
      messagesContainerStyle={{
        backgroundColor: "#fff",
      }}
    />
  );
};

export default MessageScreen;

