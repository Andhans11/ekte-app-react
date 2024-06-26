import React, { createContext, useState, useContext } from 'react';
import { AuthenticatedUserContext } from '../providers/AuthenticatedUserProvider';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(AuthenticatedUserContext);
