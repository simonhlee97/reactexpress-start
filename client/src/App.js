import React, { Component } from 'react';
// import Posts from './components/Posts';
import {Navbar, NavItem} from 'react-materialize';
import {Link, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Posts from './components/Posts'
import New from './components/New'

export default class App extends Component {

	render() {
	  return (
		<div>
			<Navigation />
		</div>
	  )
	}
}

const Navigation = () => {
	return (
		<div>
			<Navbar brand='mySite' right>
				<NavItem><Link to='/'>Home</Link></NavItem>
				<NavItem><Link to='/posts'>Posts</Link></NavItem>
				<NavItem><Link to='/add'>Write</Link></NavItem>
			</Navbar>
			
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/posts' component={Posts} />
				<Route path='/add' component={New} />				
			</Switch>

		</div>
	);
};


