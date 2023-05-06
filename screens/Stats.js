import { View, Text, TextInput, FlatList, RefreshControl } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator} from 'react-native'
import { API_KEY } from '@env'


const Stats = () => {

  const [query, setQuery] = useState('')
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const fetchStats = async () => {
    try {
      const res = await fetch(`https://omegabombsquad.cyclic.app/api/stats?key=${API_KEY}`)
      const data = await res.json()
      if(!res.ok){
        setLoading(false)
        return setErr(true)
      }
      const stats = data.stats[0].stats; // get the array of stats from the data

      // sort the stats array based on the rank value
      stats.sort((a, b) => {
        if (a.rank < b.rank) {
          return -1;
        } else if (a.rank > b.rank) {
          return 1;
        } else {
          return 0;
        }
      });
        setStats(stats)
        setLoading(false)
    } catch (error) {
        setErr(true)
        setLoading(false)
      }
    }

  useEffect(() => {
    setLoading(true)
    setErr(false)
    fetchStats()
  }, [])


  const onRefresh = () => {
    setRefreshing(true);
    fetchStats();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <View style={{ backgroundColor: 'white', paddingVertical: 20, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>{item?.rank ?? '-'}</Text>
      </View>
      <View style={{ flex: 2, justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center', marginRight: 15 }}>{item?.playername ?? '-'}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
        <Text>{item?.kd ?? '-'}</Text>
      </View>
    </View>
  );

  const keyExtractor = (item, index) => index.toString();

  const handleSearch = ()=> {
    if(query !== ''){
      const filteredData = stats.filter(item => {
        const playerName = item.playername.toLowerCase();
        return playerName.includes(query.toLowerCase());
    })
    filteredData.sort((a, b) => a.rank - b.rank);
    setStats(filteredData)
    }
    else{
      fetchStats()
    }
  }

  return (
    <View style={{ flex:1, alignItems:'center' }}>
      <View style={{ width: '95%', marginVertical: 20, gap: 20 }}>
        <View style={{ borderColor: 'black', borderWidth: 1, width: '100%', flexDirection: 'row', alignItems:'center' }}>
          <TextInput placeholder='search player' style={{ width: '90%', paddingVertical: 10, paddingHorizontal: 10 }} onSubmitEditing={handleSearch} onChangeText={(text)=> setQuery(text)}/>
          <FontAwesome name='search' size={26} onPress={handleSearch}/>
        </View>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, }}>
          <Text>Rank</Text>
          <Text>Name</Text>
          <Text>K/D</Text>
        </View>
           <FlatList
             data={stats}
             renderItem={renderItem}
             keyExtractor={keyExtractor}
             refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
             style={{ height: '85%' }}
           />
      </View>
    </View>
  )
}

export default Stats