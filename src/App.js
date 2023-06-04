import {ConfigProvider} from "antd";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useEffect} from "react";
import {userService} from "./services/userService";
import {AppRoutes} from "./routes/AppRoutes";


function App() {

    useEffect(() => {
        // Get the URL from window.location.href
        const url = window.location.href;

        // Extract the parameter value from the URL
        const segments = url.split('_');
        const code = segments[1];
        const id = segments[2];
        console.log(segments, 'sss')

        userService.updateLocal(code, id)
    }, []);

    return (
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: 'Museo Sans Cyrl, sans-serif',
                },
            }}
        >
            <AppRoutes/>
            <ToastContainer/>
        </ConfigProvider>
    );
}

export default App;
