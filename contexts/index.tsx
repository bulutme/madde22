import { ReactNode, FC, createContext, useState, useEffect } from 'react';

interface ContextProviderProps {
  children: ReactNode;
}

const useContext = () => {
  const [selectedFilter, setSelectedFilterState] = useState<string>('');

  return {
    selectedFilter,
    setSelectedFilterState,
  };
};

export const Context = createContext({} as ReturnType<typeof useContext>);

const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
  return <Context.Provider value={useContext()}>{children}</Context.Provider>;
};

export default ContextProvider;
