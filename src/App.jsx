import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import ItemPage from './pages/ItemPage/ItemPage';
import CreateClip from './pages/CreateClip/CreateClip';
import Cart from './pages/Cart/Cart';
import { ClipsProvider } from './context/ClipsContext';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ClipsProvider>
        <BrowserRouter>
          <div className="app">
            <Header />
            <main className="app__content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/create" element={<CreateClip />} />
                <Route path="/item/:id" element={<ItemPage />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </ClipsProvider>
    </Provider>
  );
}

export default App;
