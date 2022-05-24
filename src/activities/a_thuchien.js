import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, FlatList, SafeAreaView, ActivityIndicator, ScrollView, TouchableOpacity, ImageBackground, Modal, Pressable } from 'react-native';
import Dieuhuong from './a_chung'
import Swipeout from 'react-native-swipeout';
import * as API from '../model/API/api';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const image = { uri: "https://topshare.vn/wp-content/uploads/2021/01/Hinh-nen-dien-thoai-dep-va-doc-dao-1.jpg" };

var stepSuccessInrecordsHandle = [];
var stepCompleteInrecordsHandle = [];
var InfoCompleterecordsHandle = [];
export default function ThucHien({ navigation }) {
    const [records, setRecords] = useState([]);
    const [stepWarnInrecords, setstepWarnInrecords] = useState([]);
    const [isWarnRender, setisWarnRender] = useState(false);
    const [stepSuccessInrecords, setstepSuccessInrecords] = useState([]);
    const [isSuccessRender, setisSuccessRender] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [recordCompletes, setrecordCompletes] = useState([]);
    const [Completerecords, setCompleterecords] = useState([]);
    const [isrecordCompletesRender, setisrecordCompletesRender] = useState(false);
    const RecordsUse = [];
    useEffect(() => {
        setstepSuccessInrecords(stepSuccessInrecordsHandle);
        setCompleterecords(InfoCompleterecordsHandle);
        API.APILayTatCa((ret) => {
            setRecords(ret);
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
            var Steps = [];
            RecordsUse.forEach((RecordUse, indexReCord) => {
                API.APILayBuoc(RecordUse.list_id, (ret) => {
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
                        // console.log(StepInRecord);
                    })
                    setstepWarnInrecords(Steps);
                })
            })
        })
        // function getRecord(callback) {
        //     API.APILayTatCa(callback);
        // }
        // function getRecordUse(ret, callback) {
        //     setRecords(ret);
        //     // console.log(records);
        //     records.forEach(record => {
        //         if (record.list_id == 5 || record.list_id == 6) {
        //             record.use = true;
        //         }
        //     })
        //     records.forEach(record => {
        //         if (record.use == true) {
        //             RecordsUse.push(record);
        //         }
        //     })
        //     callback();
        // }
        // function getstepInrecords() {
        //     var Steps = [];
        //     RecordsUse.forEach((RecordUse, indexReCord) => {
        //         API.APILayBuoc(RecordUse.list_id , (ret) => {
        //                     ret.result.forEach((step, index) => {
        //                     var step_number = index + 1;
        //                     var StepInRecord = {
        //                         id_step: RecordUse.list_id + 'B' + step_number,
        //                         RecordName: RecordUse.name,
        //                         indexReCord: indexReCord + 1,
        //                         name: step.name,
        //                         step_number: step_number,
        //                         totalRecordNumber: ret.result.length
        //                     }
        //                     Steps.push(StepInRecord);
        //                 })
        //                 setstepWarnInrecords(Steps);
        //         })
        //     })
        // }
        // getRecord(function (ret) {
        //     getRecordUse(ret, function () {
        //         getstepInrecords();
        //     });
        // });
    }, []);
    const WarnItem = ({ item, index }) => {
        return (
            <Swipeout animationType style={{ backgroundColor: 'rgba(0 , 0 , 0 , 0.2)' }} autoClose={true}
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
                            setstepWarnInrecords(NewstepWarnInrecords);
                            setisWarnRender(!isWarnRender);
                            setisSuccessRender(!isSuccessRender);

                        },
                        backgroundColor: 'rgba(0 , 0 , 0 , 0.1)'
                    }
                ]}
                >
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
                            stepCompleteInrecordsHandle.push(stepSuccessInrecords[indexDo]);
                            stepSuccessInrecords.splice(indexDo, 1);
                            var NewstepSuccessInrecords = stepSuccessInrecords.map(Step => {
                                return Step;
                            })
                            setstepSuccessInrecords(NewstepSuccessInrecords);
                            setisSuccessRender(!isSuccessRender);
                            var indexReCords = [];
                            stepCompleteInrecordsHandle.forEach((stepComplete , index) => {
                                if(indexReCords.includes(stepComplete.indexReCord) == false) {
                                    indexReCords.push(stepComplete.indexReCord);
                                }
                            })
                            var recordCompleteHandle = [];
                            indexReCords.forEach(indexRc => {
                                var infoRecord = {
                                    indexReCord : indexRc
                                }
                                var currentStep = 0;
                                var totalStep = 0;
                                var recordName = "";
                                stepCompleteInrecordsHandle.forEach((stepComplete , index) => {
                                    if(indexRc.toString() == stepComplete.indexReCord.toString()) {
                                        currentStep++;
                                        recordName = stepComplete.RecordName;
                                        totalStep = stepComplete.totalRecordNumber;
                                    }
                                })
                                infoRecord.currentStep = currentStep;
                                infoRecord.RecordName = recordName;
                                infoRecord.totalStep = totalStep;
                                recordCompleteHandle.push(infoRecord);
                            })
                            recordCompleteHandle.forEach((infoRecord) => {
                                if(infoRecord.currentStep == infoRecord.totalStep) {
                                    var infoCompleteRecord = {
                                        RecordId : infoRecord.indexReCord ,
                                        RecordsName : infoRecord.RecordName 
                                    }
                                    if(InfoCompleterecordsHandle.length == 0) {
                                        InfoCompleterecordsHandle.push(infoCompleteRecord);
                                    } else {
                                        InfoCompleterecordsHandle.forEach(InfoCompleterecordsHan => {
                                            if(InfoCompleterecordsHan.RecordId != infoCompleteRecord.RecordId) {
                                                InfoCompleterecordsHandle.push(infoCompleteRecord);
                                            }
                                        })
                                    }
                                }
                            })
                            setCompleterecords(InfoCompleterecordsHandle);
                            setisrecordCompletesRender(!isrecordCompletesRender);
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
    const recordComplete = ({ item, index }) => {
        return(
            <View style={styles.ItemRecordComplete}>
                <Text style={{marginRight : 20 , fontSize : 20 , fontWeight : 'bold'}}> {item.RecordId}</Text>
                <Text style={styles.ItemRecordCompleteText}>{item.RecordsName}</Text>
            </View>
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
                    <View style={styles.content}>
                        <FlatList data={stepWarnInrecords}
                            renderItem={WarnItem}
                            extraData={isWarnRender}
                            keyExtractor={(item) => item.id_step}>
                        </FlatList>
                    </View>
                </View>
            </SafeAreaView>
            <Dieuhuong navigation={navigation} />
            <View style={styles.handlingButton}>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                    <FontAwesome5 style={styles.handleIcon} name="list" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <FontAwesome5 style={styles.handleIcon} name="eraser" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <FontAwesome5 style={styles.handleIcon} name="save" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialIcons style={styles.handleIcon} name="post-add" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Bản Ghi Đã Hoàn Thành</Text>
                        <FlatList style={{width : '100%' }} data={Completerecords}
                            renderItem={recordComplete}
                            extraData={isrecordCompletesRender}
                            keyExtractor={(item) => item.RecordId}>
                        </FlatList>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Thoát</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
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
    },
    handlingButton: {
        display: 'flex',
        position: "absolute",
        right: 70,
        bottom: 100
    },
    handleIcon: {
        backgroundColor: 'red',
        padding: 14,
        marginBottom: 10,
        borderRadius: 26
    },
    footer: {
        backgroundColor: '#C4C4C4',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor : 'rgba(0, 0, 0 , 0.6)' 
      },
    modalView: {
        width : '90%' , 
        margin : 20 ,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal : 35 ,
        paddingVertical : 15 ,
        alignItems: "center",
        justifyContent : 'center' ,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5  ,
        maxHeight : '40%'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center" ,
        fontSize : 18
    },
    modalText: {
        marginBottom: 15,
        fontWeight : 'bold' ,
        textAlign: "center" ,
        color : 'tomato' ,
        fontSize : 18
    } ,
    ItemRecordComplete : {
        display : 'flex' ,
        flexDirection : 'row' ,
        flex : 1 ,
        backgroundColor : 'tomato' ,
        width : '100%' ,
        marginBottom : 10 , 
        height : 40 ,
        justifyContent : 'center' ,
        alignItems : 'center' ,
        borderRadius : 40 ,
        paddingHorizontal : 20 
    } ,
    ItemRecordCompleteText : {
        flex : 1 ,
        fontSize : 18 ,
        fontWeight : 'bold'
    }
});
