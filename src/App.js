import React, { Component } from 'react';
import logo from './assets/images/practice_printables_logo.png';
import './App.scss';
import { Typography } from '@rmwc/typography';
import { Button } from '@rmwc/button';
import { Route, Switch, BrowserRouter, Link} from 'react-router-dom';

import Home from './Components/Home';
import Browse from './Components/Browse';
import Builder from './Components/Builder';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <header className="mdc-top-app-bar mdc-top-app-bar--fixed" style={{top: '0px'}}>
          <div className="mdc-top-app-bar__row">
            <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start" style={{padding: '0 60px',justifyContent: 'space-between',maxWidth: '1360px'}}>
              {/*<a className="material-icons mdc-top-app-bar__navigation-icon">menu</a>*/}
              <Link to='/' style={{textDecoration: 'none'}}>
              <img src={logo} alt="Practice Printables"/>
              </Link>

              <nav>
                <Link to='/worksheet/builder' style={{textDecoration: 'none', marginRight: '15px'}}>
                  <Button unelevated>Create Worksheet</Button>
                </Link>
                <Link to='/browse' style={{textDecoration: 'none'}}>
                  <Button unelevated>Browse Worksheets</Button>
                </Link>
              </nav>

            </section>
          </div>
        </header>

        <section className="app-col-wrap main-content flex">

          <div className="feed-col flex-grow">


              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/browse" component={Browse}/>
                <Route exact path="/worksheet/builder" component={Builder}/>
              </Switch>


            </div>


          <div className="right-col">
            <div className="card">
              <Typography className="block" use="headline5">Useful Resources</Typography>
            </div>
            <div className="card flex flex-column align-items-center">
              <img src="https://thepienews.com/wp-content/uploads/2011/10/ad-placeholder-empty-without.png" alt="some ad"/>
            </div>

          </div>
        </section>

      <p className="fake">foobar</p>


      </div>
      </BrowserRouter>
    );
  }
}

export default App;
