import { useState } from "react";
import {
  Image,
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import categoriesList from "../../local_data/WasteCategoryData";
import ModalScreen from "./ModalScreen";

const WasteCatergories = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showTitle, setShowTitle] = useState({});

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const openModal = (item) => {
    setShowTitle(item);
    setIsModalVisible(true);
  };
  return (
    <View>
      <ModalScreen
        onClose={onModalClose}
        isVisible={isModalVisible}
        title={showTitle.title}
        imageUrl={showTitle.image}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.stepsStyle}>{showTitle.steps1}</Text>
            <Text style={styles.stepsStyle}>{showTitle.steps2}</Text>
            <Text style={styles.stepsStyle}>{showTitle.steps3}</Text>
            <Text style={styles.stepsStyle}>{showTitle.steps4}</Text>
            <Text style={styles.stepsStyle}>{showTitle.steps5}</Text>
          </View>
        </ScrollView>
      </ModalScreen>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "500",
          paddingVertical: 15,
          marginHorizontal: 20,
        }}
      >
        Waste Categories
      </Text>
      <FlatList
        data={categoriesList}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment={"start"}
        renderItem={({ item }) => (
          <Pressable onPress={() => openModal(item)}>
            <View
              style={{
                marginRight: -5,
                paddingHorizontal: 25,
                paddingVertical: 20,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                marginHorizontal: 20,
                borderRadius: 10
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: 90, height: 90, paddingBottom: 10 }}
              />
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  stepsStyle: {
    marginVertical: 5,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default WasteCatergories;
