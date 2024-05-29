import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null); // Assurez-vous que l'utilisateur est initialisé correctement

  const handleSetUser = (user) => {
    console.log("Setting user in context:", user);
    setUser(user);
  };

  console.log("AppProvider user:", user);

  return (
    <AppContext.Provider value={{ cart, setCart, user, setUser: handleSetUser }}>
      {children}
    </AppContext.Provider>
  );
};




