import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

const Product = (props) => {

    return(
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
            {/*Quantity */}
            <View style={styles.itemRight}>
            <TouchableOpacity>
                <View style={styles.quanitityWrapper}> 
                {/*make different styles for plus, minus and whole right section*/}
                    <Text style={styles.quantity}>-</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.quanitityWrapper}>
                    <Text style={styles.quantity}>+</Text>
                </View>
            </TouchableOpacity>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor:'#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginLeft:20,
        marginRight:20

    },
    itemLeft: {
        flexDirection:'row',
        alignItems:'center',
        flexWrap: 'wrap',
    },
    itemText: {
        maxWidth: '100%'

    },
    itemRight:{
        flexDirection:'row',
    },
    quanitityWrapper: {
        width: 24,
        height: 24,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems:'center',
        marginLeft:20,
    },
    quantity: {
        fontSize: 18
    }
});
export default Product;