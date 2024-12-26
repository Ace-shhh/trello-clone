import { DndContext, useSensor, useSensors, MouseSensor, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useColumnContext } from '../../context/ColumnContext';
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from 'react';
import Column from '../Columns/Column';
import Card from '../Cards/Card';
import { updateBoardColumnsOrder } from '../../api/boardApi';
import { updateCardsOrder } from '../../api/columnApi';
import { checkIfColumnOrCard, moveCard } from "../../utils/dndHelpers";
const DragAndDropProvider = ({ items, children, boardId}) =>{
    const { columns, setColumns } = useColumnContext();
    const [activeId, setActiveId] = useState(null);

    const handleDragEnd = async(e) =>{
        if(!e.over.id) return;
        if(e.active.id === e.over.id) return;
        const activeInfo = checkIfColumnOrCard(columns, e.active.id);
        const overInfo = checkIfColumnOrCard(columns, e.over.id);
        if (!activeInfo || !overInfo) return;
        if(activeInfo.which === 'column' && overInfo.which === 'column'){   
            reorderColumns(activeInfo, overInfo);
        }
        else if (activeInfo.which === 'card' && overInfo.which === 'card'){
            reorderCards(activeInfo, overInfo);
        }
    }

    const reorderColumns = (activeInfo, overInfo) =>{
        const prevColumns = [...columns];
        const updatedColumns = arrayMove(prevColumns, activeInfo.columnIndex, overInfo.columnIndex);
        setColumns(updatedColumns);
        updateBoardColumnsOrder(boardId, updatedColumns);
    }

    const reorderCards = (activeInfo, overInfo) =>{
        const updatedColumns = [...columns];
        const currentColumn = {...updatedColumns[activeInfo.columnIndex]};
        const updatedCardsOrder = arrayMove(currentColumn.cards, activeInfo.cardIndex, overInfo.cardIndex);
        currentColumn.cards = updatedCardsOrder;
        updatedColumns[activeInfo.columnIndex] = currentColumn;
        setColumns(updatedColumns);
        updateCardsOrder(currentColumn, updatedCardsOrder);
    }

    const handleDragOver = async(e) =>{
        if(!e.over.id) return;
        if(e.active.id === e.over.id) return;
        const activeInfo = checkIfColumnOrCard(columns, e.active.id);
        const overInfo = checkIfColumnOrCard(columns, e.over.id);
        if(activeInfo.which === 'column') return;
        
        if(activeInfo.columnIndex !== overInfo.columnIndex){
            const {updatedColumns, sourceColumn, destinationColumn} = moveCard(columns, activeInfo, overInfo)
            setColumns(updatedColumns);
            try{
                const sourceCardIds = sourceColumn.cards.map((card)=> card._id)
                const deleted = await updateCardsOrder(sourceColumn, sourceCardIds);
                if(deleted){
                    try{
                        const destinationCardIds = destinationColumn.cards.map((card)=> card._id)
                        const updated = await updateCardsOrder(destinationColumn, destinationCardIds);
                    }
                    catch(error){
                        console.error(error)
                    }
                }
            }
            catch(error){
                console.error(error)
            }
        }
    }

    const sensors = useSensors(useSensor(MouseSensor, {
        activationConstraint: {
            delay: 150,
            tolerance: 5000,
        }
    }))

    return(
        <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragStart={(e)=>setActiveId(e.active.id)} onDragOver={(e)=>{handleDragOver(e)}}>
            <SortableContext items={items || []}>
            <DragOverlay style={{opacity: 0.6}}>
                {activeId ? ( ()=>{
                    const result = checkIfColumnOrCard(columns, activeId);
                    if(!result) return null;
                    const { data, which } = result;
                    if(which === 'column'){
                        return(
                            <Column columnInfo={data}/>
                        )
                    }
                    else if(which === 'card'){
                        return(
                            <Card cardInfo={data}/>
                        )
                    }
                }
                )() : null}
            </DragOverlay>
                {children}
            </SortableContext>
        </DndContext>
    );
};

export default DragAndDropProvider;