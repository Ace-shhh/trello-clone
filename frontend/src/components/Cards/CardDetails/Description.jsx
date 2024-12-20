import './Description.scss';
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from 'react';
import { useEffect, useRef } from 'react';
const Description = ({description, onDescriptionUpdate}) =>{
    const [addDescription, setAddDescription] = useState(false);
    const [currentDescription, setCurrentDescription] = useState(description || '');
    const textareaRef = useRef();

    useEffect(()=>{
        if(addDescription){
            textareaRef.current.focus();
        };
    },[addDescription]);
    const handleSave = () =>{
        if(description === currentDescription) return;
        onDescriptionUpdate(currentDescription);
        setAddDescription(false);
    }

    return(
        <div className='description-container'>
            <GiHamburgerMenu className='icon'/>

            <div className='comment-header'>
                <h3>Description</h3>
                {currentDescription && <button className='edit-button' onClick={()=>setAddDescription(true)}>Edit</button>}
            </div>

            {addDescription? (
                <div className='description-editor'>
                    <textarea 
                        ref={textareaRef}
                        value={currentDescription}
                        placeholder='Your description..'
                        onChange={(e)=>{setCurrentDescription(e.target.value)}}
                    />
                    <>
                        <button onClick={handleSave}>SAVE</button>
                        <button onClick={()=>setAddDescription(false)}>CANCEL</button>
                    </>
                </div>
            ):( 
                <>
                {currentDescription? (
                    <p onClick={()=>setAddDescription(true)}>{currentDescription}</p>
                ):(
                    <button className='add-description-button' onClick={(e)=>{setAddDescription(true)}}>Add a more detailed description</button>
                )}
                </>
            )}
        </div>
    )
}

export default Description;