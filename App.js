import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthProvider, AuthContext} from './context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import Login from './screens/Login';
import PbInfo from './screens/PbInfo';
import { ActivityIndicator, TouchableOpacity, View} from 'react-native'
import MainStackNavigation from './routes/MainStackNavigation';
import Register from './screens/Register';
import NetInfo from '@react-native-community/netinfo';
import { Text } from 'react-native';


const Stack = createStackNavigator()

const AppNavigator = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    }
  }, [refresh])
  const { isLogged, appLoad } = useContext(AuthContext)

  return (
    <>
    {isConnected ? 
      <>
      {appLoad ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' color='red'/>
        </View>
        :
      <NavigationContainer>
          {isLogged ? 
              <MainStackNavigation/>
            :
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Register" options={{ headerShown: false }}>
                      {(props) => <Register {...props} navigation={props.navigation} />}
                </Stack.Screen>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                <Stack.Screen name="PbInfo" component={PbInfo} options={{ title: 'Get Pb ID' }} />
            </Stack.Navigator>
          }
        <StatusBar />
      </NavigationContainer>
    }
    </>
  :
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
    <Text style={{ textAlign: 'center' }}>Please Check your Internet connection and try again</Text>
    <TouchableOpacity style={{ paddingVertical: 10, paddingHorizontal: 30, borderWidth:1, borderColor: 'black' }} onPress={()=> setRefresh((prev)=> !prev)}>
      <Text>Refresh</Text>
    </TouchableOpacity>
  </View>
}
  </>
  );
};

export default function App() {

  return (
    <SafeAreaView style={{ flex:1 }}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaView>
  );
}

