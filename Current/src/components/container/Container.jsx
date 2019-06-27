import React from 'react'
import Header from '../header/Header'
import { Route, Switch } from 'react-router-dom';
import HomeContainer from '../home/HomeContainer'
import ProfileContainer from '../profile/ProfileContainer'
class Container extends React.Component {
    render () {
        return(
            <section>
                <Header user={null} />
                <Switch>
                    <Route path="/profile" component={ProfileContainer} />
                    <Route path="/home" component={HomeContainer} />
                </Switch>
            </section>
        )
    }
}
export default Container