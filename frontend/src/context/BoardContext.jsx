import {createContext, useContext, useState} from 'react';

const BoardContext = createContext();

export const useBoardContext = () => useContext(BoardContext);

export const BoardContextProvider = ({children}) =>{
    
    const [boardInfo, setBoardInfo] = useState({});

    return(
        <BoardContext.Provider value={{boardInfo, setBoardInfo}}>
            {children}
        </BoardContext.Provider>
    )
}