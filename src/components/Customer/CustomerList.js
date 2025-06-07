import React from "react";
import '../Customer/customerList.css';

const CustomerList = (props)=>{
     const cList = props.customers.map((cus)=>{
        return(
            <tr>
                <td>{cus.customerName}</td>
                <td>{cus.mobile}</td>
                <td>{cus.email}</td>
                <td>{cus.address}</td>
                <td>{cus.company}</td>
                <td>{cus.landMark}</td>
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