import React from 'react';
import Offer from './Offer';

const OfferList = ({ offers, addToCart }) => {
  return (
    <div className="offer-list">
      <h2>Offres Disponibles</h2>
      {offers.map((offer) => (
        <Offer key={offer.id} offer={offer} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default OfferList;
