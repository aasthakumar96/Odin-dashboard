import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import {exitCodes} from './../exitCodes.js';
import Tooltip from '@material-ui/core/Tooltip';

function productComparator(a,b){
    if (b < a) {
        return -1;
    }
    if (b > a) {
        return 1;
    }
    return 0;

}

function descendingComparator(a, b, orderBy) {

    if(orderBy === "productName"){
    return productComparator(a.report.job.installer.productName,b.report.job.installer.productName)
    }

    if(orderBy === "architecture"){
        return productComparator(a.report.job.installer.platform,b.report.job.installer.platform)
    }

    if(orderBy === "status"){
        return productComparator(a.report.installStatus,b.report.installStatus)
    }
    
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    				
  { id: 'date', numeric: true, disablePadding: false, label: 'Date (MM/DD/YYYY)' },
  { id: 'productName', numeric: true, disablePadding: false, label: 'Product Name' },
  { id: 'architecture', numeric: true, disablePadding: false, label: 'Architecture' },
  { id: 'errors', numeric: true, disablePadding: false, label: 'Errors' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead style={{fontWeight : 'bold'}}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell 
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            style = {{fontWeight : 'bold'}}
          >
            { headCell.id === 'date' || headCell.id === 'errors' ? headCell.label : null }
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              style = {{fontWeight : 'bold'}}
              hidden = {headCell.id === 'date' || headCell.id === 'errors' ? true : false}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable(props) {
  const {report} = props ;
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const convertEpochToDate = (epoch) =>{
    let date = new Date(epoch);
    return (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear() ;
  }

  function mapCodes(code){

    return exitCodes[code]
  }

  function getErrorMapping(installer){
    if(installer.installStatus === "success" || installer.details === null){
      return <p>N/A</p>
    }
    else{
      let error = ""
      installer['details'].forEach(element => {
        if(mapCodes(element['exit_code']) !== undefined)
          error += " " + element['exit_code'] + " : " + mapCodes(element['exit_code']) + "\n" 
      });
      return error
    }
  }

 

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer >
          <Table 
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={report.length}
            />
            <TableBody>
              {stableSort(report, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      key={row.report.reportId}
                      style={{ background: row.report.installStatus === "failed"? 'salmon': ''}}
                    >
                     
                      <TableCell component="th" id={labelId} scope="row" padding="none" align="center">
                       {convertEpochToDate(row.report.job.jobId)}
                      </TableCell>
                      <TableCell align="center">{row.report.job.installer.productName}</TableCell>
                      <TableCell align="center">{row.report.job.installer.platform}</TableCell>
                      <TableCell align="center">
                        { getErrorMapping(row).length > 5 ? 
                          <Tooltip title={getErrorMapping(row)} >
                            <p>{ getErrorMapping(row).slice(0,25) }...</p>
                          </Tooltip>
                          : 
                          getErrorMapping(row)
                        
                        }
                        
                      </TableCell>
                      <TableCell align="center">{row.report.installStatus}</TableCell>
                    </TableRow>
                  );
                })}
              
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[50, 100, 250]}
          component="div"
          count={report.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      
    </div>
  );
}
