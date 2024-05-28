import React, { useContext, useState } from 'react';
import { AppContext } from './AppContext';
import { useNavigate } from 'react-router-dom';
import OfferList from './component/Offerlist';
import Cart from './component/Cart';
import './OfferPage.css';

function OfferPage() {
  const [offers, setOffers] = useState([
    { id: 1, name: 'Solo', description: 'Accès pour 1 personne', capacity: 1 },
    { id: 2, name: 'Duo', description: 'Accès pour 2 personnes', capacity: 2 },
    { id: 3, name: 'Familiale', description: 'Accès pour 4 personnes', capacity: 4 },
  ]);

  const navigate = useNavigate();
  const { cart, setCart } = useContext(AppContext); // Utiliser le contexte

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



