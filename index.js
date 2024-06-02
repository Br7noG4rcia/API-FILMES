const express = require("express")
const mongoose = require('mongoose');

const app = express()
app.use(express.json())
const port = 3000


const film = mongoose.model('film', {
    title: String,
    description: String,
    image_url: String,
    trailer_url: String, 

})

app.get("/", async (req, res) => { 
    const films = await film.find()
    return res.send(films)
})

app.delete("/:id", async(req, res) => {
   const film = await film.findByIdAndRemove(req.params.id) 
   return res.send(film)
})

app.put("/:id", async(req, res) => {
    const film = await film.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,    
        trailer_url: req.body.trailer_url 
    }) 
        
})

return res.send(film)

app.post("/",async (req, res) => {
    const film = new Film({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,    
        trailer_url: req.body.trailer_url
    })

    await film.save()
    return res.send(film)
})

app.listen (port, () => {
    mongoose.connect('mongodb+srv://brunogarcia:m5C3JMDPLPN740QG@starwars-api.8ef9nbx.mongodb.net/?retryWrites=true&w=majority&appName=starwars-api');
    console.log('App running')
})
