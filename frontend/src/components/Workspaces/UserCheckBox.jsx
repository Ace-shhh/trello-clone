import './UserCheckBox.scss';
import { useRef } from 'react';
const UserCheckBox = ({selected, data, onAdd}) =>{
    const ref = useRef();
    const isChecked = selected.includes(data._id);

    return(
        <div className='user-checkbox-container'>
            <input ref={ref} type='checkbox' onChange={()=>onAdd(data._id)} checked={isChecked}/>
            <div className='user-information'>
                <span className='username'>{data.username}</span>
                <span>{data.email}</span>
            </div>
            {data.profilePicture.length > 1? (
                <img className='profile-picture' src={data.profilePicture}/>
            ) : (
                <span className='profile-picture'>{data.username[0]}</span>
            )}
            
        </div>
    )
}

export default UserCheckBox;