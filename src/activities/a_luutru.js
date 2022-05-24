import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, FlatList, SafeAreaView, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import  ToDoStorage  from '../component/ToDoStorage';
import Ionicons from '@expo/vector-icons/Ionicons';
import Dieuhuong from './a_chung'
import * as LOCAL from '../model/API/SQLite'

 
export default function LuuTru({ navigation }) {

    const [ket_qua, thay_ket_qua] = useState(null);


	useEffect(()=>{
        LOCAL.APILayTatCa((res) => {
            var kq = []
            for (var i = 0; i < res.length; i++) {
                var a = JSON.parse(res[i].json)
                a['on'] = res[i].on
                a['id'] = res[i].list_id
                kq.push(a)
            }
            thay_ket_qua(kq)
        })
    }, []);

	return (
        <View style={{flex: 1, paddingTop: 25}}>
            <View style={{flex: 0.92}}>
                <ScrollView>
                    <View styles = {styles.container}>
                        <View style={styles.typeStorage}>
                            {ket_qua && ket_qua
                            .map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => navigation.navigate('LBanGhi', {json: item, navigation: navigation})}>
                                        <ToDoStorage item={item}/>
                                    </TouchableOpacity>
                                )
                            })}
                           <Ionicons name="md-add-circle-sharp" size={40} style={styles.add}/>
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
		flex: 1,
        paddingTop: 20,
	},
	menu: {
        position: 'absolute',
        top: 40,
        left: 40,
        width: 100,
        height: 100,
        backgroundColor: 'red'
    },
    add: {
        color: "#4682B4",
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    typeStorage: {
        paddingHorizontal: 15,
    }
});
