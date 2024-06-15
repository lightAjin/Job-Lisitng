//Loading data in Job Page from APIs

import React from 'react'
import Spinner from '../components/Spinner'
import { useState , useEffect} from 'react'
import { useParams } from 'react-router-dom'
const JobPage = () => {
    const {id}=useParams();
    const [job , setJob]=useState(null);
    const [loading,setloading]=useState(true);
    useEffect(()=>{
        const fetchJob = async ()=>{
            try{
            const res=await fetch (`/api/jobs/${id}`); 
            const data=await res.json();
            setJob(data);
            }catch (error){
                console.log("Error",error);
            }finally{
                setloading(false);
            }
        }
        fetchJob();
    },[])
  return (
    
        loading ? <Spinner/>:<h2>{job.title}</h2>
    
  )
}

export default JobPage
