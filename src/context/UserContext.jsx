import React, { useState } from 'react';
import { UserContext } from './user-context';

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: ''
  });

  const updateUserData = (newData) => {
    setUserData(prevData => ({
      ...prevData,
      ...newData
    }));
  };

  const value = {
    userData,
    updateUserData
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};