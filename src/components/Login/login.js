import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';

const LoginPage =()=>
{
    const[login,setLogin]=useState(false)
    const[username,setUsername]= useState("");
    const[password,setPassword]=useState("");
    const navigate = useNavigate();
    const loginCheck = ()=>{
        if(username==="veera" && password==="123")
        {
            setLogin(true);
            if(login)
            {
                localStorage.setItem('userToken',"veera")
                console.log(localStorage.getItem('userToken'));
                navigate("/main")
            }
            else 
            {
                console.log("login");
            }
        }
        else 
        {
            console.log("please enter your username and password");
        }

    }
    return(<>
    <div className="box1">
        <div className="boxContainer">
           <div className="userfrm">
                <div className="content">
                    <div className="head">
                       <h4>Login</h4>
                    </div>
                    <div className="image">
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"></img>
                    </div>
                    <div className="frm">
                        <input type="text" placeholder="Username" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/><br/>
                        <input type="password" placeholder="Password" name="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    <div className="btnGrp">
                        <button className="loginBtn" onClick={loginCheck}><i class="fa fa-sign-in" aria-hidden="true"></i></button><br/>
                        <button type="button" class="login-with-google-btn" >Sign in with Google</button>
                    </div>
                </div>
           </div>
        </div>
    </div>
    </>)
}

export default LoginPage