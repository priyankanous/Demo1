import React, { useRef } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useSelector } from 'react-redux'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {  
  Bar,  
  getElementAtEvent,  
} from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function BarChart(props) {
  const chartRef = useRef();

  const options = {
    categoryPercentage: 0.8,
    barPercentage: 1,
    plugins: {
      legend: {
        position: 'bottom', 
        usePointStyle: true,
        labels: {	
          			
          filter: function(item, chart){                   
            if (item.datasetIndex > 6) {
              return false;
            }else{
              return item;
            }								
          }
        }	
      },
      datalabels: {
        align: 'top',
        anchor: 'end',
        formatter: (value, context) => {
          let bar1Array = [];
          context.chart.config.data.datasets.map((datapoint) => {
            if(datapoint.stack === 'bar1') {
              bar1Array.push(datapoint.data[context.dataIndex]);
            }  
          });    

          function totalSum(total, datapoint) {
            return total + datapoint;
          }

          let sum = 0;         
          sum = bar1Array.reduce(totalSum, 0);
        
          if(context.datasetIndex === bar1Array.length-1) {
            return sum;
          } else {
            return '';
          }
        }
      }
    },
    
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true, beginAtZero: true, display: false
      },
    },
  };
  var reportData = [];
  reportData = useSelector((state) => state.reportResourceData.reportResourceData);
  if(Object.keys(reportData).length !== 0) {
    reportData = reportData[Object.keys(reportData).length-1].outDTOList;     
  }

  function setColor(datapoint) {
    if(datapoint.label === 'ECEB') {
      datapoint.backgroundColor = '#26251A';
    } 
    if(datapoint.label === 'ECNB') {
      datapoint.backgroundColor = '#B1B0A2';
    }  
    if(datapoint.label === 'NCNB') {
      datapoint.backgroundColor = '#5D8BDC';
    } 
    if(datapoint.label === 'Confirmed') {
      datapoint.backgroundColor = '#C62B54';
    } 
    if(datapoint.label === 'Excepted') {
      datapoint.backgroundColor = '#4099B1';
    }
    if(datapoint.label === 'Excepted') {
      datapoint.backgroundColor = '#4099B1';
    }
    if(datapoint.label === 'Upside') {
      datapoint.backgroundColor = '#E7E748';
    }
    if(datapoint.label === 'High-Upside') {
      datapoint.backgroundColor = '#DB78F4';
    }
  };

  const datasets = reportData.map((val) => {
    setColor(val);
    return {
      label: val.label,
      data: val.data,
      stack: val.stack,
      backgroundColor: val.backgroundColor,
      borderColor: val.backgroundColor,
      borderWidth: 1,
    };
  });

  const data = {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    datasets
    };

  const onClick = (event) => {
    const elem = getElementAtEvent(chartRef.current, event)
    props.onHandleBarClickEvent(elem[0].index, elem[0].datasetIndex)    
  }


  return <Bar options={options} height="400px"  data={data}  ref={chartRef}/>;
}