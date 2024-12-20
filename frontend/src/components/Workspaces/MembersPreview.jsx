import './MembersPreview.scss';
import { MdKeyboardArrowDown } from "react-icons/md";
import {useState, useEffect, useRef} from 'react';
import { searchUsersById } from '../../api/userApi';
const MembersPreview = ({members}) =>{
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [membersInfo, setMembersInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const previewRef = useRef();

    useEffect(()=>{
        const handleClickOutside = (event) =>{
            if(previewRef.current && !previewRef.current.contains(event.target)){
                setIsPreviewOpen(false);
            };
        };

        if(isPreviewOpen){
            document.addEventListener('mousedown', handleClickOutside);
        }
        else{
            document.removeEventListener('mousedown', handleClickOutside);
        };

        return ()=>{
            document.removeEventListener('mouseDown', handleClickOutside);
        }
    },[isPreviewOpen]);

    const fetchMembersInfo = async()=>{
        try{
            const userIds = members.map((user)=> user.userId);
            const result = await searchUsersById(userIds);
            if(result){
                return result
            }
        }
        catch(error){
            console.log(error);
        };
    }

    useEffect(()=>{
        if(isPreviewOpen){
            (async () =>{
                setIsLoading(true);
                setError(null);
                try{
                    const fetched = await fetchMembersInfo();
                    setMembersInfo(fetched || []);
                }
                catch(error){
                    setError('Failed to load members')
                }
                finally{
                    setIsLoading(false);
                }
            })();
        }
    }, [isPreviewOpen])

    const handleClick = async(e) =>{
        e.stopPropagation();
        setIsPreviewOpen(!isPreviewOpen);
    }

    return(
        <div className='members-container' ref={previewRef}>
            <div className='button-display' onClick={handleClick}>
                <span>Members</span> <MdKeyboardArrowDown className='icon'/>
            </div>

            {isPreviewOpen && (
                <div className='members-list'>
                    {isLoading ? (
                        'Loading...'
                    ) : error? (
                        <div className='error'>{error}</div>
                    ) : membersInfo.length > 0 ? (
                        membersInfo.map((member)=>(
                            <div key={member._id} className='member-container'>
                                <img src={member.profilePicture}/>
                                <span className='username'>{member.username}</span>
                            </div>
                        ))
                    ) : (
                        'No members found'
                    )}
                </div>
            )}
        
        </div>
    )
}

export default MembersPreview;