import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import axios from 'axios';

function AdminPage() {
  const [offers, setOffers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [commandes, setCommandes] = useState([]);
  const [newOffer, setNewOffer] = useState({
    id: '',
    name: '',
    description: '',
    prix: '',
    capacity: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch offers from API
    axios.get('http://localhost:3002/admin/offers')
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
  
    // Fetch commandes from API
    axios.get('http://localhost:3002/admin/commandes')
      .then(response => {
        if (response.data.status === 'success') {
          setCommandes(response.data.commandes);
        } else {
          console.error('Erreur lors de la récupération des commandes:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la requête:', error);
      });
  }, []);
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOffer({
      ...newOffer,
      [name]: value,
    });
  };

  const handleAddOffer = (e) => {
    e.preventDefault();
    if (isEditing) {
      axios.put(`http://localhost:3002/admin/offers/${newOffer.id}`, {
        name: newOffer.name,
        description: newOffer.description,
        prix: parseFloat(newOffer.prix),
        capacity: parseInt(newOffer.capacity)
      }).then(response => {
        if (response.data.status === 'success') {
          setOffers(offers.map(offer => offer.id === newOffer.id ? { ...newOffer, prix: parseFloat(newOffer.prix), capacity: parseInt(newOffer.capacity) } : offer));
          setIsEditing(false);
        } else {
          console.error('Erreur lors de la mise à jour de l\'offre:', response.data.message);
        }
      }).catch(error => {
        console.error('Erreur lors de la requête:', error);
      });
    } else {
      axios.post('http://localhost:3002/admin/offers', {
        name: newOffer.name,
        description: newOffer.description,
        prix: parseFloat(newOffer.prix),
        capacity: parseInt(newOffer.capacity)
      }).then(response => {
        if (response.data.status === 'success') {
          setOffers([...offers, { ...newOffer, id: response.data.id, prix: parseFloat(newOffer.prix), capacity: parseInt(newOffer.capacity) }]);
        } else {
          console.error('Erreur lors de la création de l\'offre:', response.data.message);
        }
      }).catch(error => {
        console.error('Erreur lors de la requête:', error);
      });
    }
    setNewOffer({ id: '', name: '', description: '', prix: '', capacity: '' });
  };

  const handleDeleteOffer = (id) => {
    axios.delete(`http://localhost:3002/admin/offers/${id}`)
      .then(response => {
        if (response.data.status === 'success') {
          setOffers(offers.filter((offer) => offer.id !== id));
        } else {
          console.error('Erreur lors de la suppression de l\'offre:', response.data.message);
        }
      }).catch(error => {
        console.error('Erreur lors de la requête:', error);
      });
  };

  const handleEditOffer = (offer) => {
    setNewOffer({ ...offer, prix: offer.prix.toString(), capacity: offer.capacity.toString() });
    setIsEditing(true);
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Gestion des Offres et Acheteurs</h1>
      </header>
      <main className="admin-main">
        <div className="offers-buyers-container">
          <div className="offer-list">
            <h2>Offres Actuelles</h2>
            <ul>
              {offers.map((offer) => (
                <li key={offer.id}>
                  {offer.name} - {offer.description} ({offer.capacity} personne(s))
                  <button onClick={() => handleEditOffer(offer)}>Modifier</button>
                  <button onClick={() => handleDeleteOffer(offer.id)}>Supprimer</button>
                </li>
              ))}
            </ul>
            <div className="offer-form">
              <h2>{isEditing ? 'Modifier l\'Offre' : 'Ajouter une Nouvelle Offre'}</h2>
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
                  <label htmlFor="prix">Prix</label>
                  <input
                    type="number"
                    id="prix"
                    name="prix"
                    value={newOffer.prix}
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
                <button type="submit" className="add-offer-button">
                  {isEditing ? 'Modifier l\'Offre' : 'Ajouter l\'Offre'}
                </button>
              </form>
            </div>
          </div>
          <div className="buyer-list">
            <h2>Acheteurs et Clés</h2>
            <table>
              <thead>
                <tr>
                  <th>ID Commande</th>
                  <th>ID Utilisateur</th>
                  <th>Nom Utilisateur</th>
                  <th>ID Offre</th>
                  <th>Nom Offre</th>
                  <th>Quantité</th>
                  <th>Clé Commande</th>
                </tr>
              </thead>
              <tbody>
                {commandes.map((commande) => (
                  <tr key={commande.commande_id}>
                    <td>{commande.commande_id}</td>
                    <td>{commande.utilisateur_id}</td>
                    <td>{commande.utilisateur_nom}</td>
                    <td>{commande.offre_id}</td>
                    <td>{commande.offre_nom}</td>
                    <td>{commande.quantite}</td>
                    <td>{commande.clef_commande}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminPage;



