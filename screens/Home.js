import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Private from '../components/Private'
import { API_KEY } from '@env'

const Home = () => {

    const [publicServer, setPublicServer] = useState(true)
    const [privateServer, setPrivateServer] = useState(false)
    const [server, setServer] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(()=> {
      setLoading(true)
      const server = async ()=> {
        try {
          const res = await fetch(`https://omegabombsquad.cyclic.app/api/servers?key=${API_KEY}`)
          const data = await res.json()
          setServer(data.servers)
          setLoading(false)
        } catch (error) {
          setLoading(false)
            console.log(error);
        }
      }
      server()
    }, [])

  return (
    <ScrollView style={{ flex: 1}}>
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image source={require('../assets/bombsquad.jpg')} style={styles.image}/>
      </View>
      <View style={styles.bsTitle}>
        <Text style={{ fontSize: 20, color:"gray" }}>BOMBSQUAD AT OMEGA</Text>
      </View>
      <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '95%' }}>
            <View style={{ flex: 1,  flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity activeOpacity={0.95} style={[styles.button, publicServer && { backgroundColor: 'red' }]} onPress={()=> {
                  setPrivateServer(false)
                  setPublicServer(true)}}>
                    <Text style={[styles.text, publicServer && { color: 'white' }]}>Public</Text>
                </TouchableOpacity>
              
              <TouchableOpacity activeOpacity={0.95} style={[styles.button, privateServer && { backgroundColor: 'red' }]} onPress={()=> {
                setPublicServer(false)
                setPrivateServer(true)}}>
                    <Text style={[styles.text, privateServer && { color: 'white' }]}>Private</Text>
                </TouchableOpacity>
            </View>
            <View style={[{ flex: 1, height:250,backgroundColor: 'white', borderRadius: 10, marginTop: 30, marginBottom:10,justifyContent: 'center'  }]}>
                {publicServer &&
                    <View style={{ flex: 1, alignItems: 'center', gap: 30, justifyContent: 'center'}}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between',width: '90%' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>IP ADDRESS :</Text>
                        <Text style={{ fontSize: 15, color: 'gray' }}>{server.public}</Text>
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
                    </View>
                 }

                {privateServer && 
                  <View style={{ flex: 1, alignItems: 'center', gap: 30, justifyContent: 'center'}}>
                    <Private server={server}/>
                  </View>
                }
            </View>
        </View>
      </View>
    </View>
    </ScrollView>
  );
}

export default Home

const styles = new StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  image: {
    width: '95%',
    height: 250,
    borderRadius: 20,
    resizeMode: 'contain'
  },
  bsTitle: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    flexDirection: 'row', 
    height: 50, 
    flex:1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    elevation:3,
},
text: {
    fontSize: 16,
    fontWeight: 'bold',
}
})
