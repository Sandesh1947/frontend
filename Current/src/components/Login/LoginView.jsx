import React from 'react'
import './login.scss';
import DatePicker from "react-datepicker";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
class LoginView extends React.Component {
  constructor() {
    super()
    this.state = {birthDate:null}
    this.handleChange = this.handleChange.bind(this);
    this.handleDateOfBirth = this.handleDateOfBirth.bind(this)
    this.birthDate = null
  }
  handleDateOfBirth = (value) => {
    this.birthDate=value
    this.setState({birthDate:moment(value).format("YYYY-MM-DD")})
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
      
    render() {
        return (
          <div
            id='container'
            className={
              //click triggered showing the right panel active
              //else it shows the container
              this.props.signUpCondition
                ? 'slide-design-container slide-design-right-panel-active slide-design-sign-up-container'
                : 'slide-design-container'
            }
          >
            {this.props.signUpCondition ? <div className='slide-design-form-container slide-design-sign-up-container'>
              <form className='slide-design-form' action='#'>
                <h1 className='slide-design-header mb-2'>Create Account</h1>
                {
                  this.props.message
                    && (
                      <span className='slide-design-a' style={{ color: 'red' }}>{ this.props.message }</span>
                    )
                }    
                <input
                  name='firstName'
                  className='slide-design-input'
                  type='text'
                  placeholder='First name'
                  onChange={ this.handleChange }
                />
                
                <input
                  name='lastName'
                  className='slide-design-input'
                  type='text'
                  placeholder='Last name'
                  onChange={ this.handleChange }
                />
                
                <input
                  name='email'
                  className='slide-design-input'
                  type='email'
                  placeholder='Email'
                  onChange={ this.handleChange }
                />
                
                <input
                  name='password'
                  className='slide-design-input'
                  type='password'
                  placeholder='Password'
                  onChange={ this.handleChange }
                />
      
                <input
                  name='phone'
                  className="slide-design-input"
                  type="text"
                  placeholder="Phone"
                  onChange={ this.handleChange }
                />
      
                <div className='slide-design-input slide-design-select-wrap'>
                  <DatePicker
                    placeholderText='Date of birth'
                    selected={this.birthDate}
                    onChange={this.handleDateOfBirth}
                  />
                </div>
      
                <div className='slide-design-input slide-design-select-wrap'>
                  <span className='slide-design-select-placeholder'>
                    Sex
                  </span>
                  <select
                    className='select-css'
                    name='sex'
                    onChange={ this.handleChange }
                  >
                    <option value='male'>
                      Male
                    </option>
                    <option value='female'>
                      Female
                    </option>
                    <option value='other'>
                      Other
                    </option>
                  </select>
                  </div>
                <button
                  className='slide-design-button mt-2'
                  onClick={ (e)=> {e.preventDefault() ; this.props.signup(this.state)} }
                >Sign Up</button>
              </form>
            </div>:
            <div className='slide-design-form-container slide-design-sign-in-container'>
              <form className='slide-design-form'>
                {
                  this.props.message
                    ? (
                      <h1 className='slide-design-header mb-2'>{ this.props.message }</h1>
                    )
                    : (
                      <h1 className='slide-design-header mb-2'>Sign in</h1>
                    )
                }
                <input
                  className='slide-design-input'
                  name='email'
                  type='email'
                  id='email'
                  placeholder='Enter email'
                  onChange={ this.handleChange }
                />
                <input
                  className='slide-design-input'
                  name='password'
                  type='password'
                  id='password'
                  placeholder='Enter password'
                  onChange={ this.handleChange }
                />
                <a className='mt-2' href='#'>Forgot your password?</a>
                <button
                  className='slide-design-button mt-2'
                  onClick={ (e)=> {e.preventDefault();this.props.login(this.state) }}
                >
                  Sign in
                </button>
              </form>
            </div>}
            <div className='slide-design-overlay-container'>
              <div className='slide-design-overlay'>
                <div className='slide-design-overlay-panel slide-design-overlay-left'>
                  <h1 className='slide-design-white slide-design-right slide-design-header'>
                    Welcome Back!
                  </h1>
                  <p className='slide-design-right slide-design-p'>
                    To keep connected with us please login with your personal info
                  </p>
                  <button
                    id='signIn'
                    className='slide-design-button slide-design-button-ghost slide-design-right'
                    onClick={ this.props.handleSignUpCondition }
                  >
                    Sign In
                  </button>
                </div>
                <div className='slide-design-overlay-panel slide-design-overlay-right'>
                  <h1 className='slide-design-header slide-design-white slide-design-move'>
                    Hello, Friend!
                  </h1>
                  <p className='slide-design-move slide-design-p'>
                    Enter your personal details and start journey with us
                  </p>
                  
                  <button
                    className='slide-design-button slide-design-button-ghost slide-design-move'
                    id='signUp'
                    onClick={ this.props.handleSignUpCondition }
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }
}
export default LoginView