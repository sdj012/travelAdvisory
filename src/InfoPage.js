import React,{Component} from 'react'
import axios from 'axios'
// import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import warning from './static/warning.png';
import medical from './static/caduceus.png';
import hammer from './static/hammer.png';
import airport from './static/airport.png';
import Container from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class InfoPage extends Component{ 
    
    constructor(props){
        super(props);
   

        this.state = {
            Countries:[],
            countryName:this.props.match.params,
            news:[],
            flagCode:"",
            loading:true
        };
    }

      getCountries(){

        axios.get('https://jsonware.com/json/c66eecfef5f62eba4995e39f0e3eabbf.json')
    
          .then(response => {
            this.setState({
            Countries:response.data,
            });
          })
    
          .catch(err => window.alert(err) );
      }

      getNews(){

        var url = 'https://newsapi.org/v2/everything?language=en&' + 'qInTitle='+this.state.countryName.id+'&' +'from=2019-12-01&' +'sortBy=popularity&' +'apiKey=3785f9ef831042c0bc54c1a2b18a6489';

        axios.get(url)
    
        .then(response => {
            this.setState({
            news:response.data.articles,
            })
        })
        .catch(err => window.alert(err))

    }

      componentDidMount() {
        this.getCountries();  
        this.getNews();

        setTimeout(()=>{
            this.setState({loading:false})},4000);
        }

    render(){

        const {countryName}=this.state;   
        const {Countries}=this.state; 
        const {news}=this.state;
        let {flagCode}=this.state;

        function returnCountryName(){

            var Arr=[];
            
            for( var i in Countries){

                if( (Countries[i].geopoliticalarea).toUpperCase().localeCompare(countryName.id.toUpperCase()) ===0 ){
                              
                Arr+="<div><b> Visting " + Countries[i].geopoliticalarea + "</b></div>";

                }
            }
            return {__html: Arr };
        }  

        function returnFlag(){

                for( var i in Countries){
                    if((Countries[i].geopoliticalarea).toUpperCase().localeCompare(countryName.id.toUpperCase()) ===0 ){
                    flagCode=Countries[i].iso_code;
                    }
                }

            if(flagCode){
        
            let tag="<img src=https://www.countryflags.io/"+flagCode+"/flat/64.png></img>";
            return {__html:tag};

            }
            else{
                return{__html:"<p></p>"}
            }
        }  


          function returnSafetyHazardsInfo() {

            var Arr=[];
            
            for( var i in Countries){

                if( (Countries[i].geopoliticalarea).toUpperCase().localeCompare(countryName.id.toUpperCase()) ===0 ){

                Arr+=Countries[i].safety_and_security;

                }
            }
            return {__html: Arr };

          }

          function returnMedicalInfraInfo() {

            var Arr=[];
            
            for( var i in Countries){

                if( (Countries[i].geopoliticalarea).toUpperCase().localeCompare(countryName.id.toUpperCase()) ===0 ){

                Arr+=Countries[i].health;

                }
            }
            return {__html: Arr };
            
          }

          function returnLocalLawsInfo() {

            var Arr=[];
            
            for( var i in Countries){

                if( (Countries[i].geopoliticalarea).toUpperCase().localeCompare(countryName.id.toUpperCase()) ===0 ){

                Arr+=Countries[i].local_laws_and_special_circumstances;
                
                }
            }
            return {__html: Arr };
            
          }

          function returnEntryandExitInfo() {

            var Arr=[];
            
            for( var i in Countries){

                if( (Countries[i].geopoliticalarea).toUpperCase().localeCompare(countryName.id.toUpperCase()) ===0 ){
                  
                Arr+=Countries[i].entry_exit_requirements;

                }
            }
            return {__html: Arr };
            
          }
          
          function returnNews(){

            let arr=[];
            arr+="<b>Latest News </b>(powered by News API)"
              news.map(function(item){
                 arr+="<p id='link'><a href='"+item.url+"'>"+"<b>"+item.source.name+"</b>: "+item.title+"</a></p>"

              });

            return {__html: arr };

          }


    if(this.state.loading){
        return (
        <div>
        <div id="loadingPage">
            <iframe src="https://giphy.com/embed/ei9ZRrqNLI5NZGMwhF" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
        </div>
        </div>
        )
    }

    else{

    return(

        <div id="InfoPage">

        <div id="header">
            <div id="countryName"dangerouslySetInnerHTML={returnCountryName()}></div>
            <div id="flag" dangerouslySetInnerHTML={returnFlag()}></div>
       </div>

        <Container id="container">
            <Row>
                <Col id="content">
                    <div class="contName" id="safetyandSecurity"><b>Safety and Security</b></div>
                    <div class="contText" dangerouslySetInnerHTML={returnSafetyHazardsInfo()}/>

                    <div align="right" class=" contName" id="medical"><b>Medical Infrastructure</b></div>
                    <div class="contText" dangerouslySetInnerHTML={returnMedicalInfraInfo()}/>

                    <div class="contName" id="lawsCircumstance" ><b>Local Laws and Special Circumstances</b></div>
                    <div class="contText" dangerouslySetInnerHTML={returnLocalLawsInfo()}/>

                    <div class="contName" id="entryExit"><b>Entry and Exit Requirements</b></div>
                    <div class="contText" dangerouslySetInnerHTML={returnEntryandExitInfo()}/>        
                </Col>

                <Col xs lg="2" id="fixedColoumn">
                    <Nav defaultActiveKey="#" className="flex-column" id="menu">
                        <Nav.Link href="#safetyandSecurity"><img id="icons" src={warning} width="30%" height="auto"></img></Nav.Link>
                        <p id="label">Security</p>
                        <Nav.Link href="#medical"><img id="icons" src={medical} width="30%" height="auto"></img></Nav.Link><p id="label">Medical Infrastructure</p>
                        <Nav.Link href="#lawsCircumstance"><img id="icons" src={hammer} width="30%" height="auto"></img></Nav.Link><p id="label">Laws and Circumstances</p>
                        <Nav.Link href="#entryExit"><img id="icons" src={airport} width="30%" height="auto"></img></Nav.Link><p id="label">Entering and Exiting</p>
                    </Nav>
                    <div id="news"dangerouslySetInnerHTML={returnNews()}></div>
                </Col>
            </Row>
        </Container>
        </div>
        

    )

    }
    
}}

export default InfoPage;
