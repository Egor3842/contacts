import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './Login/Login';
import Contacts from './Contacts/Contacts';

function App() {
  return (
    <div className="App">
     <Switch>
          <Route path='/login' exact={true} component={Login} />
          <Route path='/' component={Contacts} />
      </Switch>
    </div>
  );
}

export default App;
