import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, FlatList, SafeAreaView, ActivityIndicator  } from 'react-native';
// import { AntDesign } from '@expo/vector-icons';
import {dangNhap, APILayBanGhi, APILayBuoc, APILayBuocCon} from '../model/API/api'


export default function DetailPage() {

	// const [isLoading, setLoading] = useState(true);
	// const [list, setList] = useState([]);
	// const [type, setType] = useState([]);
	// const [author, setAuthor] = useState([]);
	// const [steps, setSteps] = useState([]);

	// const login = () => {
	// 	console.log("Đang đăng nhập")
	// 	return fetch('http://192.168.203.119:3000', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Accept': 'application/json',
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({
	// 			email: 'tvphuong10@gmail.com',
	// 			password: '123456',
	// 		})
	// 	}).then(response => response.json()).then(res => {
	// 		console.log(res)
	// 		console.log("đã đăng nhập")
	// 		getListFromAPI()
    //     });
	// }

	// const getListFromAPI = () => {
	// 	return fetch('http://192.168.203.119:3000/list/get_list?id=6')
	// 	.then(response => response.json()).then(res => {
	// 		console.log("Bản ghi ------------------------------")
	// 		console.log(res)
	// 		setList(res);
	// 		getStepsFromAPI()
    //     })
	// }

	// const getStepsFromAPI = () => {
	// 	return fetch('http://192.168.203.119:3000/list/get_step?list_id=' + list.result.list_id)
	// 	.then(response => response.json()).then(res => {
	// 		console.log(`Bước ------------------------------`)
	// 		console.log(res)
	// 		setSteps(res);
	// 		for (let i = 0; i < res.result.length; i++) {
	// 			getSubstepFromAPI(res.result[i].step_id, i)
	// 		}
    //     })
	// }

	// const getSubstepFromAPI = (step_id, ix) => {
	// 	return fetch(`http://192.168.203.119:3000/list/get_substep?step_id=${step_id}`)
	// 	.then(response => response.json()).then(res => {
	// 		console.log(`Bước ${ix}------------------------------`)
	// 		console.log(res)
	// 		// setSteps(res);
    //     })
	// }

	// const getTypeFromAPI = async () => {
	// 	try {
	// 		const response = await fetch('http://192.168.203.119:3000/list/get_list?id=6');
	// 		const json = await response.json();
	// 		setType(json.result);
	// 	  } catch (error) {
	// 		console.error(error);
	// 	  } 
	// }

	// const getAuthorFromAPI = async () => {
	// 	try {
	// 		if (list.author_id !== undefined) {
	// 		const response = await fetch('http://192.168.203.119:3000/list/get_author?author_id=' + list.author_id);
	// 		const json = await response.json();
	// 		console.log('http://192.168.203.119:3000/list/get_author?author_id=' + list.author_id);
	// 		setAuthor(json.result);
	// 		// console.log(json.result);
	// 		}
	// 	  } catch (error) {
	// 		console.error(error);
	// 	  } 
	// }


	useEffect(() => {
		dangNhap('tvphuong10@gmail.com', '123456', (res) => {
			console.log(res)
			APILayBanGhi('7', (res) => {
				console.log("Bản ghi ------------------------------")
				console.log(res)
				APILayBuoc('7', (res) => {
					console.log("Bước ------------------------------")
					console.log(res)
					for (let i = 0; i < res.result.length; i++) {
						APILayBuocCon(res.result[i].step_id, i, (res) => {
							console.log(`Bước ${i}------------------------------`)
							console.log(res)
						})
					}
				})
			})
		})
	}, []);

	const Step = ({ step, index }) => {
		return (
			<Text style={styles.mainStep} key={index}>
				{index}.{step.name}: 
			</Text>
		)
	}

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<View style={styles.info}>
					<View>
						<Text style={styles.type}>Thể loại</Text>
						<Text style={styles.type}>Thời gian thực hiện</Text>
						<Text style={styles.type}>Đánh giá</Text>
					</View>
				</View>
			</View>
		</View>
	);
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		fontSize: 16,
	},

	// css hình ảnh giới thiệu của list
	illustration: {
		flex: 1,
		paddingTop: 30,
	},
	imgList: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
		opacity: 0.5,
	},
	back: {
		position: 'absolute',
		left: 0,
		top: 30,
		backgroundColor: '#ffffff'
	},

	// css nội dung chính của list
	content: {
		flex: 2,
	},
	title: {
		paddingHorizontal: 10,
		paddingTop: 10,
		paddingBottom: 10,
	},
	mainTitle: {
		fontSize: 32,
		paddingBottom: 7,
	},
	desc: {
		color: '#909090',
		fontWeight: 'normal',
	},

	// css thông tin thể loại, tác giả của list
	info: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: 'space-between',
		paddingVertical: 10,
		backgroundColor: '#F1F1F1',
	},
	type: {
		flex: 2,
		justifyContent: 'center',
		paddingHorizontal: 10,
		fontSize: 15,
		color: '#303030',
	},
	row: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderLeftWidth: 1,
		borderLeftColor: '#959595',
	},
	author: {
		width: 70,
		height: 70,
		borderRadius: 35,
	},

	// css các bước trong list
	step: {
		flex: 1,
		paddingHorizontal: 10,
		paddingVertical: 15,
		paddingHorizontal: 10,
		lineHeight: 18,
	},
	mainStep: {
		fontWeight: 'bold',
		lineHeight: 30,
	},
	childStep: {
		fontWeight: 'bold',
		paddingLeft: 30,
		color: '#000000',
	},
	
});
