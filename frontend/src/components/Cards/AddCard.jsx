import './AddCard.css';
import {useState, useEffect, useRef} from 'react';
import { createCard } from '../../api/cardApi';
import { addCardToColumn } from '../../api/columnApi';
import { useColumnContext } from '../../context/ColumnContext';
const AddCard = ({columnId}) =>{
    const { setColumns } = useColumnContext();
    const [addCard, setAddCard] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState('')
    const titleRef = useRef();

    useEffect(()=>{
        if(addCard){
            titleRef.current.focus();
        }
    },[addCard])

    const handleSave= async() =>{
        if(!newCardTitle) return;
        try{
            const newCard = await createCard(newCardTitle);
            if(!newCard){
                console.error('No new card returned')
            }
            try{
                const updatedColumn = await updateColumnCards(newCard._id);
                if(!updatedColumn){
                    console.log('No new column returned');
                }
                setColumns((prevColumns)=> prevColumns.map((col)=> col._id === updatedColumn._id ? updatedColumn : col));
                setAddCard(false)
            }
            catch(error){
                console.error(error)
            }
        }
        catch(error){
            console.error(error)
        }
    }

    const updateColumnCards = async(cardId) =>{
        try{
            const updatedColumn = await addCardToColumn(columnId, cardId);

            if(!updatedColumn){
                console.error('No updated column returned');
            };
            
            return updatedColumn;
        }
        catch(error){
            console.error(error)
        }
    }

    return(
        <div className='add-card-container'>
            {addCard? (
                <div className='new-card-form'>
                
                    <textarea 
                    ref={titleRef} 
                    placeholder='Enter title' 
                    onChange={(e)=>{setNewCardTitle(e.target.value)}}
                    />

                    <button className='save-button' onClick={handleSave}>Add Card</button>
                    <button className='cancel-button' onClick={()=>{setAddCard(false)}}>X</button>
                </div>
            ) : (
                <button className='add-card-button' onClick={()=>{setAddCard(true)}}>
                    + Add a card
                </button>
            )}
        </div>
    );
}
export default AddCard;