import React from 'react';
import Navbar from './components/Navbar.jsx';
import HomeShell from './components/HomeShell.jsx';
import FeatureControls from './components/FeatureControls.jsx';
import CommunicationGame from './components/CommunicationGame.jsx';
import EmotionRegulation from './components/EmotionRegulation.jsx';
import SocialSkills from './components/SocialSkills.jsx';
import ProgressTracker from './components/ProgressTracker.jsx';

export default function App(){
  const [tab, setTab] = React.useState('communication');
  const [features, setFeatures] = React.useState(()=>{
    try { return JSON.parse(localStorage.getItem('asd-features') || '{}'); } catch { return {}; }
  });
  React.useEffect(()=>{ localStorage.setItem('asd-features', JSON.stringify(features)); }, [features]);

  const render = () => {
    switch (tab) {
      case 'communication': return <CommunicationGame features={features} />;
      case 'emotion': return <EmotionRegulation features={features} />;
      case 'social': return <SocialSkills features={features} />;
      case 'progress': return <ProgressTracker />;
      default: return <CommunicationGame features={features} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-blue to-soft-purple">
      <Navbar setTab={setTab} active={tab} />
      <main className="max-w-4xl mx-auto p-6">
        <HomeShell>
          <FeatureControls features={features} setFeatures={setFeatures} />
          {render()}
        </HomeShell>
      </main>
    </div>
  );
}
