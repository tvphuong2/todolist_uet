import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, FlatList, SafeAreaView, ActivityIndicator, ScrollView, TouchableHighlight } from 'react-native';
import Dieuhuong from './a_chung'
 
export default function LuuTru({ navigation }) {

	useEffect(()=>{});

	return (
        <View style={{flex: 1}}>
            <View style={{flex: 0.92}}>
                <ScrollView>
                    <View styles = {styles.container}>
                        <View>
                            <Text>hmmmmm</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Dieuhuong navigation = {navigation}/>
        </View>  
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	menu: {
        position: 'absolute',
        top: 40,
        left: 40,
        width: 100,
        height: 100,
        backgroundColor: 'red'
    },
});
