//Importing dependencies

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const {sign,verify} = require('jsonwebtoken')

//Setting middlewares

app.use(express.json())
app.use(cookieParser())
app.use(cors())
const PORT = 3003

//Creating database schema/blueprint instance

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String
})

const User = mongoose.model('User',userSchema)

//Connecting to database

const db_url = "mongodb+srv://dev-sps:devguy@cluster0.e91lg.mongodb.net/memory_db?retryWrites=true&w=majority"

mongoose.connect(db_url,{useNewUrlParser:true,useFindAndModify:false,useUnifiedTopology:true,useCreateIndex:true}).then(res=>{
    console.log("Connected to datbase")
}).catch(error=>{
    console.log("Failed to connect to database "+error)
})

//Creeating and verifying JWT Tokens

const createToken = (user)=>{
    const accessToken = sign({username:user.username,id:user._id},"somerandomsecretword")
    return accessToken
}

const validateToken = (req,res,next)=>{
    const accessToken = req.cookies["cookie-for-test"]
    if(!accessToken){
        return res.status(400).json({err:"User not authenticated"})
    }
    try{
        const validToken = verify(accessToken,"somerandomsecretword")
        if(validToken){
            req.authenticated = true
            return next()
        }

    } catch(err){
        return res.status(400).json({error:err})
    }
}

//Handling user login/register requests

app.post("/register",(req,res)=>{
    const {username,email,password} = req.body.data
    bcrypt.hash(password,10).then(result=>{
        const user = new User({
            username,
            password:result,
            email
        })
        user.save(()=>{
            console.log("User added successfully")
            res.send("Registered Successfully")
        })
    }).catch(error=>{
        console.log(error,"User not added");
    })
     
    
})


app.post("/login",async(req,res)=>{
    const {username,password} = req.body.data
    const user = await User.find({username:username})   
    if(user.length==0){
        console.log("Login failed")
        res.send("Unknown user")
    }
    else{
        console.log("Login Success")
        const db_password = user.map(u=>u.password).toString()
        console.log(db_password);
        bcrypt.compare(password,db_password).then(results=>{
            if(!results){
                res.send("Incorrect password");
            }
            else{
                
                const accessToken = createToken(user)
                console.log(accessToken)
                res.cookie("cookie-for-test",accessToken,{
                    maxAge: 60*60*24*30*1000
                })
                console.log(`Login Success, Welcome ${user.map(u=>u.username).toString()}`);
                res.send(`Login Success, Welcome ${user.map(u=>u.username).toString()}`)
            }
        })
    }
})

app.get("/home",validateToken,(req,res)=>{
    res.send("It's success")
})


//Handling memoire data requests

let Memories = [
    {
        name:"Sarath",
        memory:"When i jumbed to the fishing thingy when i was a child"
    },

    {
        name:"anoop",
        memory:"Ho can i for get when i kicked him in the head"
    }
]

app.get('/',(req,res)=>{
    res.json(Memories)
})

app.post('/',(req,res)=>{
    const body = req.body.data
    const memObj = {
        "name":body.name,
        "memory":body.memory
        }
    Memories = Memories.concat(memObj)
    res.json(Memories)
})

//Listening to the port for new requests

app.listen(PORT,()=>{
    console.log("Server started running on port 3003")
})