import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import {AuthContext} from '../context/AuthContext'


const Profile = () => {

  const { bsData, user, logout } = useContext(AuthContext)

  return (
    <View style={{ flex:1, alignItems:'center' }}>
      <View style={{ width: '90%', gap: 30, alignItems: 'center' }}>
        <Image source={require('../assets/spaz.png')} style={{ width: '100%', height: 250, borderRadius: 10 , marginVertical: 20, resizeMode: 'contain'}}/>
        <View style={{ width: '95%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
            <Text>Registered Name :</Text>
            <Text>{user?.username}</Text>
        </View>
        <View style={{ width: '95%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
            <Text>pb ID :</Text>
            <Text>{user?.pbId}</Text>
        </View>
        <View style={{ width: '95%', justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'row' }}>
            <Text>Linked Accounts :</Text>
            <View style={{ flexDirection: 'column', alignItems: 'flex-end', gap: 10}}>
            {bsData.accountDisplayStrings.map((accounts)=> (
              <Text key={accounts.length + 1}>{accounts}</Text>
            ))}
            </View>
        </View>
        <View style={{ width: '95%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
            <Text>Game Name :</Text>
            <Text>{bsData?.profileDisplayString}</Text>
        </View>

        <View style={{ width: '95%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
            <Text>whitelist (pvt server) :</Text>
            {user.whitelist ? <Text>True</Text> : <Text>False</Text>}
        </View>
        <View style={{ width: '95%', alignItems: 'flex-end' }}>
          <TouchableOpacity style={{ backgroundColor: 'red', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 2 }} onPress={logout}>
              <Text style={{ color: 'white' }}>Logout</Text>
          </TouchableOpacity>
         </View>     
      </View>
    </View>
  )
}

export default Profile