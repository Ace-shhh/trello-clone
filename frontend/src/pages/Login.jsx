import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loginUser } from '../api/userApi';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Backdrop/Loading';
import GoogleIcon from '../assets/googleIcon.png'
const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();


    useEffect(()=>{
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const userId = params.get('userId');
        
        if(token && userId){
            setLoading(true);
            const loginGoogleUser = async(req, res) =>{
                try{
                    const user = await loginUser(undefined, undefined, userId);
                    if(!user){
                        return Alert('User not found');
                    }
                    login(token, user.user)
                    navigate(`/userWorkspaces/${user.user._id}`);
                }
                catch(error){
                    console.log(error);
                }
                finally{
                    setLoading(false);
                }
            }
            loginGoogleUser();
        }

    },[navigate, login])
    
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

    const handleGoogleLogin = async () => {
        try {
          window.location.href = 'http://localhost:4000/api/sessions/google';
          const response = await fetch('http://localhost:4000/api/sessions/oauth/google', {
            method: 'GET',
            credentials: 'include',
          });
          const data = await response.json();
      
          if (data.token && data.user) {
            login(data.token, data.user);
            navigate(`/userWorkspaces/${data.user._id}`);
          }
        } catch (error) {
          console.error('Google Login failed:', error);
        }
    };

    if(loading){
        return <Loading/>
    }

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

                <div className='divider'><span>or</span></div>
                <button className='google-sign-in-button' onClick={handleGoogleLogin}>
                <img src={GoogleIcon} alt='Sign in using Google'/>
                </button>
                <span>Pull request test</span>
            </form>

        </div>
    )
}

export default Login;
