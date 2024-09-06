// UserContext.js
import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <UserContext.Provider value={{ 
        currentUser, setCurrentUser,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
