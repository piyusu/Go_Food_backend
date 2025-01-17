const express = require('express')
const app = express()
const port = 5000
const mongoDB= require("./db")
mongoDB();
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-origin","http://localhost:3000");
  res.header(
    "Access-control-Allow-Headers",
    "Origin,X-Requested-with, Content-Type,Accept"
  )
  next();
})

app.use(express.json())
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.get('/', (req, res) => {
  res.send('Hello World!---')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})