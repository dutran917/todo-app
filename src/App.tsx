import "./App.css";
import Login from "./components/Login/index";
import Home from "./components/Home";
import { BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./route/ProtectedRoute";
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <ProtectedRoute
                    path="/"
                    isAuthRoute={false}
                    isProtectedRoute={true}
                    Component={Home}
                ></ProtectedRoute>
                <ProtectedRoute
                    path="/login"
                    isAuthRoute={true}
                    isProtectedRoute={false}
                    Component={() => <Login option="login"></Login>}
                ></ProtectedRoute>
                <ProtectedRoute
                    path="/register"
                    isAuthRoute={true}
                    isProtectedRoute={false}
                    Component={() => <Login option="register"></Login>}
                ></ProtectedRoute>
            </BrowserRouter>
        </div>
    );
}

export default App;
