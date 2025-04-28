
import React, { useContext, useEffect, useState } from 'react'
import { LoginWrapper } from './Login.style'
import Input from '../../components/input/Input'
import Button from '../../components/clicks/button/Button';
// import ButtonLoader from '../../components/clicks/button/button_loader/ButtonLoader';
import axios from 'axios';
import { UserContext } from '../../components/context/UserContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.css"

export default function Login() {

    console.log('=========\n', `${process.env.REACT_APP_URL}/api/auth/login`, '\n==================')

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {user, setUser } = useContext(UserContext) // user context

    const navigate = useNavigate()

// input change handler
    const onChangeHandler = (type, e) =>{
        if(type === 'email'){
            setEmail(e.target.value);
            setEmailError(false);
        }else if(type === 'password'){
            setPassword(e.target.value);
            setPasswordError(false);
        }
    }
    
    // input Login handler
    const onSubmitHandler = async (e) =>{
        
        e.preventDefault();

        if (email === null || email === '') {
            setEmailError(true);
            return;
        }else if(password === null || password === '') {
            setPasswordError(true);
            return;
        }else{
            setIsLoading(true);
            try {
            
                const res = await axios.post(`${process.env.REACT_APP_URL}/api/auth/login`, { email, password });
                
                console.log(res.data);
                
                setUser(res.data);
                
                toast.success('Login successfully')
                setIsLoading(false);
                 navigate('/dashboard')
               
            } catch (err) {
                // setLoginError(true);
                setIsLoading(false)
                         // If email already exists, show the error toast
                            if (err.response && err.response.data && err.response.data.message) {
                                toast.error(err.response.data.message); // Show the email already exists message
                            } else {
                                toast.error('An error occurred while Login In');
                            }
            }

            setEmail('');
            setPassword('')
        }

    }



    
    // useEffect to navigate after user context is updated
    // useEffect(() => {
    //     if (user) {
    //         if (user.role === "admin") {
    //             navigate('/dashboard');
    //         } else if (user.role === "user") {
    //             navigate('/user-dashboard');
    //         } 
    //     }
    // }, [user, navigate])




  return (
    <LoginWrapper>
        <h1>Login</h1>
        <form onSubmit={onSubmitHandler}>
            <Input
                type={'email'}
                title={"Email"}
                value={email}
                placeholder={"email"}
                error={emailError}
                onChange={(e)=>onChangeHandler('email', e)}
                inputPadding={"15px"}
                bdColor={'white'}
                
            />

             <Input
                type={"password"}
                title={"Password"}
                value={password}
                placeholder={"password"}
                error={passwordError}
                onChange={(e)=>onChangeHandler('password', e)}
                inputPadding={"15px"}
                bdColor={'white'}
                     />
                
            <div><Button btnPd={'15px 20px'} btnText={isLoading? <>{'Processing'}</>   : 'Login'}/></div>
                {loginError && 'Incorrect password or email'}
        </form>
        
         {/* ===================Toast Message ================= */}
                 <ToastContainer
                      position="top-center"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick={false}
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"
                    />
    </LoginWrapper>
  )
}


{/* <ButtonLoader text={'Processing'}/> */}