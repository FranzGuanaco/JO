import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from './AppContext';
import { useNavigate } from 'react-router-dom';
import OfferList from './component/Offerlist';
import Cart from './component/Cart';
import axios from 'axios';
import './OfferPage.css';

function OfferPage() {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();
  const { cart, setCart } = useContext(AppContext);

  useEffect(() => {
    axios.get('http://localhost:3002/offers')
      .then(response => {
        if (response.data.status === 'success') {
          setOffers(response.data.offers);
        } else {
          console.error('Erreur lors de la récupération des offres:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la requête:', error);
      });
  }, []);

  const addToCart = (offer) => {
    if (!isAuthenticated()) {
      navigate('/login');
    } else {
      setCart([...cart, offer]);
    }
  };

  const isAuthenticated = () => {
    // Logique d'authentification (vérifier le token JWT, etc.)
    return true; // À remplacer par la vraie vérification
  };

  return (
    <div className="OfferPage">
      <header className="OfferPage-header">
        <h1>Offres des Jeux Olympiques</h1>
      </header>
      <main className="OfferPage-main">
        <OfferList offers={offers} addToCart={addToCart} />
        <Cart cart={cart} />
      </main>
    </div>
  );
}

export default OfferPage;

