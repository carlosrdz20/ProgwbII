import { useContext } from "react";
import { PublicacionContext } from "../Context/PubProvider";

export default function useAuthPub() {
    console.log("Valor del contexto en useAuthPub:", PublicacionContext);
    return useContext(PublicacionContext);
}
