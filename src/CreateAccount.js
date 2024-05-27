import React from "react";
import './CreateAccount.css';
import axios from "axios";

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);

    // Initialisation de l'état du composant
    this.state = {
      userName: "",
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    // Effectuer une requête GET au montage du composant pour tester l'authentification
    axios.get('http://localhost:3001/auth')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la requête');
      });
  }

  // Gestionnaire de changement pour le champ nom d'utilisateur
  handleUsernameChange = (event) => {
    this.setState({ userName: event.target.value });
  }

  // Gestionnaire de changement pour le champ email
  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  // Gestionnaire de soumission du formulaire
  handleSubmit = (event) => {
    event.preventDefault();
    
    // Effectuer une requête POST pour la création de compte
    axios.post('http://localhost:3001/register', {
      nom_utilisateur: this.state.userName,
      email: this.state.email,
      mot_de_passe: this.state.password
    })
    .then(response => {
      if(response.data.status === 'success') {
        alert(response.data.message);
        // Redirection de l'utilisateur en cas de succès
        const redirectUrl = `/login`;
        window.location.href = redirectUrl;
      } else {
        alert(response.data.message);
      }
    })
    .catch(error => {
      console.error('Erreur lors de la requête:', error);
    });
  }

  // Gestionnaire de changement pour le champ mot de passe
  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleLogin = () => {
    // Redirection vers la page de login
    window.location.href = '/login';
  }

  handleAdminLogin = () => {
    // Redirection vers la page de connexion administrateur
    window.location.href = '/admin-login';
  }

  render() {
    const { userName, email, password } = this.state;

    return (
      <div className="Id">
        {/* Formulaire de création de compte */}
        <form className="formBox" onSubmit={this.handleSubmit}>
          <label htmlFor="username" style={{margin:'auto'}}>{this.props.title} :</label>
          <input type="text" id="username" name="username" value={userName} onChange={this.handleUsernameChange} placeholder="" required />
          <label htmlFor="email" style={{margin:'auto'}}>{this.props.title3}</label>
          <input type="email" id="email" name="email" value={email} onChange={this.handleEmailChange} placeholder="" required />
          <label htmlFor="password" style={{margin:'auto'}}>{this.props.title2}</label>
          <input type="password" id="password" name="password" value={password} onChange={this.handlePasswordChange} required />
          <input type="submit" value="Créer un compte"/>
        </form>
        <div className="button-group">
          <button className="secondary-button" onClick={this.handleLogin}>Login</button>
          <button className="secondary-button" onClick={this.handleAdminLogin}>Connexion Admin</button>
        </div>
      </div>
    );
  }
}

// Valeurs par défaut des propriétés
CreateAccount.defaultProps = {
  title: 'Username',
  title2: 'Password',
  title3: 'Email',
};

export default CreateAccount;
