// import './App.css';
import {ConfigProvider} from "antd";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Schedule from "./pages/Schedule";


function App() {

    return (
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: 'Museo Sans Cyrl, sans-serif',
                },
            }}
        >
            <Schedule/>
            <ToastContainer/>
        </ConfigProvider>
    );
}

export default App;
