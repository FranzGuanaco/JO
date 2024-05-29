import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import axios from "axios";
import { AppContext } from './AppContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { cart, setUser } = useContext(AppContext); // Ajouter setUser au contexte

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:3002/login_user', {
      email: email,
      password: password
    })
    .then(response => {
      if(response.data.status === 'success') {
        alert(response.data.message);
        console.log("API response:", response.data); // Ajoutez ceci pour déboguer
        // Mettre à jour le contexte avec les informations de l'utilisateur
        const user = {
          id: response.data.user_id, // Assurez-vous que l'API renvoie l'ID de l'utilisateur
          email: email
        };
        console.log("User ID from API:", response.data.user_id); // Ajoutez ceci pour déboguer
        setUser(user); // Utiliser le contexte pour définir l'utilisateur
        console.log("User context updated:", user); // Ajoutez ceci pour déboguer
        navigate('/payment'); // Utiliser navigate pour rediriger vers la page de paiement
      } else {
        alert(response.data.message);
      }
    })
    .catch(error => {
      console.error('Erreur lors de la requête:', error);
    });
  };

  return (
    <div className="Id">
      <form className="formBox" onSubmit={handleSubmit}>
        <label htmlFor="email" style={{margin:'auto'}}>{'Email'} :</label>
        <input type="text" id="email" name="email" value={email} onChange={handleEmailChange} placeholder="Email" />
        <label htmlFor="password" style={{margin:'auto'}}>{'Password'}</label>
        <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange}/>
        <input type="submit" value="Se connecter" />
      </form>
      <div className="button-group">
        <button className="secondary-button" onClick={() => navigate('/create_account')}>Créer un compte</button>
      </div>
      <div>
        <h3>Articles dans le panier :</h3>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item.name} - {item.description}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Login;







