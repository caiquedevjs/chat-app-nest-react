import './App.css';
import ChatInterface from './interfaces/chat.interface';
import UserInterface from './interfaces/user.interface';
import ChatPage from './Pages/chat.page';
import UserPage from './Pages/user.page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Definindo rotas corretamente com `element` */}
          <Route path='/chat' element={<ChatPage Component={ChatInterface} />} />
          <Route path='/user' element={ <UserPage Component={UserInterface} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
