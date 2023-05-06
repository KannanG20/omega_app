import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { API_KEY } from '@env'

const Suggestion = () => {

    const { user } = useContext(AuthContext)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmitSuggestion = async () => {
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
          const res = await fetch(`https://omegabombsquad.cyclic.app/api/suggestion?key=${API_KEY}`, requestOptions)
          if(!res.ok){
            setErr(true)
            return setLoading(false)
          }
          setMessage('')
          setLoading(false)
          setSuccess(true)
        }
      } catch (error) {
          setLoading(false)
          setErr(true)
      }

    }

  return (
    <View style={{ flex:1, alignItems: 'center' }}>
      <View style={{ width: '90%', marginVertical: 40, gap: 20 }}>
            <TextInput editable={false} value={user?.username} style={styles.inputs}/>
            <TextInput editable={false} value={user?.pbId} style={styles.inputs}/>
            <View style={{ height: 300 }}>
                <TextInput placeholder='Your Suggestion' numberOfLines={18}  multiline={true} style={styles.message} onChangeText={(text)=> setMessage(text)}/>
            </View>
            <TouchableOpacity style={{ backgroundColor: 'blue',paddingVertical: 10, paddingHorizontal: 20 }} onPress={handleSubmitSuggestion}>
                <Text style={{ textAlign: 'center', color: 'white' }}>submit</Text>
            </TouchableOpacity>
            <View>
              <Text style={{ color: 'gray', textAlign: 'justify' }}>Note : If the given suggestion is impressive then we will probably try to implement it. This feature will only be last for 1 month from the start.</Text>
            </View>
      </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              {loading && <ActivityIndicator size={28} color='blue'/>}
              {err && <Text style={{ color:'red' }}>something is wrong, please try again</Text>}
              {success && <Text style={{ color: 'green' }}>Thanks for your suggestion!</Text>}
            </View>
    </View>
  )
}

export default Suggestion

const styles = StyleSheet.create({
    inputs: {
        width: '100%',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
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