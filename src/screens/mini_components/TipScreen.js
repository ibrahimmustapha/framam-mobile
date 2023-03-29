import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const TipScreen = () => {
  const tipsData = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet",
      desc: "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      icon: "https://cdn-icons-png.flaticon.com/512/4426/4426791.png",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet",
      desc: "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      icon: "https://img.icons8.com/emoji/256/bowl-with-spoon-emoji.png",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet",
      desc: "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      icon: "https://img.icons8.com/officel/256/litter-disposal.png",
    },
    {
      id: 4,
      title: "Lorem ipsum dolor sit amet",
      desc: "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      icon: "https://img.icons8.com/fluency/256/full-recycle-bin.png",
    },
  ];
  return (
    <View style={{ marginHorizontal: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 30,
          marginBottom: 5,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "500" }}>
          Eco-friendly tips
        </Text>
        <Text style={{ fontSize: 17, fontWeight: "500", color: "green" }}>
          See All
        </Text>
      </View>
      <View style={{}}>
        <FlatList
          data={tipsData}
          renderItem={({ item }) => (
            <View
              key={item.id}
              style={{
                flex: 1,
                backgroundColor: "#dee2e6",
                paddingHorizontal: 7,
                marginVertical: 10,
                flexDirection: "row",
                padding: 20,
                borderRadius: 10
              }}
            >
              <Image
                source={{ uri: "https://img.icons8.com/color/256/keep-clean.png" }}
                style={{ width: 50, height: 50 }}
              />
              <View
                style={{ width: "80%", paddingVertical: 4, paddingLeft: 8 }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    color: "#000",
                    paddingBottom: 4,
                  }}
                >
                  {item.title}
                </Text>
                <Text numberOfLines={1} style={{ color: "grey", fontSize: 14 }}>
                  {item.desc}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(tips) => tips.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default TipScreen;
