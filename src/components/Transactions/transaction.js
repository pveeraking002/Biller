import React, { useEffect, useState } from "react";
import './transactions.css';
import Invoice from "../Invoice/invoice";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";

/*
            <PDFDownloadLink
            key={Date.now()} // Changes every rerender. 
            document={<Invoice/>}
            fileName="My lovely PDF"
            >
            Download PDF
            </PDFDownloadLink>
            */
const TransactionComp=()=>{
    const [pdfContent, setPdfContent] = React.useState(null);
    const [trans,setTrans] = useState([]);
    const [pdfTrans,setPdfTrans] = useState([]);
    const [allTrans,setAllTrans] = useState([]);
    const[dis,setDis] = useState("none");
    const [cusId,setcusId] = useState(1);
    const [inv,setInv] = useState([]);
    const[loading, setLoading] = useState(true);


    const handlePdf =()=>{
        const invo =()=>{
            setPdfContent(<Invoice data={inv}/>);
        }
        const data = ()=>{
            const dt = async()=>{
                try{
                    const headerContent = {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    } 
                    const Transactions = await axios.get(`http://127.0.0.1:8000/getTransactionsById/3`,{headers:headerContent});
                    setInv(Transactions.data.result);
                }
                catch(error){}
                finally{setLoading(false)}
            };
            dt();
        }
        data();
        if (loading) return <p>Loading data...</p>;
        invo();
    }

    const showPdf = ()=>{
        setDis("block");
    }
    
    useEffect(()=>{
         const getAllTransactions = async()=>{
            const headerContent = {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    } 
            const Transactions = await axios.get(`http://127.0.0.1:8000/getTransactions/`,{headers:headerContent});
            //console.log(Transactions.data.result);
            const uniqueData = Array.from(new Set(Transactions.data.result.map(obj => JSON.stringify(obj))))
            .map(str => JSON.parse(str));
            //console.log(uniqueData);
            setTrans(uniqueData);
            setAllTrans(Transactions.data.result);
         }
         getAllTransactions();
    },[]);
    
    return(<>
        <div className="invoicePdf" style={{"display":dis}}>
            <button onClick={handlePdf} className="printBtn"><i  class='fa fa-print'></i></button>
            {pdfContent}
        </div>
        <div className="customer">
            <div className="headerPart">
                <div className="HeaderName">Transactions</div>
                <div className="content">
                    <div className="search">
                        <div className="bcontent">
                            <input type="text" placeholder="Invoice#" />
                            <input type="text" placeholder="Invoice#" />
                            <input type="text" placeholder="Invoice#" />
                            <input type="text" placeholder="Invoice#" />
                        </div>
                        <div className="btnGro">
                            <button>Search</button>
                        </div>
                    </div>
                    <div className="grid">
                        {
                            
                            trans.map((val)=>{
                               return <div className="p1">
                                    <div className="icon">
                                        <i class='fa fa-file-pdf-o'></i>
                                        <span className="invoice">#Invoice : BILL{val.createdDate}</span>
                                    </div>
                                    <div className="trans">
                                        <div className="tcon">
                                            <span>customer: {val.customer.data.cname}</span>
                                            <span>Date : {val.createdDate}</span>
                                            <span>Mobile : {val.customer.data.mobile}</span>
                                            <button onClick={showPdf}>Details</button>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    </>);
}
export default TransactionComp;