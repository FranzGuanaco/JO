import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';
import './App.css';

function Homepage() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bienvenue aux Jeux Olympiques</h1>
        <nav>
          <Link to="/offer" className="offer-button">Voir les offres</Link>
          <Link to="/admin" className="admin-button">Admin</Link>
        </nav>
      </header>
      <main>
        <section id="accueil">
          <h2>Bienvenue aux Jeux Olympiques</h2>
          <p>Les Jeux olympiques sont un événement sportif mondial majeur, où les athlètes de divers pays se rassemblent pour
            participer à une variété d'épreuves sportives.</p>
        </section>
        <section id="epreuves">
          <h2>Épreuves Olympiques</h2>
          <div className="epreuve">
            <h3>Athlétisme</h3>
            <p>L'athlétisme est une collection de sports comprenant des épreuves de course, de saut et de lancer.</p>
          </div>
          <div className="epreuve">
            <h3>Natation</h3>
            <p>La natation est un sport consistant à se déplacer dans l'eau en utilisant diverses techniques de nage.</p>
          </div>
          <div className="epreuve">
            <h3>Gymnastique</h3>
            <p>La gymnastique inclut des performances sur différents agrès, combinant force, souplesse et coordination.</p>
          </div>
        </section>
        <footer id="contact">
          <p>Contactez-nous à <a href="mailto:info@jeuxolympiques.com">info@jeuxolympiques.com</a></p>
        </footer>
      </main>
    </div>
  );
}

export default Homepage;

