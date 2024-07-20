// contexts/UmiContext.js
import { createContext, useContext } from 'react';

export const UmiContext = createContext(null);

export function useUmi() {
  const context = useContext(UmiContext);
  if (!context) {
    throw new Error('useUmi must be used within a UmiProvider');
  }
  return context;
}