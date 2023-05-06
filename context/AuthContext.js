import React, { createContext, useState, useEffect, useMemo } from 'react';
import * as SecureStore from 'expo-secure-store';
import { API_KEY } from '@env'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [bsData, setBsData] = useState()
  const [isLogged, setIsLogged] = useState(false)
  const [userExist, setUserExist] = useState(false)
  const [err, setErr] = useState(false)
  const [invalidPb, setInvalidPb] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [appLoad, setAppLoad] = useState(false)
  const [createdUser,setCreatedUser] = useState(false)



  useEffect(() => {
    setAppLoad(true)
      async function loadUser() {
        const token = await SecureStore.getItemAsync('token');
        if (token) {
          const res = await fetch(`https://omegabombsquad.cyclic.app/api/user/${token}?key=${API_KEY}`)
          const data = await res.json();
          if(!res.ok){
            setIsLogged(true)
            setAppLoad(false)
          }
          const pbRes = await fetch(`http://bombsquadgame.com/bsAccountInfo?buildNumber=20258&accountID=${data.pbId}`)
          const Gamedata = await pbRes.json();
          setBsData(Gamedata)
          setUser(data);
          setIsLogged(true)
          setAppLoad(false)
      }
      setAppLoad(false)
    }
    loadUser();
  }, []);

  const login = async (pb, password) => {
    setErr(false)
    setInvalid(false)
    setInvalidPb(false)
    try {
      setLoading(true)
      const loginData = {
        pbId: pb,
        password: password
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      }
      const loginApi = await fetch(`https://omegabombsquad.cyclic.app/api/login?key=${API_KEY}`, requestOptions)
      const loggedData = await loginApi.json()
      if(!loginApi.ok){
        setInvalid(true)
        return setLoading(false)
      }
      await SecureStore.setItemAsync('token', loggedData.results._id);
      try {
        const pbRes = await fetch(`http://bombsquadgame.com/bsAccountInfo?buildNumber=20258&accountID=${pb}`)
        const Gamedata = await pbRes.json();
        setBsData(Gamedata)
      } catch (error) {
          setLoading(false)
          return setInvalidPb(true)
      }
      setUser(loggedData.results)
      setLoading(false)
      setIsLogged(true)
    } catch (error) {
        console.log(error)
        setLoading(false)
        setErr(true)
    }
  };

  const register = async (username, pbId, password) => {
    setErr(false)
    setUserExist(false)
    setInvalidPb(false)
    setLoading(true)
    setCreatedUser(false)
    try {
      const data = {
        username: username,
        pbId: pbId,
        password: password
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }
      try {
        const pbRes = await fetch(`http://bombsquadgame.com/bsAccountInfo?buildNumber=20258&accountID=${pbId}`)
        const Gamedata = await pbRes.json();
      } catch (error) {
        setLoading(false)
        return setInvalidPb(true)
      }
      const authAPI = await fetch(`https://omegabombsquad.cyclic.app/api/register?key=${API_KEY}`, requestOptions)
      const res = await authAPI.json()
      if(!authAPI.ok){
        setLoading(false)
        return setUserExist(true)
      }

      setUser(res.results)
      setLoading(false)
      if(!invalidPb){
        await SecureStore.setItemAsync('usercreated', res.status)
      }
    } catch (error) {
        console.log(error);
        setLoading(false);
        setErr(true)
    }
  }

  const logout = async () => {
    // Make a request to your backend API to invalidate the token
    // Once the token is invalidated, remove the token from SecureStore and set the user object to null
    await SecureStore.deleteItemAsync('token');
    setIsLogged(false)
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLogged, register, createdUser,loading, err, invalidPb, invalid, userExist, bsData, appLoad }}>
      {children}
    </AuthContext.Provider>
  );
};
