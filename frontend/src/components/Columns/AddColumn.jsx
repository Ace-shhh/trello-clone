import './AddColumns.css'
import { createColumn } from '../../api/columnApi';
import { useState, useRef, useEffect } from 'react'
import { addBoardColumn } from '../../api/boardApi';
import { useColumnContext } from '../../context/ColumnContext';
const AddColumn = ({boardId}) =>{
    const {setColumns} = useColumnContext();
    const inputRef = useRef();
    const [addColumn, setAddColumn] = useState(false);
    const [newColumnName, setNewColumnName] = useState(null)
    
    useEffect(()=>{
        if(addColumn){
            inputRef.current.focus();
        }
    },[addColumn])

    const handleAddColumn = async() =>{
        if(!newColumnName) return;
        try{
            const newColumn = await createColumn(newColumnName);
            if(newColumn){
                const updatedBoard = await addBoardColumn(boardId, newColumn._id);
                if(updatedBoard){
                    setAddColumn(false);
                    setColumns((prev)=>[...prev, newColumn]);
                }
            }
        }catch(error){
            console.error(error)
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            handleAddColumn();
        }
    }

    return(
        <div>
        {addColumn? (
            <div className='add-column-container'>
                <input 
                 type='text' 
                 ref={inputRef} 
                 placeholder='Enter list name...' 
                 onChange={(e)=>{setNewColumnName(e.target.value)}}
                 onKeyDown={handleKeyDown}
                 />
                <div style={{display: 'flex', gap: 3}}>
                    <button className='save-list-button' onClick={handleAddColumn}>Add list</button>
                    <button className='close-button' onClick={()=>setAddColumn(false)}>X</button>
                </div>
            </div>
        ) : (

            <button className='add-list-button' onClick={()=>{setAddColumn(true)}}>+ Add another list</button>
        )}
        </div>
    )
}

export default AddColumn;