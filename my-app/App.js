import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import Product from "./components/Product";

export default function App() {
  return (
    <View style={styles.background}>
     { /*starts the list from search bar*/}
      <View style={styles.listWrapper}>
      <View style={styles.searchbar}>
        <View>
        <TextInput
          placeholder ="Search..."
        />
        </View>
        <Ionicons name="search-outline" size={20} color={"#fff"} justify />
      </View>
      <Text style={styles.sectionTitle}> Grocery Items </Text>
      {/*Grocery list items start*/}
      <View style={styles.items}>
        <Product text={'Oranges'}/>
        <Product text={'Milk'}/> 
      </View>
                 
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },

  listWrapper:{
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  searchbar: {
    flexDirection:'row',
    backgroundColor: "#999",
    padding: 10,
    height: 50,
    width: "100%",
    borderRadius: 8,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  items: {
    marginTop: 30,
  },
});
