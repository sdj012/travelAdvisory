import React,{Component} from 'react';
import axios from 'axios';
import './App.css';
import Table from 'react-bootstrap/Table';
import {BrowserRouter,Router,Route,Link} from "react-router-dom";
import pic from './static/people.jpg';
import history from './history'

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
                  
                  <div className="home" style={{position:"static",height:"100%",overflow:"hidden"}}>

                            <div className="container" style={{height:"100%"}}>

                              <div className="panel-title" align="center" style={{top:"25%",left:"20%",fontSize: 50, color: "black", opacity: 0.8, position:"absolute"}}>Where are you travelling?</div>
                              <img style={{height:"600px", width:"auto",top:"35%",left:"50%",position:"absolute"}} src={pic}></img>

                              <Table align="center" bordered hover style={{ backgroundColor:'white', left:"20%", top: "35%",position:"absolute", width:"60pc"}}>
                                <thead>
                                  <tr align="left">
                                  <th scope="col">
                                    <div className="col-md-12" id="col">

                                    <input type="text" className="container" placeholder="Search for a Country" style={{opacity: 0.9}} value={this.state.search}
                                    onChange={this.updateSearch.bind(this)}></input>

                                  </div>
                                  </th>

                                  </tr>
                                </thead>
                               <tbody>
                               {returnList()}
 
                                <BrowserRouter>
                               <Router history={history}> 
                               <Route exact path="/InfoPage/:id" component={showInfo} />
                               </Router>
                               </BrowserRouter>
                               </tbody>
                              </Table>
                            </div>
                </div>
                )  
          
          }
        }
export default USHome;

