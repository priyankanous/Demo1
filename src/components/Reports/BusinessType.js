import { useState, useEffect } from 'react';
import ChartComp from './ChartComponent'
import MatDataTable from './DataTableComponent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SearchComponent from './SearchComponent';

const rawData = [
  {id: 1,  day: 1,  type: 1, client: 'Fitch Ratings',  revenue: 150},
  {id: 2,  day: 1,  type: 1, client: 'Fitch Ratings',  revenue: 200},
  {id: 3,  day: 2,  type: 1, client: 'Fitch Ratings',  revenue: 300},
  {id: 4,  day: 2,  type: 1, client: 'Fitch Ratings',  revenue: 190},
  {id: 5,  day: 3, type: 1, client: 'Allegiant',  revenue: 158},
  {id: 6,  day: 1, type: 2, client: 'Capital One',  revenue: 12},
  {id: 7,  day: 1, type: 2, client: 'Bank of America',  revenue: 28},
  {id: 8,  day: 2, type: 2, client: 'Charles Schwab',  revenue: 16},
  {id: 9,  day: 2, type: 2, client: 'Iron Maiden Corp',  revenue: 24},
  {id: 10,  day: 3, type: 2, client: 'Scorpions Corp',  revenue: 18},
];

export default function BusinessType() {    
  const [ chartData, setChartData ] = useState([])  
  const [ tableData, setTableData ] = useState([])  
  

  useEffect(() => {
  
      const day = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
      var chartData = []
      for(let i=0; i <= 11; i++) {
        const cfCnt = rawData.filter(c => c.day === i && c.type === 1).length
        const gaCnt = rawData.filter(c => c.day === i && c.type === 2).length
        chartData.push({label: day[i], commercialCount: cfCnt, generalCount: gaCnt})
      }
      setChartData(chartData)
  }, []);

  const onHandleBarClickEvent = (barIndex, stackIndex) => {        
    if(stackIndex === 0) {
      setTableData(rawData.filter(c => c.day === barIndex && c.type === 1))
    }
    else {
      setTableData(rawData.filter(c => c.day === barIndex && c.type === 2))
    }
  } 

  return (
    <div className="BusinessType">         
      <Box sx={{ marginLeft: 30, textAlign: 'left' }}>
        <Grid container spacing={2}>
          <Grid item xs={4} md={3}><SearchComponent/>            
          </Grid>          
          <Grid item xs={6} md={8}>  
          <h5>Revenue for FY' 2023-2024(projected) :</h5>          
              <ChartComp data={chartData} onHandleBarClickEvent={onHandleBarClickEvent}/>                                
          </Grid>         
        </Grid>        
      </Box>            
    </div>
  );
}