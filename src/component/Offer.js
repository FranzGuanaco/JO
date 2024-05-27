import React from 'react';

const Offer = ({ offer, addToCart }) => {
  return (
    <div className="offer">
      <h3>{offer.name}</h3>
      <p>{offer.description}</p>
      <button className="add-to-cart-button" onClick={() => addToCart(offer)}>Ajouter au panier</button>
    </div>
  );
};

export default Offer;
