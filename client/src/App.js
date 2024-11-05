import './App.css';
import ChatInterface from './interfaces/chat.interface';
import Home from './components/home';
import HomeInterface from './interfaces/home.interface';
import ChatPage from './Pages/chat.page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Definindo rotas corretamente com `element` */}
          <Route path='/chat' element={<ChatPage Component={ChatInterface} />} />
          <Route path='/home' element={<HomeInterface Component={Home} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
