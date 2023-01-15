import { StatusBar } from 'expo-status-bar';
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.background}>
      <View style={styles.searchbar}>
        <View>
        <TextInput
          placeholder ="Search..."
        />
        </View>
        <Ionicons name="search-outline" size={20} color={"#fff"} justify />
        
       
      
      <ScrollView>
        
      </ScrollView>
      <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  searchbar: {
    flexDirection:'row',
    backgroundColor: "#999",
    padding: 10,
    height: 50,
    width: "90%",
    borderRadius: 8,
    marginBottom: 15,
    marginTop: 50,
  },
});
