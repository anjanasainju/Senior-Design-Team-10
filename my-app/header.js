import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, SafeAreaView } from "react-native";

export default function Header({ navigation }) {
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate("Help")}>
        <View
          style={{
            backgroundColor: "#d1e8d3",
            borderRadius: 40,
            height: 40,
            width: 40,
            justifyContent: "center",
          }}
        >
          <Ionicons
            name="help-circle-outline"
            size={40}
            style={{ color: "#3bb34d" }}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
