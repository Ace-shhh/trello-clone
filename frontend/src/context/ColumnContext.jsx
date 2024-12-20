import { useState, createContext, useContext} from 'react';

const ColumnContext = createContext();

export const useColumnContext = () => useContext(ColumnContext);

export const ColumnContextProvider = ({children}) =>{
    const [columns, setColumns] = useState([]);

    return(
        <ColumnContext.Provider value={{columns, setColumns}}>
        {children}
        </ColumnContext.Provider>
    );
};