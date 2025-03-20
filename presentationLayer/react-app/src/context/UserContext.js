// src/context/UserContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider component to wrap around the app to provide context
export const UserProvider = ({ children }) => {
  // Separate state for email and password
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(()=>{
    const savedemail = localStorage.getItem("email")
    const savedpassword = localStorage.getItem("password")

    if(savedemail && savedpassword){
      setEmail(savedemail)
      setPassword(savedpassword)
    }
  },[])

  // Function to log in the user with email and password
  const login = (email, password) => {
    setEmail(email);
    setPassword(password);
  };

  // Function to log out the user
  const logout = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <UserContext.Provider value={{ email, password, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
