import React,{Component} from 'react';
import axios from 'axios';
import './App.css';
import './index.css'
import Table from 'react-bootstrap/Table';
import {Link} from "react-router-dom";

class USHome extends Component{  

     constructor(){

      super();

      this.state = {
        search: '',
        Countries:[],
        search:""
      };
      
      //API
      this.getCountries=this.getCountries.bind(this);

      this.updateSearch=this.updateSearch.bind(this);
      this.click=this.click.bind(this);
      this.returnList=this.returnList.bind(this);

      this.componentDidMount=this.componentDidMount.bind(this);
                
     }
        
      getCountries(){

        //source: https://cadatacatalog.state.gov/storage/f/2016-03-03T20:05:31.000Z/csi.json
        axios.get('https://jsonware.com/json/c66eecfef5f62eba4995e39f0e3eabbf.json')

      
            .then(response => {
              this.setState({
                Countries: response.data,
            
              });
            })
      
            .catch(err => window.alert(err) );
      }

      updateSearch=(event)=>{
        
        this.setState(
          {search: event.target.value.substr(0,20)}
          )

      };

      click=(e,i)=>{
        e.preventDefault();
      }


      returnList=()=>{

        var Arr=[];

        const {search}=this.state;
        const {Countries}=this.state;

        if(search.length < 3) return Arr;

        for(var i in Countries){ 
        

          if(((Countries[i].geopoliticalarea).toUpperCase()).indexOf(search.toUpperCase())!==-1){
            
              Arr.push(                     
              <tr><td><Link to={Countries[i].geopoliticalarea}>{Countries[i].geopoliticalarea}</Link></td></tr>                                         
              )
          }


        }

        return Arr;

      }

      componentDidMount=()=>{

        this.getCountries();

      }

      render(){

          return (
            
            <div className="home" style={{position:"static",height:"100%"}}>

              <div className="panel-title" align="center">Where are you travelling?</div>
    
                <div className="container" style={{height:"100%"}}>

                    <Table align="center" bordered hover>

                      <thead>
                        <tr align="left">
                          <th scope="col">
                            <div className="col-md-12" id="col">

                              <input type="text" className="container" placeholder="Search for a Country" value={this.state.search}
                              onChange={this.updateSearch.bind(this)}></input>

                            </div>
                          </th>
                        </tr>
                      </thead>

                      <tbody>

                      {this.returnList()}

                      </tbody>

                    </Table>

                </div>

          </div>
          )  
    
    }
        }
export default USHome;

