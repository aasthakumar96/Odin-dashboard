import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import DoughnutChart from '../Chart/DoughnutChart';
import SearchForm from '../SearchForm/SearchForm';
import ExportCSV from '../ExportCSV/ExportCSV'
import { Row,Col,Button } from 'react-bootstrap';
import {url} from '../Environment/environment';
import CircularProgress from '@material-ui/core/CircularProgress';
import EnhancedTable from './Table'

class Report extends React.Component {
    _isMounted = false;
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        report: [],
        reportError : 'No Results Found',
        products : [],
        architecture : [],
        searchProduct : '',
        searchArchitecture : '',
        searchStatus : 'success',
        searchFromDate : '',
        searchToDate : '',
        chartData :  {
          labels: [],
          datasets: [
              {
                  label: "Product Usage",
                  backgroundColor: [],
                  data: []
              }
          ]
        },
      };

      this.handleClick = this.handleClick.bind(this);
      this.onSort = this.onSort.bind(this);
      this.getProducts = this.getProducts.bind(this);
      this.searchReport = this.searchReport.bind(this);
      this.convertEpochToDate = this.convertEpochToDate.bind(this);
      this.setColors = this.setColors.bind(this);     
      this.handleArchChange = this.handleArchChange.bind(this);
    }

   componentDidMount() {
      this.setCurrentDate();

      var myHeaders = new Headers();
myHeaders.append("Authorization", "mgvlUej0qUarOv32acTQtv4G8ZLNoxlIVJPorlWyntatpW0ePlwjxXzqtk4gEkr2fQb5jMviN8r5yhnoY3Gidg==");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://no1010042066231.corp.adobe.com:8443/odin/report", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  
      // fetch(url.getReports,{headers : {'Authorization': 'mgvlUej0qUarOv32acTQtv4G8ZLNoxlIVJPorlWyntatpW0ePlwjxXzqtk4gEkr2fQb5jMviN8r5yhnoY3Gidg=='}})
      //   .then(res => res.json())
      //   .then(
      //     (result) => {
      //       console.log("result")
      //       if(result){
      //          this.setState({
      //            isLoaded: true,
      //             report: result,
                  
      //       });
      //       // console.log(result[0])
      //       this.getProducts();  
      //       }  
      //     },
      //     // Note: it's important to handle errors here
      //     // instead of a catch() block so that we don't swallow
      //     // exceptions from actual bugs in components.
      //     (error) => {
      //       console.log("In error" + error)
      //       this.setState({
      //         isLoaded: false,
      //         error
      //       });
      //     }
      //   )

        //get data for chart

        // fetch(url.getChartData)
        // .then(res => res.json())
        // .then(
        //   (result) => {
        //    let productsArray = [];
        //    let downloads = [];
        //    result.map(item => {
        //     productsArray.push(item.productName) 
        //     downloads.push(Math.round(item.failureInstallPercentage))  
        //     return item;
        //   });
        //   this.setColors(productsArray,downloads);
        //   },
        //   (error) => {
        //    console.log(error)
        //   }
        // )
    }

    setColors(chartLabel, chartData){
      let chartColor = []
      for(let i=0;i<chartLabel.length;i++){
            let ch = ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6)
            chartColor.push('#'+ch);
      }

      this.setState({
        chartData :  {
          labels: chartLabel,
          datasets: [
              {
                  label: "Product Usage",
                  backgroundColor: chartColor,
                  data: chartData 
              }
          ]
        }
      })
    }

    setCurrentDate(){
      let dateObj = new Date();
      let currentDate = dateObj.getMonth()+1 + "/" + dateObj.getDate() + "/" + dateObj.getFullYear();
      this.setState({
        searchFromDate : currentDate,
        searchToDate : currentDate
      });
    }

    handleClick(event) {
        this.setState({
            activePage: Number(event.target.id)
        });
      }

    handleProductChange = (event) => {
      this.setState({
        searchProduct : event.target.value
      });
    } 

    handleArchChange = (event) => {
      this.setState({
        searchArchitecture : event.target.value
      });
    }
    
    handleStatusChange = (event) => {
      this.setState({
        searchStatus : event.target.value.trim()
      });
    } 

    handleFromDateChange = (date) => { 
      let dateObj = new Date(date);
      let fromDate = dateObj.getMonth()+1 + "/" + dateObj.getDate() + "/" + dateObj.getFullYear();
      this.setState({
        searchFromDate : fromDate
      });
    } 

    handleToDateChange = (date) => { 
      let dateObj = new Date(date);
      let toDate = dateObj.getMonth()+1 + "/" + dateObj.getDate() + "/" + dateObj.getFullYear();
      this.setState({
        searchToDate : toDate
      });
    } 

    onSort(sortKey){
      const data = [...this.state.report];

      data.sort((a,b) => {
          var x;
          var y;

          if(sortKey === 'productName'){
                x = a.report.job.installer.productName
                y = b.report.job.installer.productName
          }

          if(sortKey === 'platform'){
                x = a.report.job.installer.platform
                y = b.report.job.installer.platform
          }

          if(sortKey === 'org'){
                x = a.report.job.org
                y = b.report.job.org
          }

          if(sortKey === 'installStatus'){
                x = a.report.installStatus
                y = b.report.installStatus
          }
          
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
      
      })
      // data.sort((a,b) => a.sortKey.localeCompare(b.sortKey));
      this.setState({report : data});
    }

    getProducts (){
      if(this.state.isLoaded === true){
        let productsArray = [];
        let architectureArray = [];
        this.state.report.map(item => {
          productsArray.push(item.report.job.installer.productName)
          architectureArray.push(item.report.job.installer.platform)
          return item;
        });
        const uniqueProducts = new Set(productsArray);
        const uniquePlatform = new Set(architectureArray)
        this.setState({
          products : [...uniqueProducts],
          searchProduct : productsArray[0],
          architecture : [...uniquePlatform],
          searchArchitecture : architectureArray[0]
        })
      }

    }

    searchReport (){
      
      let searchUrl = url.searchReports + 'productName='+this.state.searchProduct+'&status='+ this.state.searchStatus ;
      if(this.state.searchFromDate !== undefined && this.state.searchFromDate !== ""){
        searchUrl += '&fromDate='+ this.state.searchFromDate
      }
      if(this.state.searchToDate !== undefined && this.state.searchToDate !== ""){
        searchUrl += '&toDate='+ this.state.searchToDate
      }
      fetch(searchUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            report: result,
          });
          if(new Date(this.state.searchFromDate) > new Date(this.state.searchToDate)){
            this.setState({
              reportError : 'From Date must be less than To Date'
            })
          }else{
            this.setState({
              reportError : 'No Results Found'
            })
          }
 
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: false,
            report : [],
            error
          });
        }
      )
      
      fetch(url.getChartData+"?fromDate="+this.state.searchFromDate+"&toDate="+this.state.searchToDate)
        .then(res => res.json())
        .then(
          (result) => {
           let productsArray = [];
           let downloads = [];
           result.map(item => {
             productsArray.push(item.productName) 
             downloads.push(Math.round(item.failureInstallPercentage))  
             return item;
           });
          this.setColors(productsArray,downloads);
          },
          (error) => {
           console.log(error)
          }
        )
    }

    convertEpochToDate(epoch){
      let date = new Date(epoch);
      return (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear() ;
    }

    render() {
      const { error, isLoaded, report , reportError} = this.state; //update row per page and active page whenever report updates

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <CircularProgress style={{marginTop:'50%'}}/>;
      } 
      else {
        return (
          <div>
            <Row>
              <Col><SearchForm  
                      products={this.state.products} 
                      architecture={this.state.architecture}
                      searchProduct={this.state.searchProduct}
                      searchArchitecture={this.state.searchArchitecture}
                      fromDate={this.state.searchFromDate}
                      toDate={this.state.searchToDate}
                      setProduct={this.handleProductChange}
                      setArchitecture={this.handleArchChange}
                      setStatus={this.handleStatusChange}
                      setFromDate={this.handleFromDateChange}
                      setToDate={this.handleToDateChange}
                      searchReport={this.searchReport}
                      />
              </Col>
              <Col ><DoughnutChart chartData={this.state.chartData} report={report} />
              {this.state.report ? <ExportCSV csvData={this.state.report}/> : <Button className="Csv" variant="success" disabled>Download CSV</Button>}
              </Col>            
          </Row>         
          <Row>         
              <div style={{width:'100%'}}>
                <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
                    <Tab eventKey="home" title="Adobe">
                    { this.state.report.length === 0   ? <div style={{ color : 'Red' }}>{reportError}</div> : 
                        <EnhancedTable report={report}/>  
                    }                      
                    </Tab>
                    <Tab eventKey="profile" title="Vendors"> 
                    </Tab>               
                </Tabs>
              </div>        
            </Row>  
          </div>            
        );
      }
    }
  }

  export default Report;
