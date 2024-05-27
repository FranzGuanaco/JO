import React, { useState } from 'react';
import './AdminPage.css';

function AdminPage() {
  const [offers, setOffers] = useState([
    { id: 1, name: 'Solo', description: 'Accès pour 1 personne', capacity: 1 },
    { id: 2, name: 'Duo', description: 'Accès pour 2 personnes', capacity: 2 },
    { id: 3, name: 'Familiale', description: 'Accès pour 4 personnes', capacity: 4 },
  ]);

  const [newOffer, setNewOffer] = useState({
    id: '',
    name: '',
    description: '',
    capacity: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOffer({
      ...newOffer,
      [name]: value,
    });
  };

  const handleAddOffer = (e) => {
    e.preventDefault();
    setOffers([...offers, { ...newOffer, id: offers.length + 1 }]);
    setNewOffer({ id: '', name: '', description: '', capacity: '' });
  };

  const handleDeleteOffer = (id) => {
    setOffers(offers.filter(offer => offer.id !== id));
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Gestion des Offres</h1>
      </header>
      <main className="admin-main">
        <div className="offer-list">
          <h2>Offres Actuelles</h2>
          <ul>
            {offers.map((offer) => (
              <li key={offer.id}>
                {offer.name} - {offer.description} ({offer.capacity} personne(s))
                <button onClick={() => handleDeleteOffer(offer.id)}>Supprimer</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="offer-form">
          <h2>Ajouter une Nouvelle Offre</h2>
          <form onSubmit={handleAddOffer}>
            <div className="form-group">
              <label htmlFor="name">Nom de l'offre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newOffer.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={newOffer.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="capacity">Capacité</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={newOffer.capacity}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="add-offer-button">Ajouter l'offre</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AdminPage;
