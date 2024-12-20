import './AddWorkspace.scss'
import { useState, useRef, useEffect } from 'react';
import { createNewWorkspace } from '../../api/workspaceApi';
import { useAuth } from '../../context/AuthContext';
import { updateUser } from '../../api/userApi';
const AddWorkspace = ({onCancel}) =>{
    const [workspaceName, setWorkspaceName] = useState('');
    const [description, setDescription] = useState('');
    const { userInfo, token, setUserInfo } = useAuth();
    const saveButtonRef = useRef();
    useEffect(()=>{
        const trim = workspaceName.trim();
        if(trim === ''){
            saveButtonRef.current.disabled = true;
        }else{
            saveButtonRef.current.disabled = false;
        }
    },[workspaceName])

    const handleSave = async() =>{
        try{
            const newWorkspace = await createNewWorkspace({
                name : workspaceName,
                description: description,
                members: [{userId : userInfo._id, role : 'owner'}],
            })
            if(!newWorkspace){
                console.log('Create workspace failed');
            };

            const userWorkspaces = userInfo.ownWorkspaces.map((ws)=> ws._id);
            const updatedUserWorkspaces = [...userWorkspaces, newWorkspace._id];
            const updatedUserInfo= {...userInfo, ownWorkspaces : updatedUserWorkspaces};
            try{
                const updated = await updateUser(updatedUserInfo, token);
                if(updated){
                    setUserInfo(updated.data);
                    localStorage.setItem('userInfo', JSON.stringify(updated.data));
                    onCancel();
                }
            }
            catch(error){
                console.error(error)
            }
        }
        catch(error){
            console.error(error)
        }
    }

    return(
        <div className="add-workspace-container">
            <input value={workspaceName} type='text' placeholder='Workspace name' onInput={(e)=>{setWorkspaceName(e.target.value)}}/>
            <input value={description} type='text' placeholder='Workspace Description' onInput={(e)=>{setDescription(e.target.value)}}/>
            <button className='close-button' onClick={onCancel}>X</button>
            <button ref={saveButtonRef} className='save-button' onClick={handleSave}>SAVE</button>
            <span className={`${workspaceName? 'hidden' : ''}`}>Workspace name is required</span>
        </div>
    )
}

export default AddWorkspace;