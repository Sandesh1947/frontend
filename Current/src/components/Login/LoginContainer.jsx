import React from 'react'
import LoginView from './LoginView'
import { BASE_URL } from '../../app.constants';
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
      
      login = (data) => {
        
        let endPoint = '/api/authenticate'; // - API call endpoint
        
        if(data.email && data.password) {
          this.postData(endPoint, {email: data.email, password: data.password}).then(result => {
            console.log(result);
            localStorage.setItem('AUTH_TOKEN', result.auth_token);
            this.props.history.push({ pathname: '/home' });
          });
        }
      };
      
    render() {
        return(
           <LoginView login={this.login} signup={this.signup} message={this.state.message}/>
        )
    }
}
export default LoginContainer