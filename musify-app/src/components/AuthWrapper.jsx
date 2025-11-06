import { useState } from "react";
import { useAuth } from "../context/context";
import Login from "./Login";
import Register from "./Register";


const AuthWrapper = ({children}) => {
    const {isAuthenticated} = useAuth();
    const [showRegister, setShowRegister] = useState(false);

    if(!isAuthenticated()){
        return showRegister ? (
            <Register />
        ) : (
            <Login />
        );
    }

    return children;
}

export default AuthWrapper;