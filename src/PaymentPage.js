import React, { useContext, useState } from 'react';
import { AppContext } from './AppContext';
import axios from 'axios';
import './PaymentPage.css';

const Cart = () => {
  const { cart, setCart, user } = useContext(AppContext);
  const [clefCommande, setClefCommande] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);

  console.log("User in Cart:", user);

  const handlePayment = () => {
    // Vérifier si l'utilisateur est authentifié
    if (!user || !user.id) {
      alert("Veuillez vous connecter pour effectuer le paiement.");
      return;
    }

    // Construire le panier pour l'API
    const panier = cart.map(item => ({
      offer_id: item.id,
      quantite: 1  // Modifier selon la logique de votre panier
    }));

    axios.post('http://localhost:3002/payment', {
      utilisateur_id: user.id,  // Utilisateur authentifié avec ID valide
      panier: panier
    })
    .then(response => {
      if (response.data.status === 'success') {
        setPaymentSuccess(true);
        setClefCommande(response.data.clef_commande);
        setQrCodeUrl(`data:image/png;base64,${response.data.qr_code}`);
        // Vider le panier après le paiement
        setCart([]);
      } else {
        alert(response.data.message);
      }
    })
    .catch(error => {
      console.error('Erreur lors de la requête:', error);
      alert('Erreur lors du traitement du paiement');
    });
  };

  return (
    <div className="cart">
      <h2>Votre Panier</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.name} - {item.description}</li>
        ))}
      </ul>
      <button onClick={handlePayment}>Valider le paiement</button>
      {paymentSuccess && (
        <div className="confirmation">
          <h3>Paiement réussi!</h3>
          <p>Votre clé de commande est : {clefCommande}</p>
          {qrCodeUrl && (
            <div>
              <h4>Votre QR Code :</h4>
              <img src={qrCodeUrl} alt="QR Code" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;






