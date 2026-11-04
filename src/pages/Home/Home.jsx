import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import CardsGrid from '../../components/CardsGrid/CardsGrid';
import PrimaryButton from '../../components/ui/PrimaryButton/PrimaryButton';
import { useClips } from '../../context/ClipsContext';
import './Home.css';

const Home = () => {
  const { clips } = useClips();
  const [showMore, setShowMore] = useState(false);
  const [sortOrder, setSortOrder] = useState('');
  const [clipsCount, setClipsCount] = useState('—');
  const [totalDuration, setTotalDuration] = useState('—');

  const sortedClips = [...clips].sort((a, b) => {
    if (sortOrder === 'desc') return b.views - a.views;
    if (sortOrder === 'asc') return a.views - b.views;
    return 0;
  });

  const displayedClips = showMore
    ? sortedClips
    : sortedClips.slice(0, 6);

  const handleCount = () => {
    setClipsCount(displayedClips.length);
    const total = displayedClips.reduce((sum, clip) => sum + clip.duration, 0);
    setTotalDuration(total);
  };

  return (
    <div className="container">
      <Sidebar
        onSortDesc={() => setSortOrder('desc')}
        onSortAsc={() => setSortOrder('asc')}
        clipsCount={clipsCount}
        totalDuration={totalDuration}
        onCount={handleCount}
      />

      <div className="home-content">
        <CardsGrid clips={displayedClips} />

        {sortedClips.length > 6 && (
          <div className="home-more">
            <PrimaryButton onClick={() => setShowMore(!showMore)}>
              {showMore ? 'Show less' : 'View more'}
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
