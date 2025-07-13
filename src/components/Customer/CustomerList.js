import React from "react";
import '../Customer/customerList.css';
import CustomerAvatarFunc from "./customerAvatar";

const CustomerList = (props)=>{
     const cList = props.customers.map((cus)=>{
        return(
            <tr>
                <td><div>{<CustomerAvatarFunc firstname={cus.cname}/>}</div></td>
                <td>{cus.cname}</td>
                <td>{cus.mobile}</td>
                <td>{cus.email}</td>
                <td>{cus.address}</td>
                <td>{cus.company}</td>
                <td>
                    <div className="aBtn">
                        <button><i class='fa fa-trash' id="trash"></i></button>
                        <button><i class='fa fa-edit' id="update"></i></button>
                    </div>
                </td>
            </tr>
        );
     });    
    return <>{cList}</>
}
export default CustomerList;