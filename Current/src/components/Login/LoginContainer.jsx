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
          email: '',
          password: '',
          firstName: null,
          lastName: null,
          phone: null,
          birthDate: null,
          sex: null,
          profession: null,
          message: null
        };
        this.login = this.login.bind(this) 
        this.handleSignUpCondition = this.handleSignUpCondition.bind(this)
        this.signup = this.signup.bind(this)
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
            this.setState({ message: 'Unable to register! Try again!' });
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
    render() {
        return(
          <React.Fragment>
            {this.props.logindata.AUTH_TOKEN ? <Redirect to='/home'/> :
            <LoginView signUpCondition={this.state.signUpCondition} handleSignUpCondition={this.handleSignUpCondition} login={this.login} signup={this.signup} message={this.state.message}/>}
          </React.Fragment>
        )
    }
}
export default connect(state =>({logindata:state.logindata}))  (LoginContainer)