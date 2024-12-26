import './CardTitleEditor.scss';
import { useState, useRef, useEffect } from 'react';
import { updateCard } from '../../../api/cardApi';
import { useColumnContext } from '../../../context/ColumnContext';
import { FaCreditCard } from "react-icons/fa6";
const CardTitleEditor = ({cardId, initialTitle, columnId}) =>{
    const [cardTitle, setCardTitle] = useState(initialTitle);
    const [cardColumn, setCardColumn] = useState({})
    const { setColumns, columns } = useColumnContext();
    const textareaRef = useRef();

    useEffect(()=>{
        if(columns){
            const foundColumn = columns.find((col)=> col._id === columnId);
            setCardColumn(foundColumn);
        }
    },[columns])

    const handleTitleChange= async() =>{
        const trim = cardTitle.trim();
        if(cardTitle === initialTitle || !trim) return
        try{
         const updatedCard = await updateCard(cardId, {title : cardTitle});
         if(updatedCard){
            setColumns((prevColumns)=>
                prevColumns.map((column)=>{
                    if(column._id !== columnId){
                        return column;
                    }
                    const updatedCards = column.cards.map((card)=> card._id === updatedCard._id? updatedCard : card);
                    return {...column, cards : updatedCards};
                })
            )
         }
        }
        catch(error){
          console.error(error)
        }
    }

    const handleKeyDown = (e) =>{
        if(e.key === 'Enter'){
            textareaRef.current.blur();
        }
    }

    if(!columns){
        return <div>Loading..</div>
    }

    return(
        <div className='card-title-container'>
        <FaCreditCard className='card-icon'/>
        <textarea
            className='card-title-textarea'
            ref={textareaRef}
            value={cardTitle} 
            onChange={(e)=>{setCardTitle(e.target.value)}}
            onBlur={handleTitleChange}
            onKeyDown={handleKeyDown}
            spellCheck='false'
        />
        
        <div className='list-container'>
            In list <span>{cardColumn.title}</span>
        </div>
        </div>

    )
}

export default CardTitleEditor;