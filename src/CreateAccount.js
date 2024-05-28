import React from "react";
import './CreateAccount.css';
import axios from "axios";

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);

    // Initialisation de l'état du composant
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  }

  // Gestionnaire de changement pour le champ prénom
  handleFirstNameChange = (event) => {
    this.setState({ firstName: event.target.value });
  }

  // Gestionnaire de changement pour le champ nom
  handleLastNameChange = (event) => {
    this.setState({ lastName: event.target.value });
  }

  // Gestionnaire de changement pour le champ email
  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  // Gestionnaire de soumission du formulaire
  handleSubmit = (event) => {
    event.preventDefault();
    
    // Effectuer une requête POST pour la création de compte
    axios.post('http://localhost:3002/register', {
      nom: this.state.lastName,
      prenom: this.state.firstName,
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

  render() {
    const { firstName, lastName, email, password } = this.state;

    return (
      <div className="Id">
        {/* Formulaire de création de compte */}
        <form className="formBox" onSubmit={this.handleSubmit}>
          <label htmlFor="firstName" style={{margin:'auto'}}>{this.props.title1} :</label>
          <input type="text" id="firstName" name="firstName" value={firstName} onChange={this.handleFirstNameChange} placeholder="" required />
          <label htmlFor="lastName" style={{margin:'auto'}}>{this.props.title4}</label>
          <input type="text" id="lastName" name="lastName" value={lastName} onChange={this.handleLastNameChange} placeholder="" required />
          <label htmlFor="email" style={{margin:'auto'}}>{this.props.title3}</label>
          <input type="email" id="email" name="email" value={email} onChange={this.handleEmailChange} placeholder="" required />
          <label htmlFor="password" style={{margin:'auto'}}>{this.props.title2}</label>
          <input type="password" id="password" name="password" value={password} onChange={this.handlePasswordChange} required />
          <input type="submit" value="Créer un compte"/>
        </form>
        <div className="button-group">
          <button className="secondary-button" onClick={this.handleLogin}>Login</button>
        </div>
      </div>
    );
  }
}

// Valeurs par défaut des propriétés
CreateAccount.defaultProps = {
  title1: 'First Name',
  title2: 'Password',
  title3: 'Email',
  title4: 'Last Name',
};

export default CreateAccount;


