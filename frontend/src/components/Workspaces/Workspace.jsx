import './Workspace.scss';
import AddBoard from '../Boards/AddBoard';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import AddParticipant from './AddParticipant';
import MembersPreview from './MembersPreview';
const Workspace = ({WorkspaceData}) =>{
    const [addBoard, setAddBoard] = useState(false);
    const [AddMember, setAddMember] = useState(false);


    return (
        <div className='workspace-container'>
            <h3>{WorkspaceData.name}</h3>
            <div className='add-member-wrapper'>
                <MembersPreview members={WorkspaceData.members}/>
                <button onClick={()=>{setAddMember(true)}}>
                    Add members
                </button>
                {AddMember && (<AddParticipant WorkspaceData={WorkspaceData} Blur={()=>setAddMember(false)}/>)}
            </div>
            <div className='boards-container'>
                {WorkspaceData.boards?.map((board)=>(
                    <Link 
                        key={board._id}
                        to={`/board/${board._id}`}
                    >
                    <div className='board'>
                        {board.title}
                    </div>
                    </Link>
                ))}
                <span className='create-board-div' onClick={()=>{setAddBoard(true)}}>
                    Create new board
                    {addBoard? (
                        <AddBoard 
                        onCancel={()=>{setAddBoard(false)}} 
                        WorkspaceData={WorkspaceData}
                        />
                        ) : (null)}
                </span>
            </div>

        </div>
    )
}

export default Workspace;