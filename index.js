const express = require("express")
const cors = require("cors")
const mongose = require("mongoose")
const app = express()

app.use(cors())

app.use(express.json())

mongose.connect("mongodb://127.0.0.1:27017/todos").then(function(){
    console.log("database connected....");
})
const todos = mongose.model("todos",{name:String},"action")


app.listen(process.env.PORT || 5000,function(){
    console.log("server started....")
})

app.get("/addtodo",function(req,res){
    
    todos.find().then(function(retdata){
        res.send(retdata)
    })

})
app.post("/passvalue",function(req,res){
    const newtodo = req.body.todovalue
    const todol = new todos({
        name:newtodo
    });
    todol.save().then(function(){
        console.log("saved")
    })
   res.send(todol);
})

app.delete("/removevalue/:id",function(req,res){
  const id = req.params.id
  todos.findByIdAndDelete(id).then(function(){
    console.log("deleting the field")
  });
})

