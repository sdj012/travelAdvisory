import React,{Component} from 'react';
import axios from 'axios';
import './App.css';
import './index.css'
import Table from 'react-bootstrap/Table';
import {Link} from "react-router-dom";
import pic from './static/people.jpg';

class USHome extends Component{  

            constructor(){
                super();
                this.state = {
                    search: '',
                    Countries:[],
                    search:""
                };
            }
        
            getCountries(){
        
              //original link: https://cadatacatalog.state.gov/storage/f/2016-03-03T20:05:31.000Z/csi.json
              axios.get('https://jsonware.com/json/c66eecfef5f62eba4995e39f0e3eabbf.json')
  
            
                  .then(response => {
                    this.setState({
                     Countries: response.data,
                 
                    });
                  })
            
                  .catch(err => window.alert(err) );
            }

              updateSearch(event){
                this.setState({search: event.target.value.substr(0,20)})
              };
        
              componentDidMount() {
                this.getCountries();
              }

              click(e,i) {
                e.preventDefault();
              }

            render(){

              const {Countries}=this.state;
              const {search}=this.state;

                function showInfo({match}) {
                  console.log(match.params.id)
                  return null;
                }
 
                function returnList(){

                  var Arr=[];

                  if(search.length<3) return Arr;

                  for(var i in Countries){ 
                  

                  if(((Countries[i].geopoliticalarea).toUpperCase()).indexOf(search.toUpperCase())!==-1)
                    {
                      Arr.push(                     
                      <tr><td><Link to={Countries[i].geopoliticalarea}>{Countries[i].geopoliticalarea}</Link></td></tr>                                         
                      )
                    }

                  }

                  return Arr;
            
                }

                return (
                  
                  <div className="home" style={{position:"static",height:"100%"}}>

                            <div className="container" style={{height:"100%"}}>

                              <div className="panel-title" align="center">Where are you travelling?</div>
                              <img className="homeImg" src={pic}></img>

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
                               {returnList()}

                               </tbody>
                              </Table>
                            </div>
                </div>
                )  
          
          }
        }
export default USHome;

