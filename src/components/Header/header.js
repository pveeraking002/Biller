import React, { useState, useEffect } from "react";
import '../Header/header.css'; 
import Customer  from "../Customer/customer";
import Sales from "../Sales/sales";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = ()=>{
    const [user,setUser]= useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const splitpath = pathname.split("/");
    const [content,setSelectedContent] = useState('sales');
    const [userList,setUserList] = useState([]);
    useEffect(()=>{
        if(user===null)
        {
            const userdata = localStorage.getItem("userToken");
            console.log(userdata);
            if(userdata!=="veera")
            {
                navigate("/")
            }
        }
    });
    useEffect(()=>{
            axios.get(`http://127.0.0.1:8000/getcustomers`)
            .then((res)=>{
                const cust = res.data.customers;
                setUserList(cust);  
            }).catch(()=>console.log("Network Error"));
    },[]);
    const renderContent = ()=>{
        console.log(content)
        switch(content)
        {
            case 'sales':
                return (<Sales userList={userList}/>);
            case 'customers':
                return (<Customer userList={userList}/>);
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
                    <div className="brand"><i class="fa fa-home"></i></div>
                    <div className="hContainer">
                        <ul>
                            <li className={content==="sales" ? "active":""}>
                                <a role="button" onClick={()=>{setSelectedContent('sales')}}><i class="fa fa-home" aria-hidden="true"></i></a>
                            </li>
                            <li className={content==='customer' ? "active":""}>
                                <a role="button" onClick={()=>{setSelectedContent('customers')}}><i class="fa fa-address-book" aria-hidden="true"></i></a>
                            </li>
                            <li><a href="#"><i class="fa fa-university" aria-hidden="true"></i></a></li>
                            <li><a href="#"><i class="fa fa-book" aria-hidden="true"></i></a></li>
                            <li><a href="#" onClick={()=>{setSelectedContent('logout')}}><i class="fa fa-sign-out" aria-hidden="true"></i></a></li>
                        </ul>
                    </div>
                </header>
            </div>
            <div className="content">
                <div className="titleCard">
                    <div className="tContainer">
                        <div className="username">Welcome!  Veerendrakumar</div>
                        <div className="username">06:15:20 PM</div>
                        <div className="username">20/05/1991</div>
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