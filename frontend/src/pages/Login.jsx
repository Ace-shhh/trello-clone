import './Login.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginUser } from '../api/userApi';
import { useAuth } from '../context/AuthContext';

const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const handleLogin = async(e) =>{
        e.preventDefault();
        if(!email || !password) return;
        try{
            const data = await loginUser(email, password);
            if(data){
                login(data.token, data.user);
                navigate(`/userWorkspaces/${data.user._id}`);
            }
        }catch(error){
            console.error('Login failed:', error);
        };
    };

    return(
        <div className='login-page'>
            <form className="login-form" onSubmit={handleLogin}>
                <label>USERNAME</label>
                <input 
                    type='text' 
                    placeholder='user@email.com' 
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                />
                <label>PASSWORD</label>
                <input 
                    type='password' 
                    placeholder='******' 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button type="submit">LOGIN</button>
            </form>
        </div>
    )
}

export default Login;
