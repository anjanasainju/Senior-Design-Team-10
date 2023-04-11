import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, SafeAreaView } from "react-native";

export default function Header({ navigation }) {
  return (
    <View style={{ flexDirection: "row", height: 80, top: 10 }}>
      {/* <SafeAreaView> */}
      <TouchableOpacity
        onPress={() => navigation.navigate("QR")}
        style={{
          backgroundColor: "#4abf0f",
          height: 30,
          position: "absolute",
          top: 10,
          margin: 20,
          borderRadius: 10,
          width: 120,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            alignSelf: "center",
          }}
        >
          Connect to GNA
        </Text>
      </TouchableOpacity>
      <Text style={{ position: "absolute", top: 30, right: 150, fontSize: 25 }}>
        GNA
      </Text>
      <Ionicons
        name="help-circle-outline"
        style={{ position: "absolute", margin: 20, right: 0, top: 10 }}
        size={33}
      />
      {/* </SafeAreaView> */}
    </View>
  );
}
