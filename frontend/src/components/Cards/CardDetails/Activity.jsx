
import './Activity.scss'
import { FaListUl } from "react-icons/fa6";
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { createComment } from '../../../api/commentApi';
import { updateCardComments } from '../../../api/cardApi';
import CommentTemplate from './CommentTemplate';
const Activity = ({id, comments, onCreateComment}) =>{
    const [addComment, setAddComment] = useState(false);
    const [newComment, setNewComment] = useState(null);
    const [user, setUser] = useState(null);
    const commentRef = useRef();

    useEffect(()=>{
        const fetchUser = async()=>{
            const stored = localStorage.getItem('userInfo');
            const data = await JSON.parse(stored);
            if(data){
                setUser(data)
            }
        }
        fetchUser();
    },[])

    useEffect(()=>{
        if(addComment){
            commentRef.current.focus();
        }
    },[addComment])

    const handleInput= (e) =>{
        if(e.key === 'Escape'){
            setAddComment(false); 
        }
    }

    const handleSave = async() =>{
        const trim = newComment.trim();
        if(!trim) return;
        try{
            const result = await createComment({comment : newComment, user : user._id});
            if(result){
                try{
                    const updatedCard = await updateCardComments(id, result._id)
                    if(updatedCard){
                        setAddComment(false);
                        onCreateComment(updatedCard);
                    }   
                }
                catch(error){
                    console.error(error);
                }
            }
        }
        catch(error){
            console.error(error);
        }
    }

    if(!user){
        return <div>Loading...</div>
    }


    return(
        <div className="activity-container">
            <FaListUl className='icon'/>
            <h3>Activity</h3>

            <div className='create-comment-grid'>
                <img src={user.profilePicture}></img>
                {addComment? (
                    <div className='comment-input'>
                        <textarea placeholder='Write a comment...' ref={commentRef} onKeyDown={handleInput} onChange={(e)=>setNewComment(e.target.value)}></textarea>
                        <button onClick={handleSave}>SAVE</button>
                    </div>
                ) : (

                    <button className='create-comment-button' onClick={()=>setAddComment(true)}>Write a comment...</button>
                )}
            </div>

            <div className='comments'> 
                {comments?.map((comment)=>(
                    <CommentTemplate key={comment._id} data={comment}/>
                ))}
            </div>

        </div>
    )
}

export default Activity;