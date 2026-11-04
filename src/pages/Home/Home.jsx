import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import CardsGrid from '../../components/CardsGrid/CardsGrid';
import { INITIAL_CLIPS } from '../../data/clips';
import './Home.css';

const Home = () => {
  return (
    <div className="container">
      <Sidebar clipsCount="—" totalDuration="—" />
      <div className="home-content">
        <CardsGrid clips={INITIAL_CLIPS} />
      </div>
    </div>
  );
};

export default Home;
