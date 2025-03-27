import { useState, useEffect } from 'react'






export const ListBlock = ({ filteredItems }) => {
  return (
    // limit to 10
    // 

    <ul>
      {filteredItems.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>

  )
}

export const InfoBlock = ({ country }) => {
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    console.log('info')
    setLoading(true)

    const fetchData = async () => {

      const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${country}`
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`)
        }
        const json = await response.json()
        console.log(json)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  })


  return (
    <>

    </>
  )
}


function App() {
  const [inputValue, setInputValue] = useState("");
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('firing')
    const fetchData = async () => {

      const url = "https://studies.cs.helsinki.fi/restcountries/api/all"
      try {
        const response = await fetch(url);
        const json = await response.json();

        console.log(json)
        // loop through json i.name.common
        setCountries(json.map((country) => country.name.common))
      }
      catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const handleChange = (event) => {
    setInputValue(event.target.value)
    console.log(event.target.value)
  }

  const filteredItems = countries
    .filter((item) => item.toLowerCase().includes(inputValue.toLowerCase()))
    .slice(0, 10)


  // if filteredItems length === 1, display info block, set loading state, make api call, display data

  // 






  return (
    <>
      <label htmlFor="country-name" > Country:  </label>
      <input type="text" name="country-name" id="" onChange={handleChange} />


      {
        filteredItems.length === 1 ? <InfoBlock country={inputValue} /> : <ListBlock filteredItems={filteredItems} />

      }
      {/* country list block */}
      {/* <ListBlock filteredItems={filteredItems} /> */}
      {/* country INFO block */}
      {/* <InfoBlock /> */}
    </>
  )
}

export default App
