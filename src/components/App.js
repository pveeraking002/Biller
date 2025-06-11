
import Header from './Header/header';
import { PDFViewer } from "@react-pdf/renderer";
import Invoice from "../components/Invoice/invoice";
/*<PDFViewer style={{ width: '100%', height: '100vh' }} >
            <Invoice />
      </PDFViewer> */

function App() {
  return (
    <div className="App">
       <Header/>
    </div>
  );
}
export default App;
