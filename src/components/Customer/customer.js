import React, { useState } from "react";
import '../Customer/customer.css';
import CustomerList from "./CustomerList";
const userList = [
        {"customerName":"veera", "mobile":"9688994268", "email":"p.veeraprince002@hotmail.com","address":"testarea","company":"nil","landMark":"co-oprative"},
        {"customerName":"Tester", "mobile":"9688994265", "email":"p.veeraprince002@hotmail.com","address":"testarea","company":"nil","landMark":"co-oprative"}
]
const Customer = ()=>{
    return(<>
        <div className="customer">
            <div className="headerPart">
                <div className="HeaderName">Customer Details</div>
            </div>
            <div className="container">
                <div className="form">
                    <input type="text" placeholder="Search the Customer"></input>
                    <button className="btn"><i class='fa fa-search'></i></button>
                </div>
                <div className="addCustomer">
                    <button className="btn"><i class='fa fa-plus'></i></button>
                </div>
            </div>
            <div className="data">
               <table>
                    <tr>
                        <th>CustomerName</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Company</th>
                        <th>LankMark</th>
                        <th>Action</th>
                    </tr>  
                    <tbody>
                        <CustomerList customers={userList}/>
                    </tbody>
               </table>
            </div>
            <div className="pagination">
                <button>Prev</button>
                <div id="pg">
                    <button className="active">1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
                </div>
                <button>Prev</button>
            </div>
        </div>
    </>);
}

const getCustomerDetails=(data)=>
{
    const cdata = userList.filter((item)=> item.mobile === data);
    return cdata;
}

export { Customer, getCustomerDetails }