import React, { useState } from 'react';
import './PaymentPage.css'; // Fichier CSS spécifique pour la page de paiement

function PaymentPage() {
  const [form, setForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler la soumission du paiement
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
    </div>
  );
}

export default PaymentPage;
