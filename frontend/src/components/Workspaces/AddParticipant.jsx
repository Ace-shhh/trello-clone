import './AddParticipant.scss';
import { useEffect, useState, useRef } from 'react';
import { searchUsers } from '../../api/userApi';
import UserCheckBox from './UserCheckBox';
import {updateWorkspace} from '../../api/workspaceApi';
import {useAuth} from '../../context/AuthContext';
import { addWorkspaceToMembers } from '../../api/userApi';
const AddParticipant = ({WorkspaceData, Blur}) =>{
    const addMemberRef = useRef();
    const inputRef = useRef();
    const [searchField, setSearchField] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [usersSelected, setUsersSelected] = useState([]);
    const { setUserInfo } = useAuth();



    useEffect(()=>{
        inputRef.current.focus();
        const handleClickOutside = (e) =>{
            
            if(addMemberRef.current && !addMemberRef.current.contains(e.target)){
                Blur();
            };
        }
        
        document.addEventListener('mousedown', handleClickOutside);

        return() =>{
            document.removeEventListener('mousedown', handleClickOutside);
        }
    },[Blur])
    
    const handleSearch = async () =>{
        const trim = searchField.trim();
        if(!trim) return;
        try{
            const result = await searchUsers(trim);
            if(result){
                const currentMemberIds = WorkspaceData.members.map((member)=>member.userId);
                const filteredResult = result.data.filter((res)=>{
                    if(currentMemberIds.includes(res._id)){
                        return;
                    }else{
                        return res;
                    }
                })
                setSearchResults(filteredResult);
            };
        }
        catch(error){
            console.error(error);
        };
    }

    const handleAdd = (id) =>{
        const index = usersSelected.includes(id)
        if(!index){
            setUsersSelected((prev)=>[...prev, id]);
        }
        else{
            setUsersSelected((prev)=> prev.filter((curr)=> curr !== id))
        } 
    }

    const handleSave = async() =>{
        const newMembers = usersSelected.map((user)=>({userId : user, role : 'member'}))
        const updatedWorkspace = {...WorkspaceData, members : [...WorkspaceData.members, ...newMembers]};
        try{
            const result = await updateWorkspace(updatedWorkspace);
            if(result){
                setUserInfo((prev)=>{
                    const currentUser = {...prev};
                    const updatedCurrentUserWorkspaces = currentUser.ownWorkspaces.map((ws)=> ws._id === updatedWorkspace._id ? updatedWorkspace : ws);
                    currentUser.ownWorkspaces = updatedCurrentUserWorkspaces;
                    return currentUser;
                });
                
                try{
                    const result = await addWorkspaceToMembers(usersSelected, WorkspaceData._id);
                    if(result){
                        Blur();
                        setUsersSelected([])
                    }
                }
                catch(error){
                    console.log(error);
                }

                Blur();
            }
        }
        catch(error){
            console.error(error)
        }
    }

    return(
        <div className='add-member-div' ref={addMemberRef}>
            <h3>Search username</h3>
            <div className='search-container'>
                <input ref={inputRef} placeholder='username' onChange={(e)=>setSearchField(e.target.value)}/>
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className='search-list'>
                {searchResults?.map((user)=>
                    <UserCheckBox selected={usersSelected} key={user._id} data={user} onAdd={handleAdd}/>
                )}
            </div>

            {
                usersSelected.length > 0 ? (
                    <div className='buttons-container'>
                    <button onClick={handleSave}>Add</button>
                    <button onClick={()=>Blur()}>Cancel</button>
                </div>
                ) : (null)
            }
        </div>
    )
}

export default AddParticipant;