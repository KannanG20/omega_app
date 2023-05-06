import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Solo = () => {

  const [season, setSeason] = useState(false)
  return (
    <>
    {season ? 
      <>
        <Text style={{ color: 'black', fontSize: 20, marginBottom: 30 }}>SOLO REGISTRATION</Text>
        <TextInput placeholder='Name' style={styles.inputs}/>
        <TextInput placeholder='Discord ID' style={styles.inputs}/>
        <TextInput placeholder='Pb-ID' style={styles.inputs}/>
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: 'white', textAlign:'center' }}>Submit</Text>
        </TouchableOpacity>
        </>
      :
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Coming soon...</Text>
      </View>  
      }
    </>
  )
}

export default Solo

const styles = StyleSheet.create({
    inputs: {
        width: '70%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: 'gray',
        borderWidth: 1    
      },
      button: {
        width: '70%',
        backgroundColor: 'blue',
        paddingVertical: 15,
        paddingHorizontal: 50

      },
})