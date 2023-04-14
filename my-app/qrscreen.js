import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  Button,
} from "react-native";
import styles from "./styles/AppStyles";
import Paho from "paho-mqtt";

var topic;
export default function QRScreen({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const products = route.params;
  // const [data, setData] = useState("");
  // console.log("Products:", products.products);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const publishMessage = (productItems) => {
    {
      /*JSON.stringify makes list of the array */
    }
    console.log("Products:", productItems.products);
    // console.log(JSON.stringify(productItems));
    var message = new Paho.Message(JSON.stringify(productItems));
    // console.log("Message", message);

    // message.destinationName = "calvin-gna-test";
    console.log("topic", topic);
    message.destinationName = topic;
    client.send(message);
  };
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // setData(data);
    topic = data;
    console.log("data from handle", data);
    navigation.navigate("Home");
    // console.log("Products:", products);
    publishMessage(products);
    alert(`List sent to GNA!`);
    // alert(`${data} has been published!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  // if (scanned == true) {
  //   publishMessage(productItems);
  // }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}
