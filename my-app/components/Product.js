import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Product = (props) => {
  //get a deletefunction prop from App.js
  // send the product name for which trash ico has been pressed
  const handleDeleteItem = () => {
    props.deletefunction(props.text);
  };
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <TouchableOpacity style={styles.itemRight} onPress={handleDeleteItem}>
        <Ionicons
          name="trash-outline"
          size={28}
          color="#f0493a"
          //   onPress={() => deleteProducts()}
        />
      </TouchableOpacity>
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
    alignItems: "center",
    flexWrap: "wrap",
  },
  itemText: {
    maxWidth: "100%",
    color: "#054a0c",
    fontSize: 15,
  },
  itemRight: {},
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
