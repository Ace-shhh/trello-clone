import './CardDetails.scss';
import Backdrop from '../../Backdrop/Backdrop'
import { useEffect, useState } from 'react';
import { fetchCard } from '../../../api/cardApi';
import CardTitleEditor from './CardTitleEditor';
import Notifications from './Notifications';
import Description from './Description'
import Activity from './Activity';
import { updateCard } from '../../../api/cardApi';
const CardDetails = ({cardId, onClose, columnId}) =>{
    const [fullCardInfo, setFullCardInfo] = useState(null);


    useEffect(()=>{
      const fetch = async()=>{
        try{
          const CardInfo = await fetchCard(cardId);
          if(CardInfo){
            setFullCardInfo(CardInfo);
          }
        }
        catch(error){
          console.error(error);
        }
      }
      fetch();
    },[cardId])

    
    if(!fullCardInfo) return <div>Loading...</div>


    const handleDescriptionUpdate = async(newDesc) =>{
        try{
          const updatedCard = await updateCard(fullCardInfo._id, {description : newDesc});
          if(updatedCard){
            if(updatedCard){
              setFullCardInfo((prev)=> ({...prev, description: updatedCard.description}))
            }
          }
        }
        catch(error){
          console.error(error);
        };
    }

    const handleCreateComment = (updatedCard) =>{
      console.log(updatedCard);
      setFullCardInfo(updatedCard);
    };

    return(
      <Backdrop>
        <div className='card-details-container' onClick={(e)=>{e.stopPropagation()}}>
          <button className='close-button' onClick={()=>{onClose()}}>X</button>
          <CardTitleEditor 
            cardId={cardId} 
            initialTitle={fullCardInfo.title} 
            columnId={columnId}
          />
          <div className='divider'>
            <div className='card-information'>
              <Notifications/>
              <Description description={fullCardInfo.description} onDescriptionUpdate={handleDescriptionUpdate}/>
              <Activity id={fullCardInfo._id} comments={fullCardInfo.comments} onCreateComment={handleCreateComment}/>
            </div>
            <div className='bunch-of-buttons'>
            </div>
          </div>
        </div>
      </Backdrop>
    )
};

export default CardDetails;