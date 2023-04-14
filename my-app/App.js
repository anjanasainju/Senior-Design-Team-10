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
import Product from "./components/Product";
import Paho from "paho-mqtt";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Header from "./header";
import styles from "./styles/AppStyles";
import HelpScreen from "./help";
import QRScreen from "./qrscreen";

//NEED TO WORK ON SENDING PARAM data (topic) from QR to publishMessage without changing screens
client = new Paho.Client("test.mosquitto.org", Number(8080), "G_NA");

client.connect();

// const database = [
//   "Milk",
//   "Pasta",
//   "Rice",
//   "Eggs",
//   "Apples",
//   "Applesauce",
//   "Rice Cakes",
//   "Red Wine",
//   "White Wine",
//   "Mushrooms",
//   "Mustard",
//   "Potato Chips",
//   "Tortilla Chips",
//   "Soy Milk",
// ];
var topic;

// const publishMessage = (productItems) => {
//   // const topic = route.params;

//   {
//     /*JSON.stringify makes list of the array */
//   }
//   console.log(productItems);
//   // console.log(JSON.stringify(productItems));
//   message = new Paho.Message(JSON.stringify(productItems));
//   // message.destinationName = "calvin-gna-test";
//   console.log("topic", topic);
//   message.destinationName = topic;
//   client.send(message);
// };

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
        <View style={styles.dropdownOptions}>
          <Text style={{ marginTop: 10, marginLeft: 5 }}>{item}</Text>
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
          marginTop: 30,
          // borderWidth: 2,
          // borderColor: "blue",
        }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <SafeAreaView>
            {/* <Text style = {{marginLeft:12, marginVertical:5, fontSize:12}}>Search</Text> */}
            <TextInput
              placeholder="Search..."
              value={product}
              onChangeText={onChangeText}
              style={styles.inputbox}
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
              navigation.navigate("Scan QR", { products: productItems })
            }
            style={styles.exportButton}
          >
            <View style={styles.exportButton}>
              <Text
                style={{ color: "#156e1f", fontWeight: "500", fontSize: 17 }}
              >
                Send List
              </Text>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={() => publishMessage(productItems)}>
            <View style={styles.exportButton}>
              <Text>Send List</Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
}

// function QRScreen({ route, navigation }) {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);
//   const products = route.params;
//   // const [data, setData] = useState("");
//   // console.log("Products:", products.products);

//   useEffect(() => {
//     const getBarCodeScannerPermissions = async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === "granted");
//     };

//     getBarCodeScannerPermissions();
//   }, []);

//   const publishMessage = (productItems) => {
//     {
//       /*JSON.stringify makes list of the array */
//     }
//     console.log("Products:", productItems.products);
//     // console.log(JSON.stringify(productItems));
//     var message = new Paho.Message(JSON.stringify(productItems));
//     // console.log("Message", message);

//     // message.destinationName = "calvin-gna-test";
//     console.log("topic", topic);
//     message.destinationName = topic;
//     client.send(message);
//   };
//   const handleBarCodeScanned = ({ type, data }) => {
//     setScanned(true);
//     // setData(data);
//     topic = data;
//     console.log("data from handle", data);
//     alert(`List sent to GNA!`);
//     navigation.navigate("Home");
//     // console.log("Products:", products);
//     publishMessage(products);
//     // alert(`${data} has been published!`);
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting for camera permission</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }
//   // if (scanned == true) {
//   //   publishMessage(productItems);
//   // }

//   return (
//     <View style={styles.container}>
//       <BarCodeScanner
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//         style={StyleSheet.absoluteFillObject}
//       />
//       {scanned && (
//         <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
//       )}
//     </View>
//   );
// }
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
            headerStyle: {
              backgroundColor: "#3bb34d",
            },
            // headerTintColor: ,
            headerShadowVisible: true,
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 25,
              fontFamily: "Roboto",
            },
            headerRight: () => (
              <Header
                navigation={navigation}
                style={{ backgroundColor: "#cfe8d2" }}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Scan QR"
          component={QRScreen}
          options={({ navigation }) => ({
            title: "Scan QR code",
            headerStyle: {
              backgroundColor: "#3bb34d",
            },
            // headerTintColor: ,
            headerShadowVisible: true,
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 25,
              fontFamily: "Roboto",
            },
            headerRight: () => (
              <Header
                navigation={navigation}
                style={{ backgroundColor: "#cfe8d2" }}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Help"
          component={HelpScreen}
          options={({ navigation }) => ({
            title: "Help with GNA",
            headerStyle: {
              backgroundColor: "#3bb34d",
            },
            // headerTintColor: ,
            headerShadowVisible: true,
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 25,
              fontFamily: "Roboto",
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const database = [
  "Onions",
  "Apples",
  "Oranges",
  "Tomatoes",
  "Lettuce",
  "Spinach",
  "Bananas",
  "Garlic",
  "Carrots",
  "Pears",
  "Blueberries",
  "Juice, Refrigerated",
  "Milk",
  "Yogurt",
  "Applesauce",
  "Barbecue Sauce",
  "Beans, Baked",
  "Bread & Buns",
  "Cheese",
  "Condiments",
  "Croutons",
  "Eggs",
  "Fruits, Canned",
  "Gluten Free",
  "Gravy & Sauces",
  "Honey",
  "Jams & Jellies",
  "Ketchup",
  "Marinades",
  "Mayonnaise",
  "Mushrooms",
  "Mustard",
  "Olives",
  "Peanut Butter",
  "Pickles",
  "Potatoes, Dry Mix",
  "Salad Dressings",
  "Snack Cakes",
  "Specialty Condiments",
  "Specialty Dressing",
  "Specialty Pickle & Olive",
  "Stuffing",
  "Vegetables, Canned",
  "Vinegar",
  "Beer",
  "Energy Drinks",
  "Soft Drinks",
  "Specialty Beverage",
  "Tea, Ready To Drink",
  "Nuts, Snack",
  "Popcorn",
  "Potato Chips",
  "Pretzels",
  "Rice Cakes",
  "Sparkling Water",
  "Specialty Nuts & Meat Snacks",
  "Sport Drinks",
  "Tortilla Chips",
  "Water, Bottled",
  "Asian",
  "Asian (Specialty)",
  "Boxed Dinners",
  "Broth & Bouillon",
  "Chili & Canned Meat",
  "Dry Beans",
  "Fish, Canned",
  "Free From & Raw",
  "Hispanic Foods",
  "Italian Foods",
  "Meats, Canned",
  "Pasta",
  "Pasta, Canned",
  "Pizza Mix",
  "Rice",
  "Rice Mixes",
  "Soups",
  "Spaghetti Sauce",
  "Specialty Grains",
  "Specialty Pasta & Sauce",
  "Specialty Salsa",
  "Specialty Soup",
  "Tomato Sauce",
  "Tuna Fish",
  "Artificial Sweeteners",
  "Baking (Specialty)",
  "Baking Supplies",
  "Birthday Candles",
  "Bread Crumbs",
  "Cake Mixes & Frostings & Decorations",
  "Candy",
  "Corn Meal",
  "Drink Boxes",
  "Flour",
  "Foil Bakeware",
  "Food Storage",
  "Fruits, Dried",
  "Fry Mixes",
  "Gelatin & Puddings",
  "Housewares",
  "Juice Pouches",
  "Juice, Bottled",
  "Marshmallows",
  "Milk, Canned & Dry",
  "Molasses",
  "Nuts, Baking",
  "Oils & Shortening",
  "Pancake Mixes & Syrup",
  "Pie Crust Mix",
  "Pie Filling",
  "Powdered Drink Mixes",
  "Pudding",
  "Raisins & Prunes",
  "Salt, Table",
  "Specialty Candy",
  "Specialty Oil",
  "Specialty Spices",
  "Spices & Extracts",
  "Sugars",
  "Syrups",
  "Vegetable Oil",
  "Water Enhancers",
  "Aluminum Foil",
  "Bags & Wraps",
  "Bath Tissue",
  "Canning Supplies",
  "Cereal",
  "Energy Bars",
  "Facial Tissue",
  "Granola Bars",
  "Matches",
  "Napkins",
  "Oatmeal",
  "Paper Cups & Plates",
  "Paper Towels",
  "Plastic Tableware",
  "Plastic Wrap",
  "Pop Tarts",
  "Soy Milk",
  "Specialty Cereal",
  "Stationery",
  "Toothpicks",
  "Trash Bags",
  "Air Fresheners",
  "Automotive",
  "Bird Seed",
  "Bleach",
  "Brooms",
  "Candles",
  "Cat Food",
  "Cat Litter",
  "Charcoal & Firelogs",
  "Cleaning Supplies",
  "Detergent",
  "Dish Soap",
  "Dog Food",
  "Electrical & Hardware",
  "Fabric Softener",
  "Furniture Polish",
  "Hardware",
  "Insecticides",
  "Laundry Supplies",
  "Light Bulbs",
  "Mops",
  "Oven Cleaners",
  "Pet Food & Supplies",
  "Scouring Pads",
  "Seasonal Items",
  "Softener Salt",
  "Sponges",
  "Tape & Glue",
  "Waxes & Polish",
  "Breakfast (Frozen)",
  "Cocoa",
  "Coffee & Creamer & Filters",
  "Cones & Toppings",
  "Frozen Breakfast",
  "Frozen Dinners",
  "Frozen Meals",
  "Frozen Meats",
  "Fruit, Frozen",
  "Garlic Bread",
  "Ice Cream",
  "Mixers",
  "Pizza, Frozen",
  "Tea",
  "Red Wine",
  "White Wine",
  "Vodka",
  "Whiskey",
  "Antacids",
  "Baby Food & Needs",
  "Cold Remedies",
  "Cosmetics",
  "Deodorant",
  "Diapers & Baby Wipes",
  "Eye Care",
  "Feminine Care",
  "First Aid",
  "Foot Care",
  "Hair Care",
  "Incontinence",
  "Laxatives",
  "Liquor",
  "Mouthwash",
  "Natural Beauty Care",
  "Pain Relief",
  "Protein Powder",
  "Sanitary Napkins",
  "Shampoo",
  "Shaving Cream",
  "Shoe Polish & Laces",
  "Skin Care",
  "Slimfast",
  "Soap, Bar",
  "Toothpaste",
  "Vitamins",
  "Cookies & Crackers",
  "Donuts",
  "Snack Crackers",
  "Specialty Cookie & Cracker",
  "Tonic Water",
  "Wine & Wine Coolers",
  "Batteries",
  "Ice, Bagged",
  "Magazines",
];
export default App;
