"use client"
import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

function useColorMode(){
    const [colorMode,setColorMode] = useLocalStorage("color-mode","light");
    useEffect(()=>{
        const root = window.document.documentElement;
        root.classList.remove(colorMode === "light" ? "dark" : "light");
        root.classList.add(colorMode);
    }
    ,[colorMode]);
    return [colorMode,setColorMode];
}

export default useColorMode;