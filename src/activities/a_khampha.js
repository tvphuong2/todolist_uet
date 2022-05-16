import { useState, useEffect } from 'react';
import { Platform, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Topic from '../component/Topic';
import ToDo from '../component/ToDo';
import SearchInput from '../component/SearchInput';
import Dieuhuong from './a_chung'
import * as API from '../model/API/api'

export default function Khampha ({ navigation }) {
    const [tu_khoa, thay_tu_khoa] = useState('');
    const [ket_qua, thay_ket_qua] = useState(null);

    
    useEffect(() => {
        API.APILayTatCa(thay_ket_qua)
    }, [])

    useEffect(() => {
        API.APITimKiem(tu_khoa, thay_ket_qua)
    }, [tu_khoa])

    return (
        <View style={styles.container}>
            <View style={{flex: 0.92}}>
                <View style={styles.header}>
                    <SearchInput value={tu_khoa} setValue={thay_tu_khoa} placeholder='Tìm kiếm' />
                    <View style={styles.listTopic}>
                        {topic.map((item, index) => {
                            return (
                                <Topic icon={item.icon} color={item.color} name={item.name} label={item.label} key={index} onPress={() => navigation.navigate('DiscoverByTopic', {type_id: item.id, type_label: item.label})} />
                            )
                        })}
                    </View>
                </View>


                <View style={styles.list}>
                    {ket_qua && ket_qua
                        .map((item, index) => {
                            return (
                                <TouchableOpacity style={styles.item} key={index} onPress={() => navigation.navigate('BanGhi', {list_id: item.list_id, navigation})}>
                                    <ToDo title={item.name} view={item.view} download={item.download} list_id={item.list_id} />
                                </TouchableOpacity>
                            );
                        })}
                </View>
            </View>
            <Dieuhuong navigation = {navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    header: {
        backgroundColor: '#ee4d2d',
        alignItems: 'center'
    },
    listTopic: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        ...Platform.select({
            ios: {
                marginRight: 10,
                marginLeft: 10
            },
            android: {
                marginRight: 20,
                marginLeft: 20
            }
        }),

    },
});

const topic = [
    {
        id: 1,
        icon: 'food-bank',
        color: '#8f60bf',
        name: 'food',
        label: 'Món ăn'
    },
    {
        id: 2,
        icon: 'medical-services',
        color: '#f291a3',
        name: 'medical',
        label: 'Y tế'
    },
    {
        id: 3,
        icon: 'airplanemode-active',
        color: '#079dd9',
        name: 'travel',
        label: 'Du lịch'
    },
    {
        id: 4,
        icon: 'computer',
        color: 'gray',
        name: 'computer',
        label: 'Điện tư'
    },
    {
        id: 5,
        icon: 'nature',
        color: '#56c596',
        name: 'nature',
        label: 'Nông nghiệp'
    },
    {
        id: 6,
        icon: 'style',
        color: '#f56a79',
        name: 'style',
        label: 'Sắc đẹp'
    },
    {
        id: 7,
        icon: 'sports-football',
        color: 'orange',
        name: 'activity',
        label: 'Thể thao'
    },
    {
        id: 8,
        icon: 'work',
        color: '#425d8a',
        name: 'work',
        label: 'Công việc'
    },
]