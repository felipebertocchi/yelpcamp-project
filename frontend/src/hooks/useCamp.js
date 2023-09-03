import { useContext } from "react";
import { CampContext } from "../contexts/CampContext";

const useCamp = () => {
    return useContext(CampContext);
}

export default useCamp;