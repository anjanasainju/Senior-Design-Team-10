import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, SafeAreaView } from "react-native";

export default function Header({ navigation }) {
  return (
    <SafeAreaView>
      {/* <TouchableOpacity onPress={() => navigation.navigate("QR")} style={{ backgroundColor:'green', height: 30}}>
      <Text>Connect to GNA</Text>
      </TouchableOpacity> */}
        <Ionicons name="help-circle-outline" size={33} />
        
    </SafeAreaView>
  );
}
