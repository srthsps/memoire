import React,{useEffect} from 'react'
import axios from 'axios'
import './GetMemories.css'

const GetMemories = ({memories,setMemories,counter,setCounter}) => {

    useEffect(()=>{
        axios.get("http://localhost:3003").then(res=>{
            
            setMemories(res.data)
            console.log(memories)
        })

    },[counter])

    return (
        <div className="outerStuff">
             <h3 className="memHead">
                Memories Recollected
            </h3>
        <div className="getMemories">
            {memories.map(m=>{
                return(
                    <div className="memoryElement">
                        
                        <p className="memory">{`"${m.memory}"`}</p>
                        <p className="name">{`by ${m.name}`}</p>
                    </div>
                )
            })}
            </div>
        </div>
                
    )
}

export default GetMemories
