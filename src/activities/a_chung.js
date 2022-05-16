import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableHighlight } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

class Chung extends Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        return (
            <View style={styles.dieuhuong}>
                <TouchableHighlight style={styles.nutdieuhuong} onPress={() => this.props.navigation.navigate('ThucHien')}>
                    <FontAwesome5 name="image" size={24} color="tomato" />
                </TouchableHighlight>
                <TouchableHighlight style={styles.nutdieuhuong} onPress={() => this.props.navigation.navigate('LuuTru')}>
                    <FontAwesome5 name="folder-open" size={24} color="tomato" />
                </TouchableHighlight>
                <TouchableHighlight style={styles.nutdieuhuong} onPress={() => this.props.navigation.navigate('KhamPha')}>
                    <FontAwesome5 name="compass" size={24} color="tomato" />
                </TouchableHighlight>
                <TouchableHighlight style={styles.nutdieuhuong} onPress={() => this.props.navigation.navigate('LuuTru')}>
                    <FontAwesome5 name="bell" size={24} color="tomato" />
                </TouchableHighlight>
                <TouchableHighlight style={styles.nutdieuhuong} >
                    <FontAwesome5 name="user-alt" size={24} color="tomato" />
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dieuhuong: {
        bottom: -62 ,
        backgroundColor: '#C4C4C4',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        left: 0,  
        right: 0 
    },

    nutdieuhuong: {
        flex: 1,
        margin: 'auto',
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
    }
});

export default Chung;