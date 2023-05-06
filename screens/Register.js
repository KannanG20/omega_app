import React, { useContext, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator} from 'react-native'
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const Register = ({ navigation } ) => {


    const [isPasswordSecure, setIsPasswordSecure] = useState(true)
    const [name, setName] = useState('')
    const [pbId, setPbId] = useState('')
    const [password, setPassword] = useState('')

    const { register, err, loading, createdUser, invalidPb, userExist } = useContext(AuthContext)

    const handleLogin = async () => {
        if((name !== '') && (pbId !== '') && (password !== '')){
            await register(name, pbId, password);
            const token = await SecureStore.getItemAsync('usercreated')
            if (token) {
              navigation.navigate('Login');
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
                <Text style={{  fontSize: 32, color: 'white', fontFamily: 'Roboto' }}>Create New Account</Text>
            </View>
            <View style={styles.container}>
                <TextInput placeholder='username'  style={styles.input} onChangeText={(text)=> setName(text)} value={name}/>
                <TextInput placeholder='pb-id'  style={styles.input} onChangeText={(text)=> setPbId(text)} value={pbId}/>
                <View style={{ width:'100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 10  }}>
                    <TextInput 
                    secureTextEntry={isPasswordSecure}  
                    placeholder='password' 
                    onSubmitEditing={handleLogin}
                    style={{ paddingHorizontal: 10,
                             paddingVertical: 10,
                             color: 'black', width: '80%' }} 
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
                    <Text style={{ color: 'white' }}>Register</Text>
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                {loading && <ActivityIndicator size='large' color='red'/>}
                {err && <Text style={{ color: 'red' }}>something is wrong, please try again</Text>}
                {invalidPb && <Text style={{ color: 'red' }}>Invalid pb-id</Text>}
                {userExist && <Text style={{ color: 'red' }}>User Already Exist with this credentials</Text>}
                
            </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 5, paddingVertical: 10, backgroundColor: '#3B3A3D', alignItems: 'center', width: '90%' }}>
            <TouchableOpacity onPress={()=> navigation.navigate('Login')} style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color:'white', fontFamily: 'Roboto' }}>Login</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Register



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
    },
    logincontainer: {
        width: '90%',
        height: 500,
        borderColor: 'white',
        // borderWidth: 1,
        // borderRadius: 5,
        paddingVertical: 20
    }
})