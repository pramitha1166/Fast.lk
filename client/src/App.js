import './App.css';

import Navbar from './components/layout/Nevbar';
import Home from './components/Home/Home';
import Footer from './components/layout/Footer'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
