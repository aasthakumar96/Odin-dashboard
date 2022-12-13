import React from 'react';
import Table from 'react-bootstrap/Table';
import {exitCodes} from './../exitCodes.js';


const TopCodes = (props) => { 
    let codes = [];
    let validCodes = []
    let topCodes = []
    props.report.map(rep => {
        if(rep.details != null){
            rep.details.map(row => { codes.push(row['exit_code'])
            return row
            })
        }
        return rep
    })
    // console.log(codes)
    
    codes.map(eachCode => { 
        exitCodes[eachCode] !== undefined ? validCodes.push(eachCode) : null
        return eachCode
    })
    // console.log( validCodes)
    const setCodes = new Set(validCodes);
    topCodes = [...setCodes]
    // console.log("========")
    // console.log(topCodes)

    
    if(topCodes.length > 5){
        topCodes = topCodes.slice(0,5)
    }
    
    return (
        <div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Error Code</th>
                    <th colSpan="2">Reason</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {topCodes !== [] ? topCodes.map((code,index) => (     
                        <tr key={index+1}>
                            <td>{index+1}</td>
                            <td>{code}</td>
                            <td colSpan="2">{exitCodes[code]}</td>
                            
                        </tr>
                    )) : null}
                </tbody>
               
            </Table>

        </div>
    )
}

export default TopCodes;