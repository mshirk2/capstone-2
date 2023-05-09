import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import UserContext from './auth/UserContext';
import ToolLibraryApi from './api';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage("tool-library");

  useEffect(function getUserOnMount(){
    async function getCurrentUser(){
      if (token){
        try {
          let {username} = jwt.decode(token);
          ToolLibraryApi.token = token;
          let currentUser = await ToolLibraryApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error(err);
          setCurrentUser(null);
        }
      }
    }
    getCurrentUser()
  }, [token]);

  async function signup(signupData){
    try {
      let token = await ToolLibraryApi.signup(signupData);
      setToken(token);
      return { success: true }
    } catch (errors) {
      console.error(errors);
      return {success: false, errors}
    }
  }

  async function login(loginData){
    try {
      let token = await ToolLibraryApi.login(loginData);
      setToken(token);
      return {success: true}
    } catch (errors) {
      console.error(errors);
      return {success: false, errors}
    }
  }

  function logout(){
    setCurrentUser(null);
    setToken(null);
  }


  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          currentUser,
          setCurrentUser
        }}
      >
        <div className="App"></div> // nav bar and routes components
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
