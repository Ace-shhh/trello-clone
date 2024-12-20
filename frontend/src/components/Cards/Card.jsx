import './Card.scss'
import {CSS} from '@dnd-kit/utilities';
import {useSortable} from '@dnd-kit/sortable';
import {useState} from 'react';
const Card = ({cardInfo, onClick}) =>{
    const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id : cardInfo._id});
    const style = {
        transform: CSS.Translate.toString(transform),
    }

    return(

        <div onClick={(e)=>{e.stopPropagation();onClick()}} className={`card-container ${isDragging? 'dragging' : ''}`} ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {cardInfo.title}
        </div>
    )
}
export default Card;