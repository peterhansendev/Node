const express = require('express')
const path = require('path')
const transformData = require('./dataTransformer')
const bodyParser = require('body-parser');
const cors = require('cors')

const PORT = process.env.PORT || 3001

const app = express()

app.use(bodyParser.json());

app.use(cors())

app.use(express.static(path.resolve(__dirname, '../client/build')))

app.post('https://nodeparamvalue.vercel.app/api', (req, res) => {
  const transformedData = transformData(req.body.input)
  res.json({ message: transformedData }) 
}) 

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
