const connectToMongo=require('./db')
const express = require('express')


const app = express()
const port = 8848

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Ipek!')
})



app.listen(port, () => {
  console.log(`Todo List Backend listening on port ${port}`)
})


connectToMongo();