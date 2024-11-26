const express=require("express");
const dotenv=require('dotenv');
const { default: mongoose } = require("mongoose");
dotenv.config()

const app=express()
const port=process.env.PORT || 3001

app.get('/',(req,res)=>{
    res.send('Hello worldvgchch')
})

mongoose.connect(`mongodb+srv://tamnhu11204:${process.env.MONGO_DB}@cluster0.23lj7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

.then(()=>{
    console.log('Connect Db success!')
})
.catch((err)=>{
    console.log(err)
})

app.listen(port, ()=>{
  console.log('Server is running in port:',+port)
})