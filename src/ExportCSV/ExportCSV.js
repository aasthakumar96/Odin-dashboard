import React from 'react';
import { Button } from 'react-bootstrap';
import { CSVLink } from "react-csv";
import {csvHeaders} from '../Config/config';

const ExportCSV = (props) => {
    const csvData = props.csvData.map((row) => ({
        report: row.report,
        details: row.details || [{}] 
    }))
    
    return (
        <div >
            <CSVLink data={csvData} headers={csvHeaders} filename={'InspectorReport.csv'}><Button className="Csv" variant="success" disabled={csvData.length === 0}>Download CSV</Button></CSVLink>
             
    </div>


    )
}

export default ExportCSV;