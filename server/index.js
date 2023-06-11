const express = require('express')
const path = require('path')
const transformData = require('./dataTransformer'); 

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.static(path.resolve(__dirname, '../client/build')))

app.get('/api', (req, res) => {
    const input = [
      {
        id: 1,
        city: 'taipei',
        color: 'blue',
        total: 200,
      },
      {
        id: 2,
        city: 'taichung',
        color: 'red',
        total: 100,
      },
      {
        id: 3,
        city: 'hsinchu',
        color: 'blue',
        total: 100,
      },
      {
        id: 4,
        city: 'taoyuan',
        total: 100,
        age: 30,
      },
    ];
  
    const transformedData = transformData(input);
    res.json(transformedData);
  });
  

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
