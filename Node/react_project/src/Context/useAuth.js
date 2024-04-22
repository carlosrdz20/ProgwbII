import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

export default function useAuth() {
    console.log("Valor del contexto en useAuth:", AuthContext);
    return useContext(AuthContext);
}
