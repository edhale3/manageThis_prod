import React, { Component } from 'react';
import './App.css';
// import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import About from '../About/About'
import Contact from '../Contact/Contact'
import Landing from '../Landing/Landing'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import Navigation from '../Navigation/Navigation'
import Account from '../Account/Account'
import NewProject from '../NewProject/NewProject'

class App extends Component {

  render() {
      return (
        <div>
          <BrowserRouter>
            <div>
              <Navigation />
              <Switch>
                <Route path="/" component={Landing} exact/>
                <Route path="/Home" component={Landing} exact/>
                <Route path="/about" component={About}/>
                <Route path="/contact" component={Contact}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/signin" component={SignIn}/>
                <Route path="/account" component={Account}/>
                <Route path="/account/:account_id" exact={true} component={Account} />
                <Route path="/newproject" component={NewProject} />
            
              </Switch>
            </div> 
          </BrowserRouter>
          <Footer />  
        </div>
      );
  }
}

export default App;
