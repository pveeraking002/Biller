import React, { useState } from "react";
import '../Sales/sales.css';
import SalesList from "./saleList";

const Sales = ()=>{
    const [grossTotal,setGrossTotal] = useState(0);
    const [pList,setPlist] = useState([]);
    const [sForm,setsForm] = useState({
        serial:'',
        product:'',
        qty:0,
        price:0,
        dis:0,
        total:0
    });

    const calculateTotal = (dis,qty,total)=>{
        const ctot = qty*total;
        if(dis===0){
            return (ctot).toFixed(2);
        }
        else{
            return  (ctot - ctot*dis/100).toFixed(2);

        }
        
    }

 
    
    const addItem = ()=>{   
        if(!setsForm.serial && !setsForm.qty && !setsForm.price)
        {
            setsForm({...sForm,total:total})
            setPlist(pList=>[...pList,sForm]);
            
            grossTotalFunc()
        }
       
    };  
    const grossTotalFunc = ()=>{

        pList.map((item)=>{  
               setGrossTotal(item.price + grossTotal);
            });
        
            console.log(grossTotal);
    }
    const handleChange = (event)=>{
        const { name, value } = event.target;
        setsForm({...sForm,[name]:value});
    };

    const total = calculateTotal(sForm.dis,sForm.qty,sForm.price);
    return(<>
        <div className="sales">
            <div className="headerPart">
                <div className="HeaderName">BILLING POINT</div>
            </div>
            <div className="window">
                <div className="wcontainer">
                   <div className="entry">
                        <h4>Customer Information</h4>
                        <input type="text" name="cusName" id="cusName" placeholder="Customer Name" />
                        <input type="text" name="mobile" id="mobile" placeholder="Mobile"/>
                        <input type="text" name="email" id="email" placeholder="Email"/>
                        <input type="text" name="address" id="address" placeholder="Address"/>
                        <input type="text" name="company" id="company" placeholder="Company"/>
                        <button><i class='fa fa-search'></i></button>
                        <br/>

                        <h4>Product Information</h4>
                        <input type="text" name="serial" id="Serial" value={sForm.serial} onChange={handleChange} placeholder="Serial Number"/>

                        <select name="product" id="pname" value={sForm.product} onChange={handleChange}>
                        <option value="someOption">Some option</option>
                        <option value="otherOption">Other option</option>
                        </select>

                        <select value={sForm.subtype} onChange={handleChange} >
                        <option value="someOption">Some option</option>
                        <option value="otherOption">Other option</option>
                        </select>
                        <input type="text" name="qty" id="qty" value={sForm.qty} onChange={handleChange} placeholder="Qty"/>
                        <input type="text" name="price" id="price" value={sForm.price} onChange={handleChange}  placeholder="Price"/>
                        <input type="text" name="dis" id="dis" value={sForm.dis} onChange={handleChange} placeholder="Discount %"/>                       
                        <input type="text" name="total" id="total" value={sForm.total = total} placeholder="Total" disabled/>
                        <br/>
                        <div className="btnGroup">
                            <button onClick={addItem}><i class='fa fa-plus'></i></button>
                            <button><i class='fa fa-trash'></i></button>
                            <button><i class='fa fa-print'></i></button>
                        </div>
                        <br/>
                        <div className="billerInfo">
                            <div className="head">BILLER INFORMATION</div>
                            <div className="container">
                                <div className="bName">Biller Name : Veerendrakumar</div>
                                <div className="bStart">Start Time : 00:00:00</div>
                                <div className="brole">Role : Admin</div>
                            </div>
                        </div>
                   </div>
                   {/* Boxing code */}
                   <div className="box">
                        <div className="plist">
                                <div className="lst">
                                    <h4>Cart List</h4>
                                    <i class='fa fa-list'></i>
                                </div>
                                <div className="cart">
                                    <table>
                                        <tr>
                                            <th>Sl#</th>
                                            <th>Product</th>
                                            <th>Qty</th>
                                            <th>Gross</th>
                                            <th>Dis%</th>
                                            <th>Total</th>
                                            <th>Action</th>
                                        </tr>
                                        <tbody>
                                            <SalesList productList={pList}/>
                                        </tbody>
                                    </table>
                                    <div className="tot">
                                        <table>
                                            <tr>
                                                <td>Gross Total</td>
                                                <td></td>
                                                <td>{grossTotal}</td>
                                            </tr>
                                             <tr>
                                                <td>Discount</td>
                                                <td>10%</td>
                                                <td>00:00</td>
                                            </tr>
                                             <tr>
                                                <td>GGST %</td>
                                                <td>2.5%</td>
                                                <td>00:00</td>
                                            </tr>
                                             <tr>
                                                <td>IGST %</td>
                                                <td>2.5%</td>
                                                <td>00:00</td>
                                            </tr>
                                             <tr>
                                                <td>Gross Total</td>
                                                <td></td>
                                                <td>00:00</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
export default Sales;