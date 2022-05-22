import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, FlatList, SafeAreaView, ActivityIndicator, ScrollView, TouchableHighlight, ImageBackground } from 'react-native';
import Dieuhuong from './a_chung'
import Swipeout from 'react-native-swipeout';
import * as API from '../model/API/api'
const image = { uri: "https://topshare.vn/wp-content/uploads/2021/01/Hinh-nen-dien-thoai-dep-va-doc-dao-1.jpg" };

var stepSuccessInrecordsHandle = [];
export default function ThucHien({ navigation }) {
    const [records, setRecords] = useState([]);
    const [stepWarnInrecords, setstepWarnInrecords] = useState([]);
    const [isWarnRender, setisWarnRender] = useState(false);
    const [stepSuccessInrecords, setstepSuccessInrecords] = useState([]);
    const [isSuccessRender, setisSuccessRender] = useState(false);
    const RecordsUse = [];
    useEffect(() => {
        setstepSuccessInrecords(stepSuccessInrecordsHandle);
        function getRecord(callback) {
            API.APILayTatCa(callback);
        }
        function getRecordUse(ret, callback) {
            setRecords(ret);
            // console.log(records);
            records.forEach(record => {
                if (record.list_id == 5 || record.list_id == 6) {
                    record.use = true;
                }
            })
            records.forEach(record => {
                if (record.use == true) {
                    RecordsUse.push(record);
                }
            })
            callback();
        }
        function getstepInrecords() {
            var Steps = [];
            RecordsUse.forEach((RecordUse, indexReCord) => {
                API.APILayBuoc(RecordUse.list_id , (ret) => {
                            ret.result.forEach((step, index) => {
                            var step_number = index + 1;
                            var StepInRecord = {
                                id_step: RecordUse.list_id + 'B' + step_number,
                                RecordName: RecordUse.name,
                                indexReCord: indexReCord + 1,
                                name: step.name,
                                step_number: step_number,
                                totalRecordNumber: ret.result.length
                            }
                            Steps.push(StepInRecord);
                        })
                        setstepWarnInrecords(Steps);
                })
            })
        }
        getRecord(function (ret) {
            getRecordUse(ret, function () {
                getstepInrecords();
            });
        });
     } , []);
     const WarnItem = ({ item, index }) => {
        return (
            <Swipeout style={{ backgroundColor: 'rgba(0 , 0 , 0 , 0.2)' }} autoClose={true}
                onClose={() => {
                }}
                onOpen={() => {
                }}
                right={[
                    {
                        component: (
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    backgroundColor: 'rgba(0, 255 , 131 , 0.8) ',
                                    marginBottom: 10,
                                    borderRadius: 8
                                }}>
                                <Text style={{ fontWeight: 'bold' }}>Thực Hiện</Text>
                            </View>
                        ),
                        onPress: () => {
                            var indexDo = 0;
                            stepWarnInrecords.forEach((step, index) => {
                                if (step.id_step == item.id_step) {
                                    indexDo = index;
                                }
                            });
                            // 
                            stepSuccessInrecordsHandle.push(stepWarnInrecords[indexDo]);
                            setstepSuccessInrecords(stepSuccessInrecordsHandle);
                            stepWarnInrecords.splice(indexDo, 1);
                            var NewstepWarnInrecords = stepWarnInrecords.map(Step => {
                                return Step;
                            })
                            console.log('--------------------------------')
                            console.log(stepSuccessInrecords);
                            console.log('--------------------------------')
                            setstepWarnInrecords(NewstepWarnInrecords);
                            setisWarnRender(!isWarnRender);
                            setisSuccessRender(!isSuccessRender);

                        },
                        backgroundColor: 'rgba(0 , 0 , 0 , 0.1)'
                    }
                ]}>
                <View style={styles.taskWarn}>
                    <Text style={styles.taskLeft}>
                        {item.indexReCord} | {item.step_number}/{item.totalRecordNumber}
                    </Text>
                    <View style={styles.taskCenter}>
                        <Text style={styles.ttCTop}>{item.RecordName}</Text>
                        <Text style={styles.ttCBottom}>{item.name}</Text>
                    </View>
                </View>
            </Swipeout>
        );
    }
    const SuccessItem = ({ item, index }) => {
        return (
            <Swipeout style={{ backgroundColor: 'rgba(0 , 0 , 0 , 0.2)' }} autoClose={true}
                onClose={() => {
                }}
                onOpen={() => {
                }}
                right={[
                    {
                        component: (
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    backgroundColor: 'rgba(255, 48 , 48 , 0.8) ',
                                    marginBottom: 10,
                                    borderRadius: 8
                                }}>
                                <Text style={{ fontWeight: 'bold', color: '#fff' }}>Hoàn Thành</Text>
                            </View>
                        ),
                        onPress: () => {
                            var indexDo = 0;
                            stepSuccessInrecords.forEach((step, index) => {
                                if (step.id_step == item.id_step) {
                                    indexDo = index;
                                }
                            });
                            // 
                            stepSuccessInrecords.splice(indexDo, 1);
                            var NewstepSuccessInrecords = stepSuccessInrecords.map(Step => {
                                return Step;
                            })
                            setstepSuccessInrecords(NewstepSuccessInrecords);
                            setisSuccessRender(!isSuccessRender);
                        },
                        backgroundColor: 'rgba(0 , 0 , 0 , 0.1)'
                    }
                ]}>
                <View style={styles.taskSucess}>
                    <Text style={styles.taskLeft}>
                        {item.indexReCord} | {item.step_number}/{item.totalRecordNumber}
                    </Text>
                    <View style={styles.taskCenter}>
                        <Text style={styles.ttCTop}>{item.RecordName}</Text>
                        <Text style={styles.ttCBottom}>{item.name}</Text>
                    </View>
                </View>
            </Swipeout>
        );
    }
    return (
        <ImageBackground source={image} resizeMode="cover" style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.nearing_completion}>
                    <Text style={styles.title}>Đang hoàn thiện</Text>
                    <View style={styles.content}>
                        <FlatList data={stepSuccessInrecords}
                            renderItem={SuccessItem}
                            extraData={isSuccessRender}
                            keyExtractor={(item) => item.id_step}>
                        </FlatList>
                    </View>
                </View>
                <View style={styles.waiting}>
                    <Text style={styles.title2}>Đang chờ</Text>
                    <View onLayout={() => console.log('LOAD')} style={styles.content}>
                        <FlatList data={stepWarnInrecords}
                            renderItem={WarnItem}
                            extraData={isWarnRender}
                            keyExtractor={(item) => item.id_step}>
                        </FlatList>
                    </View>
                </View>
            </SafeAreaView>
            <Dieuhuong navigation={navigation} />
        </ImageBackground>
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
    taskWarn: {
        backgroundColor: 'rgba(255, 229, 0 , 0.8)',
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'center',
        marginBottom: 10
    },
    taskSucess: {
        backgroundColor: 'rgba(0 , 255, 131 , 0.8)',
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'center',
        marginBottom: 10
    },
    taskLeft: {
        fontSize: 16,
        flex: 4
    },
    taskCenter: {
        flexDirection: 'column',
        flex: 14
    },
    ttCTop: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
    ttCBottom: {
        fontSize: 18
    },
    taskRight: {
        flex: 3
    },
    nearing_completion: {
        flex: 1
    },
    waiting: {
        flex: 1
    },
    title: {
        marginTop: 36,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00ff83'
    },
    title2: {
        marginTop: 12,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgb(255, 229, 0)'
    },
    content: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        paddingHorizontal: 20,
        marginHorizontal: 5,
        marginVertical: 10,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 10
    }
});
