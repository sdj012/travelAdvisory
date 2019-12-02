import React, { Component } from 'react';
class NavBar extends Component{

render(){

return (

<nav className="navbar navbar-inverse navbar-fixed-top">

<div className="container-fluid">

  <div className="navbar-header">
    <div className="navbar-brand">International Travel Guide</div>
  </div>

  <ul className="nav navbar-nav navbar-right">
        
        <li className="dropdown">
          
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" >Statistics<span className="caret"></span></a>
          
          <ul className="dropdown-menu">
            <li><a href="#" id="teams-menu">Tourism Statistics </a></li>
            <li><a href="#" id="employees-menu">Crime Statistics</a></li>
            <li><a href="#" id="projects-menu">Sanitary Conditions</a></li>
            <li><a href="#" id="positions-menu">Overall Safety</a></li> 
            <li><a href="#" id="positions-menu">News</a></li>
            <li><a href="#" id="positions-menu">Weather</a></li> 
          </ul>

        </li>
  </ul>  
</div>

</nav>

);

}

}
export default NavBar;