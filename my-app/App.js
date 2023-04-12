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
import { Ionicons } from "@expo/vector-icons";
import Product from "./components/Product";
import Paho from "paho-mqtt";
import { BarCodeScanner } from "expo-barcode-scanner";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Header from "./header";
import styles from "./styles/AppStyles";

//NEED TO WORK ON SENDING PARAM data (topic) from QR to publishMessage without changing screens
client = new Paho.Client("test.mosquitto.org", Number(8080), "G_NA");

client.connect();

const database = [
  "Milk",
  "Pasta",
  "Rice",
  "Eggs",
  "Apples",
  "Applesauce",
  "Rice Cakes",
  "Red Wine",
  "White Wine",
  "Mushrooms",
  "Mustard",
  "Potato Chips",
  "Tortilla Chips",
  "Soy Milk",
];
var topic;

const publishMessage = (productItems) => {
  // const topic = route.params;

  {
    /*JSON.stringify makes list of the array */
  }
  console.log(productItems);
  // console.log(JSON.stringify(productItems));
  message = new Paho.Message(JSON.stringify(productItems));
  // message.destinationName = "calvin-gna-test";
  console.log("topic", topic);
  message.destinationName = topic;
  client.send(message);
};

function HomeScreen({ route, navigation }) {
  const [product, setProduct] = useState();
  const [productItems, setProductItems] = useState([]);
  const handleAddProduct = () => {
    Keyboard.dismiss();
    if (database.includes(product)) {
      if (productItems.includes(product)) {
        alert("Item already exist in the list");
      } else {
        setProductItems([
          ...productItems,
          product,
        ]); /*Add initial items plus new one in the array */
        setProduct(null);
      }
    } else {
      alert("No such product exist. Choose from the list.");
    }
  };

  const [data, setData] = useState();
  const [ItemSelected, setItemSelected] = useState(false);
  const getItemText = (item) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            marginLeft: 15,
            flexShrink: 1,
            width: 300,
            borderWidth: 1,
            padding: 5,
            backgroundColor: "gray",
            elevation: 2,
          }}
        >
          <Text>{item}</Text>
        </View>
      </View>
    );
  };
  const onChangeText = (text) => {
    setProduct(text);
    setItemSelected(false);

    if (text.length == 0) return setData([]);

    const result = database.filter(checkDatabase);
    if (result.length > 0) setData(result);
    console.log(result);
  };
  const checkDatabase = (item) => {
    return item.includes(product);
  };
  const selectItem = (item) => {
    setProduct(item);
    setItemSelected(true);
  };

  return (
    <View style={styles.background}>
      {/*starts the list from search bar*/}
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          // borderWidth: 2,
          // borderColor: "blue",
        }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <SafeAreaView>
            {/* <Text style = {{marginLeft:12, marginVertical:5, fontSize:12}}>Search</Text> */}
            <TextInput
              placeholder="Search"
              value={product}
              onChangeText={onChangeText}
              style={{
                height: 50,
                marginHorizontal: 12,
                borderWidth: 1,
                paddingHorizontal: 10,
                borderRadius: 5,
                width: 300,
              }}
            />

            <FlatList
              data={data}
              style={{ zIndex: 99 }}
              renderItem={({ item, index }) =>
                !ItemSelected && (
                  <Pressable
                    // onPress={() => alert("Item" + item)}
                    onPress={() => selectItem(item)}
                  >
                    {getItemText(item)}
                  </Pressable>
                )
              }
            ></FlatList>
          </SafeAreaView>
        </TouchableWithoutFeedback>

        <TouchableOpacity onPress={() => handleAddProduct()}>
          <View style={styles.addItemWrapper}>
            <Text style={styles.addItem}>+</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* ------------------------------------------------------------------------------ */}
      {/* </KeyboardAvoidingView> */}
      {/*<Ionicons name="search-outline" size={20} color={"#fff"} justify />*/}
      {/* </View> */}
      <View
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          bottom: 10,
          right: 0,
          zIndex: -90,
          // borderWidth: 5,
        }}
      >
        <View
          style={{
            // borderWidth: 2,
            // borderColor: "pink",
            position: "absolute",
            top: 0,
            bottom: 100,
          }}
        >
          <Text style={styles.sectionTitle}> Grocery Items </Text>
          {/*Grocery list items start*/}

          {/* </View> */}
          <ScrollView showsVerticalScrollIndicator={true}>
            <View style={styles.items}>
              {productItems.map((item, index) => {
                return (
                  <Product key={index} text={item} products={productItems} />
                );
              })}
            </View>
          </ScrollView>
        </View>
        {/*Export Button*/}
        {/* <TouchableOpacity onPress={() => console.log(JSON.stringify(productItems))}> */}
        <View
          style={{
            flexDirection: "row",
            // borderWidth: 1,
            position: "absolute",

            bottom: 10,
            left: 0,
            right: 0,
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("QR", { products: productItems })
            }
            style={styles.exportButton}
          >
            <View style={styles.exportButton}>
              <Text>Connect to GNA</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => publishMessage(productItems)}>
            <View style={styles.exportButton}>
              <Text>Send List</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function QRScreen({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const products = route.params;
  // const [data, setData] = useState("");
  console.log("Products:", products.products);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const publishMessage = (productItems) => {
    // const topic = route.params;

    {
      /*JSON.stringify makes list of the array */
    }
    console.log("Products:", productItems.products);
    // console.log(JSON.stringify(productItems));
    var messageewww = new Paho.Message(JSON.stringify(productItems));
    console.log("Messagewwee", messageewww);

    // message.destinationName = "calvin-gna-test";
    console.log("topic", topic);
    messageewww.destinationName = topic;
    client.send(messageewww);
  };
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // setData(data);
    topic = data;
    console.log("data from handle", data);
    alert(`Conected to GNA!`);
    navigation.navigate("Home");
    console.log("Products:", products);
    publishMessage(products);
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
    // <View>
    // <View style={styles.container}>
    //   <Text>Scan the QR code on the cart to send your list</Text>
    // </View>
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
    // </View>
  );
}
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerTitleAlign: "center" }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "GNA",
            headerRight: () => <Header navigation={navigation} />,
            // position: "absolute",
            fontSize: 30,
          })}
        />
        <Stack.Screen name="QR" component={QRScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
