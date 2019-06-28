import React from 'react'
import Header from '../header/Header'
import { Route, Switch ,Redirect} from 'react-router-dom';
import HomeContainer from '../home/HomeContainer'
import ProfileContainer from '../profile/ProfileContainer'
import {connect} from 'react-redux'
import {getUserInfo} from '../../actions/userInfoActions'
class Container extends React.Component {
    constructor() {
        super()
        this.state = {isLoggedIn:false,isLoadingLocalStorage:true}
    }
    componentDidMount() {
        if(localStorage.getItem('AUTH_TOKEN')) {
            this.setState({isLoggedIn:true,isLoadingLocalStorage:false})
            this.props.dispatch(getUserInfo())
            this.props.history.push({
                pathname:'/home'
            })
        }
        else {
            this.setState({isLoadingLocalStorage:false})
        }
    }
    render () {
        return(
            <React.Fragment>
                {this.state.isLoggedIn  ? 
                <section>
                    <Header user={this.props.userInfo.user} />
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