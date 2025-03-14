
import React, { useContext, useState } from 'react'
import { LoginWrapper } from './Login.style'
import Input from '../../components/input/Input'
import Button from '../../components/clicks/button/Button';
// import ButtonLoader from '../../components/clicks/button/button_loader/ButtonLoader';
import axios from 'axios';
import { UserContext } from '../../components/context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {

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
        }else if(password === null || password === '') {
            setPasswordError(true);
        }else{
            setIsLoading(true);
            try {
                const res = await axios.post(process.env.REACT_APP_URL + '/api/auth/login', { email, password }, { withCredentials: true });
                console.log(res.status + " \nLOGIN DATA:\n" + res.data + " Login successful")
                setUser(res.data);
                navigate('/dashboard');
            } catch (err) {
                setLoginError(true);
                setIsLoading(false)
                console.log(err)
            }

            setEmail('');
            setPassword('')
        }
    }


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
                
            />
             <Input
                type={"password"}
                title={"Password"}
                value={password}
                placeholder={"password"}
                error={passwordError}
                onChange={(e)=>onChangeHandler('password', e)}
                inputPadding={"15px"}
                     />
                
                <div><Button btnPd={'15px 20px'} btnText={isLoading? <>{'Processing'}</>   : 'Login'}/></div>
                {loginError && 'Incorrect password or email'}
        </form>
    </LoginWrapper>
  )
}


{/* <ButtonLoader text={'Processing'}/> */}