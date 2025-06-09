import React from "react";

const SalesList = (props)=>{
    const proList = props.productList.map((pro)=>{
        return(
            <>
            <tr>
                <td>{pro.serial}</td>
                <td>{pro.product}</td>
                <td>{pro.qty}</td>
                <td>{pro.price}</td>
                <td>{pro.dis}</td>
                <td>{pro.total}</td>
                <td><button style={{padding:"2px", border:"none", textAlign:"center"}}><i class='fa fa-trash' style={{color:"red"}}></i></button></td>
            </tr>
            </>
        );
    });
    return <>{proList}</>
}

export default SalesList;

