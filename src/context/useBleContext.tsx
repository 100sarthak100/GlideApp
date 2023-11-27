import React, { createContext, useContext } from 'react';

import useBLE from '../screens/useBLE';

const BLEContext = createContext();

export const BLEProvider = ({ children }) => {
  const ble = useBLE(); 

  return (
    <BLEContext.Provider value={ble}>
      {children}
    </BLEContext.Provider>
  );
};

export const useBLEContext = () => useContext(BLEContext);
