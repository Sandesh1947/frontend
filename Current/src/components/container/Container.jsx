import React from 'react'
import Header from '../header/Header'
import { Route, Switch ,Redirect} from 'react-router-dom';
import HomeContainer from '../home/HomeContainer'
import ProfileContainer from '../profile/ProfileContainer'
import {connect} from 'react-redux'
import {getUserInfo} from '../../actions/userInfoActions'
import {loginOutAction} from '../../actions/accountAction'
class Container extends React.Component {
    constructor() {
        super()
        this.state = {isLoggedIn:false,isLoadingLocalStorage:true}
        this.logOut = this.logOut.bind(this)
    }
    componentDidMount() {
        if(localStorage.getItem('AUTH_TOKEN')) {
            this.setState({isLoggedIn:true,isLoadingLocalStorage:false})
            this.props.dispatch(getUserInfo())
            if(this.props.location.pathname==='/')
            this.props.history.push({
                pathname:'/home'
            })
        }
        else {
            this.setState({isLoadingLocalStorage:false})
        }
    }
    logOut() {
        this.props.dispatch(loginOutAction())
    }
    render () {
        return(
            <React.Fragment>
                {this.state.isLoggedIn  ? 
                <section>
                    <Header logOut={this.logOut} user={this.props.userInfo.user} />
                    <Switch>
                        <Route path="/profile" component={ProfileContainer} />
                        <Route path="/home" component={HomeContainer} />
                    </Switch>
                </section>: !this.state.isLoadingLocalStorage ? <Redirect to='/login'/>:''}
            </React.Fragment>
        )
    }
}
export default connect(state =>({logindata:state.logindata,userInfo:state.userInfo}))(Container)