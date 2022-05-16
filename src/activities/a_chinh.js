import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, FlatList, SafeAreaView, ActivityIndicator, ScrollView, TouchableHighlight } from 'react-native';
import {dangNhap, APILayBanGhi, APILayBuoc, APILayBuocCon} from '../model/API/api'
import Dieuhuong from './a_chung'

export default function DetailPage({ navigation }) {

	// const [isLoading, setLoading] = useState(true);
	// const [list, setList] = useState([]);
	// const [type, setType] = useState([]);
	// const [author, setAuthor] = useState([]);
	// const [steps, setSteps] = useState([]);


	useEffect(() => {
		// dangNhap('tvphuong10@gmail.com', '123456', (res) => {
		// 	console.log(res)
		// 	APILayBanGhi('7', (res) => {
		// 		console.log("Bản ghi ------------------------------")
		// 		console.log(res)
		// 		APILayBuoc('7', (res) => {
		// 			console.log("Bước ------------------------------")
		// 			console.log(res)
		// 			for (let i = 0; i < res.result.length; i++) {
		// 				APILayBuocCon(res.result[i].step_id, i, (res) => {
		// 					console.log(`Bước ${i}------------------------------`)
		// 					console.log(res)
		// 				})
		// 			}
		// 		})
		// 	})
		// })
	}, []);

	const Step = ({ step, index }) => {
		return (
			<Text style={styles.mainStep} key={index}>
				{index}.{step.name}: 
			</Text>
		)
	}

	return (
		<View style={{flex: 1}}>
			<View style={{flex: 0.92}}>
				<ScrollView>
					<View styles = {styles.container}>
						<View>
							<Text>Thể loại</Text>
							<Text>Thời gian thực hiện</Text>
							<Text>Đánh giá</Text>
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
