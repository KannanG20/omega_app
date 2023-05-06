import { useNavigation } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../context/AuthContext'

const Private = ({ server }) => {

    const navigation = useNavigation()
    const { user } = useContext(AuthContext)

  return (
    <>
    {user.whitelist ? 
    <>
                  <View style={{ flexDirection: 'row',  justifyContent: 'space-between',width: '90%' }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>IP ADDRESS :</Text>
                    <Text style={{ fontSize: 15, color: 'gray' }}>{server.private}</Text>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between',width: '90%' }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>PORT :</Text>
                    <Text style={{ fontSize: 15, color: 'gray' }}>43210</Text>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between',width: '90%' }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>MAXPLAYERS :</Text>
                    <Text style={{ fontSize: 15, color: 'gray' }}>8</Text>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between',width: '90%' }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>MODE :</Text>
                    <Text style={{ fontSize: 15, color: 'gray' }}>EPIC TEAMS</Text>
                  </View>
                  </>
                  :
                  <>
                    <Text>You are not whitelisted!</Text>
                    <TouchableOpacity style={{ backgroundColor: 'skyblue', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 50 }} onPress={()=> navigation.navigate('Whitelist Info')}>
                        <Text style={{ color:  'black' }}>Check whitelist</Text>
                    </TouchableOpacity>
                  </>
        }
        </>
  )
}

export default Private