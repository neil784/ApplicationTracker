import './App.css';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Create from './Create';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/create" element={<Create/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
