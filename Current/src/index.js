import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.scss';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Profile from './pages/profile/profile';
import * as serviceWorker from './serviceWorker';

library.add(faHeart, faShare);
JavascriptTimeAgo.locale(en);

const routing = (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Login} />
			<Route path="/profile" component={Profile} />
			<Route path="/home" component={Home} />
		</Switch>
	</BrowserRouter>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
