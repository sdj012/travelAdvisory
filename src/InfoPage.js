import React,{Component} from 'react'
import axios from 'axios'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


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
        
        //APIs
        this.getCountries=this.getCountries.bind(this);
        
        /* to be fixed
        this.getNews=this.getNews.bind(this);
        this.returnNews=this.returnNews.bind(this);  
        this.returnFlag=this.returnFlag.bind(this);
        */ 
       
        this.returnCountryName=this.returnCountryName.bind(this);
        
        //Content
        this.returnSafetyHazardsInfo=this.returnSafetyHazardsInfo.bind(this);
        this.returnMedicalInfraInfo=this.returnMedicalInfraInfo.bind(this);
        this.returnLocalLawsInfo=this.returnLocalLawsInfo.bind(this);
        this.returnEntryandExitInfo=this.returnEntryandExitInfo.bind(this);
        
        this.componentDidMount=this.componentDidMount.bind(this);
        
    }

      getCountries=()=>{

        axios.get('https://jsonware.com/json/c66eecfef5f62eba4995e39f0e3eabbf.json')
    
          .then(response => {
            this.setState({
            Countries:response.data,
            });
          })
    
          .catch(err => (err) );
        }

      /*getNews=()=>{

        API temporarily unavailable
        var url = 'https://newsapi.org/v2/everything?language=en&' + 'qInTitle='+this.state.countryName.id+'&' +'from=2019-12-01&' +'sortBy=popularity&' +'apiKey=3785f9ef831042c0bc54c1a2b18a6489';

        axios.get(url)
    
        .then(response => {
            this.setState({
            news:response.data.articles,
            })
        })
        .catch(err => (err))

        }*/
 
        returnCountryName=()=>{

            const {Countries}=this.state; 
            const {countryName}=this.state;  
            
            var Arr=[];
            
            for( var i in Countries){
                
                if( (Countries[i].geopoliticalarea).toUpperCase().localeCompare(countryName.id.toUpperCase()) ===0 ){
                    
                    Arr+="<div><b> Visting " + Countries[i].geopoliticalarea + "</b></div>";
                    
                }
            }
            return {__html: Arr };
        }  
        
        /*returnFlag=()=>{

            const {Countries}=this.state; 
            const {countryName}=this.state;
            let {flagCode}=this.state;

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
        }*/  


        returnSafetyHazardsInfo=()=>{

            const {Countries}=this.state; 
            const {countryName}=this.state;  

            var Arr=[];
            
            for( var i in Countries){

                if( (Countries[i].geopoliticalarea).toUpperCase().localeCompare(countryName.id.toUpperCase()) ===0 ){

                Arr+=Countries[i].safety_and_security;

                }
            }
            return {__html: Arr };

          }

        returnMedicalInfraInfo=()=>{

        const {Countries}=this.state; 
        const {countryName}=this.state;  

        var Arr=[];
        
        for( var i in Countries){

            if( (Countries[i].geopoliticalarea).toUpperCase().localeCompare(countryName.id.toUpperCase()) ===0 ){

            Arr+=Countries[i].health;

            }
        }
        return {__html: Arr };
        
        }

        returnLocalLawsInfo=()=>{

            const {Countries}=this.state; 
            const {countryName}=this.state;  

            var Arr=[];
            
            for( var i in Countries){

                if( (Countries[i].geopoliticalarea).toUpperCase().localeCompare(countryName.id.toUpperCase()) ===0 ){

                Arr+=Countries[i].local_laws_and_special_circumstances;
                
                }
            }
            return {__html: Arr };
            
        }

        returnEntryandExitInfo=()=>{

        const {Countries}=this.state; 
        const {countryName}=this.state;  

        var Arr=[];
        
        for( var i in Countries){

            if( (Countries[i].geopoliticalarea).toUpperCase().localeCompare(countryName.id.toUpperCase()) ===0 ){
                
            Arr+=Countries[i].entry_exit_requirements;

            }
        }
        return {__html: Arr };
        
        }
          
        returnNews=()=>{

        const {news}=this.state;

        let arr=[];
        arr+="<b>Latest News </b>(powered by News API)"
            news.map(function(item){
                arr+="<p id='link'><a href='"+item.url+"'>"+"<b>"+item.source.name+"</b>: "+item.title+"</a></p>"

            });

        return {__html: arr };

        }

        componentDidMount=()=>{

        this.getCountries();  
        /*this.getNews(); API temporarily unavailable*/

        setTimeout(()=>{this.setState({loading:false})},4000);
        }

    render(){

    if(this.state.loading){

        return (
            <div>
                <div id="loadingPage">
                    <iframe src="https://giphy.com/embed/ei9ZRrqNLI5NZGMwhF" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                </div>
            </div>
        )
    }

    else {

        return(

            <div id="InfoPage">

                <div id="header">
                    <div id="header-2">
                        <div id="countryName"dangerouslySetInnerHTML={this.returnCountryName()}></div>
                        {/*** API temporarily unavailable *** <div id="flag" dangerouslySetInnerHTML={returnFlag()}></div> */}
                    </div>
                </div>

                <div id="content">

                <div id="safetyandSecurity">

                    <div class="contName"><b>Safety and Security</b></div>
                    <div class="contText" dangerouslySetInnerHTML={this.returnSafetyHazardsInfo()}/>
                
                </div>

                <div id="medical">
                    <div align="right" class="contName"><b>Medical Infrastructure</b></div>
                    <div class="contText" dangerouslySetInnerHTML={this.returnMedicalInfraInfo()}/>
                </div>

                <div id="lawsCircumstance">
                    <div class="contName"><b>Local Laws and Special Circumstances</b></div>
                    <div class="contText" dangerouslySetInnerHTML={this.returnLocalLawsInfo()}/>
                </div>

                <div id="entryExit">
                    <div class="contName"><b>Entry and Exit Requirements</b></div>
                    <div class="contText" dangerouslySetInnerHTML={this.returnEntryandExitInfo()}/>        
                </div>

                </div> 

                <div id="sideBar">
                    <div id="menu">

                        <ul> <a href="#safetyandSecurity">Safety and Security</a> </ul>
                        <ul> <a href="#medical">Medical Infrastructure</a> </ul>
                        <ul> <a href="#lawsCircumstance">Laws and Circumstances</a> </ul>
                        <ul> <a href="#entryExit">Entry and Exit</a> </ul>     

                    </div> 
                </div>    
                        
            </div>     

        )

    }
    
}}

export default InfoPage;
