import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Whitelist = () => {

  const {user}  = useContext(AuthContext)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {user.whitelist ? <Text style={{ color: 'green' }}>YAY!! You are whitelisted</Text>
      :
      <View style={{ width: '90%', gap: 20 }}>
        <Text style={{ color: 'red', textAlign: 'center' }}>You are not whitelisted</Text>
        <Text style={{  textAlign: 'center'}}>currently we are managing whitelist request through the discord server, so join our discord server to get whitelisted!</Text>
      </View>  
    }
    </View>
  )
}

export default Whitelist