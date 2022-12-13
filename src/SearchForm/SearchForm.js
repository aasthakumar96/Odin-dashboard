import React from 'react';
import './SearchForm.css'
import Form from 'react-bootstrap/Form';
import { Col ,Button} from 'react-bootstrap';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const searchform = (props) => {

    
    return (
        <Form className="form">

            <Form.Group controlId="formGridProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control value={props.searchProducts} onChange={props.setProduct} as="select">
                    {props.products.map( product => (
                        <option key={product}>{product}</option>
                    ))}
                   
                </Form.Control>
            </Form.Group>

            <Form.Group  controlId="formGridArchitecture">
                <Form.Label>Architecture</Form.Label>
                <Form.Control value={props.searchArchitecture} onChange={props.setArchitecture} as="select">
                    {props.architecture.map( arch => (
                        <option key={arch}>{arch}</option>
                    ))}
                   
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formGridStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control value={props.searchStatus} onChange={props.setStatus} as="select" >
                    <option value="success">Pass</option>
                    <option value="failed">Fail</option>
                </Form.Control>     
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridFromDate">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="fromDate"
                            label="From"
                            value={props.fromDate}
                            onChange={props.setFromDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />  
                    </Grid>
                </MuiPickersUtilsProvider>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridToDate">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="toDate"
                            label="To"
                            value={props.toDate}
                            onChange={props.setToDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />  
                    </Grid>
                </MuiPickersUtilsProvider>
                </Form.Group>          
            </Form.Row>

            <Button variant="primary"  onClick = {props.searchReport}>
                Search
            </Button>
        </Form>

    )
}

export default searchform;