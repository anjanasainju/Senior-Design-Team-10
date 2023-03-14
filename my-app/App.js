import React,{useState, useEffect} from "react";
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Keyboard, Button} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import Product from "./components/Product";
import Paho from "paho-mqtt"
import { BarCodeScanner } from 'expo-barcode-scanner';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


client = new Paho.Client(
  "test.mosquitto.org",
  Number(8080),
  "G_NA"
);
 

client.connect();

function HomeScreen({navigation}) {
  const [product, setProduct] = useState();
  const [productItems, setProductItems] = useState([]);
  
  const handleAddProduct = () =>{
    Keyboard.dismiss();
    setProductItems([...productItems, product]) /*Add initial items plus new one in the array */
    setProduct(null);
  }

  const publishMessage = (productItems) =>{
    {/*JSON.stringify makes list of the array */}
    console.log(productItems);
    console.log(JSON.stringify(productItems));
    message = new Paho.Message(JSON.stringify(productItems));
    message.destinationName = "calvin-gna-test";
    client.send(message);
  }

  return (
    <View style={styles.background}>
     { /*starts the list from search bar*/}
      <View style={styles.listWrapper}>
      <View>
        <KeyboardAvoidingView style={styles.searchWrapper}>
        <TextInput
          style={styles.inputbox}
          placeholder ="Search..."
          value={product}
          onChangeText={text =>setProduct(text)}
        />
        <TouchableOpacity onPress={() =>handleAddProduct()}>
          <View style={styles.addItemWrapper}>
            <Text style={styles.addItem}>+</Text>
          </View>
        </TouchableOpacity>
        </KeyboardAvoidingView>
        {/*<Ionicons name="search-outline" size={20} color={"#fff"} justify />*/}
      </View>
      <Text style={styles.sectionTitle}> Grocery Items </Text>
      {/*Grocery list items start*/}
      
       </View>
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
      {/* <TouchableOpacity onPress={() => publishMessage(productItems)}> */}
      <TouchableOpacity onPress={() => navigation.navigate('QR')}>
        <View style={styles.exportButton}>
          
          <Text>Export</Text>
          
        </View>
      </TouchableOpacity>
    </View>
  );
}

function QRScreen({route, navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
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
  },

  items: {
    marginTop: 30,
  },

  exportButton:{
    backgroundColor: '#4abf0f',
    width:'50%',
    alignItems:'center',
    paddingHorizontal:20,
    margin:20,
    height:40,
    justifyContent:'center',
    borderRadius: 20,
    marginLeft:90
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
    backgroundColor:'#888',
  },
  addItem:{

  },
  container:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  }
});
