import './App.css';
import ChatInterface from './interfaces/chat.interface';
import UserInterface from './interfaces/user.interface';
import HomeInterface from './interfaces/home.interface';
import ChatPage from './Pages/chat.page';
import UserPage from './Pages/user.page';
import HomePage from './Pages/home.page';
import FormCreateUserPage from './Pages/form.create.user.page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormCreateUserInterface from './interfaces/form.create.user.interface';
import ProtectedRoute from './middlewares/jwt.middleware.localstorage'; // Novo componente

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Rota inicial */}
          <Route path='/home' element={<HomePage Component={HomeInterface} />} />

          {/* Rota para criar usuário */}
          <Route path='/singin' element={<FormCreateUserPage Component={FormCreateUserInterface} />} />

          {/* Rotas protegidas */}
          <Route 
            path='/chat' 
            element={
              <ProtectedRoute>
                <ChatPage Component={ChatInterface} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/user' 
            element={
              <ProtectedRoute>
                <UserPage Component={UserInterface} />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
