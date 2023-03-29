import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ImageTextContainer = ({ data, icon }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Icon name={icon} size={20} color="grey" />
      <Text style={styles.textStyle}>{data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "400",
    color: "grey",
    marginHorizontal: 10,
    marginTop: 0
  },
});

export default ImageTextContainer;
