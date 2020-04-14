import {Route,BrowserRouter,Switch} from 'react-router-dom';
import React, {Component} from 'react';
import './App.css';
import USHome from './USHome';
import InfoPage from './InfoPage';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {

    
  render(){

  return (

<BrowserRouter>
  <Switch>
      <Route exact path='/' render={() => ( 
          <USHome/>
      )}/>
      
      <Route  path='/:id' component={InfoPage} />

  </Switch>
</BrowserRouter>


  );
}
}

export default App;
