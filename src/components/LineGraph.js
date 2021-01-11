import React, {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import numeral from "numeral";
import "./LineGraph.css";

const options = {
    legend: {
        display: false,
    },
    elements: {
        points: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipformat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridlines: {
                    display: false,
                },
            }
        ]
    }
}

function LineGraph({ casesType }) {
    const [chartData,setChartData] = useState({});

    const buildChartData = (data, casesType = "cases") => {
        const chartDataList = [];
        let lastData;
        if(data?.cases){
            for (let date in data[casesType]){
                if(lastData){
                    const newDataPoint = {
                        x: date,
                        y: data[casesType][date] - lastData
                    };
                    chartDataList.push(newDataPoint);
                }
                lastData = data[casesType][date];
            }
        }
        return chartDataList
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=60')
            .then(response => response.json())
            .then((data) => {
                const chartDatafetch = buildChartData(data);
                setChartData(chartDatafetch);
            })
        }
        fetchData();
    },[])

    return (
        <div className="linegraph">
        {chartData && chartData.length > 0 && (
            <Line 
                className="linegraph__line"
                options = {options}
                data = {{
                    datasets: [
                        {
                            backgroundColor: "rgba(204,16,52,0.5)",
                            borderColor: "#CC1034",
                            data: chartData,
                        },
                    ],
                }}
            />
        )}
        </div>
    )
}

export default LineGraph
