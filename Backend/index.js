const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const app=express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb://127.0.0.1:27017/todo").then(()=>console.log("DB success"))
.catch(()=>console.log("DB failed"))
const Fruit =mongoose.model("Fruit",{name:String},"fruit")

//const fruit=["Apple","orange"]
app.get("/fruits",function(req,res){
    Fruit.find().then(function(retdata){
        console.log(retdata)
        res.send(retdata)
    })
})
app.post("/addfruit",function(req,res)
{
    
    var newfruit=req.body.newfruit
    const newFruit= new Fruit({
        name:newfruit
    });
    newFruit.save().then((data)=>{
        console.log("savedsuccesfully...")
    res.send(data)})
})
app.post("/delfruit",function(req,res){
    
    var did=req.body.did
    Fruit.findByIdAndDelete(did).then(function(ddata){
        //console.log(ddata)
    })
})
app.listen("5000",function(){
    console.log("server started.....")
})