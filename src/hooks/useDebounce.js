import {useState,useEffect} from "react";
export default function useDebounce(val,delay=400){
 const [d,setD]=useState(val);
 useEffect(()=>{const t=setTimeout(()=>setD(val),delay);return()=>clearTimeout(t)},[val]);
 return d;
}
