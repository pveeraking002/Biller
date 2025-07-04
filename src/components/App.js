
import { PDFViewer } from "@react-pdf/renderer";
import Header from "./Header/header";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Login/login";
import Sales from "./Sales/sales";
//import Invoice from "../components/Invoice/invoice";
/*<PDFViewer style={{ width: '100%', height: '100vh' }} >
            <Invoice />
      </PDFViewer> */

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/main" element={<Header/>}/>
        </Routes>
    </div>
  );  
}
export default App;
