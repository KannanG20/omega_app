import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'

const Duo = () => {

    const [season, setSeason] = useState(false)
  return (
    <>
    {season ? 
        <>
        <Text style={{ color: 'black', fontSize: 20, marginBottom: 30 }}>DUO REGISTRATION</Text>
        <TextInput placeholder='Team Name' style={styles.inputs}/>
        <TextInput placeholder='Player 1 (pb-id)' style={styles.inputs}/>
        <TextInput placeholder='Player 2 (pb-id)' style={styles.inputs}/>
        <TextInput placeholder='Player 1 Discord ID' style={styles.inputs}/>
        <TextInput placeholder='Player 2 Pb-ID' style={styles.inputs}/>
        <TouchableOpacity style={styles.button}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Submit</Text>
        </TouchableOpacity>
        </>
        :
        <Text>Coming soon...</Text>
    
}
</>
  )
}

export default Duo

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