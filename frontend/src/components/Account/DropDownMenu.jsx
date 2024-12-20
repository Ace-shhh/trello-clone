import './DropDownMenu.scss'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { useState, useRef, useEffect } from 'react';
const DropDownMenu = ({data, Blur}) =>{
    const [logoutConfirm, setLogoutConfirm] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const dropDownRef = useRef(null);

    useEffect(()=>{
        const handleClickOutside = (event) =>{
            if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
                Blur();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () =>{
            document.removeEventListener('mousedown', handleClickOutside);
        };

    },[Blur])

    


    return(
        <div className='drop-down-container' ref={dropDownRef}>
            <h3>Account</h3>
            <div className='account-information'>

            </div>
            <button onClick={()=>navigate(`/editProfile/${data._id}`)}>Edit Profile</button>
            <button onClick={() =>setLogoutConfirm(true)}>Logout</button>

            {logoutConfirm? (
                <div className='logout-confirmation'>
                    <div>
                        <h1>Are you sure you want to logout?</h1>
                        <button onClick={()=>logout()}>Yes</button>
                        <button onClick={(e)=>{setLogoutConfirm(false)}}>Cancel</button>
                    </div>

                </div>
            ): null}
        </div>
    )
};

export default DropDownMenu;