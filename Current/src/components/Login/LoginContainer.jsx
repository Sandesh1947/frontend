import React from 'react'
import LoginView from './LoginView'
import {loginAction,signUp} from '../../actions/accountAction'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
          signUpCondition: false, //this helps to slide active and false
          message: null,
          signUpFailed:false
        };
        this.login = this.login.bind(this) 
        this.handleSignUpCondition = this.handleSignUpCondition.bind(this)
        this.signup = this.signup.bind(this)
        this.clearErrorBorders = this.clearErrorBorders.bind(this)
      }
      signup (data) {
        signUp(data).then(
          (res) =>{
            this.setState({
              message: 'Successfully registered! Login to your account.',
              signUpCondition: false,
            });
          },
          (err) =>{
            console.error(err.msg);
            this.setState({signUpFailed:true });
          }
        )
      }
      login(data) {
        this.props.dispatch(loginAction({email: data.email, password: data.password}))
      }
      handleSignUpCondition() {
        this.setState({
          signUpCondition: !this.state.signUpCondition
        });
      }
      clearErrorBorders() {
        this.setState({signUpFailed:false})
      }
    render() {
        return(
          <React.Fragment>
            {this.props.logindata.AUTH_TOKEN ? <Redirect to='/home'/> :
            <LoginView clearErrorBorders={this.clearErrorBorders} signUpFailed={this.state.signUpFailed} login_failed={this.props.logindata.login_failed} signUpCondition={this.state.signUpCondition} handleSignUpCondition={this.handleSignUpCondition} login={this.login} signup={this.signup} message={this.state.message}/>}
          </React.Fragment>
        )
    }
}
export default connect(state =>({logindata:state.logindata}))  (LoginContainer)