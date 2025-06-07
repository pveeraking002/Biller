import React from "react";
import '../Header/header.css'; 
import Customer from "../Customer/customer";
import Sales from "../Sales/sales";
import { Routes, Route, Link } from "react-router-dom"
import { useLocation } from "react-router-dom";

const Header = ()=>{
    const location = useLocation();
    const { pathname } = location;
    const splitpath = pathname.split("/");
    return(
        <>
        <div className="mainArea">
            <div className="navi">
                <header>
                    <div className="brand"><i class="fa fa-home"></i></div>
                    <div className="hContainer">
                        <ul>
                            <li className={splitpath[1]==="" ? "active":""}>
                                <Link to="/"><i class="fa fa-bar-chart" aria-hidden="true"></i></Link>
                            </li>
                            <li className={splitpath[1]==='/customer' ? "active":""}>
                                <Link to="/customers"><i class="fa fa-address-book" aria-hidden="true"></i></Link>
                            </li>
                            <li><a href="#"><i class="fa fa-university" aria-hidden="true"></i></a></li>
                            <li><a href="#"><i class="fa fa-book" aria-hidden="true"></i></a></li>
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
                            <Routes>
                                <Route path="/" element={<Sales/>}/>
                                <Route path="/customers" element={<Customer/>}/>
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </div>       
        </>
    );
}
export default Header;