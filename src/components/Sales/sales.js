import React from "react";
import '../Sales/sales.css';

const Sales = ()=>{
    return(<>
        <div className="sales">
            <div className="headerPart">
                <div className="HeaderName">BILLING POINT</div>
            </div>
            <div className="window">
                <div className="wcontainer">
                   <div className="entry">
                        <h4>Customer Information</h4>
                        <input type="text" name="cusName" id="cusName" placeholder="Customer Name"/>
                        <input type="text" name="mobile" id="mobile" placeholder="Mobile"/>
                        <input type="text" name="email" id="email" placeholder="Email"/>
                        <input type="text" name="address" id="address" placeholder="Address"/>
                        <input type="text" name="company" id="company" placeholder="Company"/>
                        <button><i class='fa fa-search'></i></button>
                        <br/>
                        <h4>Product Information</h4>
                        <input type="text" name="Serial" id="Serial" placeholder="Serial Number"/>
                        <input type="text" name="pname" id="pname" placeholder="ProductName"/>
                        <select>
                        <option value="someOption">Some option</option>
                        <option value="otherOption">Other option</option>
                        </select>
                        <input type="text" name="qty" id="qty" placeholder="Qty"/>
                        <input type="text" name="price" id="price" placeholder="Price"/>
                        <input type="text" name="dis" id="dis" placeholder="Discount %"/>
                        <input type="text" name="nprice" id="nprice" placeholder="Net Price"/>
                        <br/>
                        <div className="btnGroup">
                            <button><i class='fa fa-plus'></i></button>
                            <button><i class='fa fa-trash'></i></button>
                            <button><i class='fa fa-print'></i></button>
                        </div>
                   </div>
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
                                            <th>Net</th>
                                            <th>Total</th>
                                        </tr>
                                        <tbody>
                                            <tr>
                                                <td>123</td>
                                                <td>Product Name</td>
                                                <td>123</td>
                                                <td>123</td>
                                                <td>123</td>
                                                <td>123</td>
                                                <td>123</td>
                                            </tr>
                                            <tr>
                                                <td>123</td>
                                                <td>Product Name</td>
                                                <td>123</td>
                                                <td>123</td>
                                                <td>123</td>
                                                <td>123</td>
                                                <td>123</td>
                                            </tr>
                                            <tr>
                                                <td>123</td>
                                                <td>Product Name</td>
                                                <td>123</td>
                                                <td>123</td>
                                                <td>123</td>
                                                <td>123</td>
                                                <td>123</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="tot">
                                        <table>
                                            <tr>
                                                <td>Gross Total</td>
                                                <td></td>
                                                <td>00:00</td>
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