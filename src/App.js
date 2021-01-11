import React, { useState, useEffect } from "react";
import './App.css';
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import InfoBox from "./components/InfoBox";
import TableData from "./components/TableData";
import { sortData } from "./util";
import LineGraph from "./components/LineGraph";
import Map from "./components/Map";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("worldwide");
  const [countryData, setCountryData] = useState({});
  const [mapCenter,setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom, setMapZoom] = useState(3);
  const [allCountryData, setAllCountryData] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    const countryList = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then(response => response.json())
      .then(data => {
          const countriesList = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            totalCases: country.cases,
          }));
          setCountries(countriesList);
          setAllCountryData(data);
        }
      )
    }
    countryList();
  }, [])

  useEffect(() => {
    const url = 'https://disease.sh/v3/covid-19/all';

    fetch(url)
    .then(response => response.json())
    .then(data => setCountryData(data))

  },[])

  const handleChange = async (e) => {
      const targetValue = e.target.value;
      setSelectedCountry(targetValue);

      const url = (targetValue === "worldwide" ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${targetValue}`);

      await fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setCountryData(data)
        if(targetValue !== "worldwide"){
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        }
        setMapZoom(4);
      }
    )
  }

  const sortedCountryDetails = sortData(countries);

  return (
    <div className="app">
      <div className="app__left">
        {/* header -> title + input*/}
        <div className="app__header">
          <h2 className="app__title">COVID-19 Tracker</h2>
          <FormControl>
            <Select
                onChange={handleChange}
                value={selectedCountry}
                variant="outlined"
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map(country => (
                <MenuItem value={country.value}>
                    {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        
        {/* infobox -> cases + recovered + death */}
        <div className="app__info">
          <InfoBox title="Coronavirus cases" onClick={e => setCasesType("cases")} cases={countryData.todayCases} total={countryData.cases} />
          <InfoBox title="Recovered" onClick={e => setCasesType("recovered")} cases={countryData.todayRecovered} total={countryData.recovered} />
          <InfoBox title="Death" onClick={e => setCasesType("deaths")} cases={countryData.todayDeaths} total={countryData.deaths} />
        </div>
        <Map casesType={casesType} countries={allCountryData} center={mapCenter} zoom={mapZoom}/>
      </div>

      <div className="app__right">
        <Card>
          <CardContent>
            <h3>
              Live Cases by Country
            </h3>
            <TableData countries = {sortedCountryDetails}/>
            <h3>
              Worldwide New Cases
            </h3>
            <LineGraph casesType={casesType}/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
