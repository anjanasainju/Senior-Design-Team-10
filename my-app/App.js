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
import { BarCodeScanner } from "expo-barcode-scanner";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import styles from "./styles/AppStyles";
import Header from "./header";
import HelpScreen from "./help";
import QRScreen from "./qrscreen";

client = new Paho.Client("test.mosquitto.org", Number(8080), "G_NA");

client.connect();

function HomeScreen({ route, navigation }) {
  const [product, setProduct] = useState();
  const [productItems, setProductItems] = useState([]);

  //Add grocery items to the productItems list
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
        // setProduct(null);
      }
      setProduct(null);
    } else {
      alert("No such product exist. Choose from the list.");
    }
  };

  //Delete specific item from the productItems list
  //Making a copy newList and delete from it and setProductItems to whatever is in newList
  const handleDeleteProduct = (item) => {
    // console.log("Chosen Item ", item);
    var newList = productItems;
    var index = newList.indexOf(item);
    // console.log("New List:", newList);
    // console.log("Index", index);
    newList.splice(index, 1);
    // console.log("After delete", newList);
    setProductItems([...newList]);
    // console.log("ProductItems: ", productItems);
  };

  const [data, setData] = useState();
  const [ItemSelected, setItemSelected] = useState(false);

  //shows dropdown options
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
    Keyboard.dismiss();
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
        {/* <TouchableWithoutFeedback> */}
        <SafeAreaView>
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
                  onPress={() => {
                    selectItem(item);
                    Keyboard.dismiss();
                  }}
                >
                  {getItemText(item)}
                </Pressable>
              )
            }
          ></FlatList>
        </SafeAreaView>
        {/* </TouchableWithoutFeedback> */}

        <TouchableOpacity onPress={() => handleAddProduct()}>
          <View style={styles.addItemWrapper}>
            <Text style={styles.addItem}>+</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* ------------------------------------------------------------------------------ */}
      {/* </KeyboardAvoidingView> */}
      {/*<Ionicons name="search-outline" size={20} color={"#fff"} justify />*/}
      <View style={styles.listAndButton}>
        <View style={styles.groceryList}>
          <Text style={styles.sectionTitle}> Grocery Items </Text>
          {/*Grocery list items start*/}

          <ScrollView showsVerticalScrollIndicator={true}>
            <View style={styles.items}>
              {productItems.map((item, index) => {
                return (
                  <Product
                    key={index}
                    text={item}
                    deletefunction={handleDeleteProduct}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
        {/*Send Button*/}
        <View style={styles.sendButtonPosition}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Scan QR", { products: productItems })
            }
            style={styles.sendButton}
          >
            <Text style={styles.sendButtonText}>Send List</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
            headerStyle: {
              backgroundColor: "#3bb34d",
            },
            // headerTintColor: ,
            headerShadowVisible: true,
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 25,
              fontFamily: "Roboto",
              color: "#054a0c",
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
              color: "#054a0c",
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
              color: "#054a0c",
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
