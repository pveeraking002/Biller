import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Image, Text, View, Page, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from "@react-pdf/renderer";
import axios from "axios";

    const Invoice = (props) => {
        const inv = props.data;
        const reciept_data = {  
            "id": "642be0b4bbe5d71a5341dfb1",
            "invoice_no":inv[0].createdDate,
            "address":inv[0].customer.data.address + ", Muhavoor",
            "date": inv[0].createdDate,
            "items":
                inv.map(element => {
                    return(
                         {
                            "id": element.customerId,
                            "desc":element.customerId, 
                            "qty":element.qty,
                            "price":element.price
                        }
                    );
                })
            
        };
        const styles = StyleSheet.create({
        // update Invoice styles here 
            page: {fontSize: 11,paddingTop: 20,paddingLeft: 40,paddingRight: 40,lineHeight: 1.5,flexDirection: 'column'},

            spaceBetween : {flex : 1,flexDirection: 'row', alignItems:'center',justifyContent:'space-between',color: "#3E3E3E"},

            titleContainer: {flexDirection: 'row',marginTop: 24},
            
            logo: { width: 90 },

            reportTitle: {fontSize: 16,  textAlign: 'center'},

            addressTitle : {}, 
            
            invoice : {fontWeight: 'bold',fontSize: 20},
            
            invoiceNumber : {fontSize: 10,fontWeight: 'normal',marginTop:"10px"},
            
            address : { fontWeight:'bold', fontSize: 10},
            
            theader : {marginTop : 20, fontSize : 10, color:"#403f3d", fontWeight: 'bold', paddingTop: 4 ,paddingLeft: 7 ,flex:1, height:30, alignItems:"flex-start", backgroundColor : '#DEDEDE', borderColor : 'whitesmoke',borderRightWidth:1,borderBottomWidth:1},

            theader2 : { flex:2, borderRightWidth:0, borderBottomWidth:1},

            tbody:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1, borderColor : 'whitesmoke', borderRightWidth:1, borderBottomWidth:1},

            total:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1.5, borderColor : 'whitesmoke', borderBottomWidth:1},

            tbody2:{ flex:2, borderRightWidth:1, }
        });
        const InvoiceTitle = () => (
            <View style={styles.titleContainer}>
                <View style={styles.spaceBetween}>
                    <Image style={styles.logo} src="https://template.canva.com/EAE1YAgPM_U/1/0/400w-R-Meu_EcnME.jpg" />
                    <Text style={styles.reportTitle}>VEERA ENTERPRISE</Text>
                </View>
            </View>
        );
        const Address = () => (
            <View style={styles.titleContainer}>
                <View style={styles.spaceBetween}>
                    <View>
                        <Text style={styles.invoice}>Invoice</Text>
                        <Text style={styles.invoiceNumber}>Invoice number: {reciept_data.invoice_no} </Text>
                    </View>
                    <View>
                        <Text style={styles.addressTitle}>{reciept_data.address} </Text>
                    </View>
                </View>
            </View>
        );
        const UserAddress = () => (
            <View style={styles.titleContainer}>
                <View style={styles.spaceBetween}>
                    <View style={{maxWidth : 200}}>
                        <Text style={styles.addressTitle}>Bill to </Text>
                        <Text style={styles.address}>
                            {reciept_data.address}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.addressTitle}>{reciept_data.date}</Text>
                    </View>
                    
                </View>
            </View>
        );
        const TableHead = () => (
            <View style={{ width:'100%', flexDirection :'row', marginTop:10}}>
                <View style={[styles.theader, styles.theader2]}>
                    <Text style={{marginTop:"4px"}}>Items</Text>   
                </View>
                <View style={styles.theader}>
                    <Text style={{marginTop:"4px"}}>Price</Text>   
                </View>
                <View style={styles.theader}>
                    <Text style={{marginTop:"4px"}}>Qty</Text>   
                </View>
                <View style={styles.theader}>
                    <Text style={{marginTop:"4px"}} >Amount</Text>   
                </View>
            </View>
        );
        const TableBody = () => (
           reciept_data.items.map((receipt)=>(     
            <Fragment key={receipt.id}>
                <View style={{ width:'100%', flexDirection :'row'}}>
                    <View style={[styles.tbody, styles.tbody2]}>
                        <Text >{receipt.desc}</Text>   
                    </View>
                    <View style={styles.tbody}>
                        <Text>{receipt.price} </Text>   
                    </View>
                    <View style={styles.tbody}>
                        <Text>{receipt.qty}</Text>   
                    </View>
                    <View style={styles.tbody}>
                        <Text>{(receipt.price * receipt.qty).toFixed(2)}</Text>   
                    </View>
                </View>
            </Fragment>
           ))
        );
        const TableTotal = () => (
            <View style={{ width:'100%', flexDirection :'row'}}>
                <View style={styles.total}>
                    <Text></Text>   
                </View>
                <View style={styles.total}>
                    <Text> </Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>Total</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>
                        {reciept_data.items.reduce((sum, item)=> sum + (item.price * item.qty), 0)}
                    </Text>  
                </View>
            </View>
        );
        const documentRender =()=>{
            return(<>
                 <Document>
                    <Page size="A4" style={styles.page}>
                        <InvoiceTitle/>
                        <Address/>
                        <UserAddress/>
                        <TableHead/>
                        <TableBody/>
                        <TableTotal/>
                    
                    </Page>
                </Document>      
            </>);
        }
        return (
           <PDFViewer key={new Date()} style={{ width: '100%', height: '100%' }}>
                {documentRender()}
            </PDFViewer>
        );
    }
export default Invoice