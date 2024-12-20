import './UserWorkspaces.css';
import Workspace from '../components/Workspaces/Workspace';
import { useAuth } from '../context/AuthContext';
import AddWorkspace from '../components/Workspaces/AddWorkspace';
import { useState } from 'react';

const UserWorkspaces = () =>{
    const { userInfo } = useAuth();
    const [createWorkspace, setCreateWorkspace] = useState(false);

    if(userInfo === null){
        return <div>Loading...</div>
    }

    return(
        <div className='user-workspaces-page'>
            {createWorkspace && <AddWorkspace onCancel={() => setCreateWorkspace(false)} />}
            <div className='own-workspaces-container'>
                <h3>Your own workspaces</h3>
                {userInfo.ownWorkspaces && userInfo.ownWorkspaces.length > 0 ? 
                (   
                    <>
                        {userInfo.ownWorkspaces.map((ws) => (
                            <Workspace key={ws._id} WorkspaceData={ws}/>
                        ))}
                        <span 
                            className='create' 
                            onClick={() => setCreateWorkspace(true)}
                        >
                            Add workspace
                        </span>         
                    </>
                ) : (
                    <>
                        <p>You don't have any workspaces yet.</p>
                        <span 
                            className='create'  
                            onClick={() => setCreateWorkspace(true)}
                        >
                            Create
                        </span>                    
                    </>
                )
                }
            </div>
            <div className='other-workspaces-container'>
                <h3>Other workspaces</h3>
                {userInfo.otherWorkspaces && userInfo.otherWorkspaces.length > 0 ? 
                    (   
                        <>
                            {userInfo.otherWorkspaces.map((ws) => (
                                <Workspace key={ws._id} WorkspaceData={ws}/>
                            ))}
                        </>
                    ) : (
                        <>
                            <span>You are not a member of any workspaces yet.</span>               
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default UserWorkspaces;
