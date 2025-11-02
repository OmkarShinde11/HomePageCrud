import { useRef, useState } from "react";

export default function useCreateHandaller(createMutation){
    const [isCreate,setCreate]=useState(false);
    const docId=useRef(null);
    function handleCreate(){
        setCreate((check)=>!check);
    };

    function handleCreation(data){
        console.log(data);
        createMutation(data,{
            onSuccess:()=>{
                setCreate(false);
                docId.current=null;
            }
        })
    }

    return {
        isCreate,handleCreate,handleCreation
    }
}