import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [products, setProducts] = useState([]); 
  const [filtered, setFiltered] = useState(new Array());
  const [count, setCount] = useState(0);

  return (
    <GlobalContext.Provider value={{ products,filtered,count, setProducts,setFiltered ,setCount}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);