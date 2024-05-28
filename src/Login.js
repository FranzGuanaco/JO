import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import axios from "axios";
import { AppContext } from './AppContext';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { cart } = useContext(AppContext);

  const handleUsernameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:3001/login', {
      nom_utilisateur: userName,
      mot_de_passe: password
    })
    .then(response => {
      if(response.data.status === 'success') {
        alert(response.data.message);
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
        <label htmlFor="username" style={{margin:'auto'}}>{'Username'} :</label>
        <input type="text" id="username" name="username" value={userName} onChange={handleUsernameChange} placeholder="" />
        <label htmlFor="password" style={{margin:'auto'}}>{'Password'}</label>
        <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange}/>
        <input type="submit" value="Se connecter" />
      </form>
      <div className="button-group">
        <button className="secondary-button" onClick={() => navigate('/payment')}>Créer un compte</button>
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




