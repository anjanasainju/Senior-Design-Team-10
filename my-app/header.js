import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, SafeAreaView } from "react-native";

export default function Header({ navigation }) {
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate("Help")}>
        <View
          style={{
            // backgroundColor: "#d1e8d3",
            borderRadius: 40,
            // padding: 20,
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <Ionicons
            name="help-circle-outline"
            size={40}
            style={{
              color: "#3bb34d",
              backgroundColor: "#d1e8d3",
              textAlign: "center",
              lineHeight: 40,
              borderRadius: 30,
            }}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
