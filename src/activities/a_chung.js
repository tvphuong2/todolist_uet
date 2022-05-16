import React, {Component} from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableHighlight} from 'react-native';

class Chung extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (
            <View style={styles.dieuhuong}>
            <TouchableHighlight style={styles.nutdieuhuong} onPress={() => this.props.navigation.navigate('ThucHien')}>
                <Text>CH</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.nutdieuhuong} onPress={() => this.props.navigation.navigate('LuuTru')}>
                <Text>LU</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.nutdieuhuong} onPress={() => this.props.navigation.navigate('KhamPha')}>
                <Text>KH</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.nutdieuhuong}>
                <Text>TB</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.nutdieuhuong}>
                <Text>TK</Text>
            </TouchableHighlight>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    dieuhuong: {
        flex: 0.08, 
        flexDirection:'row', 
        backgroundColor:'#999',  
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,  
        right: 0
    },

    nutdieuhuong: {
        flex:1,
        margin: 'auto',
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
    }
  });

export default Chung;