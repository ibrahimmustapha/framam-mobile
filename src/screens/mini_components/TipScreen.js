import { FlatList, Image, Text, View } from "react-native";

const TipScreen = () => {
  const tipsData = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet",
      desc: "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      icon: "https://img.icons8.com/stickers/256/dining-room.png",
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
                backgroundColor: "#fff",
                paddingHorizontal: 20,
                marginVertical: 10,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Image
                source={{ uri: item.icon }}
                style={{ width: 60, height: 60 }}
              />
              <View style={{ width: "80%" }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    color: "black",
                    paddingVertical: 5,
                  }}
                >
                  {item.title}
                </Text>
                <Text numberOfLines={1}>{item.desc}</Text>
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
