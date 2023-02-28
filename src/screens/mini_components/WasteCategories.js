import { Image, View, Text, ScrollView, FlatList } from "react-native";

const WasteCatergories = () => {
  const categoriesList = [
    {
      id: 1,
      title: "Plastic",
      image:
        "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/256/external-plastic-recycling-center-flaticons-lineal-color-flat-icons-2.png",
    },
    {
      id: 2,
      title: "Glass",
      image: "https://img.icons8.com/cotton/256/water-glass.png",
    },
    {
      id: 3,
      title: "Paper",
      image:
        "https://img.icons8.com/external-beshi-color-kerismaker/256/external-Paper-Recycle-ecology-beshi-color-kerismaker.png",
    },
    {
      id: 4,
      title: "E-Waste",
      image:
        "https://img.icons8.com/external-filled-color-icons-papa-vector/256/external-Electronic-Waste-battery-recycling-filled-color-icons-papa-vector.png",
    },
    {
      id: 5,
      title: "Metal",
      image:
        "https://img.icons8.com/external-others-pike-picture/256/external-metals-license-certificate-others-pike-picture.png",
    },
    {
      id: 6,
      title: "Organic",
      image:
        "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/256/external-recycle-vegan-and-vegetarian-flaticons-lineal-color-flat-icons.png",
    },
  ];
  return (
    <View>
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
          renderItem={({ item: category }) => (
            <View
              key={category.id}
              style={{
                marginRight: -5,
                paddingHorizontal: 20,
                paddingVertical: 20,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#E5E4E2",
                marginHorizontal: 20,
                borderRadius: 5,
              }}
            >
              <Image
                source={{ uri: category.image }}
                style={{ width: 100, height: 100, paddingBottom: 10 }}
              />
              <Text style={{ fontSize: 16, fontWeight: "500", color: "black" }}>
                {category.title}
              </Text>
            </View>
          )}
          keyExtractor={(category) => category.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment={"start"}
        />
    </View>
  );
};

export default WasteCatergories;
