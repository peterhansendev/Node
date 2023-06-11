const express = require('express')
const path = require('path')
const transformData = require('./dataTransformer')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = process.env.PORT || 3001

const app = express()

app.use(bodyParser.json())

app.use(cors())

app.use(express.static(path.resolve(__dirname, '../client/build')))

app.post('/api', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const transformedData = transformData(req.body.input)
  res.json({ message: transformedData })
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.options('/api', cors())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
