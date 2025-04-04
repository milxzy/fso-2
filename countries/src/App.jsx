import { useState, useEffect } from 'react'

export const ListBlock = ({ filteredItems, onCountrySelect }) => {
  return (
    <ul>
      {filteredItems.map((item, index) => (
        <li key={index}>
          {item}
          <button onClick={() => onCountrySelect(item)}>Show</button>
        </li>
      ))}
    </ul>
  )
}

export const InfoBlock = ({ country }) => {
  const [loading, setLoading] = useState(false)
  const [countryInfo, setCountryInfo] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!country) return;

      setLoading(true)
      const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${country}`
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
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [country])

  if (loading || !countryInfo) return <div>Loading...</div>

  return (
    <div>
      <h2>{countryInfo.name?.common}</h2>
      <p>Capital: {countryInfo.capital?.[0] || 'N/A'}</p>
      <p>Population: {countryInfo.population?.toLocaleString() || 'N/A'}</p>
      <img src={countryInfo.flags?.svg} width="150" />
    </div>
  )
}

function App() {
  const [inputValue, setInputValue] = useState("");
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://studies.cs.helsinki.fi/restcountries/api/all"
      try {
        const response = await fetch(url);
        const json = await response.json();
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
    setSelectedCountry(null) // clear selected country when typing
  }

  const filteredItems = countries
    .filter((item) => item.toLowerCase().includes(inputValue.toLowerCase()))
    .slice(0, 10)

  return (
    <>
      <label htmlFor="country-name">Country:</label>
      <input
        type="text"
        name="country-name"
        onChange={handleChange}
        value={inputValue}
      />

      {filteredItems.length === 1 && !selectedCountry ? (
        <InfoBlock country={filteredItems[0]} />
      ) : selectedCountry ? (
        <InfoBlock country={selectedCountry} />
      ) : (
        <ListBlock
          filteredItems={filteredItems}
          onCountrySelect={setSelectedCountry}
        />
      )}
    </>
  )
}

export default App

