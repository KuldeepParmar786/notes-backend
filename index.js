const express=require('express')
const cors=require('cors')
const app=express()
let notes = [
    {
      id: "1",
      content: "HTML is easy",
      important: true
    },
    {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: "3",
      content: "GET and POST are the most important methods of HTTP protocol ",
      important: true
    }
  ]
app.delete('/api/notes/:id',(request,response)=>{
    const id=request.params.id
    notes=notes.filter(note=>note.id !== id)
    response.status(204).end()
    
})
app.use(express.json())
app.use(cors())
app.get('/api/notes/',(request,response)=>{
    response.json(notes)
})

app.post('/api/notes',(request,response)=>{
   const body=request.body
   const generateId=()=>{
    const maxId=notes.length>0
   ?Math.max(...notes.map(n=>Number(n.id)))
   :0
   return String(maxId+1)
  }
  if(!body.content){
    return response.status(400).json({error:'content missing'})
  }
  const note={
   important:Boolean(body.important) || false,
   content:body.content,
   id:generateId(),
  }
   notes=notes.concat(note)
   response.json(note)
   
})

const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)})