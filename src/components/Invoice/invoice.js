
import React from 'react'
import { Image, Text, View, Page, Document, StyleSheet,Font } from '@react-pdf/renderer';

    Font.register({
       family: 'Helvetica',
       fonts: [
         { src: './Fonts/Helvetica.ttf', fontWeight: 400 },
         { src: './Fonts/Helvetica-Bold.ttf', fontWeight: 700 } // or 400 if you're using a bold weight for normal
       ]
     });

    const Invoice = () => {

        const reciept_data = {  
            "id": "642be0b4bbe5d71a5341dfb1",
            "invoice_no": "20200669",
            "address": "739 Porter Avenue, Cade, Missouri, 1134",
            "date": "24-09-2019",
            "items": [
            {
                "id": 1,
                "desc": "do ex anim quis velit excepteur non",
                "qty": 8,
                "price": 179.25
            },
            {
                "id": 2,
                "desc": "incididunt cillum fugiat aliqua Lorem sit Lorem",
                "qty": 9,
                "price": 107.78
            },
            {
                "id": 3,
                "desc": "quis Lorem ad laboris proident aliqua laborum",
                "qty": 4,
                "price": 181.62
            },
            {
                "id": 4,
                "desc": "exercitation non do eu ea ullamco cillum",
                "qty": 4,
                "price": 604.55
            },
            {
                "id": 5,
                "desc": "ea nisi non excepteur irure Lorem voluptate",
                "qty": 6,
                "price": 687.08
            }
            ]
        };
        const styles = StyleSheet.create({
        // update Invoice styles here 
            page: {fontSize: 11,paddingTop: 20,paddingLeft: 40,paddingRight: 40,lineHeight: 1.5,flexDirection: 'column'},

            spaceBetween : {flex : 1,flexDirection: 'row', alignItems:'center',justifyContent:'space-between',color: "#3E3E3E", backgroundColor: 'red' },

            titleContainer: {flexDirection: 'row',marginTop: 24},
            
            logo: { width: 90 },

            reportTitle: {fontSize: 16,  textAlign: 'center'},

            addressTitle : {}, 
            
            invoice : {fontWeight: 'bold',fontSize: 20},
            
            invoiceNumber : {fontSize: 'bold',fontWeight: 'bold'}, 
            
            address : { fontWeight:'bold', fontSize: 10},
            
            theader : {marginTop : 20,fontSize : 10,fontStyle: 'bold',paddingTop: 4 ,paddingLeft: 7 ,flex:1,height:20,backgroundColor : '#DEDEDE',borderColor : 'whitesmoke',borderRightWidth:1,borderBottomWidth:1},

            theader2 : { flex:2, borderRightWidth:0, borderBottomWidth:1},

            tbody:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1, borderColor : 'whitesmoke', borderRightWidth:1, borderBottomWidth:1},

            total:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1.5, borderColor : 'whitesmoke', borderBottomWidth:1},

            tbody2:{ flex:2, borderRightWidth:1, }
        });

        const InvoiceTitle = () => (
        // update InvoiceTitle component here 
            <View style={styles.titleContainer}>
                <View style={styles.spaceBetween}>
                    <Image style={styles.logo} src='https://upload.wikimedia.org/wikipedia/commons/f/f9/Wikimedia_Brand_Guidelines_Update_2022_Wikimedia_Logo_Brandmark.png'/>
                    <Text style={styles.reportTitle}>Veera Enterprises</Text>
                </View>
            </View>
        );

        const Address = () => (
        // update Address component here
            <View style={styles.titleContainer}>
                <View style={styles.spaceBetween}>
                    <View>
                        <Text style={styles.invoice}>Invoice </Text>
                        <Text style={styles.invoiceNumber}>Invoice number: {reciept_data.invoice_no} </Text>
                    </View>
                    <View>
                        <Text style={styles.addressTitle}>7, Ademola Odede, </Text>
                        <Text style={styles.addressTitle}>Ikeja,</Text>
                        <Text style={styles.addressTitle}>Lagos, Nigeria.</Text>
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
                    <Text style={styles.addressTitle}>{reciept_data.date}</Text>
                </View>
            </View>
        );
        const TableHead = () => (
            <View style={{ width:'100%', flexDirection :'row', marginTop:10}}>
                <View style={[styles.theader, styles.theader2]}>
                    <Text >Items</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Price</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Qty</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Amount</Text>   
                </View>
            </View>
        );
        return (
                <Document>
                    <Page size="A4" style={styles.page}>
                        <InvoiceTitle/>
                        <Address/>
                        <UserAddress/>
                        <TableHead/>
                    </Page>
                </Document>
        );
    }
export default Invoice