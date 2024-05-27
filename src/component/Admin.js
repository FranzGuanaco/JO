import React, { useState } from 'react';

const Admin = ({ offers, setOffers }) => {
  const [newOffer, setNewOffer] = useState({ name: '', description: '', capacity: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOffer((prevOffer) => ({
      ...prevOffer,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOffers([...offers, { ...newOffer, id: offers.length + 1 }]);
    setNewOffer({ name: '', description: '', capacity: '' });
  };

  return (
    <div className="admin">
      <h2>Espace Administrateur</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newOffer.name}
          onChange={handleChange}
          placeholder="Nom de l'offre"
          required
        />
        <input
          type="text"
          name="description"
          value={newOffer.description}
          onChange={handleChange}
          placeholder="Description de l'offre"
          required
        />
        <input
          type="number"
          name="capacity"
          value={newOffer.capacity}
          onChange={handleChange}
          placeholder="Capacité"
          required
        />
        <button type="submit">Ajouter l'offre</button>
      </form>
    </div>
  );
};

export default Admin;
