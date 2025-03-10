import axios from 'axios'
import { useState, useEffect } from 'react'
import phoneService from './services/phonebook.js'
import './index.css'


const Search = ({ searchTerm, searchChangeHandler }) => {
  return(
   <>
      <h2>Phonebook</h2>
           <div>
        search: 
        <input 
          type="text"
          value={searchTerm}
          onChange={searchChangeHandler}
        />
      </div>
   </> 
  )
}

const PhoneForm = ({ submitHandler, newName, handleChange, newPhone, handlePhoneChange }) => {
  return(
    <>
    <h2>Add Person</h2>
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
    </>
  )
}


  const People = ({ filteredPersons, deleteHandler }) => {
    return (
      <>
      
      <ul>
        {filteredPersons.map((person, index) => 
          <li key={index}>{person.name} {person.number} <button onClick={() => deleteHandler(person.name, person.id)}>delete</button></li>
        )}
      </ul>
      </>
    )
  }


  const Notification = ({ message }) => {
    if ( message === null ) {
      return null
    }

    const errorStyle = {
      color: 'red',
      fontStyle: 'italic',
      fontSize: 16
    }

    const goodStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }

    const style = message.status === 'good' ? goodStyle : errorStyle

    return(
      <>
      <p style={style}>{message.text}</p>
      </>
    )
  }



const App = () => {
  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    // { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    // { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    // { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]); 
  const [message, setMessage] = useState({

  })


 useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then( response => {
      setPersons(response.data)
      console.log(response.data)
      
    })
  }, [])
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace their phone number with a new one?`)) {
      phoneService.updatePerson(existingPerson.id,
         {
          "name": newName,
          "number": newPhone
         }
        )
      .catch(() => {
        setMessage({
          text: `Info of ${newName} has already been deleted from the server`,
          status: 'bad'
        })
      })

      }
      return;
    }

    setPersons(persons.concat({
      name: newName,
      phone: newPhone
    }));

    console.log(persons)

    const createPerson = phoneService
    .create({
      "name": newName,
      "number": newPhone
    })
    setMessage({
    text:  `Added ${newName}`,
    status: 'good'
    })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    setNewName('');
    setNewPhone('');
  };

  const deleteHandler = (name, id) => {
    window.confirm(`delete ${name}`)
    phoneService.deletePerson(id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
    .catch(error => {
      alert(`the person ${name} was already deleted from the server`)
      setPersons(persons.filter(person => person.id !== id))
    })

  }


  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const searchChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };


  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Search searchTerm={searchTerm} searchChangeHandler={searchChangeHandler} />
      <PhoneForm submitHandler={submitHandler} newName={newName} handleChange={handleChange}
       newPhone={newPhone} handlePhoneChange={handlePhoneChange} />
      <h2>Numbers</h2>
      <Notification message={message}/>
      <People  filteredPersons={filteredPersons} deleteHandler={deleteHandler}/>
    </div>
  );
};

export default App;
