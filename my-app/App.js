import React,{useState, useEffect} from "react";
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback,SafeAreaView,FlatList, Pressable, KeyboardAvoidingView, Keyboard, Button} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import Product from "./components/Product";
import Paho from "paho-mqtt"
import { BarCodeScanner } from 'expo-barcode-scanner';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Header from "./header";

//NEED TO WORK ON SENDING PARAM data (topic) from QR to publishMessage without changing screens
client = new Paho.Client(
  "test.mosquitto.org",
  Number(8080),
  "G_NA"
);
 

client.connect();

const database = [
  "Milk", "Pasta", "Rice", "Eggs", "Apples","Applesauce", "Rice Cakes"
]
var topic;

function HomeScreen({route,navigation}) {
  const [product, setProduct] = useState();
  const [productItems, setProductItems] = useState([]);
  
  const handleAddProduct = () =>{
    Keyboard.dismiss();
    setProductItems([...productItems, product]) /*Add initial items plus new one in the array */
    setProduct(null);
  }

  const publishMessage = (productItems) =>{
    // const topic = route.params;
    
    {/*JSON.stringify makes list of the array */}
    console.log(productItems);
    // console.log(JSON.stringify(productItems));
    message = new Paho.Message(JSON.stringify(productItems));
    // message.destinationName = "calvin-gna-test";
    console.log("topic",topic);
    message.destinationName = topic;
    client.send(message);
  } 

  const [input, setInput] = useState();
  const [data, setData] =useState();
  const [modalVisible, setModalVisible] = useState(false);
  
  const getItemText = (item) =>{
    return (
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <View style={{marginLeft:15, flexShrink:1, width: 300, borderWidth:1, padding:5, backgroundColor:"green", elevation:2}}>
          <Text>{item}</Text>
        </View>

      </View>
    )
  }
  const onChangeText = (text)=>{
    setInput(text)
    if (text.length == 0) return setData([]);
    
    const result = database.filter(checkDatabase);
    if (result.length > 0) setData(result)
    console.log(result)
    
  }
  const checkDatabase = (item) =>{
    return item.includes(input)
  }
  const selectItem = (item) => {
    setInput(item)
  }

  return (
    <View style={styles.background}>
     { /*starts the list from search bar*/}

      {/* <View style={styles.listWrapper}>
      <View>
        <KeyboardAvoidingView style={styles.searchWrapper}>
        <TextInput
          style={styles.inputbox}
          placeholder ="Search..."
          value={product}
          onChangeText={text =>setProduct(text)}
        /> */}
        <View style= {{flexDirection:'row', marginTop:10}}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView>
        {/* <Text style = {{marginLeft:12, marginVertical:5, fontSize:12}}>Search</Text> */}
          <TextInput
          placeholder="Search"
          value={input}
          onChangeText={onChangeText}
          style={{
            height:50,
            marginHorizontal:12,
            borderWidth:1,
            paddingHorizontal:10,
            borderRadius:5,
            width:300
          }}
          />
            <FlatList
              data = {data}
              style={{zIndex:99}}
              renderItem = {({item, index}) =>(
                <Pressable
                  // onPress={() => alert("Item" + item)}
                  onPress={() => selectItem(item)}
                >
                  {getItemText(item)}
                </Pressable>
              )} 
              >
            </FlatList>
      </SafeAreaView>
      
      </TouchableWithoutFeedback>

      <TouchableOpacity onPress={() =>handleAddProduct()}>
        <View style={styles.addItemWrapper}>
          <Text style={styles.addItem}>+</Text>
        </View>
      </TouchableOpacity>
      </View>
      {/* </KeyboardAvoidingView> */}
      {/*<Ionicons name="search-outline" size={20} color={"#fff"} justify />*/}
      {/* </View> */}
      <View style={{position:'absolute', zIndex:-90}}>
      <Text style={styles.sectionTitle}> Grocery Items </Text>
      {/*Grocery list items start*/}
      
       {/* </View> */}
      <ScrollView showsVerticalScrollIndicator={true}>
      <View style={styles.items}>
        {
          productItems.map((item, index) =>{
            return <Product key={index} text={item} />
          })
        }
      </View>
      </ScrollView>  
      {/*Export Button*/}
      {/* <TouchableOpacity onPress={() => console.log(JSON.stringify(productItems))}> */}
      <View style={{flexDirection:'row', alignContent:'space-between'}}>
      <TouchableOpacity onPress={() => navigation.navigate('QR')}>
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

function QRScreen({route, navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  // const [data, setData] = useState("");

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // setData(data);
    topic = data;
    console.log("data from handle",data);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // navigation.navigate("Home",data);    
    
  };
  
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

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
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
    // </View>
  );
}
const Stack = createNativeStackNavigator();

function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title:"GNA",
            headerRight: () => <Header navigation={navigation} />,
            fontSize:30
          })}
        />
        <Stack.Screen name="QR" component={QRScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#E8EAED',
    alignContent:'center'
  },

  listWrapper:{
    paddingTop: 30,
    paddingHorizontal: 10,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop:70,
    marginLeft:10
  },

  items: {
    marginTop: 30,
  },

  exportButton:{
    backgroundColor: '#4abf0f',
    width:150,
    alignItems:'center',
    paddingHorizontal:10,
    marginLeft:30,
    marginTop: 500,
    height:100,
    justifyContent:'center',
    borderRadius: 20,
  },
  searchWrapper:{
    position:'absolute',
    width:'100%',
    justifyContent:'space-around',
    flexDirection:'row',
    alignItems: 'center'
  },
  inputbox:{
    paddingVertical:10,
    paddingHorizontal:20,
    backgroundColor:'#999',
    borderColor:'black',
    borderWidth:1,
    width:290,
    borderRadius: 40
    // marginBottom
  },
  addItemWrapper:{
    width: 50,
    height: 50,
    borderRadius:60,
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#4abf0f',
  },
  addItem:{
    // backgroundColor:''
  },
  container:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    // height: 1000,
    // width: 300
  }
});
