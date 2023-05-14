// import './App.css';
import {ConfigProvider} from "antd";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Schedule from "./pages/Schedule";
import {useEffect} from "react";
import {userService} from "./utils/userService";


function App() {

    useEffect(() => {
        // Get the URL from window.location.href
        const url = window.location.href;

        // Extract the parameter value from the URL
        const parameter = url.substring(url.lastIndexOf(':') + 1);

        userService.updateLocal(parameter)
    }, []);

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
