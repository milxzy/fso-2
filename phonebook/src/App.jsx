import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
      { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace',  phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov',  phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const submitHandler = (event) => {
    event.preventDefault()
      
  console.log(newName) 
  if (persons.some(person => person.name === newName)) {
    alert(`${newName} is already added to phonebook`)
    return
  }
    setPersons(
      
      persons.concat({
      name: newName,
      phone: newPhone
    }))
    console.log(persons);

  }

  const handleChange = (event) => {
    // loop through persons 
    // dig into object name each time
    // if object name == event.target.value alert
   

    setNewName(event.target.value)
  }

const handlePhoneChange = ( event ) => {
  
  setNewPhone(event.target.value)
}

const searchChngeHandler = (event) => {

  setSearchTerm(event.target.value);
}

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <form 
        onSubmit={searchHandler}
        >
          <input type="text" 
          value={searchTerm}
          onChange={searchChangeHandler}
          />
        </form>
      </div>
      <form onSubmit={submitHandler}>
        <div>
          name: <input 
          value={newName}
          onChange={handleChange}
          />
        </div>
        <div>
          phone: <input 
          value={newPhone}
          onChange={handlePhoneChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>

      {
        persons.map( (person, index) => 
          <li key={index} >  {person.name} {person.phone}</li>
        )
      }
      </ul>
    </div>
  )
}

export default App