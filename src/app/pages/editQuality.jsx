import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import EditForm from "../components/ui/editForm";

import qualityService from "../services/quality.service";


const EditQualityPage = () => {
    const [quality, setQuality] = useState(null)
    const [errors, serErrors] = useState(null)
    const id = useParams().id

    const updateQuality = async (content) => {
        try {
            const data = await qualityService.update(id,content)
            return data.content
        }catch (error){
            const {message, code} = error.response.data
        serErrors({message, code})
        toast.error(message)
    }}
    
    const getQuality = async (id)=>{
        try {
            const data = await qualityService.get(id)
            return data.content;
        }catch(error){
            console.log("Expected Error")
        }
    }
    const handleSubmit =  (data) => { 
        updateQuality(data)
    }
  
    

    useEffect(()=>{
        getQuality(id).then((data)=>setQuality(data))
        
    },[])

    return (
        <>
            <h1>Edit Quality Page</h1> 
            {quality!==null? <EditForm data={quality} onSubmit={handleSubmit} />:"Loading"}
        </>
    );
};

export default EditQualityPage;
