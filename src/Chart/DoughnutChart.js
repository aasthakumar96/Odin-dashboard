import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TopCodes from './TopCodes'

const DoughnutChart = (props) => {    
    return (
        <div className="DoughnutChart">
            <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
                    <Tab eventKey="home" title="Error Codes">
                        <TopCodes report={props.report}></TopCodes>
                                         
                    </Tab>
                    <Tab eventKey="profile" title="Failure %"> 
                        <Doughnut  data={props.chartData} />
                        <h6 className="labelChart">Product wise failure % data</h6>   
                    </Tab>               
            </Tabs>
                  
          </div>
    )
}

export default DoughnutChart;