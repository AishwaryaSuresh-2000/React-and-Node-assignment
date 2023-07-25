
import React, { useState, useEffect  } from 'react';
import SubmitForm from './compontens/register';
import Login from './compontens/login';
// import HomePage from './compontens/home';
import Logout from './compontens/logout';
import  Home from'./compontens/accountin';
// import  Account from'./compontens/profile';
import  ImageUploadForm from'./compontens/profile';
import ReactDOM from 'react-dom';
import './new.css';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import ProductScreen from './compontens/productscreen';
     

const App = () => {
 
  return (
      <Router>
        <div>
          
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={SubmitForm} />
            <Route path="/product/:productId" component={ProductScreen} />
            <Route path="/logout" component={Logout} />
            <Route path="/uploads" component={ImageUploadForm} /> 

          </Switch>
        </div>
      </Router>
      );
};


      ReactDOM.render(<App />, document.getElementById('root'));


export default App;




