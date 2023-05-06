import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'

const PbInfo = () => {

    return (
        <ScrollView>
            <View style={{ flex:1, width: '100%',alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
                <View style={{ width: '90%', gap: 20 }}>
                    <Text style={{ fontWeight: '600' }}>Go to settings :</Text>
                    <Image source={require('../assets/settings.jpg')} style={{ width: '100%', height: 250, borderRadius: 5 }}/>
                    <Text style={{ fontWeight: '600' }}>Click on Advanced :</Text>
                    <Image source={require('../assets/advanced.jpg')} style={{ width: '100%', height: 250, borderRadius: 5 }}/>
                    <Text style={{ fontWeight: '600' }}>Click on Enter code :</Text>
                    <Image source={require('../assets/enterCodw.jpg')} style={{ width: '100%', height: 250, borderRadius: 5 }}/>
                    <Text style={{ fontWeight: '600' }}>code - (getaccountid) :</Text>
                    <Image source={require('../assets/getaccount.jpg')} style={{ width: '100%', height: 250, borderRadius: 5 }}/>
                    <Text style={{ fontWeight: '600' }}>Final Result :</Text>
                    <Image source={require('../assets/pbid.jpg')} style={{ width: '100%', height: 250, borderRadius: 5 }}/>
                </View>
            </View>
        </ScrollView>
    );
};


export default PbInfo

