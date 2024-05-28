import React from "react";
import axios from "axios";
import './Login.css';

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    axios.post('http://localhost:3002/login', {
      email: this.state.email,
      password: this.state.password
    })
    .then(response => {
      if(response.data.status === 'success') {
        alert(response.data.message);
        // Redirection de l'utilisateur en cas de succès
        const redirectUrl = `/admin?email=${this.state.email}`;
        window.location.href = redirectUrl;
      } else {
        alert(response.data.message);
      }
    })
    .catch(error => {
      console.error('Erreur lors de la requête:', error);
    });
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className="Id">
        <form className="formBox" onSubmit={this.handleSubmit}>
          <label htmlFor="email" style={{margin:'auto'}}>{this.props.title} :</label>
          <input type="text" id="email" name="email" value={email} onChange={this.handleEmailChange} placeholder="Email" />
          <label htmlFor="password" style={{margin:'auto'}}>{this.props.title2}</label>
          <input type="password" id="password" name="password" value={password} onChange={this.handlePasswordChange} placeholder="Password"/>
          <input type="submit" value="Se connecter"/>
        </form>
      </div>
    );
  }
}

AdminLogin.defaultProps = {
  title: 'Email',
  title2: 'Password',
};

export default AdminLogin;
