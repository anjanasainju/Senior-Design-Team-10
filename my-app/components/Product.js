import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

// const deleteProducts = (index) => {
//   prod.splice(index, 1);
// };
const Product = (props) => {
  //   const prod = props.products;
  //   console.log(prod);

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View style={styles.itemRight}>
        <Ionicons
          name="trash-outline"
          size={28}
          color="#f0493a"
          //   onPress={() => deleteProducts()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#e9f2ea",
    // backgroundColor: "#7cc485",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  itemText: {
    maxWidth: "100%",
    color: "#054a0c",
    fontSize: 15,
  },
  itemRight: {
    flexDirection: "row",
  },
  quanitityWrapper: {
    width: 24,
    height: 24,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  quantity: {
    fontSize: 18,
  },
});
export default Product;
