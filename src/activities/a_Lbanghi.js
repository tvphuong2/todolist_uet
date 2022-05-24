import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import {Ionicons, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import ReviewVote from '../component/ReviewVote';
import ReviewComment from '../component/ReviewComment';
import CreateComment from '../component/CreateComment';
import * as API from '../model/API/api';
import Dieuhuong from './a_chung';

export default function BanGhi({route}) {
    const [post, setPost] = useState(null);
    const [steps, setSteps] = useState(null);
    const [vote, setVote] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [author, setAuthor] = useState(null);

    const json = route.params.json;
    var navigation = route.params.navigation;

	var step = [];
    var inforAuthor = [];

    useEffect(() => {
        console.log(route.params)
        setPost(json);
        for (let i = 0; i < json.step.length; i++) {
            var s = json.step[i]
            step.push(
                <Text style={styles.mainStep} key={`a${i}`}>
                    {i + 1}. {s.name}: <Text style={styles.desc}>{s.description}</Text>
                </Text>
            )
            for (let j = 0; j < s.substep.length; j++) {
                var child = s.substep[i]
                step.push(
                    <Text style={styles.childStep} key={`b${j}`}>
                        {child.name}: <Text style={styles.desc}>{child.description}</Text>
                    </Text>
                )
            }
        }
        setSteps(step)     
    }, []);

    useEffect(()=> {
        console.log(comments)
    }, [comments])

    const handleCreateComment = () => {
        console.log(newComment);
        API.APITaoBinhLuan(json, newComment, (res) => {
            console.log(res)
            var r
            API.APILayBinhLuan(json, (res) => {
                // console.log(res.result)
                if(res.result != "") {
                    r = res.result
                }
            })
    
            setTimeout(()=> {
                if (r != null)
                setComments(r);
            }, 500)
        })
        
        // axios.post('http://192.168.191.119:3000/list/make_comment/', {newComment, list_id})
        // .then(response => {
        //     console.log(response.data);
        // })
        // .catch(err => {
        //     console.log(err);
        // })
        // setNewComment('');
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.illustration}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.navigate('Discover')}>
                    <Ionicons name="ios-arrow-back" size={35} color="white" />
                </TouchableOpacity>
                {post && post.image !== '' ?
                    <Image style={styles.img} source={{ uri: post.image }} /> :
                    <Image style={styles.img} source={require('../resource/Image/8.png')} /> 
                }
                <View style={styles.download}>
                    <MaterialCommunityIcons name="download" size={35} color="white" />
                </View>
            </View>
			<View style={styles.content}>
                {post && 
                <View>
                    <View style={styles.title}>
                        <Text style={styles.mainTitle}>{post.name}</Text>
                        <Text style={styles.desc}>{post.description}</Text>
                    </View>
                </View>
                }
				<View style={styles.step}>
					{steps}
				</View>
			</View>

            <View style={styles.space}></View>

        </ScrollView>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
	  fontSize: 16,
      backgroundColor: 'white'
    },
	illustration: {
		flex: 1,
		// paddingTop: 30,
	},
	content: {
		flex: 3,
	},
	img: {
		width: '100%',
		height: 200,
		resizeMode: 'cover',
		opacity: 0.5,
	},
	title: {
		paddingHorizontal: 10,
		paddingTop: 10,
		paddingBottom: 20,
	},
	mainTitle: {
		fontSize: 32,
		paddingBottom: 7,
	},
	desc: {
		color: '#909090',
		fontWeight: 'normal',
	},
    download: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#cfcfcf',
        borderRadius: 20
    },
	info: {
		flexDirection: "row",
    	flexWrap: "wrap",
		justifyContent: 'space-between',
		paddingVertical: 10,
		backgroundColor: '#f1f1f1',
		height: 100,
	},
	author: {
		width: 70,
		height: 70,
		borderRadius: 35,	
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
	step: {
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
	back: {
		position: 'absolute',
    	left: 5,
    	top: 10,
        backgroundColor: '#cfcfcf',
        borderRadius: 20
	},
    space: {
        width: '100%',
        height: 10,
        backgroundColor: '#f1f1f1'
    },
    review: {
        margin: 10
    },
    reviewHeader: {
        margin: 10,
        marginLeft: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    reviewHeaderText: {
        fontWeight: '700',
    },
    viewAll: {
        flexDirection: 'row'
    }
  });
  