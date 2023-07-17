import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function MatDataTable(props) {
  const [ tableData, setTableData ] = useState(props.data)

  useEffect(() => {    
    setTableData(props.data)
  }, [props.data]);

  return (
    <TableContainer component={Paper} style={{overflow: 'hidden'}}>
      <Table aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Client Name</TableCell>
            <TableCell>Revenue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow              
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.client}
              </TableCell>
              <TableCell>{row.revenue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}