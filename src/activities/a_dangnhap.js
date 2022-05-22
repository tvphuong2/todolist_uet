import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity, Alert, Modal} from 'react-native';
import PasswordInput from '../component/PasswordInput';
import * as API from '../model/API/api'

const {width, height} = Dimensions.get('window');

export default function Dangnhap({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [e_login, setE_login] = useState('');

    const dangNhap = () => {
        API.dangNhap(email, password, (res) => {
            console.log(res)
            if (res.status != "thanhcong") {
                setE_login('Tên đăng nhập hoặc mật khẩu sai')
            } else {
                navigation.navigate('ThucHien')
            }
        })
    }

    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.logo} source={require('../resource/Image/logo.png')} />
            </View>
            <View>
                <Text style={styles.header}>Đăng nhập</Text>
            </View>
            <View>
                <View style={styles.inputView}>
                    <TextInput autoComplete='email' require style={styles.input} placeholder='Email' value={email} onChangeText={setEmail} />
                </View>
                <PasswordInput password={password} setPassword={setPassword} placeholder='Mật khẩu' />        
            </View>
            <Text>{e_login}</Text>
            <TouchableOpacity style={styles.btn} onPress={dangNhap}>
                <Text style={styles.btnText}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.link}>
                <View style={styles.footer}>
                    <View>
                        {/* <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Dangky')}> */}
                        <TouchableOpacity style={styles.link}>
                            <Text style={styles.linkText}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.link}>
                            <Text style={styles.linkText}>Quên mật khẩu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    logo: {
        width: 100,
        height: 100
    },
    header: {
        textAlign: 'center',
        color: '#202b4d',
        fontSize: 30,
        marginBottom: 20,
        marginTop: 20
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        width: 350,
        height: 50,
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingLeft: 10,
        backgroundColor: 'white',
        marginBottom: 20
    },
    icon: {
        position: 'absolute',
        right: 10
    },
    btn: {
        width: 350,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#ee4d2d',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        color: 'white',
        fontSize: 16
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 340
    },
    linkText: {
        marginTop: 10,
        textDecorationLine: 'underline',
        color: '#202b4d'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    paddingTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
    },
    button: {
    flexDirection: 'row',
    },
    buttonModal: {
    borderWidth: 1,
    borderColor: '#f1f1f1',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
    },
    modalText: {
    marginBottom: 15,
    color: 'gray'
    }
})