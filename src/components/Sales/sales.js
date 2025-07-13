import React, { useEffect, useState } from "react";
import '../Sales/sales.css';
import SalesList from "./saleList";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import Invoice from "../Invoice/invoice";
import Header from "../Header/header";

const Sales = (props)=>{
    const [grossTotal,setGrossTotal] = useState(0);
    const [dis,setDiscount]= useState(0);
    const [netTotal,setNetTotal] = useState(0);
    const [igst,setIgest] = useState(0);
    const [pList,setPlist] = useState([]);
    const [custDetail,setCusDetail] = useState({cname:'',email:'',address:'',company:''});
    const userList = props.userList;
    const [pro,setPro] = useState([]);
    const [subProduct,setSubProduct] = useState("");
    const [sp,setSp] = useState(null);
    //alet message and button
    const [alert,setAlert] = useState(["hidden",""]);
    const [msg,setMsg] = useState("");

    useEffect(()=>{
        const intervalId = setInterval(()=>{
            setMsg("");
            setAlert(["hidden",""]);
        },10000);
        return () => clearInterval(intervalId);
    },[])

    useEffect(()=>{
         axios.get(`http://127.0.0.1:8000/productlist`)
         .then((res)=>{
            if (res.status == 200)
            {  
               const product = res.data.data;
               //console.log(product);
               setPro(product)
            
            }
        })
         .catch(()=>{console.log("Found Error in getting the Product")})
    },[]);
    
    useEffect(()=>{ 
        let newTotal = 0;
        let discount = 0;
        pList.forEach((item)=>{
            newTotal += parseFloat(item.total);
            discount += parseFloat(item.dis);
        });
        let igst = (newTotal*2.5)/100
        setGrossTotal(newTotal.toFixed(2));
        setDiscount(discount);
        setIgest(igst.toFixed(2));
        setNetTotal((newTotal+igst+igst).toFixed(2));
    },[pList]);

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
            let discount = (parseFloat(ctot)*parseFloat(dis))/100;
            return (ctot - discount).toFixed(2);
        }
            

    }
    const addItem = (e)=>{   
        e.preventDefault();
        if(!setsForm.serial ==='' && !setsForm.qty==='' && !setsForm.price==='')
        {
            setsForm({...sForm,total:total})
            setPlist(pList=>[...pList,sForm]);
        
        }
    };  

    const removeItems = (data)=>{
        //console.log("From remove function",data);
        console.log(data);
        const newLst = pList.filter((item)=>parseInt(item.serial) !== parseInt(data));
        setPlist(newLst);
    }

    const handleChange = (event)=>{
        const { name, value } = event.target;
        setsForm({...sForm,[name]:value});  
        //console.log(event.target.value);
        setSubProduct(event.target.value);
    };

    const serialProduct = async (e)=>{
        setSp(null);
        try{
        //console.log(e.target.value);
            if (e.target.value !== "")
            {
                const barcode = e.target.value; 
                const headerContent = {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    } 
                const product = await axios.get(`http://127.0.0.1:8000/product/${barcode}`,{headers:headerContent});
                //console.log(product.data); 
                    setSp(product.data.product)   
                    
            }
        }catch(e)
        {
            setAlert(["visible","darkred"]);
            setMsg("Network Issue");
        }
        
    }
    useEffect(()=>{
        try
        {
            setsForm({...sForm,product:sp[0].productName});
        }
        catch(e)
        {
            setsForm({...sForm,product:'select the Product'});
        }
    },sp!==null);
    //console.log(sp[0].productName);
    const customerDetails = (e)=>{
        setCusDetail({cname:'',email:'',address:'',company:'',mobile:e.target.value});
        if (e.target.value !== '')
        {
            const lst = userList.filter((item)=>{
                if(item[e.target.name]===e.target.value)
                {
                    setCusDetail(item);
                }
            }); 
        }
    }   
    //console.log(custDetail);
    const removeCustomerDetail = (e)=>{
        setCusDetail({cname:'',email:'',address:'',company:''});
    }

    const total = calculateTotal(sForm.dis,sForm.qty,sForm.price);
    const option = pro.map((item)=><option value={item.productName}>{item.productName}</option>);
    const subOptions = pro.map(item=>{
        //console.log(subProduct);
        if(subProduct == item.productName)
        {
            return item.subProduct.map(sp=>{
                //console.log(sp);
                return <option value={sp}>{sp}</option>
            });
        }
    });
    const addCustomer = async()=>{
        try
        {
            const head = {
                'Content-Type': 'application/json'
            }
            console.log(custDetail);
            const status = await axios.post(`http://127.0.0.1:8000/addcustomer/`,custDetail);
            return status;
        }
        catch(e)
        {
          setAlert(["visible","darkred"]);  
          setMsg("Network Issue");  
        }
        
    }
    const printProcess = ()=>{
        window.print();
    }
    return(<>
        <div className="alert" style={{visibility:alert[0], backgroundColor:alert[1]}}>
            <div className="msg">
                {msg}
            </div>
            <div className="cls" onClick={()=>{setAlert(["hidden",""])}}>X</div>
        </div>
        <div className="sales">
            <div className="headerPart">
                <div className="HeaderName">BILLING POINT</div> 
            </div>
            <div className="window">
                <div className="wcontainer">
                   <div className="entry">
                        <h4>Customer Information</h4>
                        <input type="text" name="cname" id="cusName" value={custDetail.cname} 
                        onChange={(e)=>setCusDetail({...custDetail,cname:e.target.value})}placeholder="Customer Name" />

                        <input type="text" name="mobile" id="mobile" onBlur={customerDetails} 
                        onChange={(e)=>setCusDetail({...custDetail,mobile:e.target.value})}placeholder="Mobile"/>

                        <input type="text" name="email" value={custDetail.email} id="email" 
                        onChange={(e)=>setCusDetail({...custDetail,email:e.target.value})}placeholder="Email"/>

                        <input type="text" name="address" id="address" value={custDetail.address}
                        onChange={(e)=>setCusDetail({...custDetail,address:e.target.value})} placeholder="Address"/>

                        <input type="text" name="company" id="company"  value={custDetail.company} 
                        onChange={(e)=>setCusDetail({...custDetail,company:e.target.value})} placeholder="Company"/>
                        <div className="btnGp">
                            <button className="addBtn" onClick={addCustomer}><i class='fa fa-plus'></i></button>
                            <button className="eraseBtn" onClick={()=>removeCustomerDetail()}><i class='fa fa-trash'></i></button>
                        </div>
                        <br/>

                        <h4>Product Details</h4>
                        <input type="text" name="serial" id="Serial" value={sForm.serial} onChange={handleChange} onBlur={serialProduct} placeholder="Serial Number"/>

                        <select name="product" id="pname" value={sForm.product} onChange={handleChange}>
                            {
                             option
                            }
                        </select>
                        <select name="product" id="pname" value={sForm.product}>
                            {
                             subOptions
                            }
                        </select>
                        <input type="text" name="qty" id="qty" value={sForm.qty} onChange={handleChange} placeholder="Qty"/>
                        <input type="text" name="price" id="price" value={sForm.price} onChange={handleChange}  placeholder="Price"/>
                        <input type="text" name="dis" id="dis" value={sForm.dis} onChange={handleChange} placeholder="Discount %"/>                       
                        <input type="text" name="total" id="total" value={sForm.total = total} placeholder="Total" disabled/>
                        <br/>
                        <div className="btnGroup">
                            <button onClick={addItem}><i class='fa fa-plus'></i></button>
                            <button><i class='fa fa-trash'></i></button>
                            <button><i class='fa fa-print'onClick={printProcess}></i></button>
                        </div>
                        <br/>
                        <div className="billerInfo">
                            <div className="head">Biller Details</div>
                            <div className="container">
                                <div className="t1">
                                    <div className="val">50.</div>
                                    <div className="dhead">Transactions</div>
                                </div>
                                <div className="t1">
                                    <div className="val">50.</div>
                                    <div className="dhead">Transactions</div>
                                </div>
                                <div className="t1">
                                    <div className="val">50.</div>
                                    <div className="dhead">Transactions</div>
                                </div>
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
                                            <SalesList productList={pList} removeFunction={removeItems}/>
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
                                                <td>{dis}</td>
                                                <td>00.00</td>
                                            </tr>
                                             <tr>
                                                <td>GGST %</td>
                                                <td>2.5%</td>
                                                <td>{igst}</td>
                                            </tr>
                                             <tr>
                                                <td>IGST %</td>
                                                <td>2.5%</td>
                                                <td>{igst}</td>
                                            </tr>
                                             <tr>
                                                <td>Net Total</td>
                                                <td></td>
                                                <td>{netTotal}</td>
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