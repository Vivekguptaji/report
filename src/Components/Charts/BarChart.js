import React from 'react';
import ReactApexChart from 'react-apexcharts';


const getDevelopersAarray = (data) => {
    let developers = []; 
    let keyArray = [];
    data.forEach(item => {
        if (!developers.includes(item.deveploer)) {
            developers.push(item.deveploer)
        }
        let keys = Object.keys(item);
        keys.forEach(key => { 
            if (key !== 'deveploer' && key !== 'tableData') {
                let index = keyArray.findIndex(item => item.name.includes(key))
                if (index === -1) {
                    keyArray.push(
                        {
                            name: [key],
                            type: 'column',
                            data: []
                        }
                    ) 
                } 
            }

        })
    });
   
    developers.forEach(dev => { 
        let items = data.filter(item => item.deveploer === dev)[0];
        let devKsys = Object.keys(items);
        for (let devIt of devKsys)
        { 
            if (devIt !== 'deveploer') {
                let value = items[devIt];
                let kl = keyArray.findIndex(item => item.name.includes(devIt));
                if (kl !==-1) {
                    keyArray[kl].data.push(value);
                }
            }
        }
    })
     
    return {
        developers:developers,
        series:keyArray
    }
}
const getSeriesData = (data) => { 
}
const BarChart = (props) => { 
    let chartData = props.data.data;; 
    let { developers, series } = getDevelopersAarray(chartData); 
    //let devepolers = ['Amit', 'Vivek', 'Shefali', 'Amulya', 'Alekhya', 'Kaustubh', 'Ayushman', 'Anindita']
    let state = {
        series: series,
        options: {
            chart: {
                height: 350,
                type: 'line',
                stacked: false
            },
            dataLabels: {
                enabled: true
            },
            stroke: {
                width: [1, 1, 4]
            },
            title: {
                text: `${props.chartName} Resource Productivity`,
                align: 'left',
                offsetX: 110
            },
            xaxis: {
                categories: developers,
            },
            yaxis: [
                {
                    axisTicks: {
                        show: false,
                    },
                    axisBorder: {
                        show: true,
                        color: '#008FFB'
                    },
                    labels: {
                        style: {
                            colors: '#008FFB',
                        }
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                {
                    seriesName: 'Income',
                    opposite: false,
                    axisTicks: {
                        show: false,
                    },
                    axisBorder: {
                        show: false,
                        color: '#00E396'
                    },
                    labels: {
                        style: {
                            colors: '#00E396',
                        }
                    },
                    title: {
                        // text: "Operating Cashflow (thousand crores)",
                        style: {
                            color: '#00E396',
                        }
                    },
                },
                {
                    seriesName: 'temp',
                    opposite: true,
                    axisTicks: {
                        show: false,
                    },
                    axisBorder: {
                        show: false,
                        color: '#00E396'
                    },
                    labels: {
                        style: {
                            colors: '#00E396',
                        }
                    },
                    title: {
                        //  text: "Operating Cashflow (thousand crores)",
                        style: {
                            color: '#00E396',
                        }
                    },
                }
            ],
            tooltip: {
                fixed: {
                    enabled: true,
                    position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                    offsetY: 30,
                    offsetX: 60
                },
            },
            legend: {
                horizontalAlign: 'left',
                offsetX: 40
            }
        },
    };
   
    
    return (
        <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
        </div>)
     
}

export default BarChart;