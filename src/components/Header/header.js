import React, { useState, useEffect } from "react";
import '../Header/header.css'; 
import Customer  from "../Customer/customer";
import Sales from "../Sales/sales";
import axios from "axios";
import TransactionComp from "../Transactions/transaction";
import { useNavigate } from "react-router-dom";

const Header = ()=>{
    const [user,setUser]= useState(null);
    const navigate = useNavigate();
    const [content,setSelectedContent] = useState('sales');
    const [userList,setUserList] = useState([]);
    const [currTime,setCurrTime]= useState(new Date());
    useEffect(()=>{
        if(user===null)
        {
            if(localStorage.key("userToken"))
            {
                const userdata = JSON.parse(localStorage.getItem("userToken"));
                //console.log(userdata["user"]);
                setUser(userdata["user"]);
                //need to validate with database
            }
            else 
            {
                navigate("/");
            }
            
        }
    });
    useEffect(()=>{
        const intervalId = setInterval(()=>{
            setCurrTime(new Date());
        },1000);
        return () => clearInterval(intervalId);
    },[]);
    useEffect(()=>{
            axios.get(`http://127.0.0.1:8000/getcustomers`)
            .then((res)=>{
                const cust = res.data.customers;
                setUserList(cust);  
            }).catch(()=>console.log("Network Error"));
    },[]);
    const renderContent = ()=>{
        //console.log(content)
        switch(content)
        {
            case 'sales':
                return (<Sales userList={userList} username={user}/>);
            case 'customers':
                return (<Customer userList={userList}/>);
            case 'transaction':
                return(<TransactionComp/>);
            case 'logout':
                localStorage.removeItem("userToken");
                navigate('/')
            default:
                return "content Not Found";
        }
    }
    return(
        <>
        <div className="mainArea">
            <div className="navi">
                <header>
                    <div className="hContainer">
                        <ul>
                            <li className={content==="sales" ? "active":""}>
                                <a role="button" onClick={()=>{setSelectedContent('sales')}}><i class="fa fa-home" aria-hidden="true"></i></a>
                            </li>
                            <li className={content==='customers' ? "active":""}>
                                <a role="button" onClick={()=>{setSelectedContent('customers')}}><i class="fa fa-address-book" aria-hidden="true"></i></a>
                            </li>
                            <li  className={content==='transaction' ? "active":""}>
                                <a role="button" onClick={()=>{setSelectedContent('transaction')}}><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a>
                            </li>
                            <li><a href="#"><i class="fa fa-book" aria-hidden="true"></i></a></li>
                            <li><a href="#" onClick={()=>{setSelectedContent('logout')}}><i class="fa fa-sign-out" aria-hidden="true"></i></a></li>
                        </ul>
                    </div>
                </header>
            </div>
            <div className="content">
                <div className="titleCard">
                    <div className="tContainer">
                        <div className="brand"><img src=""/></div>
                        <br/>
                        <div className="username">Welcome! {user}</div>
                        <div className="username">{currTime.toLocaleTimeString()}</div>
                        <div className="username">{currTime.toLocaleDateString()}</div>
                        <br/>
                        <div className="burger"><i class='fa fa-bars'>&nbsp; &nbsp;Menu</i></div>
                    </div>
                </div>

                <div className="entry">
                    <div className="eContainer">
                        <div className="action">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>       
        </>
    );
}
export default Header;