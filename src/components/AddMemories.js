import React from 'react'
import './AddMemories.css'
import axios from 'axios'

const AddMemories = ({name,memory,setName,setMemory,counter,setCounter}) => {

    const addMemory=()=>{
        console.log(name);
        const data = {
        "name":name,
        "memory":memory
    }
        axios.post("http://localhost:3003",{data}).then(res=>{
            setCounter(counter+1)
        })
    }

    return (

                <div className="addMemories">
                    <div className="memoryInput">
                    <input type="text" className="inputName" placeholder="Your Name" onChange={(e)=>setName(e.target.value)}/>
                    <textarea className="inputMemory" placeholder="Memory Details" onChange={(e)=>{setMemory(e.target.value)}}/>
                   </div>
                <div className="memoryButton">
                    <input type="submit" onClick={()=>{addMemory()}} value="Save"/>
                </div>
                </div>
    )
}

export default AddMemories
