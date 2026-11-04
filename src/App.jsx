import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import ItemPage from './pages/ItemPage/ItemPage';
import CreateClip from './pages/CreateClip/CreateClip';
import { ClipsProvider } from './context/ClipsContext';
import './App.css';

function App() {
  return (
    <ClipsProvider>
      <BrowserRouter>
        <div className="app">
          <Header />
          <div className="app-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/create" element={<CreateClip />} />
              <Route path="/item/:id" element={<ItemPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </ClipsProvider>
  );
}

export default App;
