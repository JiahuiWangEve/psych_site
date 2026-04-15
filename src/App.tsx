import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MbtiHub from './pages/MbtiHub';
import ResourceHub from './pages/ResourceHub';
import About from './pages/About';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mbti" element={<MbtiHub />} />
          <Route path="/resources" element={<ResourceHub />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
