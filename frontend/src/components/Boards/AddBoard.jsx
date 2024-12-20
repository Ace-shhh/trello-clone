import './AddBoard.css'
import { createBoard } from '../../api/boardApi';
import { useState } from 'react';
import { updateWorkspace } from '../../api/workspaceApi';
import { useAuth } from '../../context/AuthContext';
const AddBoard = ({onCancel, WorkspaceData}) =>{
    const [newBoardTitle, setNewBoardTitle] = useState('');
    const {userInfo, setUserInfo} = useAuth();
    const handleCreate = async() =>{
        if(!newBoardTitle) return;
        try{
            const newBoard = await createBoard(newBoardTitle);
            if(!newBoard){
                console.log('Error created new board')
            };
            try{
                const updatedWorkspace = {
                    ...WorkspaceData, boards : [...WorkspaceData.boards, newBoard._id]
                };
                const workspaceResponse = await updateWorkspace(updatedWorkspace);
                
                if(!workspaceResponse){
                    console.log('Error updating workspace boards');
                }

                const updatedWorskpaces = userInfo.ownWorkspaces.map(ws=>
                    ws._id === workspaceResponse._id ? workspaceResponse :  ws
                );

                const updatedUserInfo = {...userInfo, ownWorkspaces: updatedWorskpaces};
                setUserInfo(updatedUserInfo);
                localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
                onCancel();
            }
            catch(error){
                console.error(error);
            }
        }
        catch(error){
            console.log(error)
        }
    }


    const isTitleFilled = () =>{
        return newBoardTitle.trim().length === 0 
    }
    return(
        <div className='add-board-container'>

            <button className='cancel-button' onClick={(e)=>{e.stopPropagation(); onCancel()}}>X</button>
            <span>Board title</span>
            <input type='text' required={true} onChange={(e)=>{setNewBoardTitle(e.target.value)}}/>
            {isTitleFilled() && (                
                <span className='error-message'>Board title is required</span>
            )}
            <button onClick={handleCreate} className='create-button' disabled={isTitleFilled()}>CREATE</button>
        </div>
    )
}

export default AddBoard;