import React from 'react';
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 300
    },
    recovered: {
        hex: "#7DD71D",
        multiplier: 400
    },
    deaths: {
        hex: "#FB4443",
        multiplier: 1000
    }
}

export const sortData = (data) => {
    data.sort((a,b) => {
        if(a.totalCases >= b.totalCases) {
            return -1
        }
        else {
            return 1
        }
    })

    return data
}

export const showDataOnMap = (data, casesType) => {
    return data.map((country) => (
        <Circle 
            center= {[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType]["hex"]}
            fillColor={casesTypeColors[casesType]["hex"]}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType]["multiplier"]
            }
        >
            <Popup>
                <div>
                    <div>{country.country}</div>
                    <div>Cases: {numeral(country.cases).format("0,0")}</div>
                    <div>Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div>Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ));
}



