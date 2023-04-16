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
import ModalScreen from "../modals/ModalScreen";
import { DefaultTheme } from "@react-navigation/native";

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
            <View style={styles.stepsStyle}>
              <View style={styles.listCircle}></View>
              <Text style={styles.stepText}>{showTitle.steps1}</Text>
            </View>
            <View style={styles.stepsStyle}>
              <View style={styles.listCircle}></View>
              <Text style={styles.stepText}>{showTitle.steps2}</Text>
            </View>
            <View style={styles.stepsStyle}>
              <View style={styles.listCircle}></View>
              <Text style={styles.stepText}>{showTitle.steps3}</Text>
            </View>
            <View style={styles.stepsStyle}>
              <View style={styles.listCircle}></View>
              <Text style={styles.stepText}>{showTitle.steps4}</Text>
            </View>
            <View style={styles.stepsStyle}>
              <View style={styles.listCircle}></View>
              <Text style={styles.stepText}>{showTitle.steps5}</Text>
            </View>
          </View>
        </ScrollView>
      </ModalScreen>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
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
              style={styles.categoriesListContainer}
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
  categoriesListContainer: {
    marginRight: -5,
    paddingHorizontal: 25,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: DefaultTheme.colors.background,
    shadowOffset: { width: 3, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 2,
  },
  stepsStyle: {
    marginVertical: 8,
    fontWeight: "400",
    lineHeight: 22,
    flexDirection: "row",
    paddingRight: 8,
  },
  stepText: {
    fontSize: 16,
    marginTop: -5,
    paddingLeft: 10,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  listCircle: {
    backgroundColor: "purple",
    width: 10,
    height: 10,
    borderRadius: 40,
  },
});

export default WasteCatergories;
