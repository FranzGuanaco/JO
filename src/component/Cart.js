import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';

const Cart = () => {

  const navigate = useNavigate();
  const { cart } = useContext(AppContext);
  
  const handleValidate = () => {
    navigate('/login'); // Rediriger vers la page de connexion
  };


  return (
    <div className="cart">
      <h2>Panier</h2>
      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>{item.name} - {item.description}</li>
            ))}
          </ul>
          <button className="validate-button" onClick={handleValidate}>Valider</button> {/* Bouton Valider */}
        </>
      )}
    </div>
  );
};

export default Cart;


