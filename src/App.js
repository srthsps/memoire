import React,{useEffect,useState} from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import axios from 'axios'
import {useAuth0} from '@auth0/auth0-react'
import Home from './components/Home'
import { render } from 'react-dom'
import ReactDOM from 'react-dom';

const App = () => {

    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loginuser,setLoginuser] = useState("")
    const [loginPassword,setLoginpassword] = useState("")
    const [regResponse, setRegResponse] = useState("")
    const [logResponse,setLogResponse] = useState("")

    const {loginWithRedirect,logout,user,isAuthenticated} = useAuth0()


    const check = () =>{
        ReactDOM.render(
            <Home isauth={isAuthenticated} logout={logout} user={user}/>,document.getElementById('root')
        )
    }

    if(isAuthenticated){
        check()
    }

    const Register = () =>{
       const data = {
           username,
           email,
           password
       }
       axios.post("http://localhost:3003/register",{data}).then(res=>{
           console.log(res.data);
           setRegResponse(res.data)
           setEmail("")
           setUsername("")
           setPassword("")
           setLogResponse("")
       })
        
    }


   
    

    const Login = () =>{
        const data = {
            username : loginuser,
            password : loginPassword
        }

        axios.post("http://localhost:3003/login",{data}).then(res=>{
            console.log(res.data)
            setLogResponse(res.data)
            setLoginuser("")
            setLoginpassword("")
            setRegResponse("")
            if(res.data!=="Incorrect password"){
            if(res.data!=="Unknown user"){
                check()
            }
            
            }
            
        })
    }

   

    return (
            
        <div className="outerDiv">
            <div className="titleDiv">
                <h1 className="title">Welcome to Memoire</h1>
            </div>
            <div className="content">
                <div className="register">
                    <div className="register_head">
                        <h3 className="register_title">Register</h3>
                    </div>
                    <div className="register_input">
                        <input type="text" value={username} onChange={(e)=>{
                            setUsername(e.target.value)
                        }} placeholder="Username"/>
                        <input type="email" value={email} onChange={(e)=>{
                            setEmail(e.target.value)
                        }} placeholder="Email"/>
                        <input type="password" value={password} onChange={(e)=>{
                            setPassword(e.target.value)
                        }} placeholder="Password"/>
                    </div>
                    <div className="register_button">
                        <input type="submit" onClick={()=>Register()} value="Register"/>
                    </div>
                    <div className="reg_response">
                        <p className="response">
                            {regResponse}
                        </p>
                    </div>
                </div>


                <div className="tmp_div">

                <p className="login_status">
                    {isAuthenticated ? "Logged in" && (<button className="temp_logout" onClick={logout}>
                        Logout
                    </button>) : "Not Logged in"}
                </p>
                <br/>
                
                    </div>




                <div className="login">
                    <div className="login_head">
                        <h3 className="login_title">Login</h3>
                    </div>
                    <div className="login_input">
                        <input type="text" value={loginuser} placeholder="Username" onChange={(e)=>{
                            setLoginuser(e.target.value)
                        }}/>
                        <input type="password" value={loginPassword} placeholder="Password" onChange={(e)=>{
                            setLoginpassword(e.target.value)
                        }}/>
                    </div>
                    <div className="login_button">
                        <input type="submit" value="Login" onClick={()=>Login()} />
                    </div>
                    <div className="google_login">
                        <button onClick={loginWithRedirect}>Login/Register with google</button>
                    </div>
                    <div className="log_response">
                        <p className="response">
                            {logResponse}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
