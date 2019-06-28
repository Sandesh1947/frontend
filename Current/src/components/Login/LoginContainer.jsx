import React from 'react'
import LoginView from './LoginView'
import { BASE_URL } from '../../app.constants';
import {loginAction} from '../../actions/loginAction'
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
      }
      /** service */
      postData = (type, userData) => {
        return new Promise((resolve, reject) => {
          fetch(BASE_URL + type, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          })
            .then(response => response.json())
            .then(res => {
              resolve(res);
            })
            .catch(error => {
              reject(error);
            });
        });
      };
      
      signup = (data) => {
        
        let endPoint = '/api/signup';
        
        this.postData(endPoint, data)
          .then(res => {
            return res.msg === 'Successful'
              ? Promise.resolve(res)
              : Promise.reject(res);
          })
          .then(res => {
            this.setState({
              message: 'Successfully registered! Login to your account.',
              signUpCondition: false,
            });
          })
          .catch(err => {
            console.error(err.msg);
            this.setState({ message: 'Unable to register! Try again!' });
          });
      };
      login(data) {
        this.props.dispatch(loginAction({email: data.email, password: data.password}))
      }
    render() {
        return(
          <React.Fragment>
            {this.props.logindata.AUTH_TOKEN ? <Redirect to='/home'/> :
            <LoginView login={this.login} signup={this.signup} message={this.state.message}/>}
          </React.Fragment>
        )
    }
}
export default connect(state =>({logindata:state.logindata}))  (LoginContainer)