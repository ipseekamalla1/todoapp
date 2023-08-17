const connectToMongo=require('./db')
const express = require('express')
var cors = require('cors');

const app = express()
const port = 8848

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Ipek!')
})


//Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Todo List Backend listening on port ${port}`)
})


connectToMongo();