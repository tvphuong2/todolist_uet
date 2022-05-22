import { StyleSheet, Text, View, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import ReviewVote from './ReviewVote';

const ToDo = (props) => {
    const { title, view, download, image, list_id } = props;
    const [vote, setVote] = useState(null);
    const handleNumberView = (number) => {
        if (number < 1000) {
            return number;
        } else if (number < 1000000) {
            return (number / 1000).toFixed(1) + 'K';
        } else {
            return (number / 1000000).toFixed(1) + "Tr";
        }
    }

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
            <View>
                <Image source={image ? { uri: image } : require('../resource/Image/empty.png')} style={styles.image} />
            </View>
            <View style={styles.title}>
                <Text style={styles.titleText} numberOfLines={2}>{title}</Text>
            </View>
            <View style={styles.view}>
                <View style={{ flexDirection: 'row' }}>
                    <Feather name="download" size={16} color="#ee4d2d" />
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
        width: 170,
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