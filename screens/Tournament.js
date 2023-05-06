import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Duo from '../components/tournaments/Duo';
import Solo from '../components/tournaments/Solo';

export default function Tournament() {

  const [solo, setSolo] = useState(true)
  const [duo, setDuo] = useState(false)
  
  const handleSolo = ()=>{
    setDuo(false)
    setSolo(true)
  }
  const handleDuo = ()=> {
    setSolo(false)
    setDuo(true)
  }

  return (
    <View style={{ flex: 1}}>
      <View style={{  flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity activeOpacity={0.95} style={[styles.btn, solo && {backgroundColor: 'red'}]} onPress={handleSolo}>
              <Text style={[styles.text, solo && {color: 'white'}]}>Solo</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.95} style={[styles.btn, duo && {backgroundColor: 'red'}]} onPress={handleDuo}>
              <Text style={[styles.text, duo && {color: 'white'}]}>Duo</Text>
          </TouchableOpacity>
            </View>
      <View style={styles.container}>
        {solo && <Solo/>}
        {duo && <Duo/>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ 
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center'
  },
  btn: {
      flexDirection: 'row', 
      height: 50, 
      flex:1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      elevation:5,
  }
})