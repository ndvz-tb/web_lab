import React from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import CardsGrid from './components/CardsGrid/CardsGrid';
import Footer from './components/Footer/Footer';
import { INITIAL_CLIPS } from './data/clips';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />

      <div className="container">
        <Sidebar clipsCount="—" totalDuration="—" />

        <CardsGrid clips={INITIAL_CLIPS} />
      </div>

      <Footer />
    </div>
  );
}

export default App;
