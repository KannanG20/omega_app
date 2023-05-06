import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { API_KEY } from '@env'

const Report = () => {

    const { user } = useContext(AuthContext)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmitReport = async () => {
      try {
        if(message !== ''){
          setLoading(true)
          setErr(false)
          setSuccess(false)
          const data = {
            username: user?.username,
            pbId: user?.pbId,
            message: message
          }
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          }
          const res = await fetch(`https://omegabombsquad.cyclic.app/api/report?key=${API_KEY}`, requestOptions)
          if(!res.ok){
            setErr(true)
            return setLoading(false)
          } 
          setLoading(false)
          setSuccess(true)
          setMessage('')
        }
      } catch (error) {
          setLoading(false)
          setErr(true)
      }

    }
  return (
    <View style={{ flex:1, alignItems: 'center' }}>
        <View style={{ width: '90%', marginVertical: 40, gap: 20 }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Text style={{ fontWeight: 800, fontSize: 15 }}>Report by :</Text>
                <Text>{user?.username}</Text>
            </View>
            <View style={{ height: 300 }}>
                <TextInput  underlineColorAndroid="transparent" placeholder='Your report message' numberOfLines={18}  multiline={true} style={styles.message} onChangeText={(text)=> setMessage(text)}/>
            </View>
            <TouchableOpacity style={{ backgroundColor: 'blue',paddingVertical: 10, paddingHorizontal: 20 }} onPress={handleSubmitReport}>
                <Text style={{ textAlign: 'center', color: 'white' }}>submit</Text>
            </TouchableOpacity>
            <View>
              <Text style={{ color: 'gray', textAlign: 'justify' }}>Note : If you are facing any kind of application issue or server issue, then this could help you, Try to elaborate your issue and should be understanding, once we got your report we'll get back to you within 2days</Text>
            </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              {loading && <ActivityIndicator size={28} color='blue'/>}
              {err && <Text style={{ color:'red' }}>something is wrong, please try again</Text>}
              {success && <Text style={{ color: 'green' }}>Your report have been sent!</Text>}
            </View>
    </View>
  )
}

export default Report

const styles = StyleSheet.create({
    message: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        textAlignVertical: 'top',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 10
    }
})