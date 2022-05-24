import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// import { AsyncStorage }from '@react-native-async-storage/async-storage';
// import { AsyncStorage } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import ReviewVote from './ReviewVote';
import * as API from '../model/API/api';
import * as LOCAL from '../model/API/SQLite';

const ToDo = (props) => {
    const { title, view, download, image, list_id, index, navigation } = props;
    const [vote, setVote] = useState(null);
    const [data, setData] = useState(null);

    const handleNumberView = (number) => {
        if (number < 1000) {
            return number;
        } else if (number < 1000000) {
            return (number / 1000).toFixed(1) + 'K';
        } else {
            return (number / 1000000).toFixed(1) + "M";
        }
    }

    // var storageList = [];
    // var steps = [];

    useEffect(() => {
        var steps = []
        var list_i
        API.APILayBanGhi(list_id, (res) => {
            list_i = res.result
            API.APILayBuoc(list_id, (res) => {
                for (let i = 0; i < res.result.length; i++) {
                    var subs = [];
                    API.APILayBuocCon(res.result[i].step_id, i, (res) => {
                        for (let j = 0; j < res.result.length; j++) {
                            subs.push({
                                name: res.result[j].name,
                                time: res.result[j].time,
                                description: res.result[j].description
                            });
                        }
                        // console.log(list);
                    })
                    steps.push({
                        description: res.result[i].description,
                        name: res.result[i].name,
                        substep: subs,
                        time: 0
                    });
                }
            })
            // storageList.push(`"step": ${steps}`);
        })
        setTimeout(()=> {
            var d = JSON.stringify({
                name: list_i.name,
                description: list_i.description,
                image: list_i.image,
                step: steps
            })
            setData(d)
        }, 1000)
    }, []);

    // Lưu danh sách vào bộ nhớ cục bộ
    const _storeData = async () => {
        console.log(data)
        LOCAL.Download(data, (res) => {
            console.log(res)
        })
    };

    // useEffect(() => {
    //     axios.get(`http://127.0.0.1:3000/list/get_vote?list_id=${list_id}`)
    //     .then(response => {
    //         setVote(response.data.result.avg);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.item} key={index} onPress={() => navigation.navigate('BanGhi', {list_id: list_id, navigation})}>
                <View>
                    {/* <Image source={image ? { uri: image } : imageRamdom[Math.floor(Math.random()*20)]} style={styles.image} /> */}
                    <Image source={image ? { uri: image } : require('../resource/Image/8.png')} style={styles.image} />
                </View>
                <View style={styles.title}>
                    <Text style={styles.titleText} numberOfLines={2}>{title}</Text>
                </View>
            </TouchableOpacity>

        
            <View style={styles.view}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.back} onPress={_storeData}>
                        <Feather name="download" size={16} color="#ee4d2d" />
                    </TouchableOpacity>
                    <Text style={{marginLeft: 3}}>{download}</Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                    {vote &&
                        <ReviewVote vote={vote} />
                    }
                    <View style={{ flexDirection: 'row', marginTop: 5}}>
                        <Text style={{color: 'gray', fontSize: 12}}>{handleNumberView(view)}</Text>
                        <Text style={{color: 'gray', marginLeft: 3, fontSize: 12}}>lượt xem</Text>
                    </View>
                </View>
                

            </View>
        </View>
    );
}

export default ToDo;

const styles = StyleSheet.create({
    container: {
        width: 160,
        height: 300,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
    },
    image: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        margin: 5

    },
    titleText: {
        textAlign: 'center',
        overflow: 'hidden',
        lineHeight: 20,
        height: 40
    },
    view: {
        margin: 5,
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 35
    },

});