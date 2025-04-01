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

export const InfoBlock = ({ country, filteredItems }) => {
  const [loading, setLoading] = useState(false)
  const [countryInfo, setCountryInfo] = useState([])

  useEffect(() => {
    console.log('info')
    console.log(filteredItems)

    const fetchData = async () => {

      const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${filteredItems}`
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`)
        }
        const json = await response.json()
        console.log(json)
        setCountryInfo(json)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [country])


  return (
    <>
      {loading ? <div> ... </div> : (
        <div>
          <h2>{countryInfo.name?.common}</h2>
          <p>Capital: {countryInfo.capital?.[0] || 'N/A'}</p>
          <p>Population: {countryInfo.capital?.[0] || 'N/A'}</p>
          <img src={countryInfo.flags?.svg} width="150" />
        </div>
      )}
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
        filteredItems.length === 1 ? < InfoBlock country={filteredItems[0]} filteredItems={filteredItems} /> : <ListBlock filteredItems={filteredItems} />

      }

      {/* country list block */}
      {/* <ListBlock filteredItems={filteredItems} /> */}
      {/* country INFO block */}
      {/* <InfoBlock /> */}
    </>
  )
}

export default App
