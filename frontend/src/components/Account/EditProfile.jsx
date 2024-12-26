import './EditProfile.scss'
import { useAuth } from '../../context/AuthContext';
import {useState} from 'react'
import { updateUserInfo } from '../../api/userApi';
const EditProfile = () =>{
    const { userInfo, setUserInfo } = useAuth();
    const [userName, setUsername] = useState(userInfo.username || '');
    const [email, setEmail] = useState(userInfo.email || '');
    const [password, setPassword] = useState(userInfo.password || '');
    const [newPassword, setNewPassword] = useState('');
    const [image, setImage] = useState('');
    const [changePassword, setChangePassword] = useState(false);
    const [preview, setPreview] = useState(userInfo.profilePicture || '');

    if(!userInfo){
        return <div>Loading...</div>
    }

    const handleFileChange = (e) =>{
        const file = e.target.files[0];
        if(file){
            setImage(file);
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
        }
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', userName);
        formData.append('email', email);
        formData.append('oldPassword', password);
        formData.append('newPassword', newPassword);
        if(image){
            formData.append('profilePicture', image);
        }
        try{
            const updatedUser = await updateUserInfo(formData, userInfo._id);
            if(updatedUser){
                console.log(updatedUser);
                alert(updatedUser.message);
                setUserInfo((prev)=>{
                    const updated = {...prev, ...updatedUser.data}
                    return updated;
                })
            }
        }
        catch(error){
            console.error(error)
        }
    } 

    return(
        <form className='container' onSubmit={handleSubmit}>
            <div className='main-content'>
                <div className='inputs'>
                    <label>
                        Name :
                        <input type='text' value={userName} onChange={(e)=>setUsername(e.target.value)}/>
                    </label>
                    <label>
                        Email :
                        <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </label>
                    <label>
                        Current password :
                        <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} required={true}/>
                    </label>
                        {changePassword? (
                            <label>
                                New password :
                                <input type='password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                            </label>

                        ) : (
                            <span onClick={()=>setChangePassword(true)}>Change password?</span>
                        )}
                </div>
                <div className='profile-picture'>
                    <div className='picture'>
                        {preview.length > 1 ? (
                          <img src={preview} alt='Profile Preview' />
                        ) : (
                          <span>{userInfo.profilePicture}</span>
                        )}
                    </div>

                    <input type='file' id='fileInput' onChange={handleFileChange} hidden/>
                    <label htmlFor='fileInput' className='photo-button'>
                        Choose photo
                    </label>
                </div>
            </div>
            <button type='submit'>Save Changes</button>
        </form>
    )
}

export default EditProfile;