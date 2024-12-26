import './Navbar.scss'
import DropDownMenu from '../Account/DropDownMenu';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const Navbar = () =>{
    const navigate = useNavigate();
    const [menu, setMenu] = useState(false);
    const { userInfo } = useAuth();
    
    const handleClick= () =>{
        if(!menu){
            setMenu(true)
        }else{
            setMenu(false)
        }
    }

    const handleBlur= () =>{
        setMenu(false);
    }

    return(
        <div className="navbar-container">
            <h3 className='workspaces' onClick={()=>{navigate(`/userWorkspaces/${userInfo._id}`)}}>WORKSPACES</h3>
            <span className='account' onClick={handleClick}>
                {userInfo.profilePicture && userInfo.profilePicture.length > 1? 
                (<img src={userInfo.profilePicture}/>) : 
                (<p>{userInfo.username[0]}</p>)}
                
            </span>
            {menu && <DropDownMenu data={userInfo} Blur={handleBlur}/>}
        </div>
    )
}

export default Navbar;