
const prod = false;
const stage = true;
var getReportUrl = "";
var searchReportUrl = ""
var chartUrl = ""

if(prod === true ){
    getReportUrl = "http://odin-java-prod.corp.adobe.com:9100/odin/report";
    searchReportUrl = "http://odin-java-prod.corp.adobe.com:9100/odin/searchReports?";
    chartUrl = 'http://odin-java-prod.corp.adobe.com:9100/productDownloadsReport/';
}
else if(stage === true){
    getReportUrl = "https://no1010042066231.corp.adobe.com:8443/odin/report";
    searchReportUrl = "https://no1010042066231.corp.adobe.com:8443/odin/searchReports?";
    chartUrl = 'https://no1010042066231.corp.adobe.com:8443/odin/productDownloadsReport/';

}
else{
    getReportUrl = "http://odin-java-prod.corp.adobe.com:9100/odin/report";
    searchReportUrl = "http://odin-java-prod.corp.adobe.com:9100/odin/searchReports?";
    chartUrl = 'http://odin-java-prod.corp.adobe.com:9100/productDownloadsReport/';
}

export const url = {
    getReports : getReportUrl,
    searchReports : searchReportUrl,
    getChartData : chartUrl
}


