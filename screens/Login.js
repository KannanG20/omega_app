import React, { useContext, useState } from 'react'
import { Image, ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator} from 'react-native'
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Login = ( ) => {

    const navigation = useNavigation()

    const [isPasswordSecure, setIsPasswordSecure] = useState(true)
    const [pbId, setPbId] = useState('')
    const [password, setPassword] = useState('')

    const { login, err, loading, invalidPb, isLogged, invalid } = useContext(AuthContext)

    const handleLogin = ()=>{
        if((pbId !== '') && (password !== '')){
            login(pbId, password)
            if(isLogged){
                navigation.navigate('Home')
            }
        } 
    }


  return (
    <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#070609' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', height: 250, width: '100%' }}>
            <Image source={require('../assets/bombsquad.jpg')} style={{ height: '100%', width: '100%', resizeMode: 'cover' }}/>
        </View>
        <View style={styles.logincontainer}>
            <View style={{ gap: 10 }}>
                <Text style={{ fontSize: 32, color: 'white', fontFamily: 'Roboto' }}>Welcome back!</Text>
                <Text style={{ fontSize: 25, color: 'white', fontFamily: 'Roboto' }}>Login</Text>
            </View>
            <View style={styles.container}>
                <TextInput placeholder='pb-id'  style={styles.input} onChangeText={(text)=> setPbId(text)} value={pbId}/>
                <View style={{ width:'100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 10  }}>
                    <TextInput 
                    secureTextEntry={isPasswordSecure}
                    onSubmitEditing={handleLogin}  
                    placeholder='password' 
                    style={{ paddingHorizontal: 10,
                             paddingVertical: 10,
                             color: 'black', width: '80%'}} 
                    onChangeText={(text)=> setPassword(text)} />
                    <TouchableOpacity onPress={()=> setIsPasswordSecure((prev)=>!prev)} style={styles.icon}>
                        <MaterialCommunityIcons
                        name={isPasswordSecure ? 'eye-off' : 'eye'}
                        size={24}
                        color="black"
                        />
                    </TouchableOpacity>
                </View>                
                <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                    <Text style={{ color: 'white' }}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                {loading && <ActivityIndicator size='large' color='red'/>}
                {invalidPb && <Text style={{ color: 'red' }}>Invalid account</Text>}
                {err && <Text style={{ color: 'red' }}>something is wrong, please try again</Text>}
                {invalid && <Text style={{ color: 'red' }}>Invalid Credentials</Text>}
            </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 5, paddingVertical: 10, backgroundColor: '#3B3A3D', alignItems: 'center', width: '90%' }}>
            <TouchableOpacity onPress={()=> navigation.navigate('Register')} style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color:'white', fontFamily: 'Roboto' }}>Create an Account</Text>
            </TouchableOpacity>
        </View>
        <StatusBar hidden={true}/>
    </View>
  )
}

export default Login



const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        gap: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input:{
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: 'black',
        backgroundColor: 'white'
    },
    btn: {
        width: '100%',
        backgroundColor: 'red',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 50
    },
    logincontainer: {
        width: '90%',
        height: 500,
        borderColor: 'white',
        paddingVertical: 20
    }
})