import React from 'react'
import Header from '../header/Header'
import { Route, Switch } from 'react-router-dom';
import Home from '../../pages/home/home';
import Profile from '../../pages/profile/profile';
class Container extends React.Component {
    render () {
        return(
            <section>
                <Header user={null} />
                <Switch>
                    <Route path="/profile" component={Profile} />
                    <Route path="/home" component={Home} />
                </Switch>
            </section>
        )
    }
}
export default Container