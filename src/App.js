import { useState } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Game from './components/Game';
import Scores from './components/Scores';

// CSS Styles
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className='App'>
      <Navbar />
      <Route path='/scores' exact>
        <Scores data={{ user }} />
      </Route>
      <Route path='/game' exact>
        <Game data={{ user }} />
      </Route>
      <Route path='/' exact>
        <Home data={{ user, setUser }} />
      </Route>
      <Footer />
    </div>
  );
}

export default App;
