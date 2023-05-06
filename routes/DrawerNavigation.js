import { View, Text, TouchableOpacity } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import BottomTabNavigation from './BottomTabNavigation'
import React, { useContext } from 'react'
import Profile from '../screens/Profile'
import Stats from '../screens/Stats'
import { AuthContext } from '../context/AuthContext'
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native'

const Drawer = createDrawerNavigator()

const CustomDrawerContent = ({ navigation }) => {

  const { user } = useContext(AuthContext)

  const { logout } = useContext(AuthContext)
    const handleLogout = () => {
      // handle logout logic here
      logout()
    }

    const handleDiscord = ()=> {
      Linking.openURL('https://discord.gg/FfBkMQuB')
    }
  
    return (
      <DrawerContentScrollView>
        <View style={{ marginTop: 30, margin: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'  }}>
          <View style={{ gap: 5 }}>
            <Text style={{ fontSize: 20 }}>{user?.username}</Text>
            <Text>{user?.pbId}</Text>
          </View>
          <TouchableOpacity onPress={()=> navigation.closeDrawer()}>
            <MaterialCommunityIcons name='close' size={30}/>
          </TouchableOpacity>
        </View>
        <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, width: '90%' }}>
        <DrawerItem label="profile" onPress={() => 
          {
            navigation.closeDrawer()
            navigation.navigate('Profile')
          }
          } />
        <DrawerItem label="stats" onPress={() => { 
            navigation.closeDrawer()
            navigation.navigate('Stats')}} />
        <DrawerItem label="whitelist" onPress={() => {navigation.closeDrawer()
        navigation.navigate('Whitelist Info')}} />
        </View>
        <DrawerItem label="suggestion" onPress={() => {navigation.closeDrawer()
        navigation.navigate('Suggestion')}} />
        <DrawerItem label="report" onPress={() => {navigation.closeDrawer()
        navigation.navigate('Report')}} />

        <TouchableOpacity onPress={handleDiscord} style={{ marginLeft: 18,  marginTop: 10,backgroundColor: '#7289da', width: 200, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 3 }}>
          <Text style={{ color: 'white' }}>Discord</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={{ marginLeft: 18,  marginTop: 10,backgroundColor: 'red', width: 200, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 3 }}>
          <Text style={{ color: 'white' }}>Logout</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    )
  }

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="home" component={BottomTabNavigation} options={{ title: 'OMEGA' }}/>
    </Drawer.Navigator>
  )
}

export default DrawerNavigation