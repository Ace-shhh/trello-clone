import './Column.css';
import { useState } from 'react';
import {SortableContext, useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import Card from '../Cards/Card';
import AddCard from '../Cards/AddCard';
import { updateColumn } from '../../api/columnApi';
import { useBoardContext } from '../../context/BoardContext';
import CardDetails from '../Cards/CardDetails/CardDetails';
const Column = ({columnInfo}) =>{
    const [columnTitle, setColumnTitle] = useState(columnInfo.title);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const { setBoardInfo } = useBoardContext();
    const handleBlur = async() =>{

        if(columnTitle === columnInfo.title) return;
        try{
            const updatedColumn = await updateColumn(columnInfo._id, columnTitle);
            if(!updatedColumn){
                console.log('No column data returned')
            }
            
            setBoardInfo((prev)=>{
                const updatedColumns = prev.columns.map((col)=>{
                    if(col._id === updatedColumn._id){
                        return {...col, title: updatedColumn.title}
                    }
                    return col;
                })
                return {...prev, columns : updatedColumns}
            })

        }
        catch(error){
            console.error('Error updating column:', error);
        }
    }


    const {attributes, listeners, setNodeRef, transform, isDragging} = useSortable({id : columnInfo._id});
    const style = {
        transform: CSS.Translate.toString(transform),
    }

    return(
        <div className={`column-container ${isDragging? 'dragging' : ''}`} ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {selectedCardId && (
                <CardDetails 
                    cardId={selectedCardId} 
                    onClose={()=>{setSelectedCardId(null)}}
                    columnId={columnInfo._id}
                />
            )}
            <div className='column-name-container'>
                <input 
                value={columnTitle} 
                onChange={(e)=>{setColumnTitle(e.target.value)}} 
                type='text'
                onClick={(e)=>{e.target.select()}}
                onBlur={handleBlur}
                />
            </div>
            <SortableContext items={columnInfo.cards?.map((card)=>card._id)}>
                <div className='cards-container'>
                    {columnInfo.cards?.map((card)=>(
                        <Card key={card._id} cardInfo={card} onClick={(e)=>{setSelectedCardId(card._id)}}/>
                    ))}
                </div>
            </SortableContext>
            <div className='add-card-div'>
                <AddCard columnId={columnInfo._id}/>
            </div>

        </div>
    );
};

export default Column;