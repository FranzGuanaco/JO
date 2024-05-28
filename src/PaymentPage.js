import React, { useState, useContext } from 'react';
import './PaymentPage.css';
import { AppContext } from './AppContext';

function PaymentPage() {
  const [form, setForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const { cart } = useContext(AppContext);

  console.log('Cart in PaymentPage:', cart); // Ajoutez ce log pour vérifier le contenu du panier

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment Submitted:', form);
    setSubmitted(true);
  };

  return (
    <div className="payment-page">
      <header className="payment-header">
        <h1>Page de Paiement</h1>
      </header>
      <main className="payment-main">
        {submitted ? (
          <div className="payment-confirmation">
            <h2>Paiement réussi!</h2>
            <p>Merci pour votre achat. Vous recevrez un e-mail de confirmation sous peu.</p>
          </div>
        ) : (
          <form className="payment-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nom sur la carte</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cardNumber">Numéro de carte</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="expiryDate">Date d'expiration</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={form.expiryDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="payment-button">Valider le paiement</button>
          </form>
        )}
      </main>
      <h1>Articles dans le panier :</h1>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.name} - {item.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default PaymentPage;

