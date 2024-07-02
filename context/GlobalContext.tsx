//
//
//

"use client";

import { createContext, useContext, useState } from "react";

// Create context
const GlobalContext = createContext();

// Create provider
// This is to be brought in th elayout of the application
export function GlobalProvider({ children }) {
  const [unreadMessage_COUNT, SET_unreadMessageCount] = useState(0);

  return (
    <GlobalContext.Provider value={{ unreadMessage_COUNT, SET_unreadMessageCount }}>
      {children}
    </GlobalContext.Provider>
  );
}

// Create a cusotm hook to access context
// This is to be used in any component that needs to access the context
export function USE_globalContext() {
  return useContext(GlobalContext);
}
