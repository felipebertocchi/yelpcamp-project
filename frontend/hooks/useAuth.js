import { useContext } from "react";
import { AuthContext } from "../src/auth/AuthContext";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;