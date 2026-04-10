import {useState,useEffect} from "react";
import axios from "axios";
export default function useFetch(url){
 const [data,setData]=useState([]);
 const [loading,setLoading]=useState(false);
 useEffect(()=>{
  if(!url)return;
  (async()=>{
   setLoading(true);
   const res=await axios.get(url);
   setData(res.data.items||res.data);
   setLoading(false);
  })();
 },[url]);
 return {data,loading};
}
