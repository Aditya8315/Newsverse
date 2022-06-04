import './App.css';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  state={
    progress:0
  }
  setprogress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
      <Router>
        <Navbar/>
        <LoadingBar color='#ffffff' height={3} progress={this.state.progress} />
        <Switch>
          <Route exact path="/"><News  setprogress={this.setprogress} key="general" country="in" pageSize={6} category="general"/></Route> 
          <Route exact path="/business"><News  setprogress={this.setprogress} key="business" country="in" pageSize={6} category="business"/></Route> 
          <Route exact path="/entertainment"><News  setprogress={this.setprogress} key="entertainment" country="in" pageSize={6} category="entertainment"/></Route> 
          <Route exact path="/health"><News  setprogress={this.setprogress} key="health" country="in" pageSize={6} category="health"/></Route> 
          <Route exact path="/sports"><News  setprogress={this.setprogress} key="sports" country="in" pageSize={6} category="sports"/></Route> 
          <Route exact path="/technology"><News  setprogress={this.setprogress} key="technology" country="in" pageSize={6} category="technology"/></Route> 
        </Switch>
      
      </Router>
      </div>
    )
  }
}
