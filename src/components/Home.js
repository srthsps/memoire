import React,{useState,useEffect} from 'react'
import './Home.css'
import Navbar from './Navbar'
import AddMemories from './AddMemories'
import GetMemories from './GetMemories'

const Home = () => {

    const [name,setName]=useState("")
    const [memory,setMemory]=useState("")
    const [memories,setMemories]=useState([])
    const [counter,setCounter]=useState(0)

    
    return (
        <div className="Home">
            <header>
                <Navbar />
            </header>
            <div className="titled">
                    <h1>
                        Savour the Moments
                    </h1>
                </div>
            <AddMemories name={name} memory={memory} setName={setName} setMemory={setMemory} counter={counter} setCounter={setCounter} />
            <GetMemories memories={memories} setMemories={setMemories} counter={counter} setCounter={setCounter}/>
        </div>
    )
}

export default Home