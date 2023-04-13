import React from "react";
import { Text, SafeAreaView, FlatList, ScrollView, View } from "react-native";
import { StyleSheet } from "react-native";

export default function HelpScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <Text style={styles.header}>How to make your grocery list:</Text>
        <Text style={styles.instruction}>
          1. Search for Grocery items in the search bar
        </Text>
        <Text style={styles.instruction}>
          2. Choose the item you want to add from the suggested list
        </Text>
        <Text style={styles.instruction}>
          3. Press "+" to add the item to your grocery list
        </Text>
        <Text style={styles.instruction}>
          4. You could remove items from your list by pressing the trash icon
          beside that item
        </Text>
        <Text style={styles.header}>How to send list to GNA:</Text>
        <Text style={styles.instruction}>
          1. Press "Get the list" button on the touchscreen display mounted on
          the shopping cart
        </Text>
        <Text style={styles.instruction}>
          2. Press "Send list to GNA" Button
        </Text>
        <Text style={styles.instruction}>
          3. Scan the QR code on the touchscreen display
        </Text>
        <Text style={styles.instruction}>4. List should be sent!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  instruction: {
    fontSize: 14,
    padding: 5,
  },
});
