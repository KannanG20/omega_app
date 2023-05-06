import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator} from 'react-native'
import { API_KEY } from '@env'


const Events = () => {

  const [livedata, setLivedata] = useState([])
  const [playersA, setPlayersA] = useState([])
  const [playersB, setPlayersB] = useState([])
  const [teamAscore, setTeamAScore] = useState()
  const [teamBscore, setTeamBScore] = useState()
  const [livechat, setLivechat] = useState([])

  const [teamAempty, setTeamAEmpty] = useState(false)
  const [teamBempty, setTeamBEmpty] = useState(false)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(false)


  useEffect(()=>{
    setLoading(true)
    setErr(false)
    const livedata = async ()=> {
      
      try {
          const res = await fetch(`https://omegabombsquad.cyclic.app/api/livedata?key=${API_KEY}`)
          const data = await res.json()
          if(!res.ok){
            setErr(true)
          }
          else{
            setErr(false)
            setLivedata(data.livedata)
            if(data.livedata.teamA.teamAplayers.length <= 0){
              setTeamAEmpty(true)
            }
            else{
              setTeamAEmpty(false)
              setPlayersA(data.livedata.teamA.teamAplayers)
            }
            if(data.livedata.teamB.teamBplayers.length <= 0){
              setTeamBEmpty(true)
            }
            else{
              setTeamBEmpty(false)
              setPlayersB(data.livedata.teamB.teamBplayers)
            }
            setTeamAScore(data.livedata.teamA.teamAscore)
            setTeamBScore(data.livedata.teamB.teamBscore)
            setLivechat(data.livedata.livechat)
            setLoading(false)
          }
          
          
      } catch (error) {
          setErr(true);
          setLoading(false)
          console.log(error);
      }
      
    }
    const interval = setInterval(() => {
      livedata();
    }, 1000);
  
    return () => clearInterval(interval)
  },[])

  return (
    <View style={{ flex: 1, alignItems:'center' }}>
      {loading ? 
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='red'/> 
      </View>  
      :
      <>
      {err ? 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'red' }}>Something went wrong, check your Internet connection</Text>
        </View>
      :
      <View style={{ width: '95%', paddingVertical: 10, gap: 10 }}>
        <View style={{ width: '100%', flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center' }}>
          <Text>LIVE STATS</Text>
          <Text>Partysize - {livedata.partysize}/{livedata.maxsize}</Text>
        </View>
        <ScrollView style={{ height: '100%' }}>
          <View style={{ gap: 10, marginBottom: 50 }}>
            <View style={{ width: '100%', gap:20, flex:1  }}>
                <View style={{ backgroundColor: 'red', padding: 10, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                  <Text style={{color: 'white'}}>Team A</Text>
                  <Text style={{color: 'white'}}>score  : {teamAscore}</Text>
                </View>
                <View style={{ backgroundColor: 'white', height: 250, borderRadius: 4, padding: 20, gap: 10 }}>
                  {teamAempty ? 
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                      <Text>No one is online :|</Text>
                    </View>
                   :
                   <>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Account</Text>
                      <Text style={{ fontWeight: 'bold', fontSize: 15 }}>IG name</Text>
                      <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Client ID</Text>
                   </View>
                   <ScrollView nestedScrollEnabled= {true}>
                      {playersA.map((player)=> (
                          <View key={player.client} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{ flex: 1 }}>{player.name}</Text>
                            <Text style={{ flex: 1, textAlign: 'center' }}>{player.display_id}</Text>
                            <Text style={{ flex: 1, textAlign: 'right' }}>{player.client}</Text>
                          </View> 
                      ))}
                      </ScrollView>
                    </>
                  }
                </View>
              </View>

            <View style={{ width: '100%', gap:20,  flex:1 }}>
              <View style={{ backgroundColor: 'blue', padding: 10, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <Text style={{color: 'white'}}>Team B</Text>
                <Text style={{color: 'white'}}>score  : {teamBscore}</Text>
              </View>
              <View style={{ backgroundColor: 'white', height: 250, borderRadius: 4, padding: 20, gap: 10   }}>
              {teamBempty ? 
                   <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                    <Text>No one is online :|</Text>
                    </View>
                   :
                   <>
                   <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Account</Text>
                      <Text style={{ fontWeight: 'bold', fontSize: 15 }}>IG name</Text>
                      <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Client ID</Text>
                   </View>
                   <ScrollView nestedScrollEnabled={true}>
                    {playersB.map((player)=> (
                      <View key={player.client} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{ flex: 1 }}>{player.name}</Text>
                        <Text style={{ flex: 1, textAlign: 'center' }}>{player.display_id}</Text>
                        <Text style={{ flex: 1, textAlign: 'right' }}>{player.client}</Text>
                      </View>
                    ))}
                    </ScrollView>
                </>
              }
              </View>
          </View>
          <View style={{ gap: 10 }}>
            <Text>Live Chat</Text>
              <ScrollView nestedScrollEnabled={true} style={{ height: 300,backgroundColor: 'black', borderRadius: 4, padding: 10, paddingBottom: 10}}>
                  {livechat.map((chats, index)=> (
                    
                      <Text key={index.toString()} style={{ color: 'white', height: 50 }}>{chats}</Text>
                    
                  ))}
              </ScrollView>
          </View>
        </View>
      </ScrollView>
      </View>
        }
        </>
      }
    </View>
  )
}

export default Events