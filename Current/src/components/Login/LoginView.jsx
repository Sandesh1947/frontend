import React from 'react'
import './login.scss';
class LoginView extends React.Component {
    constructor() {
        super()
        this.state = {signUpCondition:false}
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({
          signUpCondition: !this.state.signUpCondition
        });
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
              this.state.signUpCondition
                ? 'slide-design-container slide-design-right-panel-active slide-design-sign-up-container'
                : 'slide-design-container'
            }
          >
            <div className='slide-design-form-container slide-design-sign-up-container'>
              <form className='slide-design-form' action='#'>
                <h1 className='slide-design-header'>Create Account</h1>
                <div className='slide-design-social-container'>
                  <a href='#' className='slide-design-social slide-design-a'>
                    <i className='fab fa-facebook-f' />
                  </a>
                  <a href='#' className='slide-design-social slide-design-a'>
                    <i className='fab fa-google-plus-g' />
                  </a>
                  <a href='#' className='slide-design-social slide-design-a'>
                    <i className='fab fa-linkedin-in' />
                  </a>
                </div>
                {
                  this.props.message
                    && (
                      <span className='slide-design-a' style={{ color: 'red' }}>{ this.props.message }</span>
                    )
                }
                <span className='slide-design-a'>
                                or use your email for registration
                            </span>
                
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
                  <span className='slide-design-select-placeholder'>
                    Birthdate
                  </span>
                  <input
                    name='birthDate'
                    type="date"
                    placeholder="Date of birth"
                    onChange={ this.handleChange }
                  />
                </div>
      
                <div className='slide-design-input slide-design-select-wrap'>
                  <span className='slide-design-select-placeholder'>
                    Sex
                  </span>
                  
                  <select
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
      
                <input
                  name='profession'
                  className="slide-design-input"
                  type="text"
                  placeholder="Profession"
                  onChange={ this.handleChange }
                />
                <button
                  className='slide-design-button'
                  onClick={ ()=> {this.props.signup(this.state)} }
                >Sign Up</button>
              </form>
            </div>
            <div className='slide-design-form-container slide-design-sign-in-container'>
              <form className='slide-design-form'>
                {
                  this.props.message
                    ? (
                      <h1 className='slide-design-header'>{ this.props.message }</h1>
                    )
                    : (
                      <h1 className='slide-design-header'>Sign in</h1>
                    )
                }
                <div className='slide-design-social-container slide-design-a'>
                  <a href='# ' className='slide-design-social'>
                    <i className='fab fa-facebook-f' />
                  </a>
                  <a href='#' className='slide-design-social slide-design-a'>
                    <i className='fab fa-google-plus-g' />
                  </a>
                  <a href='#' className='slide-design-social slide-design-a'>
                    <i className='fab fa-linkedin-in' />
                  </a>
                </div>
                <span className='slide-design-span'>or use your account</span>
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
                <a href='#'>Forgot your password?</a>
                <button
                  className='slide-design-button'
                  onClick={ (e)=> {e.preventDefault();this.props.login(this.state) }}
                >
                  Login
                </button>
              </form>
            </div>
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
                    onClick={ this.handleClick }
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
                    onClick={ this.handleClick }
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