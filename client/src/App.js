import React from 'react'
import './App.css'

function App () {
  const [data, setData] = React.useState(null)
  const [userInput, setUserInput] = React.useState([
    {
      param: '',
      value: ''
    }
  ])
  const [input, setInput] = React.useState([
    {
      id: 1,
      city: 'taipei',
      color: 'blue',
      total: 200
    },
    {
      id: 2,
      city: 'taichung',
      color: 'red',
      total: 100
    },
    {
      id: 3,
      city: 'hsinchu',
      color: 'blue',
      total: 100
    },
    {
      id: 4,
      city: 'taoyuan',
      total: 100,
      age: 30
    }
  ])

  React.useEffect(() => {
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input })
    })
      .then(res => res.json())
      .then(data => setData(data.message))
  }, [input])

  const handleClick = () => {
    if (userInput.some(obj => obj.param === '' || obj.value === '')) {
      alert('Please fill in both Param and Value!')
      return
    }
    const newInput = [...input]
    const newEntry = {
      id: newInput.length + 1
    }
    newEntry[userInput[0].param] = userInput[0].value
    console.log(newEntry)
    newInput.push(newEntry)
    setInput(newInput)
    setUserInput([{ param: '', value: '' }])
  }

  return (
    <div className='App'>
      <header className='App-header'>
        {!data ? (
          'Loading...'
        ) : (
          <div>
            {data.map((item, index) => (
              <div
                className='border-solid border-2 border-indigo-600 capitalize'
                key={index}
              >
                <h3 className='bg-black'>{item.param}</h3>
                <ul>
                  {item.values.map((value, valueIndex) => (
                    <li key={valueIndex}>{value}</li>
                  ))}
                </ul>
              </div>
            ))}
            <div className='mt-4'>
              <label className='mt-10'>
                Param:
                <input
                  className='text-black'
                  type='text'
                  name='param'
                  value={userInput[0].param}
                  onChange={e =>
                    setUserInput([{ ...userInput[0], param: e.target.value.toLowerCase() }])
                  }
                />
              </label>
              <label>
                Value:
                <input
                  className='text-black'
                  type='text'
                  name='value'
                  value={userInput[0].value}
                  onChange={e =>
                    setUserInput([{ ...userInput[0], value: e.target.value.toLowerCase() }])
                  }
                />
              </label>
            </div>
            <button
              className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"'
              onClick={handleClick}
            >
              Add New Value
            </button>
          </div>
        )}
      </header>
    </div>
  )
}

export default App
