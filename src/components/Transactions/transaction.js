import React, { useEffect, useState } from "react";
import './transactions.css';
import Invoice from "../Invoice/invoice";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";

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
    const[dis,setDis] = useState("none");
    const handlePdf =()=>{
        setPdfContent(<Invoice/>)
    }

    const showPdf = ()=>{
        setDis("block");
    }

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
                        <div className="p1">
                            <div className="icon">
                                <i class='fa fa-file-pdf-o'></i>
                                <span className="invoice">#Invoice : 123</span>
                            </div>
                            <div className="trans">
                                <div className="tcon">
                                    <span>customer: Veerendrakumar</span>
                                    <span>Date : 20/20/2025</span>
                                    <span>Mob:9688994268</span>
                                    <button onClick={showPdf}>Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
export default TransactionComp;