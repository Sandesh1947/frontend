import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.scss';
import LoginContainer from './components/Login/LoginContainer'
import Container from './components/container/Container'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store.js';
import axios from 'axios';
import {setInterceptor} from './initAxios'
library.add(faHeart, faShare);
JavascriptTimeAgo.locale(en);
class IndexApp extends React.Component {
	componentDidMount() {
		setInterceptor()
		axios.interceptors.request.use(request => {
			console.log('Starting Request', request)
			return request
		  })
	}
	render() {
		return(
			<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route exact path="/login" component={LoginContainer} />
					<Route path='/' component={Container} />
				</Switch>
			</BrowserRouter>
		</Provider>
		)
	}
}

ReactDOM.render(<IndexApp/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
